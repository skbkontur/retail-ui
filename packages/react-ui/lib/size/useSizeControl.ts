import { useContext } from 'react';

import type { SizeProp } from '../types/props';

import { SizeControlContext } from './SizeControlContext';

export const useSizeControl = (propValueSize?: SizeProp): SizeProp => {
  const { size } = useContext(SizeControlContext);
  return propValueSize ?? size;
};
