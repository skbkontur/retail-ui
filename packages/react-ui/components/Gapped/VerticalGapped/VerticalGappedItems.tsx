import React from 'react';

import { VerticalGappedProps } from './VerticalGapped';

export type VerticalGappedItemsProps = VerticalGappedProps;

export const VerticalGappedItems = ({ children, gap }: VerticalGappedItemsProps) => {
  return React.Children.map(children, (child, index) => {
    if (!child) {
      return child;
    }

    const isFirst = index === 0;

    return <div style={{ paddingTop: isFirst ? 0 : gap }}>{child}</div>;
  }) as unknown as JSX.Element;
};
