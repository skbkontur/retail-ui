import { PopupPosition } from '../../internal/Popup';

import { DEFAULT_POSITION, HintProps } from './Hint';

export const getPositions = (positions: PopupPosition[], pos: HintProps['pos'] = DEFAULT_POSITION) => {
  return positions.filter((x) => x.startsWith(pos));
};
