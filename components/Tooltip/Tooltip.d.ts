import * as React from 'react';

export type TooltipPos =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom'
  | 'right top'
  | 'right middle'
  | 'right bottom';

export interface TooltipProps {
  children?: React.ReactNode;
  className?: string;
  closeButton?: boolean;
  render: () => React.ReactNode | null;
  pos?: TooltipPos;
  trigger?: 'hover' | 'click' | 'focus' | 'opened' | 'closed';
  onCloseClick?: () => void;
}

export interface TooltipState {}

export default class Tooltip extends React.Component<
  TooltipProps,
  TooltipState
> {}
