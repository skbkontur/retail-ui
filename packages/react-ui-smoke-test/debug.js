const { spawnSync } = require('child_process');
const path = require('path');

spawnSync('node', [path.join(__dirname, './child.js')], { stdio: 'inherit' });
