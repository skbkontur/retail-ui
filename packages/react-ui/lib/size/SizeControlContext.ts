import React from 'react';

import type { SizeProp } from '../types/props.js';

import { defaultSizeValue } from './constants.js';

export interface SizeControlContextProps {
  size: SizeProp;
}

export const SizeControlContext = React.createContext<SizeControlContextProps>({
  size: defaultSizeValue,
});

SizeControlContext.displayName = 'SizeContext';
SizeControlContext.__KONTUR_REACT_UI__ = 'SizeContext';
