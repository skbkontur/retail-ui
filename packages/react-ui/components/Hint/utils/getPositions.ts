import { DEFAULT_POSITION, HintProps } from '../Hint';
import { PopupPosition } from '../../../internal/Popup';

export const getPositions = (positions: PopupPosition[], pos: HintProps['pos'] = DEFAULT_POSITION) => {
  return positions.filter((x) => x.startsWith(pos));
};
