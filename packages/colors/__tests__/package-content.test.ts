import { execSync } from 'child_process';
import { describe, expect, test, beforeAll } from 'vitest';

type NpmPackResult = {
  files: Array<{
    path: string;
  }>;
};

const getPackedFiles = () => {
  const output = execSync('npm pack --ignore-scripts --json --dry-run', {
    encoding: 'utf-8',
  });

  const [packResult] = JSON.parse(output) as NpmPackResult[];

  return packResult.files.map((file) => file.path);
};

describe('npm package contents', () => {
  beforeAll(() => {
    execSync('npm run build:esm', { stdio: 'pipe' });
  });

  test('does not include source TypeScript files', () => {
    const packageFiles = getPackedFiles();
    expect(packageFiles.length).toBeGreaterThan(0);

    const sourceTsFiles = packageFiles.filter(
      (filePath) => (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) && !filePath.endsWith('.d.ts')
    );

    expect(sourceTsFiles).toEqual([]);
  });
  test('includes nested package files', () => {
    const nestedFiles = getPackedFiles().filter((filePath) => filePath.startsWith('lib/'));

    expect(nestedFiles.length).toBeGreaterThan(0);
  });

  test('does not include snapshots', () => {
    const snapshots = getPackedFiles().filter((filePath) => filePath.includes('snapshots.test.d.ts'));

    expect(snapshots).toEqual([]);
  });
});
