import React from 'react';
import type { FC, PropsWithChildren } from 'react';

export const InlineDiv: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ children, ...rest }) => (
  <div
    style={{
      display: 'inline-block',
      inlineSize: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      /*inlineSize: '-webkit-fill-available',*/
    }}
    {...rest}
  >
    {children}
  </div>
);
