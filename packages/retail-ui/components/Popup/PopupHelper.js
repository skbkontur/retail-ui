

type Rect = {
  top: number,
  left: number,
  width: number,
  height: number
};

type Offset = {
  top: number,
  left: number
};

function getPositionObject(position: string) {
  const x = position.split(' ');

  return {
    direction: x[0],
    align: x[1]
  };
}

function getElementAbsoluteRect(element: HTMLElement): Rect {
  const rect = _getElementRelativeRect(element);
  return convertRectToAbsolute(rect);
}

function isAbsoluteRectFullyVisible(absoluteRect: Rect): boolean {
  const windowRelativeRect = _getWindowRelativeRect();
  const windowAbsoluteRect = convertRectToAbsolute(windowRelativeRect);
  return _rectContainsRect(windowAbsoluteRect, absoluteRect);
}

function _getElementRelativeRect(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
}

function _getWindowRelativeRect(): Rect {
  return {
    top: 0,
    left: 0,
    width: _getViewProperty(x => x.clientWidth) || window.innerWidth,
    height: _getViewProperty(x => x.clientHeight) || window.innerHeight
  };
}

function convertRectToAbsolute(rect: Rect): Rect {
  const offset = _getAbsoluteOffset();

  return {
    top: rect.top + offset.top,
    left: rect.left + offset.left,
    width: rect.width,
    height: rect.height
  };
}

function _getAbsoluteOffset(): Offset {
  const scrollTop = window.pageYOffset || _getViewProperty(x => x.scrollTop);
  const scrollLeft = window.pageXOffset || _getViewProperty(x => x.scrollLeft);

  const clientTop = _getViewProperty(x => x.clientTop);
  const clientLeft = _getViewProperty(x => x.clientLeft);

  const top = scrollTop - clientTop;
  const left = scrollLeft - clientLeft;

  return {
    top,
    left
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

function _getViewProperty(getProperty: (e: HTMLElement) => number): number {
  const views = [document.documentElement, document.body];
  return views.map(x => x && getProperty(x)).find(x => x) || 0;
}

export default {
  getPositionObject,
  getElementAbsoluteRect,
  isAbsoluteRectFullyVisible
};
