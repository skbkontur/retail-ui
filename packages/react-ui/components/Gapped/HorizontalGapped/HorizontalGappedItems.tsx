import React from 'react';

import { filterChildren } from '../filterChildren';
import { GappedProps } from '../Gapped';
import { GapValue } from '../useGapValue';

import { HorizontalGappedItem } from './HorizontalGappedItem';

export type HorizontalItemsProps = Pick<GappedProps, 'children' | 'wrap' | 'verticalAlign'> & GapValue;

export const HorizontalGappedItems = ({ gap, children, wrap, verticalAlign }: HorizontalItemsProps) => {
  return React.Children.toArray(children)
    .filter(filterChildren)
    .map((child, index) => {
      return (
        <HorizontalGappedItem key={index} verticalAlign={verticalAlign} gap={gap} wrap={wrap} isFirst={index === 0}>
          {child}
        </HorizontalGappedItem>
      );
    }) as unknown as JSX.Element;
};
