import fs from 'fs';
import path from 'path';

import { describe, it, expect } from 'vitest';

const css = fs.readFileSync(path.resolve(__dirname, '../Text.css'), 'utf8').replace(/\s+/g, ' ');

describe('Text.css content', () => {
  it('should contain base classes', () => {
    expect(css).toContain('.t-16 { font-size: 16px; line-height: 22px; font-weight: 400; margin: 0; }');
    expect(css).toContain('.t-28 { font-size: 28px; line-height: 36px; font-weight: 400; margin: 0; }');
  });

  it('should contain standalone weight utilities with', () => {
    expect(css).toContain('.t-regular { font-weight: 400; }');
    expect(css).toContain('.t-medium { font-weight: 500; }');
    expect(css).toContain('.t-bold { font-weight: 700; }');
  });
});
