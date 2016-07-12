// @flow

import React from 'react';

import type {Result} from './position';

export default function renderPin(
  pos: ?Result,
  rootClass: string,
  innerClass: string,
) {
  if (!pos) {
    return null;
  }

  const outer = {...pos.pinStyle};
  const inner = {};
  switch (pos.pinDirection) {
    case 'bottom':
      outer.bottom = -6;
      outer.marginLeft = -7;

      outer.borderBottom = inner.borderBottom = '0';
      outer.borderLeftColor = inner.borderLeftColor = 'transparent';
      outer.borderRightColor = inner.borderRightColor = 'transparent';

      inner.top = -7;
      inner.left = -6;
      break;

    case 'top':
      outer.top = -6;
      outer.marginLeft = -7;

      outer.borderTop = inner.borderTop = '0';
      outer.borderLeftColor = inner.borderLeftColor = 'transparent';
      outer.borderRightColor = inner.borderRightColor = 'transparent';

      inner.top = 1;
      inner.left = -6;
      break;

    case 'left':
      outer.left = -6;
      outer.marginTop = -7;

      outer.borderLeft = inner.borderLeft = '0';
      outer.borderTopColor = inner.borderTopColor = 'transparent';
      outer.borderBottomColor = inner.borderBottomColor = 'transparent';

      inner.top = -6;
      inner.left = 1;
      break;

    case 'right':
      outer.right = -6;
      outer.marginTop = -7;

      outer.borderRight = inner.borderRight = '0';
      outer.borderTopColor = inner.borderTopColor = 'transparent';
      outer.borderBottomColor = inner.borderBottomColor = 'transparent';

      inner.top = -6;
      inner.left = -7;
      break;
  }

  return (
    <div className={rootClass} style={outer}>
      <div className={innerClass} style={inner} />
    </div>
  );
}
