import { useMemo } from 'react';

export const useMemoObject = <TObject extends Record<string, unknown>>(objectValue: TObject) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo<TObject>(() => objectValue, Object.values(objectValue));
};
