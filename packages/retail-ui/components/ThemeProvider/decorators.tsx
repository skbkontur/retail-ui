import * as React from 'react';
import { ThemeConsumer } from './ThemeProvider';
import { ITheme } from '../../lib/ThemeManager';

type ComponentConstructorType = new (...args: any[]) => React.Component & { readonly theme: ITheme };

export function injectTheme<T extends ComponentConstructorType>(Component: T) {
  Component.prototype._originalRender = Component.prototype.render;
  Component.prototype.render = function() {
    return (
      <ThemeConsumer>
        {themeContext => {
          this.theme = themeContext.theme;
          return this._originalRender();
        }}
      </ThemeConsumer>
    );
  };
  return Component;
}
