import chokidar from 'chokidar';
import { exec } from 'node:child_process';
import { debounce } from 'lodash-es';

const watcher = chokidar.watch(
  ['src/**/*.{ts,tsx,js,jsx}', 'packages/**/src/**/*.{ts,tsx}'],
  { ignored: /node_modules/, persistent: true }
);

const run = (cmd) =>
  new Promise((res, rej) => {
    console.log(`\u001b[36m> ${cmd}\u001b[0m`);
    exec(cmd, (err, stdout, stderr) => {
      if (err) return rej(err);
      stdout && console.log(stdout);
      stderr && console.error(stderr);
      res();
    });
  });

const pipeline = debounce(async () => {
  try {
    await run('npm run test:ui');
    await run('git add .');
    await run('git commit -m "chore: auto‑regen files [skip ci]"');
    await run('git push');
    console.log('\u001b[32m✔  Regen pipeline complete.\u001b[0m');
  } catch (e) {
    console.error('\u001b[31m✖  Regen pipeline failed:', e.message, '\u001b[0m');
  }
}, 5000);

watcher.on('add', pipeline).on('change', pipeline).on('unlink', pipeline);
console.log('👀  Watching for generated file changes…');
