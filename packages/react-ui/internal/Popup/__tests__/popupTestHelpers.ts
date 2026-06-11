export const createPopupElement = (width: number, height: number, rectWidth = width, rectHeight = height) => {
  const element = document.createElement('div');
  Object.defineProperty(element, 'offsetWidth', { configurable: true, value: width });
  Object.defineProperty(element, 'offsetHeight', { configurable: true, value: height });
  element.getBoundingClientRect = () =>
    ({
      width: rectWidth,
      height: rectHeight,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: rectWidth,
      bottom: rectHeight,
    }) as DOMRect;
  return element;
};
