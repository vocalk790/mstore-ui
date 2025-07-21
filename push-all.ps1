<#
  push-all.ps1
  -------------
  ▸ 모든 변경 add → commit → push
  ▸ 첫 인수: 커밋 메시지 (없으면 "chore: update")
  ▸ 사용 예:  ./push-all.ps1 "feat: auto workflow"
#>

param(
  [string]$msg = "chore: update"
)

Write-Host "`n🗂️  git add -A" -ForegroundColor Cyan
git add -A

Write-Host "✅  git commit -m `"$msg`"" -ForegroundColor Cyan
git commit -m "$msg"

if ($LASTEXITCODE -ne 0) {
  Write-Host "⚠️  commit 실패(아마 변경 없음). 중단." -ForegroundColor Yellow
  exit
}

Write-Host "🚀  git push" -ForegroundColor Cyan
git push
