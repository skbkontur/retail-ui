import * as React from 'react';
import { ThemeProvider as ThemeProviderInternal } from '../internal/ThemeContext';
import { ITheme, IThemeIn } from '../../lib/theming/Theme';
import ThemeFactory from '../../lib/theming/ThemeFactory';

interface ThemeProviderProps {
  children: React.ReactNode;
  value: IThemeIn;
}

export default class ThemeProvider extends React.Component<ThemeProviderProps> {
  private theme: ITheme;

  constructor(props: ThemeProviderProps) {
    super(props);
    this.theme = ThemeFactory.getOrCreate(props.value);
  }

  public componentWillReceiveProps(nextProps: Readonly<ThemeProviderProps>): void {
    if (nextProps.value !== this.props.value) {
      this.theme = ThemeFactory.getOrCreate(nextProps.value);
    }
  }

  public render() {
    return <ThemeProviderInternal value={this.theme}>{this.props.children}</ThemeProviderInternal>;
  }
}
