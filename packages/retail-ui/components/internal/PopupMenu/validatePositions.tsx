import PopupMenuPositions from './PopupMenuPositions';
import { isProductionEnv } from '../currentEnvironment';
import { PopupPosition } from '../../Popup';

const isValidPosition = (position: PopupPosition): boolean => {
  return PopupMenuPositions.includes(position);
};

export default (positions: PopupPosition[]): boolean => {
  return positions.every(item => {
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
