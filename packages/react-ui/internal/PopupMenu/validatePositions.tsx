import { isProductionEnv } from '../../lib/currentEnvironment';
import { PopupPosition, PopupPositions } from '../Popup';

const isValidPosition = (position: PopupPosition): boolean => {
  return PopupPositions.includes(position);
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
