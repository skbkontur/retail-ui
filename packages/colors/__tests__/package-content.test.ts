import { execFileSync } from 'child_process';
import { describe, expect, test } from 'vitest';

type NpmPackResult = {
  files: Array<{
    path: string;
  }>;
};

const npmExecutable = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const getPackedFiles = () => {
  const output = execFileSync(npmExecutable, ['pack', '--ignore-scripts', '--json', '--dry-run'], {
    encoding: 'utf-8',
  });

  const [packResult] = JSON.parse(output) as NpmPackResult[];

  return packResult.files.map((file) => file.path);
};

describe('npm package contents', () => {
  test('does not include source TypeScript files', () => {
    const sourceTsFiles = getPackedFiles().filter(
      (filePath) => (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) && !filePath.endsWith('.d.ts')
    );

    expect(sourceTsFiles).toEqual([]);
  });
});
