import { useContext } from 'react';

import type { SizeProp } from '../types/props.js';
import { SizeControlContext } from './SizeControlContext.js';

export const useSizeControl = (propValueSize?: SizeProp): SizeProp => {
  const { size } = useContext(SizeControlContext);
  return propValueSize ?? size;
};
