import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { GappedProps } from './Gapped';
import { useGapValue } from './useGapValue';

export type VerticalGappedProps = GappedProps;

export const VerticalGapped = forwardRefAndName<HTMLDivElement, VerticalGappedProps>('VerticalGapped', (props, ref) => {
  const gap = useGapValue(props.gap);

  const children = React.Children.map(props.children, (child, index) => {
    if (!child) {
      return child;
    }

    const isFirst = index === 0;

    return <div style={{ paddingTop: isFirst ? 0 : gap }}>{child}</div>;
  });

  return <div ref={ref}>{children}</div>;
});
