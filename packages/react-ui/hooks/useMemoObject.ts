import { useMemo } from 'react';

export const useMemoObject = <TObject extends object>(objectValue: TObject) => {
  return useMemo<TObject>(() => objectValue, Object.values(objectValue));
};
