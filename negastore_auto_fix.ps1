# self-elevate (관리자 자동 상승)
$me = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  Start-Process -FilePath "powershell" -Verb RunAs -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`""
  exit
}

Write-Host "[1] 방화벽 80/443 오픈"
New-NetFirewallRule -DisplayName "HTTP 80"  -Direction Inbound -Action Allow -Protocol TCP -LocalPort 80  -ErrorAction SilentlyContinue | Out-Null
New-NetFirewallRule -DisplayName "HTTPS 443" -Direction Inbound -Action Allow -Protocol TCP -LocalPort 443 -ErrorAction SilentlyContinue | Out-Null

Write-Host "[2] Nginx / n8n 재시작(있다면)"
Restart-Service nginx -ErrorAction SilentlyContinue
Restart-Service n8n  -ErrorAction SilentlyContinue
if (Get-Command docker -ErrorAction SilentlyContinue) {
  docker start n8n 2>$null | Out-Null
}

Write-Host "[3] 포트 리스닝 상태"
Get-NetTCPConnection -LocalPort 80,443 -State Listen -ErrorAction SilentlyContinue |
  Select LocalAddress,LocalPort,OwningProcess

Write-Host "[4] 로컬 응답"
try { (Invoke-WebRequest -UseBasicParsing http://localhost -TimeoutSec 5).StatusCode } catch { $_.Exception.Message }
try { (Invoke-WebRequest -UseBasicParsing https://localhost -TimeoutSec 5).StatusCode } catch { $_.Exception.Message }

Write-Host "[완료] 방화벽 적용 + 서비스 재시작 끝"
