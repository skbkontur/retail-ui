import { test, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import { saveTokens } from '../scripts/create-tokens-files';

vi.mock('fs', () => ({
  mkdirSync: vi.fn(),
  writeFileSync: vi.fn(),
  existsSync: vi.fn(() => true),
}));

const mockTokens = {
  light: { primary: '#ffffff', surface: { base: '#f0f0f0' } },
  dark: { primary: '#000000', surface: { base: '#121212' } },
};

const options = {
  colorBrand: 'red',
  colorAccent: 'gray',
  fileOutputDir: 'out',
  tokens: mockTokens,
  tokensCSSPrefix: 'k',
};

beforeEach(() => {
  vi.clearAllMocks();
});

test('should generate css with correct variables and selectors', () => {
  const mockCssString = `
[data-k-brand="red"][data-k-accent="gray"] {
  --k-primary: #ffffff;
  --k-surface-base: #f0f0f0;
}

[data-k-brand="red"][data-k-accent="gray"][data-k-theme="dark"] {
  --k-primary: #000000;
  --k-surface-base: #121212;
}`;

  saveTokens({ ...options, tokens: mockCssString, fileFormat: 'css' });

  const [, content] = vi.mocked(fs.writeFileSync).mock.calls[0];

  expect(content).toContain('[data-k-brand="red"]');
  expect(content).toContain('[data-k-accent="gray"]');
  expect(content).toContain('[data-k-theme="dark"]');
  expect(content).toContain('--k-primary: #ffffff');
});

test('should generate scss variables referencing css variables', () => {
  saveTokens({ ...options, fileFormat: 'scss', tokensIsFlat: true });

  const [, content] = vi.mocked(fs.writeFileSync).mock.calls[0];

  expect(content).toContain('$color-primary: var(--k-primary)');
});

test('should generate less variables referencing css variables', () => {
  saveTokens({ ...options, fileFormat: 'less', tokensIsFlat: true });

  const [, content] = vi.mocked(fs.writeFileSync).mock.calls[0];

  expect(content).toContain('@color-primary: var(--k-primary)');
});

test('should generate valid json with themed values', () => {
  saveTokens({ ...options, fileFormat: 'json', tokensIsFlat: true });

  const [, content] = vi.mocked(fs.writeFileSync).mock.calls[0];
  const parsed = JSON.parse(content as string);

  expect(parsed.primary.light).toBe('#ffffff');
  expect(parsed.primary.dark).toBe('#000000');
});

test('should generate js file with exported constant', () => {
  saveTokens({
    ...options,
    fileFormat: 'js',
    tokensJSVariableName: 'colors',
    tokensIsFlat: true,
  });

  const [, content] = vi.mocked(fs.writeFileSync).mock.calls[0];

  expect(content).toContain('export const colors =');
});

test('should remove hover and pressed states when flag is set', () => {
  const tokensWithStates = {
    light: { button: '#fff', buttonHover: '#eee' },
    dark: { button: '#000', buttonHover: '#111' },
  };

  saveTokens({
    ...options,
    tokens: tokensWithStates,
    fileFormat: 'json',
    removePressedAndHover: true,
  });

  const [, content] = vi.mocked(fs.writeFileSync).mock.calls[0];

  expect(content).toContain('"button"');
  expect(content).not.toContain('"buttonHover"');
});
