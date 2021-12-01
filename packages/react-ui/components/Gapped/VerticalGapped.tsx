import React from 'react';

import { forwardRefAndName } from '../../lib/forwardRefAndName';

import { GappedProps } from './Gapped';
import { useGapValue } from './useGapValue';

type VerticalGappedProps = Pick<GappedProps, 'children' | 'gap'>;

export const VerticalGapped = forwardRefAndName<HTMLDivElement, VerticalGappedProps>('VerticalGapped', (props, ref) => {
  const gap = useGapValue(props.gap);

  const children = React.Children.map(props.children, (child, index) => {
    if (!child) {
      return child;
    }

    return <div style={{ paddingTop: index === 0 ? 0 : gap }}>{child}</div>;
  });

  return <div ref={ref}>{children}</div>;
});
