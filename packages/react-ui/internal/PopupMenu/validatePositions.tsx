import { isProductionEnv } from '../../lib/currentEnvironment';
import { PopupPosition } from '../Popup';

import { PopupMenuPositions } from './PopupMenuPositions';

const isValidPosition = (position: PopupPosition): boolean => {
  return PopupMenuPositions.includes(position);
};

export const isValidPositions = (positions: PopupPosition[]): boolean => {
  return positions.every((item) => {
    if (isProductionEnv) {
      return isValidPosition(item);
    } else {
      if (isValidPosition(item)) {
        return true;
      } else {
        throw new Error(`Unxpected position "${item}"`);
      }
    }
  });
};
