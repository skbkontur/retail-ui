import * as React from 'react';

export interface SpinnerProps {
  caption?: string;
  dimmed?: boolean;
  type?: 'mini' | 'normal' | 'big';
}

export interface SpinnerState {}

export default class Spinner extends React.Component<SpinnerProps, SpinnerState> {}