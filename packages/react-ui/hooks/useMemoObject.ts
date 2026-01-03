import { useMemo } from 'react';

import type { AnyObject } from '../lib/utils.js';

export const useMemoObject = <TObject extends AnyObject>(objectValue: TObject): TObject => {
  return useMemo<TObject>(() => objectValue, Object.values(objectValue));
};
