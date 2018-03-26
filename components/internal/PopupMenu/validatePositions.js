// @flow
import availablePositions from './availablePositions';
import { isProductionEnv } from '../currentEnvironment';

export default (positions: Array<string>): boolean => {
  const isValidPosition = (position: string): boolean => {
    return availablePositions.includes(position);
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
