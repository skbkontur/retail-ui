import React, { forwardRef } from 'react';

import { GappedProps, GappedRef } from '../Gapped';
import { GapValue } from '../useGapValue';

import { VerticalGappedItems } from './VerticalGappedItems';

export type VerticalGappedProps = Pick<GappedProps, 'children'> & GapValue;

export const VerticalGapped = forwardRef<GappedRef['element'], VerticalGappedProps>(({ children, gap }, ref) => {
  return (
    <div ref={ref}>
      <VerticalGappedItems gap={gap}>{children}</VerticalGappedItems>
    </div>
  );
});

VerticalGapped.displayName = 'VerticalGapped';
