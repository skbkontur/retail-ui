import { isProductionEnv } from '../../lib/currentEnvironment';
import { PopupPositionsType, PopupPositions } from '../Popup';

const isValidPosition = (position: PopupPositionsType): boolean => {
  return PopupPositions.includes(position);
};

export const isValidPositions = (positions: PopupPositionsType[]): boolean => {
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
