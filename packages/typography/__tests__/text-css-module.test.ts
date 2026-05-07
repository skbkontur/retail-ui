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
    expect(css).toContain('.spacing {');
    expect(css).toContain('.wide {');
  });

  it('should contain combined logic', () => {
    expect(css).toContain('.t14.spacing { margin-bottom: 10px; }');
    expect(css).toContain('.t20.wide.spacing { margin-bottom: 16px; }');
  });

  it('should contain independent weight utilities with !important', () => {
    expect(css).toContain('.regular { font-weight: 400 !important; }');
    expect(css).toContain('.medium { font-weight: 500 !important; }');
    expect(css).toContain('.bold { font-weight: 700 !important; }');
  });
});
