import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { applyTransform } from 'jscodeshift/dist/testUtils.js';

import transform from '../transform';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parserOptions = { parser: 'tsx' as const };

describe('transform', () => {
  fs.readdirSync(path.join(__dirname, '../__testfixtures__'))
    .filter((filename) => filename.endsWith('.input.tsx'))
    .map((filename) => filename.replace('.input.tsx', ''))
    .forEach((test) => {
      it(`transforms correctly using "${test}" data`, () => {
        const fixtureDir = path.join(__dirname, '../__testfixtures__');
        const inputPath = path.join(fixtureDir, `${test}.input.tsx`);
        const source = fs.readFileSync(inputPath, 'utf8');
        const expectedOutput = fs.readFileSync(path.join(fixtureDir, `${test}.output.tsx`), 'utf8');
        const out = applyTransform(transform, null, { path: inputPath, source }, parserOptions);
        expect(out).toEqual(expectedOutput.trim());
      });
    });
});
