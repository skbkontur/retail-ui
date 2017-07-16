import * as React from 'react';

export interface LinkProps {
  disabled?: boolean;
  href?: string;
  icon?: string;
  onClick?: React.MouseEventHandler<HTMLLinkElement>;
  use?: 'default' | 'success' | 'danger' | 'graye';
}

export interface LinkState {
  focusedByTab: boolean;
}

export default class Link extends React.Component<LinkProps, LinkState> {}
