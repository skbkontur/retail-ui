import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { getOwnerGlobalObject } from '../../lib/globalObject.js';
import type { PopupPositionsType } from './Popup.js';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Offset {
  top: number;
  left: number;
}

export interface PositionObject {
  direction: string;
  align: string;
}

function getPositionObject(position: string): PositionObject {
  const x = position.split(' ');

  return {
    direction: x[0],
    align: x[1],
  };
}

function getElementAbsoluteRect(element: Element): Rect {
  const globalObject = getOwnerGlobalObject(element);
  const rect = _getElementRelativeRect(element);
  return convertRectToAbsolute(rect, globalObject);
}

function isAbsoluteRectFullyVisible(coordinates: Offset, popupRect: Rect, globalObject: GlobalObject): boolean {
  const windowRelativeRect = _getWindowRelativeRect(globalObject);
  const windowAbsoluteRect = convertRectToAbsolute(windowRelativeRect, globalObject);
  const absoluteRect = {
    top: coordinates.top,
    left: coordinates.left,
    height: popupRect.height,
    width: popupRect.width,
  };

  return _rectContainsRect(windowAbsoluteRect, absoluteRect);
}

/** Может стать полностью видимым после прокрутки в область видимости */
function canBecomeFullyVisible(positionName: PopupPositionsType, coordinates: Offset, globalObject: GlobalObject) {
  const position = getPositionObject(positionName);

  if (position.direction === 'top') {
    const availableScrollDistances = convertRectToAbsolute(_getWindowRelativeRect(globalObject), globalObject);
    return coordinates.top + availableScrollDistances.top >= 0;
  }

  if (position.direction === 'left') {
    const availableScrollDistances = convertRectToAbsolute(_getWindowRelativeRect(globalObject), globalObject);
    return coordinates.left + availableScrollDistances.left >= 0;
  }

  // NOTE: в случаях bottom/right браузер всегда расширяет размер документа
  return true;
}

function _getElementRelativeRect(element: Element) {
  const rect = getDOMRect(element);

  return {
    top: rect.top,
    left: rect.left,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top,
  };
}

function _getWindowRelativeRect(globalObject: GlobalObject): Rect {
  return {
    top: 0,
    left: 0,
    width: _getViewProperty((x) => x.clientWidth, globalObject) || globalObject.innerWidth || 0,
    height: _getViewProperty((x) => x.clientHeight, globalObject) || globalObject.innerHeight || 0,
  };
}

function convertRectToAbsolute(rect: Rect, globalObject: GlobalObject): Rect {
  const offset = _getAbsoluteOffset(globalObject);

  return {
    top: rect.top + offset.top,
    left: rect.left + offset.left,
    width: rect.width,
    height: rect.height,
  };
}

function _getAbsoluteOffset(globalObject: GlobalObject): Offset {
  const scrollTop = globalObject.pageYOffset || _getViewProperty((x) => x.scrollTop, globalObject);
  const scrollLeft = globalObject.pageXOffset || _getViewProperty((x) => x.scrollLeft, globalObject);

  const clientTop = _getViewProperty((x) => x.clientTop, globalObject);
  const clientLeft = _getViewProperty((x) => x.clientLeft, globalObject);

  const top = scrollTop - clientTop;
  const left = scrollLeft - clientLeft;

  return {
    top,
    left,
  };
}

function _rectContainsRect(outerRect: Rect, innerRect: Rect): boolean {
  return (
    innerRect.top > outerRect.top &&
    innerRect.top + innerRect.height < outerRect.top + outerRect.height &&
    innerRect.left > outerRect.left &&
    innerRect.left + innerRect.width < outerRect.left + outerRect.width
  );
}

/** Прямоугольник вьюпорта в координатах документа (абсолютных) */
function getViewportAbsoluteRect(globalObject: GlobalObject): Rect {
  return convertRectToAbsolute(_getWindowRelativeRect(globalObject), globalObject);
}

export interface OverflowEdges {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

/** Какие стороны попапа (с заданными координатами) выходят за пределы вьюпорта */
function getOverflowEdges(coordinates: Offset, popupRect: Rect, globalObject: GlobalObject): OverflowEdges {
  const viewport = getViewportAbsoluteRect(globalObject);
  const popup = {
    top: coordinates.top,
    left: coordinates.left,
    width: popupRect.width,
    height: popupRect.height,
  };
  return {
    top: popup.top < viewport.top,
    bottom: popup.top + popup.height > viewport.top + viewport.height,
    left: popup.left < viewport.left,
    right: popup.left + popup.width > viewport.left + viewport.width,
  };
}

/** Количество сторон, по которым попап выходит за вьюпорт (0–4) */
function getOverflowCount(overflow: OverflowEdges): number {
  return [overflow.top, overflow.bottom, overflow.left, overflow.right].filter(Boolean).length;
}

/** Предпочтительное направление по вертикали при переполнении */
function getPreferredDirection(overflow: OverflowEdges, defaultPosition: PopupPositionsType): string {
  if (overflow.bottom) {
    return 'top';
  }
  if (overflow.top) {
    return 'bottom';
  }
  return getPositionObject(defaultPosition).direction;
}

/**
 * Упорядоченный список кандидатов для fallback-позиции: при горизонтальном переполнении
 * сначала позиции с нужным align (в т.ч. из pinnablePositions), затем по direction и positions.
 */
function getOrderedFallbackCandidates(
  positions: Readonly<PopupPositionsType[]>,
  overflow: OverflowEdges,
  preferredDirection: string,
  preferredAlignOrder: string[],
  pinnablePositions: Readonly<PopupPositionsType[]>,
): PopupPositionsType[] {
  const seen = new Set<PopupPositionsType>();
  const add = (p: PopupPositionsType) => {
    if (!seen.has(p)) {
      seen.add(p);
      return true;
    }
    return false;
  };

  const candidates: PopupPositionsType[] = [];
  const hasHorizontalOverflow = overflow.left || overflow.right;

  if (hasHorizontalOverflow) {
    const preferredAlign = preferredAlignOrder[0];
    for (const dir of ['bottom', 'top']) {
      const p = `${dir} ${preferredAlign}` as PopupPositionsType;
      if (pinnablePositions.includes(p) && add(p)) {
        candidates.push(p);
      }
    }
    for (const align of preferredAlignOrder) {
      for (const p of positions) {
        if (getPositionObject(p).align === align && add(p)) {
          candidates.push(p);
        }
      }
    }
  }

  for (const align of preferredAlignOrder) {
    for (const p of positions) {
      const pos = getPositionObject(p);
      if (pos.direction === preferredDirection && pos.align === align && add(p)) {
        candidates.push(p);
      }
    }
  }
  for (const p of positions) {
    if (getPositionObject(p).direction === preferredDirection && add(p)) {
      candidates.push(p);
    }
  }
  for (const p of positions) {
    if (add(p)) {
      candidates.push(p);
    }
  }

  return candidates;
}

function _getViewProperty(getProperty: (e: Element) => number, globalObject: GlobalObject): number {
  const views = [globalObject.document?.documentElement, globalObject.document?.body];
  return views.map((x) => x && getProperty(x)).find(Boolean) || 0;
}

export const PopupHelper = {
  getPositionObject,
  getElementAbsoluteRect,
  isFullyVisible: isAbsoluteRectFullyVisible,
  canBecomeFullyVisible,
  getViewportAbsoluteRect,
  getOverflowEdges,
  getOverflowCount,
  getPreferredDirection,
  getOrderedFallbackCandidates,
};
