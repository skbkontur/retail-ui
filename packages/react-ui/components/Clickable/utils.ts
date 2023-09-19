import React from 'react';

export const isTag = (tagName: React.ElementType) => {
  return (children: React.ReactElement): boolean => {
    return children.type === tagName;
  };
};

export const isLinkTag = isTag('a');
export const isButtonTag = isTag('button');

export const getTabIndex = (isInteractive: boolean, tabIndex: number, disabled?: boolean) => {
  if (disabled) {
    return -1;
  }

  if (!isInteractive) {
    return tabIndex ?? 0;
  }

  return tabIndex;
};

export const getRole = (isInteractive: boolean, role: HTMLElement['role']) => {
  if (!isInteractive) {
    return role ?? 'button';
  }

  return role;
};
