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
const sizeModulePath = '@skbkontur/react-ui/lib/size';

const isSizeContext = (candidate: unknown): candidate is SizeContext => {
  if (!candidate || typeof candidate !== 'object') {
    return false;
  }
  return 'Provider' in candidate;
};

const dynamicImportSizeModule = async (): Promise<SizeModuleShape | null> => {
  try {
    return await import(sizeModulePath);
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
