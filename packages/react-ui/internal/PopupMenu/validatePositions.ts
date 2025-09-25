import warning from 'warning';

import { isProductionEnv } from '../../lib/currentEnvironment';
import type { PopupPositionsType } from '../Popup';
import { PopupPositions } from '../Popup';

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
