#!/usr/bin/env node
import { execSync } from "node:child_process";
const run = cmd => execSync(cmd, { stdio: "inherit", shell: true });

try {
  console.log("🔧 Removing node_modules and lockfile");
  run("rm -rf node_modules package-lock.json");

  console.log("🔧 Clearing npm cache");
  run("npm cache clean --force");

  console.log("🔧 Installing dependencies with legacy peer-deps");
  run("npm install --legacy-peer-deps");

  console.log("🔧 Running project doctor");
  run("npm run doctor");

  console.log("🔧 Building Storybook");
  run("npm run build:storybook");

  console.log("🔧 Committing changes");
  run('git add .');
  run('git commit -m "chore: auto-fix dependencies and build"');

  console.log("🔧 Pushing to remote");
  run("git push -u origin main");

  console.log("✅ Auto-fix and push completed!");
} catch (err) {
  console.error("❌ Auto-fix failed:", err.message);
  process.exit(1);
}
