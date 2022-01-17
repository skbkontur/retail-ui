import React from 'react';

import { HorizontalGappedProps } from './HorizontalGapped';

export type HorizontalItemProps = {
  isFirst: boolean;
} & HorizontalGappedProps;

const calcItemMarginLeft = (
  gap: HorizontalGappedProps['gap'],
  wrap: HorizontalGappedProps['wrap'],
  isFirst: boolean,
) => {
  if (!isFirst || wrap) {
    return gap;
  }

  return 0;
};

export const HorizontalItem = ({ verticalAlign, gap, wrap, children, isFirst }: HorizontalItemProps) => {
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
