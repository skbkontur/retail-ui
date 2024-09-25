import React from 'react';

import { LinkProps } from '../Link';

export const ButtonLink: React.FC<LinkProps<React.ComponentType>> = (props) => {
  const { children, ...rest } = props;
  return <span {...rest}>{children}</span>;
};
