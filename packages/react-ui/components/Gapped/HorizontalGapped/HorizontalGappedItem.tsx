import React from 'react';

import { calcItemMarginLeft } from './calcItemMarginLeft';
import { HorizontalItemsProps } from './HorizontalGappedItems';

type HorizontalItemInterface = {
  isFirst: boolean;
};

export type HorizontalItemProps = HorizontalItemInterface & HorizontalItemsProps;

export const HorizontalGappedItem = ({ verticalAlign, gap, wrap, children, isFirst }: HorizontalItemProps) => {
  const leftIndent = calcItemMarginLeft(gap, wrap, isFirst);

  return (
    <span
      style={{
        display: 'inline-block',
        verticalAlign: verticalAlign,
        marginLeft: leftIndent,
        marginTop: wrap ? gap : 0,
      }}
    >
      {children}
    </span>
  );
};
