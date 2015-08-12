const SPACE = 8;

export default function(box, target, pos) {
  pos = extractPos(pos);

  let width = box.offsetWidth;
  let height = box.offsetHeight;

  let docElem = document.documentElement;

  let pageXOffset = window.pageXOffset !== undefined ? window.pageXOffset
      : docElem.scrollLeft;
  let pageYOffset = window.pageYOffset !== undefined ? window.pageYOffset
      : docElem.scrollTop;

  let tRect = target.getBoundingClientRect();
  let tWidth = tRect.right - tRect.left;
  let tHeight = tRect.bottom - tRect.top;
  let targetTop = tRect.top + pageYOffset - docElem.clientTop;
  let targetLeft = tRect.left + pageXOffset - docElem.clientLeft;

  let wndWidth = docElem.clientWidth;
  let wndHeight = docElem.clientHeight;

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
  }

  let pinStyle = {};
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
        if (tHeight / 2 < pinOffset) top += tHeight / 2 - pinOffset;
        break;
      case 'middle': top += tHeight / 2 - height / 2; break;
      case 'bottom':
        top += tHeight - height;
        if (tHeight / 2 < pinOffset) top -= tHeight / 2 - pinOffset;
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
        if (tWidth / 2 < pinOffset) left += tWidth / 2 - pinOffset;
        break;
      case 'center': left += tWidth / 2 - width / 2; break;
      case 'right':
        left += tWidth - width;
        if (tWidth / 2 < pinOffset) left -= tWidth / 2 - pinOffset;
        break;
    }
  }

  return {
    boxStyle: {width, top, left},
    pinStyle,
    pinDirection,
  };
}

function extractPos(pos) {
  let [ first, second ] = pos.split(' ', 2);
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
