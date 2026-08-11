import { calcAPCA } from 'apca-w3';

import * as DefaultSwatch from '../../lib/consts/default-swatch.js';

export function getOnBrand(hex: string): typeof DefaultSwatch.whiteAlpha | typeof DefaultSwatch.blackAlpha {
  const whiteContrast = Math.abs(Number(calcAPCA('#fff', hex)));
  const blackContrast = Math.abs(Number(calcAPCA('#000', hex)));

  if (whiteContrast + 10 >= blackContrast) {
    return DefaultSwatch.whiteAlpha;
  }
  return DefaultSwatch.blackAlpha;
}
