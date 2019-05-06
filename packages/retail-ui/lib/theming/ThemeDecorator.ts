import * as React from 'react';
import { ThemeConsumer } from './ThemeProvider';
import { ITheme } from './Theme';

type ComponentConstructorType = new (...args: any[]) => React.Component & { readonly theme: ITheme };

export function injectTheme<T extends ComponentConstructorType>(Component: T) {
  Component.prototype._originalRender = Component.prototype.render;
  Component.prototype.render = function() {
    return React.createElement(ThemeConsumer, null, (theme: ITheme) => {
      this.theme = theme;
      return this._originalRender();
    });
  };
  return Component;
}
