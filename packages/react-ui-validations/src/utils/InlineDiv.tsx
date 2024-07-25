import React from 'react';
import type { FC, PropsWithChildren } from 'react';

export const InlineDiv: FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = ({ children, ...rest }) => (
  <div style={{ display: 'inline' }} {...rest}>
    {children}
  </div>
);
