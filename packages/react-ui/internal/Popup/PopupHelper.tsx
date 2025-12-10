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

// Can become fully visible by scrolling into viewport
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

  // NOTE: for bottom/right cases browser will always expand document size
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

function _getViewProperty(getProperty: (e: Element) => number, globalObject: GlobalObject): number {
  const views = [globalObject.document?.documentElement, globalObject.document?.body];
  return views.map((x) => x && getProperty(x)).find(Boolean) || 0;
}

export const PopupHelper = {
  getPositionObject,
  getElementAbsoluteRect,
  isFullyVisible: isAbsoluteRectFullyVisible,
  canBecomeFullyVisible,
};
