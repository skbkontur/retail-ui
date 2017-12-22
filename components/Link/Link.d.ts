import * as React from 'react';

export type LinkUse = 'default' | 'success' | 'danger' | 'grayed';

export interface LinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
  disabled?: boolean;
  href?: string;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLLinkElement>;
  use?: LinkUse;
  children?: React.ReactNode;
}

export interface LinkState {
  focusedByTab: boolean;
}

export default class Link extends React.Component<LinkProps, LinkState> {}
