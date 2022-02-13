import React from 'react';

import { CommonProps } from '../../internal/CommonWrapper';

type PagingDefaultComponentInterface = {
  onClick: () => void;
  children: React.ReactNode;
};

export type PagingDefaultComponentProps = PagingDefaultComponentInterface & Pick<CommonProps, 'className'>;

export const PagingDefaultComponent = ({ className, onClick, children }: PagingDefaultComponentProps) => (
  <span className={className} onClick={onClick}>
    {children}
  </span>
);
