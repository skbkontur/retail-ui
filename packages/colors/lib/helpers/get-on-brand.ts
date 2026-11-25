import * as DefaultSwatch from '../../lib/consts/default-swatch.js';
import type { TokensBase } from '../types/tokens-base.js';
import { calcContrast } from '../utils/contrast.js';

export function getOnBrand(hex: string, blackAlpha = DefaultSwatch.onBrandBlackAlpha) {
  const whiteContrast = Math.abs(Number(calcContrast('#fff', hex)));
  const blackContrast = Math.abs(Number(calcContrast('#000', hex)));

  if (whiteContrast + 10 >= blackContrast) {
    return DefaultSwatch.onBrandWhiteAlpha;
  }
  return blackAlpha;
}

export function getOnBrandText(base: TokensBase, palette: TokensBase['onBrand']) {
  if (palette[100] === base.neutralSolid[0]) {
    return {
      ...palette,
      75: base.neutralBlackAlpha[44],
      55: base.neutralShade[60],
      40: base.neutralBlackAlpha[72],
    };
  }

  return palette;
}
