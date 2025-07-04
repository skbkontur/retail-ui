import type { PopupPositionsType } from '../internal/Popup';

const MENU_POSITIONS = {
  TOP: 'top',
  MIDDLE: 'middle',
  BOTTOM: 'bottom',
} as const;

const MENU_ALIGNMENTS = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

const POPUP_POSITIONS = {
  TOP_LEFT: 'top left',
  TOP_RIGHT: 'top right',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_RIGHT: 'bottom right',
  MIDDLE_LEFT: 'middle left',
  MIDDLE_RIGHT: 'middle right',
} as const;

type MenuPosition = (typeof MENU_POSITIONS)[keyof typeof MENU_POSITIONS];
type MenuAlignment = (typeof MENU_ALIGNMENTS)[keyof typeof MENU_ALIGNMENTS];

/**
 * Генерирует массив позиций попапа на основе позиции и выравнивания меню
 *
 * @param menuPos - Позиция меню ('top', 'middle', 'bottom')
 * @param menuAlign - Выравнивание меню ('left', 'right')
 * @returns Массив позиций попапа в порядке приоритета
 *
 */
export function getMenuPositions(menuPos?: MenuPosition, menuAlign?: MenuAlignment): PopupPositionsType[] {
  if (menuPos === undefined && menuAlign === undefined) {
    return [
      POPUP_POSITIONS.BOTTOM_LEFT,
      POPUP_POSITIONS.TOP_LEFT,
      POPUP_POSITIONS.BOTTOM_RIGHT,
      POPUP_POSITIONS.TOP_RIGHT,
    ];
  }

  if (menuPos !== undefined && menuAlign === undefined) {
    return [`${menuPos} ${MENU_ALIGNMENTS.LEFT}`, `${menuPos} ${MENU_ALIGNMENTS.RIGHT}`];
  }

  if (menuPos === undefined && menuAlign !== undefined) {
    return [`${MENU_POSITIONS.BOTTOM} ${menuAlign}`, `${MENU_POSITIONS.TOP} ${menuAlign}`];
  }

  return [`${menuPos} ${menuAlign}`];
}
