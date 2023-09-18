import { useLayoutEffect, useState } from 'react';

type ReactUIThemes = 'react-ui-dark' | 'react-ui-light';
interface UseThemeOptions {
  useOSTheme: boolean;
}

const doesUserPreferDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const doesUserPreferLightTheme = window?.matchMedia('(prefers-color-scheme: light)').matches;
const defaultTheme = doesUserPreferDarkTheme ? 'react-ui-dark' : 'react-ui-light';

const getThemeByUserPreference = (
  doesUserPreferDarkTheme: boolean,
  doesUserPreferLightTheme: boolean,
  defaultTheme: ReactUIThemes,
) => {
  if (doesUserPreferDarkTheme && localStorage.getItem('react-ui-theme') !== 'react-ui-dark') {
    return 'react-ui-dark';
  }

  if (doesUserPreferLightTheme && localStorage.getItem('react-ui-theme') !== 'react-ui-dark') {
    return 'react-ui-light';
  }

  return defaultTheme;
};

const getTheme = (useOSTheme: boolean, defaultTheme: ReactUIThemes): ReactUIThemes => {
  if (useOSTheme) {
    // If `useOSTheme` is true we change theme based on what OS provised us with
    return getThemeByUserPreference(doesUserPreferDarkTheme, doesUserPreferLightTheme, defaultTheme);
  }

  // Otherwise we look for updates made by the user
  return (localStorage.getItem('react-ui-theme') as ReactUIThemes) ?? defaultTheme;
};

/**
 * Хук для управления темой приложения.
 *
 * @param options.useOSTheme По умолчанию хук переключает тему в зависимости от текущей темы в операционной системе пользователя. Чтобы отключить это поведение передайте `false` в этот параметр.
 *
 * @returns Возвращает текущее название темы и функции для изменения темы.
 */
export const useTheme = (options: UseThemeOptions = { useOSTheme: true }) => {
  const [theme, setTheme] = useState<ReactUIThemes>(getTheme(options?.useOSTheme, defaultTheme));

  useLayoutEffect(() => {
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('react-ui-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'react-ui-dark') {
      return setTheme('react-ui-light');
    }

    setTheme('react-ui-dark');
  };

  return { theme, setTheme, toggleTheme };
};
