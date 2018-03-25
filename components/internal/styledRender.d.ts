import * as React from 'react';

import { ITheme } from '../theme';

type MapObj<T> = { [P in keyof T]: any };

type CssClasses<CSS> = { readonly [P in keyof CSS]: string };

declare function styled<
  CSS extends { [className: string]: string },
  JSS extends MapObj<CSS>
>(
  cssStyles: CSS,
  jssStyles: (theme: ITheme) => JSS,
  render: (classes: CssClasses<CSS>) => React.ReactNode
): () => React.ReactNode;

export function element<
  CSS extends { [className: string]: string },
  JSS extends MapObj<CSS>
>(
  cssStyles: CSS,
  jssStyles: (theme: ITheme) => JSS,
  render: (classes: CssClasses<CSS>) => React.ReactNode
): React.ReactNode;

export default styled;
