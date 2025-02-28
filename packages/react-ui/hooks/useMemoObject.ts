import { useMemo } from 'react';

import type { AnyObject } from '../lib/utils';

export const useMemoObject = <TObject extends AnyObject>(objectValue: TObject) => {
  return useMemo<TObject>(() => objectValue, Object.values(objectValue));
};
