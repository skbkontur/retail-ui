import * as React from 'react';

export type SpinnerTypes = 'mini' | 'normal' | 'big';

interface ISpinnerTypes {
  mini: 'mini';
  normal: 'normal';
  big: 'big';
}

export interface SpinnerProps {
  caption?: string;
  dimmed?: boolean;
  type?: SpinnerTypes;
}

export interface SpinnerState {}

export default class Spinner extends React.Component<
  SpinnerProps,
  SpinnerState
> {
  public static Types: ISpinnerTypes;
}
