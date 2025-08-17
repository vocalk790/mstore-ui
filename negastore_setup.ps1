# ===== Negastore 자동 셋업 (멱등 v2 / 프리플라이트 포함) =====
$ErrorActionPreference = "Stop"
$REGION = "us-east-2"
$INSTANCE_IDS = @("i-0789ce1cdff78f04c","i-079a42e40dddbc6be","i-0793413873eadc766")

if (-not $env:NETLIFY_AUTH_TOKEN) { $env:NETLIFY_AUTH_TOKEN = "" }
if (-not $env:NETLIFY_SITE_ID)   { $env:NETLIFY_SITE_ID   = "" }

function Fail($msg){ Write-Host "[오류] $msg" -ForegroundColor Red; exit 1 }
if (-not (Get-Command aws -ErrorAction SilentlyContinue)) { Fail "AWS CLI가 없습니다. 설치 후 새 창에서 실행하세요." }
try { $ver = aws --version 2>$null; if (-not $ver) { Fail "aws --version 확인 실패" } } catch { Fail "aws --version 실행 실패: $($_.Exception.Message)" }
try { $acct = aws sts get-caller-identity --query Account --output text } catch { Fail "STS 호출 실패(키/권한 확인): $($_.Exception.Message)" }
if (-not $REGION) { Fail "REGION 값이 비어 있습니다." }
Write-Host "`n[OK] 프리플라이트 통과 - 계정: $acct / 리전: $REGION" -ForegroundColor Green

function Try-Aws([ScriptBlock]$sb, [string]$desc){
  try { & $sb | Out-Null; Write-Host "[OK] $desc" -ForegroundColor Green }
  catch { Fail "$desc 실패: $($_.Exception.Message)" }
}

# 1) 공통 태그
if ($INSTANCE_IDS.Count -gt 0) {
  Try-Aws { aws ec2 create-tags --region $REGION --resources $INSTANCE_IDS --tags Key=negastore:autoscale,Value=on } "EC2 태깅(negastore:autoscale=on)"
} else { Write-Host "[안내] INSTANCE_IDS 비어있음 → 태깅/알람/유휴정지 스킵" -ForegroundColor Yellow }

# 2) 평일 09:00/23:30 KST 스케줄 (EventBridge → SSM)
$startRule = "negastore-start-0900kst"; $stopRule  = "negastore-stop-2330kst"
$startCron = "cron(0 0 ? * MON-FRI *)"; $stopCron  = "cron(30 14 ? * MON-FRI *)"
function Ensure-Rule($name,$expr){
  $exists = aws events list-rules --region $REGION --name-prefix $name --query "Rules[?Name=='$name'] | length(@)" --output text
  if ($exists -eq "0") { Try-Aws { aws events put-rule --region $REGION --name $name --schedule-expression $expr --state ENABLED } "EventBridge 룰 생성: $name" }
  else {
    $cur = aws events describe-rule --region $REGION --name $name --query ScheduleExpression --output text
    if ($cur -ne $expr) { Try-Aws { aws events put-rule --region $REGION --name $name --schedule-expression $expr --state ENABLED } "EventBridge 룰 업데이트: $name" }
    else { Write-Host "[OK] EventBridge 룰 존재/일치: $name" -ForegroundColor Green }
  }
}
Ensure-Rule $startRule $startCron
Ensure-Rule $stopRule  $stopCron

$docName = "Negastore-StartStop-ByTag"
$docJson = @'
{
  "schemaVersion":"0.3",
  "description":"Start/Stop EC2 by tag negastore:autoscale=on",
  "parameters":{
    "Action":{"type":"String","allowedValues":["start","stop"]},
    "TagKey":{"type":"String","default":"negastore:autoscale"},
    "TagValue":{"type":"String","default":"on"}
  },
  "mainSteps":[
    {
      "name":"List",
      "action":"aws:executeAwsApi",
      "inputs":{
        "Service":"ec2","Api":"DescribeInstances",
        "Filters":[
          {"Name":"tag:${TagKey}","Values":["${TagValue}"]},
          {"Name":"instance-state-name","Values":["pending","running","stopping","stopped"]}
        ]
      },
      "outputs":[{"Name":"InstanceIds","Selector":"$.Reservations..Instances..InstanceId","Type":"StringList"}]
    },
    {
      "name":"Branch",
      "action":"aws:branch",
      "inputs":{
        "Choices":[
          {"NextStep":"Start","Variable":"{{Action}}","StringEquals":"start"},
          {"NextStep":"Stop","Variable":"{{Action}}","StringEquals":"stop"}
        ],
        "Default":"Done"
      }
    },
    {"name":"Start","action":"aws:executeAwsApi","inputs":{"Service":"ec2","Api":"StartInstances","InstanceIds":"{{ List.InstanceIds }}"},"isEnd":false},
    {"name":"Stop","action":"aws:executeAwsApi","inputs":{"Service":"ec2","Api":"StopInstances","InstanceIds":"{{ List.InstanceIds }}"},"isEnd":false},
    {"name":"Done","action":"aws:sleep","inputs":{"Duration":"PT1S"}}
  ]
}
'@
$tmp = New-TemporaryFile; $docJson | Set-Content $tmp -Encoding UTF8
$docExists = aws ssm list-documents --region $REGION --filters Key=Name,Values=$docName --query "DocumentIdentifiers | length(@)" --output text
if ($docExists -eq "0") { Try-Aws { aws ssm create-document --region $REGION --name $docName --document-type Automation --document-format JSON --content file://$tmp } "SSM 문서 생성: $docName" }
else {
  Try-Aws { aws ssm update-document --region $REGION --name $docName --document-format JSON --content file://$tmp } "SSM 문서 업데이트: $docName"
  Try-Aws { aws ssm update-document-default-version --region $REGION --name $docName --document-version "\$LATEST" } "SSM 문서 기본버전 최신화"
}

$roleName = "Negastore-EB-Invoke-SSM"
$assume = '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"events.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
$roleExists = (aws iam get-role --role-name $roleName 2>$null)
if (-not $roleExists) {
  $af = New-TemporaryFile; $assume | Set-Content $af -Encoding UTF8
  Try-Aws { aws iam create-role --role-name $roleName --assume-role-policy-document file://$af } "IAM 역할 생성: $roleName"
  Try-Aws { aws iam attach-role-policy --role-name $roleName --policy-arn arn:aws:iam::aws:policy/AmazonSSMFullAccess } "IAM 정책 연결(AmazonSSMFullAccess)"
} else { Write-Host "[OK] IAM 역할 존재: $roleName" -ForegroundColor Green }
$roleArn = aws iam get-role --role-name $roleName --query Role.Arn --output text
$docVersion = aws ssm describe-document --region $REGION --name $docName --query "DefaultVersion" --output text
$docArn = "arn:aws:ssm:{0}:{1}:automation-definition/{2}:{3}" -f $REGION, $acct, $docName, $docVersion

function Ensure-Target($rule,$id,$action){
  $targets = aws events list-targets-by-rule --region $REGION --rule $rule --query "Targets[?Id=='$id'] | length(@)" --output text
  $input = "{`"Action`":`"$action`"}"
  $t = "[{`"Id`":`"$id`",`"Arn`":`"$docArn`",`"RoleArn`":`"$roleArn`",`"Input`":`"$input`"}]"
  Try-Aws { aws events put-targets --region $REGION --rule $rule --targets $t } "EventBridge 타겟 연결/갱신: $rule → $action"
}
Ensure-Target $startRule "startByTag" "start"
Ensure-Target $stopRule  "stopByTag"  "stop"

# 3) 유휴 30분 자동 STOP (CloudWatch Alarm → Lambda)
$lambdaName = "Negastore-StopIdle"; $lambdaRole = "Negastore-StopIdle-Role"
$lr = (aws iam get-role --role-name $lambdaRole 2>$null)
if (-not $lr) {
  $assumeL = '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'
  Try-Aws { aws iam create-role --role-name $lambdaRole --assume-role-policy-document $assumeL } "Lambda 역할 생성: $lambdaRole"
  Try-Aws { aws iam attach-role-policy --role-name $lambdaRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole } "정책 연결: LambdaBasicExecution"
  Try-Aws { aws iam attach-role-policy --role-name $lambdaRole --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess } "정책 연결: EC2FullAccess"
} else { Write-Host "[OK] Lambda 역할 존재: $lambdaRole" -ForegroundColor Green }
$lambdaArnRole = aws iam get-role --role-name $lambdaRole --query Role.Arn --output text

$py = New-TemporaryFile; $zip = "$($py).zip"
@'
import os,boto3
ec2=boto3.client("ec2")
def handler(event,ctx):
    ids=os.environ.get("INSTANCE_IDS","").split()
    if ids:
        ec2.stop_instances(InstanceIds=ids)
    return {"stopped":ids}
'@ | Set-Content $py -Encoding UTF8
Compress-Archive -Path $py -DestinationPath $zip -Force | Out-Null

$fnExists = (aws lambda get-function --region $REGION --function-name $lambdaName 2>$null)
if (-not $fnExists) {
  Try-Aws { aws lambda create-function --region $REGION --function-name $lambdaName --runtime python3.11 `
    --handler $([IO.Path]::GetFileNameWithoutExtension($py)).handler `
    --zip-file fileb://$zip --role $lambdaArnRole `
    --environment "Variables={INSTANCE_IDS='$($INSTANCE_IDS -join " ")'}" } "Lambda 생성: $lambdaName"
} else {
  Try-Aws { aws lambda update-function-code --region $REGION --function-name $lambdaName --zip-file fileb://$zip } "Lambda 코드 업데이트"
  Try-Aws { aws lambda update-function-configuration --region $REGION --function-name $lambdaName `
    --environment "Variables={INSTANCE_IDS='$($INSTANCE_IDS -join " ")'}" } "Lambda 환경변수 업데이트"
}
$lambdaArn = aws lambda get-function --region $REGION --function-name $lambdaName --query Configuration.FunctionArn --output text
try {
  aws lambda add-permission --region $REGION --function-name $lambdaName --statement-id allow-cw --action lambda:InvokeFunction --principal cloudwatch.amazonaws.com | Out-Null
  Write-Host "[OK] Lambda invoke 권한 부여" -ForegroundColor Green
} catch {
  Write-Host "[OK] Lambda invoke 권한 이미 존재(건너뜀)" -ForegroundColor Green
}
foreach($id in $INSTANCE_IDS){
  $alarmName = "Negastore-CPUIdle-30m-$id"
  Try-Aws { aws cloudwatch put-metric-alarm --region $REGION --alarm-name $alarmName `
    --metric-name CPUUtilization --namespace AWS/EC2 --statistic Average `
    --dimensions Name=InstanceId,Value=$id --period 300 --evaluation-periods 6 `
    --threshold 2 --comparison-operator LessThanThreshold `
    --alarm-actions $lambdaArn --treat-missing-data notBreaching } "CloudWatch 알람 upsert: $alarmName"
}

# 4) 예산 50달러(80% 알림)
$acctId = $acct; $budgetName = "negastore-monthly"
$hasBudget = aws budgets describe-budgets --account-id $acctId --query "Budgets[?BudgetName=='$budgetName'] | length(@)" --output text 2>$null
if ($hasBudget -eq "0") {
  Try-Aws { aws budgets create-budget --account-id $acctId `
    --budget '{"BudgetName":"negastore-monthly","BudgetLimit":{"Amount":"50","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}' `
    --notifications-with-subscribers '[{"Notification":{"ComparisonOperator":"GREATER_THAN","Threshold":80,"ThresholdType":"PERCENTAGE","NotificationType":"ACTUAL"},"Subscribers":[{"SubscriptionType":"EMAIL","Address":"ops@negastore.com"}]}]' } "Budget 생성(50USD/80%)"
} else {
  $cur = aws budgets describe-budgets --account-id $acctId --query "Budgets[?BudgetName=='$budgetName'] | [0]" --output json
  $obj = $cur | ConvertFrom-Json; $obj.BudgetLimit.Amount = "50"
  $tmpB = New-TemporaryFile; ($obj | ConvertTo-Json -Depth 10 -Compress) | Set-Content $tmpB -Encoding UTF8
  Try-Aws { aws budgets update-budget --account-id $acctId --new-budget file://$tmpB } "Budget 업데이트(50USD 보장)"
  $hasNotif = aws budgets describe-notifications-for-budget --account-id $acctId --budget-name $budgetName `
    --query "Notifications[?Threshold==\`80\` && ThresholdType=='PERCENTAGE' && NotificationType=='ACTUAL'] | length(@)" --output text
  if ($hasNotif -eq "0") {
    Try-Aws { aws budgets create-notification --account-id $acctId --budget-name $budgetName `
      --notification '{"ComparisonOperator":"GREATER_THAN","Threshold":80,"ThresholdType":"PERCENTAGE","NotificationType":"ACTUAL"}' `
      --subscribers '[{"SubscriptionType":"EMAIL","Address":"ops@negastore.com"}]' } "Budget 알림 추가(80%)"
  } else { Write-Host "[OK] Budget 알림(80%) 존재" -ForegroundColor Green }
}

# 5) UI 프리뷰(.env)
$envPath = ".env"
if (-not (Test-Path $envPath)) { New-Item -ItemType File $envPath | Out-Null }
$apiBase = $env:VITE_API_BASE; if ([string]::IsNullOrWhiteSpace($apiBase)) { $apiBase = "https://api.negastore.com" }
$apiToken = $env:VITE_API_TOKEN
@"
VITE_API_BASE=$apiBase
VITE_API_TOKEN=$apiToken
"@ | Set-Content $envPath -Encoding UTF8
Write-Host "[OK] .env 준비(VITE_API_BASE=$apiBase)" -ForegroundColor Green

# 6) Netlify 프리뷰(선택)
if ($env:NETLIFY_AUTH_TOKEN -and $env:NETLIFY_SITE_ID) {
  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Write-Host "npm이 필요합니다. 배포는 건너뜁니다." -ForegroundColor Yellow;  }
  npm i | Out-Null; npm run build | Out-Null
  if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) { npm i -g netlify-cli | Out-Null }
  netlify env:set VITE_API_BASE $apiBase | Out-Null
  if ($apiToken) { netlify env:set VITE_API_TOKEN $apiToken | Out-Null }
  netlify deploy --prod --dir=dist
} else {
  Write-Host "`n[안내] NETLIFY 토큰/사이트ID 없음 → 로컬 프리뷰만. `npm run dev` 로 확인하세요." -ForegroundColor Yellow
}


Write-Host "`n[완료] 비용최적화(스케줄/유휴/예산) + UI 프리뷰 설정 끝! (계정:$acct, 리전:$REGION)`n" -ForegroundColor Green
