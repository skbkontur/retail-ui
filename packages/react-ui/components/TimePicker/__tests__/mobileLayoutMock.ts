import { act } from '@testing-library/react';

import { ThemeFactory } from '../../../lib/theming/ThemeFactory.js';

interface MobileLayoutMock {
  /** Подменяет `matchMedia` так, чтобы медиавыражение мобильной верстки совпадало с выбранной версткой. */
  install(): void;
  restore(): void;
  /** Переключает верстку так же, как это делает браузер при изменении ширины окна. */
  setMobileLayout(isMobileLayout: boolean): void;
}

/**
 * Мобильная версия контролов включается медиавыражением темы через `useResponsiveLayout`,
 * поэтому в тестах верстка задается подменой `matchMedia`, а не userAgent.
 * Мобильным считается только медиавыражение темы по умолчанию: остальные запросы не совпадают,
 * иначе тест соврал бы про компонент со своим медиавыражением.
 */
export const createMobileLayoutMock = (initialIsMobileLayout = true): MobileLayoutMock => {
  const changeListeners = new Map<string, Set<(event: MediaQueryListEvent) => void>>();
  const mediaQueryLists = new Map<string, MediaQueryList>();

  let isMobileLayout = initialIsMobileLayout;
  let originalMatchMedia: typeof window.matchMedia | null = null;

  const isMobileMediaQuery = (query: string) => query === ThemeFactory.defaultTheme.mobileMediaQuery;

  const getMediaQueryList = (query: string): MediaQueryList => {
    const existingMediaQueryList = mediaQueryLists.get(query);

    if (existingMediaQueryList) {
      return existingMediaQueryList;
    }

    const listeners = new Set<(event: MediaQueryListEvent) => void>();
    changeListeners.set(query, listeners);

    const mediaQueryList = {
      get matches() {
        return isMobileMediaQuery(query) && isMobileLayout;
      },
      media: query,
      onchange: null,
      addListener: (listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
      removeListener: (listener: (event: MediaQueryListEvent) => void) => listeners.delete(listener),
      addEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) => listeners.add(listener),
      removeEventListener: (_type: string, listener: (event: MediaQueryListEvent) => void) =>
        listeners.delete(listener),
      dispatchEvent: () => true,
    } as unknown as MediaQueryList;

    mediaQueryLists.set(query, mediaQueryList);

    return mediaQueryList;
  };

  return {
    install() {
      if (originalMatchMedia) {
        return;
      }

      originalMatchMedia = window.matchMedia;
      window.matchMedia = ((query: string) => getMediaQueryList(query)) as typeof window.matchMedia;
    },
    restore() {
      if (!originalMatchMedia) {
        return;
      }

      window.matchMedia = originalMatchMedia;
      originalMatchMedia = null;
    },
    setMobileLayout(nextIsMobileLayout: boolean) {
      if (isMobileLayout === nextIsMobileLayout) {
        return;
      }

      isMobileLayout = nextIsMobileLayout;

      act(() => {
        changeListeners.forEach((listeners, query) => {
          if (!isMobileMediaQuery(query)) {
            return;
          }

          listeners.forEach((listener) =>
            listener({ matches: nextIsMobileLayout, media: query } as MediaQueryListEvent),
          );
        });
      });
    },
  };
};
