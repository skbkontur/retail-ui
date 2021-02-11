import { jsStyles } from './ReadFileItem.styles';
import React from 'react';

export const ReadFileItem = (props: React.PropsWithChildren<object>) => {
  const {children} = props;
  return (
    <div className={jsStyles.root()}>
      {children}
    </div>
  );
};

ReadFileItem.displayName = "ReadFileItem";
