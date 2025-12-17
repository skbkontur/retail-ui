import { createContext } from 'react';

import type { SizeProp } from '../../reactUiCompat/useSizeContext.js';

export interface SizeTableContextValue {
  size: SizeProp;
}

export const SizeTableContext = createContext<SizeTableContextValue>({ size: 'small' });
