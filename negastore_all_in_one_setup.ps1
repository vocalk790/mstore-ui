
# Negastore All-in-One Setup Script
Write-Host "=== Negastore All-in-One Setup Script 시작 ===" -ForegroundColor Cyan

# 1. 의존성 설치
Write-Host "1/4: 의존성 설치중..." -ForegroundColor Yellow
npm install

# 2. 환경설정 파일 복사 (.env 예시가 있으면 적용)
if (Test-Path ".env.example") {
    Copy-Item ".env.example" ".env" -Force
    Write-Host ".env 파일 생성 완료" -ForegroundColor Green
}

# 3. Vite 포트 충돌 방지 (기존 프로세스 종료)
Write-Host "2/4: Vite 포트 프로세스 종료 시도..." -ForegroundColor Yellow
$ports = @(5173, 5174, 5175)
foreach ($port in $ports) {
    $pid = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -ErrorAction SilentlyContinue
    if ($pid) {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Write-Host "포트 $port 프로세스 종료 완료" -ForegroundColor Green
    }
}

# 4. 개발 서버 실행
Write-Host "3/4: 개발 서버 실행중..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "npm run dev" -NoNewWindow

Write-Host "=== 모든 작업 완료 ===" -ForegroundColor Cyan
Write-Host "대시보드: http://localhost:5175/" -ForegroundColor Green
Write-Host "설정: http://localhost:5175/config (API Base / Token / WS 설정)" -ForegroundColor Green
