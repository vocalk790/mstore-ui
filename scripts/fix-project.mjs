import { execSync } from 'node:child_process';

const run = cmd => execSync(cmd, { stdio: 'inherit', shell: true });

try {
  console.log('🔧 ESLint 자동 수정');
  run('npm run lint');

  console.log('🔧 스토리북 doctor');
  run('npx storybook doctor');

  console.log('🔧 의존성 최신화');
  run('npx npm-check-updates -u');
  run('npm install --legacy-peer-deps');

  console.log('✅ 프로젝트 자동 수리 완료!');
} catch (err) {
  console.error('❌ 자동 수리 실패. 위 로그를 복사해 주세요.');
  process.exit(1);
}
