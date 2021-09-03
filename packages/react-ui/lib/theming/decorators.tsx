import React from 'react';

import { DefaultThemeInternal } from '../../internal/themes/DefaultTheme';

import { ThemeContext } from './ThemeContext';
import { Theme } from './Theme';

export function theme<T extends new (...args: any[]) => React.Component>(Component: T) {
  const ThemeDecorator = class extends Component {
    public constructor(...args: any[]) {
      super(args[0]);
    }

    public theme: Theme = DefaultThemeInternal;
    public render(): JSX.Element {
      return (
        <ThemeContext.Consumer>
          {(theme) => {
            this.theme = theme;
            return super.render();
          }}
        </ThemeContext.Consumer>
      );
    }
  };

  const nameDescriptor = Object.getOwnPropertyDescriptor(ThemeDecorator, 'name');
  if (!nameDescriptor || nameDescriptor.configurable) {
    Object.defineProperty(ThemeDecorator, 'name', { value: Component.name });
  }

  return ThemeDecorator;
}
