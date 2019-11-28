import { PopupPosition } from '../../Popup';

const PopupMenuPositions: PopupPosition[] = [
  'top left',
  'top center',
  'top right',
  'right top',
  'right middle',
  'right bottom',
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left middle',
  'left bottom',
];

export const positionsByAlign: { [key in 'left' | 'right']: PopupPosition[] } = {
  left: ['bottom left', 'top left'],
  right: ['bottom right', 'top right'],
};

export default PopupMenuPositions;
