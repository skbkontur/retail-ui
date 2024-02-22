import React from 'react';

interface ClickableButtonProps {
  children: React.ReactNode;
}

export const ClickableButton = ({ children }: ClickableButtonProps) => {
  return <>{children}</>;
};
