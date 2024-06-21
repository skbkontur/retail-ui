import React from 'react';

import { Theme } from '../Theme';
import { useTheme } from '../useTheme';
import { ThemeContext } from '../ThemeContext';

import { useCSSRule } from './hooks';

type Props = Readonly<{
  /**
   * Тема, созданная с помощью ThemeFactory.create, переменные из которой будут объявлены как css custom properties
   */
  value?: Theme;

  /**
   * Приводить ли названия переменных к kebab case
   */
  kebabify?: boolean;

  children?: React.ReactNode;
}>;

export function GlobalCSSThemeProvider(props: Props): JSX.Element {
  const defaultTheme = useTheme();
  const { children = null, value = defaultTheme } = props;

  useCSSRule(value, {
    kebabify: props.kebabify,
  });

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

GlobalCSSThemeProvider.displayName = 'GlobalCSSThemeProvider';
