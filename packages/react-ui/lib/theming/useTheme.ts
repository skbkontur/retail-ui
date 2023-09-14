import { useLayoutEffect, useState } from 'react';

type ReactUIThemes = 'defaultLightTheme' | 'defaultDarkTheme' | '2022LightTheme' | '2022DarkTheme';
type useThemeOptions = Partial<Record<'defaultTheme' | '2022Theme', boolean>>;

/**
 * Хук для управления темой приложения
 *
 * @param options Позволяет указать какую тему нужно использовать по умолчанию
 * @returns Возвращает текущее название темы и функцию для изменения темы
 */
export const useTheme = (options: useThemeOptions = { defaultTheme: true }) => {
  const [theme, setTheme] = useState<ReactUIThemes>(
    (localStorage.getItem('react-ui-app-theme') as ReactUIThemes) ?? getDefaultTheme(options),
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-react-ui-theme', theme);
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('react-ui-app-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

/**
 * Allows to get the default theme based on user's input and `prefers-color-scheme` current value
 *
 * @param options Allows to define which theme to use
 * @returns Theme name
 */
const getDefaultTheme = (options?: useThemeOptions): ReactUIThemes => {
  if (options?.['2022Theme']) {
    return themeConstructor('2022LightTheme', '2022DarkTheme');
  }

  return themeConstructor('defaultLightTheme', 'defaultDarkTheme');
};

/**
 * Shortcut for adding new themes
 *
 * @param lightThemeName Name of the light theme
 * @param darkThemeName Name of the dark theme
 * @returns Theme name
 */
const themeConstructor = (lightThemeName: ReactUIThemes, darkThemeName: ReactUIThemes): ReactUIThemes => {
  const isDarkThemePrefferedByUser = window?.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkThemePrefferedByUser) {
    return darkThemeName;
  }

  return lightThemeName;
};
