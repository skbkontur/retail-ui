import React, { forwardRef } from 'react';

import { GappedProps, GappedRef } from '../Gapped';
import { GapValue } from '../useGapValue';

import { HorizontalItems } from './HorizontalItems';
import { HorizontalWrapper } from './HorizontalWrapper';

export type HorizontalGappedProps = Omit<GappedProps, 'vertical' | 'gap'> & GapValue;

export const HorizontalGapped = forwardRef<GappedRef['element'], HorizontalGappedProps>(
  ({ gap, wrap, children, verticalAlign, ...rest }, ref) => {
    return (
      <HorizontalWrapper ref={ref} gap={gap} wrap={wrap} {...rest}>
        <HorizontalItems wrap={wrap} verticalAlign={verticalAlign} gap={gap}>
          {children}
        </HorizontalItems>
      </HorizontalWrapper>
    );
  },
);

HorizontalGapped.displayName = 'HorizontalGapped';
