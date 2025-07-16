import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';

function run(cmd) {
  console.log(`\x1b[36m> ${cmd}\x1b[0m`);
  execSync(cmd, { stdio: 'inherit' });
}

/* 1) lock 파일 혼용 해소 (npm ↔ yarn) */
const hasYarn = existsSync('yarn.lock');
const hasPkg  = existsSync('package-lock.json');
if (hasYarn && hasPkg) {
  console.log('\x1b[33m⚠  yarn.lock 과 package‑lock.json 이 함께 있습니다. yarn 기준으로 진행합니다.\x1b[0m');
  rmSync('package-lock.json');
}
const pm = hasYarn ? 'yarn' : 'npm';

/* 2) 필수 devDependencies 설치 */
run(`${pm} ${pm === 'yarn' ? 'add -D' : 'install -D'} @storybook/cli @storybook/react @storybook/react-vite @playwright/test @axe-core/playwright @lhci/cli chokidar lodash-es netlify-cli`);

/* 3) Playwright 브라우저 설치 */
run('npx playwright install --with-deps');

/* 4) Storybook 정적 빌드 */
run(`${pm} run build:storybook`);

/* 5) 통합 UI 테스트 */
run(`${pm} run test:ui`);

console.log('\x1b[32m✔  mstore‑ui 부트스트랩 완료!\x1b[0m');
