import React from 'react';

import { forwardRefAndName } from '../../../lib/forwardRefAndName';
import { GappedProps } from '../Gapped';
import { useGapValue } from '../useGapValue';

import { HorizontalItems } from './HorizontalItems';

export type HorizontalGappedProps = GappedProps;

export const HorizontalGapped = forwardRefAndName<HTMLDivElement, HorizontalGappedProps>(
  'HorizontalGapped',
  ({ gap, wrap, children, verticalAlign }, ref) => {
    const gapValue = useGapValue(gap);

    return (
      <div ref={ref} style={{ paddingTop: wrap ? 1 : 0 }}>
        <div
          style={{
            marginTop: wrap ? -gapValue - 1 : 0,
            marginLeft: wrap ? -gapValue : 0,
            whiteSpace: wrap ? 'normal' : 'nowrap',
          }}
        >
          <HorizontalItems wrap={wrap} verticalAlign={verticalAlign} gap={gap}>
            {children}
          </HorizontalItems>
        </div>
      </div>
    );
  },
);
