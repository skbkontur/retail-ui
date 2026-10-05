#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const jscodeshift = require.resolve('.bin/jscodeshift');

const transform = path.join(path.dirname(fileURLToPath(import.meta.url)), process.argv[2]);

spawn(jscodeshift, [...process.argv.slice(3), `--transform=${transform}`], {
  stdio: 'inherit',
  shell: true,
});
