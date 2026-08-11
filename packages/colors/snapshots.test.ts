import * as fs from 'fs';
import * as path from 'path';

import { describe, test, expect } from 'vitest';

const SNAPSHOTS_ROOT = path.join(__dirname, '__snapshots__');
const TOKENS_DIR = path.join(SNAPSHOTS_ROOT, 'tokens');
const BASE_DIR = path.join(SNAPSHOTS_ROOT, 'tokens-base');

const runSnapshotTests = (dirPath: string, suiteName: string) => {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.json'));

  // oxlint-disable-next-line jest/valid-title
  describe(suiteName, () => {
    test.each(files)('Snapshot comparison: %s', async (fileName) => {
      const filePath = path.join(dirPath, fileName);
      const content = fs.readFileSync(filePath, 'utf-8');

      expect(content).toMatchSnapshot();
    });
  });
};

runSnapshotTests(TOKENS_DIR, 'Semantic Tokens');
runSnapshotTests(BASE_DIR, 'Base Palette');
