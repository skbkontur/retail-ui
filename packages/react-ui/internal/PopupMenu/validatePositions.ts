import { isProductionEnv } from '../../lib/currentEnvironment';
import { PopupPositionsType, PopupPositions } from '../Popup';

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

    throw new Error(`Unxpected position "${item}"`);
  });
};
