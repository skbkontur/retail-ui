// @flow

import invariant from 'invariant';

const SPACE = 9;

export type Result = {
  boxStyle: Object,
  pinStyle: Object,
  pinDirection: 'top' | 'right' | 'bottom' | 'left';
};

export default function(
  box: HTMLElement,
  target: HTMLElement,
  posStr: string,
  fixed: bool,
): Result {
  const pos = extractPos(posStr);

  const width = box.offsetWidth;
  const height = box.offsetHeight;

  const docElem = document.documentElement;

  const pageXOffset = window.pageXOffset !== undefined ? window.pageXOffset
      : docElem.scrollLeft;
  const pageYOffset = window.pageYOffset !== undefined ? window.pageYOffset
      : docElem.scrollTop;

  const tRect = target.getBoundingClientRect();
  const tWidth = tRect.right - tRect.left;
  const tHeight = tRect.bottom - tRect.top;

  let targetTop = tRect.top;
  let targetLeft = tRect.left;
  if (!fixed) {
    targetTop += pageYOffset - docElem.clientTop;
    targetLeft += pageXOffset - docElem.clientLeft;
  }

  const wndWidth = docElem.clientWidth;
  const wndHeight = docElem.clientHeight;

  if (pos.aside) {
    switch (pos.ver) {
      case 'top':
        if (tRect.top + height > wndHeight
            && tRect.top > wndHeight - tRect.bottom) {
          pos.ver = 'bottom';
        }
        break;
      case 'bottom':
        if (tRect.top - height < 0 && wndHeight - tRect.bottom > tRect.top) {
          pos.ver = 'top';
        }
        break;
    }
    switch (pos.hor) {
      case 'left':
        if (tRect.left - width - SPACE < 0
            && wndWidth - tRect.right >= width + SPACE) {
          pos.hor = 'right';
        }
        break;
      case 'right':
        if (tRect.right + width + SPACE > wndWidth) {
          pos.hor = 'left';
        }
        break;
    }
  } else {
    switch (pos.ver) {
      case 'top':
        if (tRect.top < height + SPACE
            && tRect.top < wndHeight - tRect.bottom) {
          pos.ver = 'bottom';
        }
        break;
      case 'bottom':
        if (wndHeight - tRect.bottom < height + SPACE
            && wndHeight - tRect.bottom < tRect.top) {
          pos.ver = 'top';
        }
        break;
    }
    switch (pos.hor) {
      case 'left':
        if (tRect.left + width > wndWidth) {
          pos.hor = 'right';
        }
        break;
      case 'right':
        if (tRect.right - width < 0 && tRect.left + width <= wndWidth) {
          pos.hor = 'left';
        }
        break;
    }
  }

  let pinDirection;
  switch (true) {
    case pos.aside && pos.hor === 'left': pinDirection = 'right'; break;
    case pos.aside && pos.hor === 'right': pinDirection = 'left'; break;
    case !pos.aside && pos.ver === 'top': pinDirection = 'bottom'; break;
    case !pos.aside && pos.ver === 'bottom': pinDirection = 'top'; break;
    default: invariant(false, '');
  }

  const pinStyle = {};
  let pinOffset = 15;
  if (pos.aside) {
    if (pinOffset > height / 2) {
      pinOffset = height / 2;
    }
    switch (pos.ver) {
      case 'top': pinStyle.top = pinOffset; break;
      case 'middle': pinStyle.top = height / 2; break;
      case 'bottom': pinStyle.top = height - pinOffset; break;
    }
  } else {
    if (pinOffset > width / 2) {
      pinOffset = width / 2;
    }
    switch (pos.hor) {
      case 'left': pinStyle.left = pinOffset; break;
      case 'center': pinStyle.left = width / 2; break;
      case 'right': pinStyle.left = width - pinOffset; break;
    }
  }

  let top = targetTop;
  let left = targetLeft;
  if (pos.aside) {
    switch (pos.ver) {
      case 'top':
        if (tHeight / 2 < pinOffset) {
          top += tHeight / 2 - pinOffset;
        }
        break;
      case 'middle': top += tHeight / 2 - height / 2; break;
      case 'bottom':
        top += tHeight - height;
        if (tHeight / 2 < pinOffset) {
          top -= tHeight / 2 - pinOffset;
        }
        break;
    }
    switch (pos.hor) {
      case 'left': left -= width + SPACE; break;
      case 'right': left += tWidth + SPACE; break;
    }
  } else {
    switch (pos.ver) {
      case 'top': top -= height + SPACE; break;
      case 'bottom': top += tHeight + SPACE; break;
    }
    switch (pos.hor) {
      case 'left':
        if (tWidth / 2 < pinOffset) {
          left += tWidth / 2 - pinOffset;
        }
        break;
      case 'center': left += tWidth / 2 - width / 2; break;
      case 'right':
        left += tWidth - width;
        if (tWidth / 2 < pinOffset) {
          left -= tWidth / 2 - pinOffset;
        }
        break;
    }
  }

  let tmpWidth = getComputedWidth(box);

  return {
    boxStyle: {
      position: fixed ? 'fixed' : 'absolute',
      width: isNaN(tmpWidth) ? 'auto' : tmpWidth,
      top,
      left,
    },
    pinStyle,
    pinDirection,
  };
}

function extractPos(pos) {
  const [first, second] = pos.split(' ', 2);
  let aside = false;
  switch (first) {
    case 'left':
    case 'right':
      aside = true;
      break;
  }

  return {
    aside,
    ver: aside ? second : first,
    hor: aside ? first : second,
  };
}

function getComputedWidth(element): number {
  if ((element: any).currentStyle) {
    return (element: any).currentStyle.width;
  }
  return Math.ceil(getComputedStyle(element).width);
}
