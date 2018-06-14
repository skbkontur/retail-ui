import * as React from 'react';

export interface SwitcherItem {
  label: string;
  value: string;
}

export interface SwitcherProps {
  items: Array<string | SwitcherItem>;
  value?: string;
  onChange?: (event: { target: { value: string } }, value: string) => void;
  label?: string;
  error?: boolean;
}

export interface SwitcherState {
  focusedIndex: number | null;
}

export default class Switcher extends React.Component<
  SwitcherProps,
  SwitcherState
> {}
