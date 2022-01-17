import React from 'react';

import { HorizontalItem } from './HorizontalItem';
import { HorizontalGappedProps } from './HorizontalGapped';

export const HorizontalItems = ({ gap, children, wrap, verticalAlign }: HorizontalGappedProps) => {
  return (
    <>
      {React.Children.toArray(children).map((child, index) => {
        return (
          <HorizontalItem key={index} verticalAlign={verticalAlign} gap={gap} wrap={wrap} isFirst={index === 0}>
            {child}
          </HorizontalItem>
        );
      })}
    </>
  );
};
