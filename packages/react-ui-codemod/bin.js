#!/usr/bin/env node

const spawn = require('child_process').spawn;
const path = require('path');
const jscodeshift = require.resolve('.bin/jscodeshift');

const transform = path.join(__dirname, process.argv[2]);

spawn(jscodeshift, [...process.argv.slice(3), `--transform=${transform}`], {
  stdio: 'inherit',
  shell: true,
});
