import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// @ts-expect-error - jscodeshift/dist/testUtils doesn't have type definitions
import { defineTest } from 'jscodeshift/dist/testUtils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.readdirSync(path.join(__dirname, '../__testfixtures__'))
  .filter(filename => filename.endsWith('.input.js'))
  .map(filename => filename.replace('.input.js', ''))
  .forEach(test => defineTest(__dirname, 'transform', null, test));
