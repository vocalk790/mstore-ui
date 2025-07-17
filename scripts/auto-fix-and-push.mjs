#!/usr/bin/env node
// 파일 경로: scripts/auto-fix-and-push.mjs

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

// 현재 작업 디렉터리 출력
const cwd = process.cwd();
console.log(`📁 현재 디렉터리: ${cwd}`);

// 삭제 대상 경로
const nodeModulesDir = path.join(cwd, 'node_modules');
const lockfile = path.join(cwd, 'package-lock.json');

// 쉘 명령 실행 함수
function run(cmd) {
  console.log(`\n--- 실행 명령: ${cmd}`);
  execSync(cmd, { stdio: 'inherit', shell: true });
}

try {
  // 1) node_modules 삭제
  console.log(`\n🔧 node_modules 삭제 시도: ${nodeModulesDir}`);
  if (fs.existsSync(nodeModulesDir)) {
    fs.rmSync(nodeModulesDir, { recursive: true, force: true });
    console.log('✔ node_modules 삭제 완료');
  } else {
    console.log('ℹ node_modules 폴더가 없습니다');
  }

  // 2) package-lock.json 삭제
  console.log(`\n🔧 package-lock.json 삭제 시도: ${lockfile}`);
  if (fs.existsSync(lockfile)) {
    fs.rmSync(lockfile, { force: true });
    console.log('✔ package-lock.json 삭제 완료');
  } else {
    console.log('ℹ package-lock.json 파일이 없습니다');
  }

  // 3) npm 캐시 정리
  run('npm cache clean --force');

  // 4) 의존성 설치 (peer-deps 우회)
  run('npm install --legacy-peer-deps');

  // 5) lint, typecheck, test
  run('npm run doctor');

  // 6) Storybook 빌드
  run('npm run build:storybook');

  // 7) 깃 스테이징·커밋·푸시
  run('git add .');
  run('git commit -m "chore: auto-fix dependencies and build"');
  run('git push -u origin main');

  console.log('\n✅ 자동 수정 및 푸시가 완료되었습니다!');
} catch (error) {
  console.error('\n❌ 오류 발생:', error.message);
  process.exit(1);
}
