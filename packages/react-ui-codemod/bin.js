#!/usr/bin/env node

const spawn = require('child_process').spawn;
const path = require('path');

const transform_path = path.join(__dirname, process.argv[2]);

spawn('yarn', ['jscodeshift', ...process.argv.slice(3), `--transform=${transform_path}`], {
  stdio: 'inherit',
  shell: true,
});
