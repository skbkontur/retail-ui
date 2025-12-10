import warning from 'warning';

import { isProductionEnv } from '../../lib/currentEnvironment.js';
import type { PopupPositionsType } from '../Popup/index.js';
import { PopupPositions } from '../Popup/index.js';

const isValidPosition = (position: PopupPositionsType): boolean => {
  return PopupPositions.includes(position);
};

export const isValidPositions = (positions: PopupPositionsType[]): boolean => {
  return positions.every((item) => {
    if (isProductionEnv) {
      return isValidPosition(item);
    }

    if (isValidPosition(item)) {
      return true;
    }

    warning(false, `Unexpected position "${item}"`);
    return false;
  });
};
