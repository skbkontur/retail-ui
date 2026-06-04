import fs from 'fs';
import path from 'path';

import less from 'less';
import { describe, expect, it } from 'vitest';

const lessCode = fs.readFileSync(path.join(__dirname, '../t.less'), 'utf8');

const renderLess = async (content: string) => {
  const output = await less.render(`${lessCode}\n${content}`);
  return output.css;
};

describe('text.less mixin', () => {
  it('should render basic size t-body-s', async () => {
    const css = await renderLess('.test { .t-body-s(); }');

    expect(css).toContain('font-size: 14px');
    expect(css).toContain('line-height: 20px');
  });

  it('should render custom weight', async () => {
    const css = await renderLess('.test { .t-body-s(@weight: bold); }');
    expect(css).toContain('font-weight: 700;');
  });

  it('should render custom weight', async () => {
    const css = await renderLess('.test { .t-body-s(@reset: true); }');
    expect(css).toContain('margin: 0;');
    expect(css).toContain('padding: 0;');
  });
});
