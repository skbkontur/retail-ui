import * as React from 'react';

export interface TabProps {
  disabled: boolean;
  children?: React.ReactNode;
  id?: string;
  href?: string;
  onClick: (event: React.SyntheticEvent<HTMLLinkElement>) => void;
  value: string;
}

export interface TabState {
  focusedByKeyboard: boolean;
}

export default class Tab extends React.Component<TabProps, TabState> {}
