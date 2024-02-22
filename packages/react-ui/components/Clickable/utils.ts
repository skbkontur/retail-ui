import { ElementType, HTMLAttributes } from 'react';

import { isExternalLink } from '../../lib/utils';

import { CLICKABLE_DEFAULT_ELEMENT, ClickableProps } from './Clickable';

export const getTabIndex = (isInteractive: boolean, tabIndex: number, disabled?: boolean) => {
  if (disabled) {
    return -1;
  }

  if (!isInteractive) {
    return tabIndex ?? 0;
  }

  return tabIndex;
};

export const getRole = (isInteractive: boolean, role: HTMLAttributes<unknown>['role']) => {
  if (!isInteractive) {
    return role ?? 'button';
  }

  return role;
};

export const getCurrentView = (view: ClickableProps['view'], as: ElementType = CLICKABLE_DEFAULT_ELEMENT) => {
  if (view) {
    return view;
  }

  if (as === 'button') {
    return 'button';
  }

  if (as === 'a') {
    return 'link';
  }
};

export const getRel = (rel: ClickableProps['rel'], href: string | undefined) => {
  if (!rel && href) {
    return `noopener${isExternalLink(href) ? ' noreferrer' : ''}`;
  }

  return rel;
};
