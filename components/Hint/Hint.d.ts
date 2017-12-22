import * as React from 'react';

export interface HintProps {
  children?: React.ReactNode;
  manual?: boolean;
  maxWidth?: string | number;
  onMouseEnter?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  opened?: boolean;
  pos?: 'top' | 'right' | 'bottom' | 'left';
  text: string;
}

export interface HintState {}

export default class Hint extends React.Component<HintProps, HintState> {}
