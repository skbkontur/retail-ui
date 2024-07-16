import React from 'react';
import { ThemeContext } from '@skbkontur/react-ui';

import { Theme } from '../Theme';
import { useTheme } from '../useTheme';

import { useCSSRule, useDefaultId } from './hooks';
import { GlobalCSSThemeProvider } from './GlobalCSSThemeProvider';

type StandardProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type Props = StandardProps &
  Readonly<{
    /**
     * Тема, созданная с помощью ThemeFactory.create, переменные из которой будут объявлены как css custom properties
     */
    value?: Theme;

    /**
     * Приводить ли названия переменных к kebab case
     */
    kebabify?: boolean;
  }>;

export function CSSThemeProvider(props: Props): JSX.Element {
  const defaultTheme = useTheme();
  const defaultId = useDefaultId();
  const { kebabify, id = defaultId, value = defaultTheme, ...rest } = props;
  const selector = `#${id}`;

  useCSSRule(value, {
    selector,
    kebabify,
  });

  return (
    <ThemeContext.Provider value={value}>
      <div {...rest} id={id} />
    </ThemeContext.Provider>
  );
}

CSSThemeProvider.Global = GlobalCSSThemeProvider;
CSSThemeProvider.displayName = 'CSSThemeProvider';
