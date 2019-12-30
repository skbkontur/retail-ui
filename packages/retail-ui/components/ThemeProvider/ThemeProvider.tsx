import * as React from 'react';
import { ThemeProvider as ThemeProviderInternal } from '../../lib/theming/ThemeContext';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { isDevelopmentEnv } from '../internal/currentEnvironment';
import isEqual from 'lodash.isequal';
import warning from 'warning';

interface ThemeProviderProps {
  children: React.ReactNode;
  value: ThemeIn | Theme;
}

export class ThemeProvider extends React.Component<ThemeProviderProps> {
  private theme: Theme;

  constructor(props: ThemeProviderProps) {
    super(props);
    this.theme = this.makeFullTheme(props.value);
  }

  public UNSAFE_componentWillReceiveProps(nextProps: Readonly<ThemeProviderProps>): void {
    if (nextProps.value !== this.props.value) {
      if (isDevelopmentEnv) {
        const hasSameShape = isEqual(nextProps.value, this.props.value);
        warning(
          !hasSameShape,
          `ThemeProvider received next value with the same shape as the previous one.` +
            '\n' +
            `Consider using the same object reference for performance reasons.` +
            '\n' +
            `Shape: ${JSON.stringify(nextProps.value)}`,
        );
      }

      this.theme = this.makeFullTheme(nextProps.value);
    }
  }

  public render() {
    return <ThemeProviderInternal value={this.theme}>{this.props.children}</ThemeProviderInternal>;
  }

  private makeFullTheme(theme: ThemeIn | Theme): Theme {
    return ThemeFactory.isFullTheme(theme) ? theme : ThemeFactory.create(theme);
  }
}
