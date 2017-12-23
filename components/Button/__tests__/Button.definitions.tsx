import * as React from 'react';
import Button from '../Button';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const PayButton = ({ children, onClick }: Props) => (
  <Button use="pay" size="medium" icon="Coins" onClick={onClick}>
    {children}
  </Button>
);
