import React from 'react';

import { filterChildren } from '../filterChildren';

import { VerticalGappedProps } from './VerticalGapped';

export type VerticalGappedItemsProps = VerticalGappedProps;

export const VerticalGappedItems = ({ children, gap }: VerticalGappedItemsProps) => {
  return React.Children.toArray(children)
    .filter(filterChildren)
    .map((child, index) => {
      const isFirst = index === 0;

      return (
        <div key={index} style={{ paddingTop: isFirst ? 0 : gap }}>
          {child}
        </div>
      );
    }) as unknown as JSX.Element;
};
