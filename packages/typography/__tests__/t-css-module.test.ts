import fs from 'fs';
import path from 'path';

import { describe, it, expect } from 'vitest';

const css = fs.readFileSync(path.resolve(__dirname, '../t.module.css'), 'utf8').replace(/\s+/g, ' ');

describe('t.module.css content', () => {
  it('should contain camelCase classes', () => {
    expect(css).toContain('.bodyM {');
    expect(css).toContain('.bodyXL {');
    expect(css).toContain('.bodyWide3XL {');
  });

  it('should contain reset modifiers', () => {
    expect(css).toContain('.reset { margin: 0; padding: 0; }');
  });

  it('should contain independent weight utilities', () => {
    expect(css).toContain('.regular { font-weight: 400; }');
    expect(css).toContain('.medium { font-weight: 500; }');
    expect(css).toContain('.bold { font-weight: 700; }');
  });
});
