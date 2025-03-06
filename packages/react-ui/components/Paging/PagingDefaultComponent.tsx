import React from 'react';

import { extractDataProps } from '../../lib/utils';
import { CommonProps } from '../../internal/CommonWrapper';

interface PagingDefaultComponentInterface {
  /** Задает функцию, которая вызывается при клике на пейджинг. */
  onClick: () => void;

  /** @ignore */
  children?: React.ReactNode;
}

export type PagingDefaultComponentProps = PagingDefaultComponentInterface & Pick<CommonProps, 'className'>;

export const PagingDefaultComponent = ({ onClick, className, children, ...rest }: PagingDefaultComponentProps) => {
  const { dataProps } = extractDataProps(rest);

  return (
    <span onClick={onClick} className={className} {...dataProps}>
      {children}
    </span>
  );
};
