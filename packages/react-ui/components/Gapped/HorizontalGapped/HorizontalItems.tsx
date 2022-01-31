import React from 'react';

import { GappedProps } from '../Gapped';
import { GapValue } from '../useGapValue';

import { HorizontalItem } from './HorizontalItem';

export type HorizontalItemsProps = Pick<GappedProps, 'children' | 'wrap' | 'verticalAlign'> & GapValue;

export const HorizontalItems = ({ gap, children, wrap, verticalAlign }: HorizontalItemsProps) => {
  return React.Children.toArray(children).map((child, index) => {
    return (
      <HorizontalItem key={index} verticalAlign={verticalAlign} gap={gap} wrap={wrap} isFirst={index === 0}>
        {child}
      </HorizontalItem>
    );
  }) as unknown as JSX.Element;
};
