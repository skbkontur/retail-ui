import path from 'path';

import * as sass from 'sass';
import { describe, expect, it } from 'vitest';

const sassFileName = 't.scss';

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
    const css = renderScss('.test { @include t-body-s(); }');

    expect(css).toContain('font-size: 14px');
    expect(css).toContain('line-height: 20px');
  });

  it('should apply weight', () => {
    const css = renderScss('.test { @include t-body-s($weight: "bold"); }');
    expect(css).toContain('font-weight: 700;');
  });

  it('should render basic size 14 with reset', () => {
    const css = renderScss('.test { @include t-body-s($reset: true); }');

    expect(css).toContain('margin: 0');
    expect(css).toContain('padding: 0');
  });
});
