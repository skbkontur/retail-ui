import { useMemo } from 'react';

export const useMemoObject = <TObject extends Record<string, unknown>>(objectValue: TObject) => {
  return useMemo<TObject>(() => objectValue, Object.values(objectValue));
};
