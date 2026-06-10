import fs from 'fs';
import path from 'path';

import { describe, it, expect } from 'vitest';

const css = fs.readFileSync(path.resolve(__dirname, '../t.css'), 'utf8').replace(/\s+/g, ' ');

describe('Text.css content', () => {
  it('should contain base classes', () => {
    expect(css).toContain(
      '.t-body-m { font-size: 16px; line-height: 22px; font-weight: 400; font-variant-numeric: tabular-nums; }'
    );
    expect(css).toContain('.t-heading-s { font-size: 20px; line-height: 28px; font-weight: 700; }');
  });

  it('should contain standalone weight utilities with', () => {
    expect(css).toContain('.t-regular { font-weight: 400; }');
    expect(css).toContain('.t-medium { font-weight: 500; }');
    expect(css).toContain('.t-bold { font-weight: 700; }');
  });

  it('should contain reset utility', () => {
    expect(css).toContain('.t-reset { margin: 0; padding: 0; }');
  });
});
