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
    expect(css).toContain('margin: 0');
  });

  it('should apply weight', () => {
    const css = renderScss('.test { @include t(16, $weight: "bold"); }');
    expect(css).toContain('font-weight: 700;');
  });
});
