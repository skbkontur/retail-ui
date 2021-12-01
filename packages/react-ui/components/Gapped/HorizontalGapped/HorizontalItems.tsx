import React from 'react';

import { HorizontalGappedProps } from './HorizontalGapped';

export const HorizontalItems = (props: Required<HorizontalGappedProps>) => {
  const renderItems = () => {
    return React.Children.toArray(props.children).map((child, index) => {
      const isFirst = index === 0;
      const leftIndent = calcItemMarginLeft(props.gap, props.wrap, isFirst);

      return (
        <span
          key={index}
          style={{
            display: 'inline-block',
            verticalAlign: props.verticalAlign,
            marginLeft: leftIndent,
            marginTop: props.wrap ? props.gap : 0,
          }}
        >
          {child}
        </span>
      );
    });
  };

  return <>{renderItems()}</>;
};

const calcItemMarginLeft = (gap: number, isWrapped: boolean, isFirst: boolean) => {
  if (!isFirst || isWrapped) {
    return gap;
  }

  return 0;
};
