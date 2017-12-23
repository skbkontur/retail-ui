import * as React from 'react';
import IconNames from '../Icon/IconNames';

export type LinkUse = 'default' | 'success' | 'danger' | 'grayed';

export interface LinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
  disabled?: boolean;
  href?: string;
  icon?: keyof IconNames;
  onClick?: React.MouseEventHandler<HTMLLinkElement>;
  use?: LinkUse;
  children?: React.ReactNode;
}

export interface LinkState {
  focusedByTab: boolean;
}

export default class Link extends React.Component<LinkProps, LinkState> {}
