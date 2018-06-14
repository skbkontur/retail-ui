import * as React from 'react';

export interface TabComponentProps extends React.HTMLAttributes<HTMLElement> {}

export interface TabProps {
  disabled?: boolean;
  component?: React.ComponentType<TabComponentProps> | string;
  children?: React.ReactNode;
  id?: string;
  href?: string;
  onClick?: (event: React.SyntheticEvent<HTMLLinkElement>) => void;
}

export interface TabState {
  focusedByKeyboard: boolean;
}

export default class Tab extends React.Component<TabProps, TabState> {}
