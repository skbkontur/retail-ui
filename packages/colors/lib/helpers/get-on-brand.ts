import * as DefaultSwatch from '../../lib/consts/default-swatch.js';
import { calcContrast } from '../utils/contrast.js';

export function getOnBrand(hex: string): typeof DefaultSwatch.whiteAlpha | typeof DefaultSwatch.blackAlpha {
  const whiteContrast = Math.abs(Number(calcContrast('#fff', hex)));
  const blackContrast = Math.abs(Number(calcContrast('#000', hex)));

  if (whiteContrast + 10 >= blackContrast) {
    return DefaultSwatch.whiteAlpha;
  }
  return DefaultSwatch.blackAlpha;
}
