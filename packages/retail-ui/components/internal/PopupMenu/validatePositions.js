
import PopupMenuPositions from './PopupMenuPositions';
import { isProductionEnv } from '../currentEnvironment';

export default (positions: Array<string>): boolean => {
  const isValidPosition = (position: string): boolean => {
    return PopupMenuPositions.includes(position);
  };

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
