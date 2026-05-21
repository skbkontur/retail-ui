import path from 'path';

import * as sass from 'sass';
import { describe, expect, it } from 'vitest';

const sassFileName = 'text.scss';

const renderScss = (content: string) => {
  const result = sass.compileString(
    `@use "${sassFileName}" as *;

    ${content}`,
    { loadPaths: [path.resolve(__dirname, '..')] }
  );
  return result.css;
};

describe('text.scss mixin', () => {
  it('should render basic size 14', () => {
    const css = renderScss('.test { @include t(14); }');

    expect(css).toContain('font-size: 14px');
    expect(css).toContain('line-height: 20px');
    expect(css).toContain('margin-bottom: 0');
  });

  it('should render wide variant with spacing for size 18', () => {
    const css = renderScss('.test { @include t(18, $spacing: true, $wide: true); }');

    expect(css).toContain('line-height: 28px');
    expect(css).toContain('margin-bottom: 14px');
  });

  it('should reset margin to 0 when spacing is false', () => {
    const css = renderScss('.test { @include t(12, $spacing: false); }');
    expect(css).toContain('margin-bottom: 0');
  });

  it('should apply weight', () => {
    const css = renderScss('.test { @include t(16, $weight: "bold"); }');
    expect(css).toContain('font-weight: 700;');
  });
});
