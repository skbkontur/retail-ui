import React, { forwardRef } from 'react';

import { GappedProps, GappedRef } from '../Gapped';
import { GapValue } from '../useGapValue';

export type HorizontalWrapperProps = Omit<GappedProps, 'vertical' | 'verticalAlign' | 'gap'> & GapValue;

export const HorizontalGappedWrapper = forwardRef<GappedRef['element'], HorizontalWrapperProps>(
  ({ wrap, style, gap, children, ...rest }, ref) => {
    return (
      <div ref={ref} style={{ paddingTop: wrap ? 1 : 0, ...style }} {...rest}>
        <div
          style={{
            marginTop: wrap ? -gap - 1 : 0,
            marginLeft: wrap ? -gap : 0,
            whiteSpace: wrap ? 'normal' : 'nowrap',
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);
