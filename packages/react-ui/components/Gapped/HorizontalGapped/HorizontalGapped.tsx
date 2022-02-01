import React, { forwardRef } from 'react';

import { GappedProps, GappedRef } from '../Gapped';
import { GapValue } from '../useGapValue';

import { HorizontalGappedItems } from './HorizontalGappedItems';
import { HorizontalGappedWrapper } from './HorizontalGappedWrapper';

export type HorizontalGappedProps = Omit<GappedProps, 'vertical' | 'gap'> & GapValue;

export const HorizontalGapped = forwardRef<GappedRef['element'], HorizontalGappedProps>(
  ({ gap, wrap, children, verticalAlign, ...rest }, ref) => {
    return (
      <HorizontalGappedWrapper ref={ref} gap={gap} wrap={wrap} {...rest}>
        <HorizontalGappedItems wrap={wrap} verticalAlign={verticalAlign} gap={gap}>
          {children}
        </HorizontalGappedItems>
      </HorizontalGappedWrapper>
    );
  },
);

HorizontalGapped.displayName = 'HorizontalGapped';
