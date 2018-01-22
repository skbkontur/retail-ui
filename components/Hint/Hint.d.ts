import * as React from 'react';

export interface HintProps {
  children?: React.ReactNode;
  manual?: boolean;
  maxWidth?: string | number;
  onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
  opened?: boolean;
  pos?: 'top' | 'right' | 'bottom' | 'left';
  text: React.ReactNode;
}

export interface HintState {}

export default class Hint extends React.Component<HintProps, HintState> {}
