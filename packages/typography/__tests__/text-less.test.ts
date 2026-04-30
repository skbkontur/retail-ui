import fs from 'fs';
import path from 'path';

import less from 'less';
import { describe, expect, it } from 'vitest';

const lessCode = fs.readFileSync(path.join(__dirname, '../text.less'), 'utf8');

const renderLess = async (content: string) => {
  const output = await less.render(`${lessCode}\n${content}`);
  return output.css;
};

describe('text.less mixin', () => {
  it('should render basic size 14', async () => {
    const css = await renderLess('.test { .t(14); }');

    expect(css).toContain('font-size: 14px');
    expect(css).toContain('line-height: 20px');
    expect(css).toContain('margin-bottom: 0');
  });

  it('should render wide variant with spacing for size 18', async () => {
    const css = await renderLess('.test { .t(18, @spacing: true, @wide: true); }');

    expect(css).toContain('line-height: 28px');
    expect(css).toContain('margin-bottom: 14px');
  });

  it('should reset margin to 0 when spacing is false', async () => {
    const css = await renderLess('.test { .t(12, @spacing: false); }');
    expect(css).toContain('margin-bottom: 0');
  });
});
