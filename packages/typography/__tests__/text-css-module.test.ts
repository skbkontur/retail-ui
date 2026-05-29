import fs from 'fs';
import path from 'path';

import { describe, it, expect } from 'vitest';

const css = fs.readFileSync(path.resolve(__dirname, '../Text.module.css'), 'utf8').replace(/\s+/g, ' ');

describe('Text.module.css content', () => {
  it('should contain camelCase classes', () => {
    expect(css).toContain('.t16 {');
    expect(css).toContain('font-size: 16px;');
    expect(css).toContain('font-weight: 700;');
  });

  it('should contain modifiers', () => {
    expect(css).toContain('.wide {');
  });

  it('should contain independent weight utilities', () => {
    expect(css).toContain('.regular { font-weight: 400; }');
    expect(css).toContain('.medium { font-weight: 500; }');
    expect(css).toContain('.bold { font-weight: 700; }');
  });
});
