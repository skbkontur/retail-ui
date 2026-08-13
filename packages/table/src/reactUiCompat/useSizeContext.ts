import type { Context } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export type SizeProp = 'small' | 'medium' | 'large';
interface SizeContextValue {
  size: SizeProp;
}

type SizeContext = Context<SizeContextValue>;

interface SizeModuleShape {
  useSizeContext?: () => SizeContextValue;
  SizeControlContext?: SizeContext;
}

const fallbackContext: SizeContext = createContext<SizeContextValue>({ size: 'small' });

const isSizeContext = (candidate: unknown): candidate is SizeContext => {
  if (!candidate || typeof candidate !== 'object') {
    return false;
  }
  return 'Provider' in candidate;
};

// Скрываем путь к модулю от статического анализа бандлеров (Rollup/Vite/Webpack).
// Формируем путь динамически, чтобы бандлеры не могли его распознать как статический импорт.
// Это необходимо, потому что:
// 1. Модуль @skbkontur/react-ui/lib/size доступен только в react-ui v5.4.0+
// 2. Пакет @skbkontur/table поддерживает react-ui v5.x, включая версии ниже 5.4.0, где модуля нет
// 3. Vite 7.x/Rollup требуют разрешения всех статических импортов при сборке
// 4. Webpack 5 показывает "Critical dependency" для динамических путей

// Путь формируется в runtime, что предотвращает статический анализ Rollup/Vite
// Комментарий webpackIgnore предотвращает предупреждение Webpack
const getSizeModulePath = (): string => {
  const parts = ['@skbkontur', 'react-ui', 'lib', 'size'];
  return parts.join('/');
};

const dynamicImportSizeModule = async (): Promise<SizeModuleShape | null> => {
  try {
    const modulePath = getSizeModulePath();
    return await import(/* webpackIgnore: true */ modulePath);
  } catch {
    return null;
  }
};

export const useSizeContextCompat = (): SizeContextValue => {
  const [resolvedContext, setResolvedContext] = useState<SizeContext>(() => fallbackContext);

  const resolvedValue = useContext(resolvedContext);
  const fallbackValue = useContext(fallbackContext);

  useEffect(() => {
    let cancelled = false;

    void dynamicImportSizeModule().then((mod) => {
      if (cancelled || !mod) {
        return;
      }

      if (isSizeContext(mod.SizeControlContext)) {
        setResolvedContext(mod.SizeControlContext);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return resolvedContext === fallbackContext ? fallbackValue : resolvedValue;
};
