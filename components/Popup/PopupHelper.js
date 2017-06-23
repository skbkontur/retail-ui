// @flow

function getPositionObject(position: string) {
  let x = position.split(' ');

  return {
    direction: x[0],
    align: x[1]
  };
}

function getElementRect(element: HTMLElement) {
  let box = element.getBoundingClientRect();
  let { width, height } = box;

  let view = document.documentElement || document.body;

  let scrollTop = window.pageYOffset || (view && view.scrollTop) || 0;
  let scrollLeft = window.pageXOffset || (view && view.scrollLeft) || 0;

  let clientTop = (view && view.clientTop) || 0;
  let clientLeft = (view && view.clientLeft) || 0;

  let top = box.top + scrollTop - clientTop;
  let left = box.left + scrollLeft - clientLeft;

  return {
    top,
    left,
    width,
    height
  };
}

export default { getPositionObject, getElementRect };
