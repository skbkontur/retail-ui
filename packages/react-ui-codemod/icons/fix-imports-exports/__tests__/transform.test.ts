import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { applyTransform } from 'jscodeshift/dist/testUtils.js';

import transform from '../transform';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parserOptions = { parser: 'ts' as const };

describe('transform', () => {
  (['test_1', 'test_2', 'test_3'] as const).forEach((name) => {
    it(`transforms correctly using "${name}" data`, () => {
      const fixtureDir = path.join(__dirname, '../__testfixtures__');
      const inputPath = path.join(fixtureDir, `${name}.input.ts`);
      const source = fs.readFileSync(inputPath, 'utf8');
      const expectedOutput = fs.readFileSync(path.join(fixtureDir, `${name}.output.ts`), 'utf8');
      const out = applyTransform(transform, null, { path: inputPath, source }, parserOptions);
      expect(out).toEqual(expectedOutput.trim());
    });
  });
});
