#!/usr/bin/env node

const { exec, spawn } = require('child_process');
const { join } = require('path');

console.log('WELCOME TO THE SB-DOCS CLI');
console.log('CWD:', process.cwd());
console.log('CONFIG_FOLDER:', join(__dirname, '.storybook'));

// exec(`storybook dev --docs --config-dir ${join(__dirname, '.storybook')}`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

spawn(
  join(__dirname, '../../node_modules/.bin/storybook.cmd'),
  ['dev', '--docs', '--config-dir', join(__dirname, '.storybook')],
  {
    cwd: process.cwd(),
    stdio: 'inherit',
  },
);
