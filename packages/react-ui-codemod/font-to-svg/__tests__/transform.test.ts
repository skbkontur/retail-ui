import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

import { defineTest } from 'jscodeshift/dist/testUtils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.readdirSync(path.join(__dirname, '../__testfixtures__'))
  .filter(filename => filename.endsWith('.input.js'))
  .map(filename => filename.replace('.input.js', ''))
  .forEach(test => defineTest(__dirname, 'transform', null, test));
