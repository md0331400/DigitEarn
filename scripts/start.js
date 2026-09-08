/* Starts both apps as separate processes:
   - user site  → port 3000
   - admin panel → port 3001 (fully separate app) */
const path = require('path');
const { spawn } = require('child_process');

function run(script, label) {
  const child = spawn(process.execPath, [path.join(__dirname, '..', script)], {
    stdio: 'inherit',
    env: process.env,
  });
  child.on('exit', (code) => {
    console.log(`[start] ${label} exited (code ${code})`);
    if (code !== 0) process.exit(code);
  });
  return child;
}

console.log('DigitEarn starting:');
console.log('  • User site  → http://localhost:3000');
console.log('  • Admin panel → http://localhost:3001  (separate app)');

run('public-site/server.js', 'user-site');
run('admin/server.js', 'admin-panel');
