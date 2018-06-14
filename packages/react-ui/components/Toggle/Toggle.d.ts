import * as React from 'react';

export interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

export interface ToggleState {}

export default class Toggle extends React.Component<ToggleProps, ToggleState> {}
