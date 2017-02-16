// @flow

import React from 'react';

import type { Result } from './position';

export default function renderPin(
  pos: ?Result,
  rootClass: string,
  innerClass: string,
) {
  if (!pos) {
    return null;
  }

  const outer = { ...pos.pinStyle };
  const inner = {};
  switch (pos.pinDirection) {
    case 'bottom':
      outer.bottom = -8;
      outer.marginLeft = -9;

      outer.borderBottom = inner.borderBottom = '0';
      outer.borderLeftColor = inner.borderLeftColor = 'transparent';
      outer.borderRightColor = inner.borderRightColor = 'transparent';

      inner.top = -9;
      inner.left = -8;
      break;

    case 'top':
      outer.top = -8;
      outer.marginLeft = -9;

      outer.borderTop = inner.borderTop = '0';
      outer.borderLeftColor = inner.borderLeftColor = 'transparent';
      outer.borderRightColor = inner.borderRightColor = 'transparent';

      inner.top = 1;
      inner.left = -8;
      break;

    case 'left':
      outer.left = -8;
      outer.marginTop = -9;

      outer.borderLeft = inner.borderLeft = '0';
      outer.borderTopColor = inner.borderTopColor = 'transparent';
      outer.borderBottomColor = inner.borderBottomColor = 'transparent';

      inner.top = -8;
      inner.left = 1;
      break;

    case 'right':
      outer.right = -8;
      outer.marginTop = -9;

      outer.borderRight = inner.borderRight = '0';
      outer.borderTopColor = inner.borderTopColor = 'transparent';
      outer.borderBottomColor = inner.borderBottomColor = 'transparent';

      inner.top = -8;
      inner.left = -9;
      break;
  }

  return (
    <div className={rootClass} style={outer}>
      <div className={innerClass} style={inner} />
    </div>
  );
}
