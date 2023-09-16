import { useLayoutEffect, useState } from 'react';

type ReactUIThemes = 'react-ui-dark' | 'react-ui-light';

const isDarkThemePrefferedByUser = window?.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = isDarkThemePrefferedByUser ? 'react-ui-dark' : 'react-ui-light';

/**
 * Хук для управления темой приложения
 *
 * @param defaultTheme Позволяет установить значение темы по умолчанию. При использовании не будет учитываться тема операционной системы пользователя.
 *
 * @returns Возвращает текущее название темы и функции для изменения темы.
 */
export const useTheme = (defaultValue?: ReactUIThemes) => {
  const [theme, setTheme] = useState<ReactUIThemes>(
    (localStorage.getItem('react-ui-theme') as ReactUIThemes) ?? defaultValue ?? defaultTheme,
  );

  const toggleTheme = () => {
    if (theme === 'react-ui-dark') {
      return setTheme('react-ui-light');
    }

    setTheme('react-ui-dark');
  };

  useLayoutEffect(() => {
    document.documentElement.setAttribute('class', theme);
    localStorage.setItem('react-ui-theme', theme);
  }, [theme]);

  return { theme, setTheme, toggleTheme };
};
