import * as React from 'react';
import { ThemeProviderProps } from 'styled-components';
import { DefaultThemeType, getDefaultTheme } from '../themes/default';
import { ThemeProvider as OriginalThemeProvider } from './styled-components';

const ThemeProvider: React.SFC<ThemeProviderProps<DefaultThemeType>> = ({
  children,
  theme = getDefaultTheme(),
  ...rest
}) => (
  <OriginalThemeProvider theme={theme} {...rest}>
    {children}
  </OriginalThemeProvider>
);

export default ThemeProvider;
