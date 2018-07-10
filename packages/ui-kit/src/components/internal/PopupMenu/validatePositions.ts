import PopupMenuPositions, { PopupMenuPosition } from './PopupMenuPositions';

export default (positions: PopupMenuPosition[]): boolean => {
  const isValidPosition = (position: PopupMenuPosition): boolean => {
    return PopupMenuPositions.indexOf(position) > -1;
  };

  return positions.every(item => {
    if (isValidPosition(item)) {
      return true;
    } else {
      throw new Error(`Unxpected position "${item}"`);
    }
  });
};
