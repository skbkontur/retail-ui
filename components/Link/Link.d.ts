import * as React from 'react';
import { IconName } from '../Icon';

export type LinkUse = 'default' | 'success' | 'danger' | 'grayed';

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  icon?: IconName;
  use?: LinkUse;
  children?: React.ReactNode;
}

export interface LinkState {
  focusedByTab: boolean;
}

export default class Link extends React.Component<LinkProps, LinkState> {}
