import * as React from 'react';

export type PopupPosition =
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

export interface PopupProps {
  anchorElement: HTMLElement;
  backgroundColor: string;
  children: React.ReactNode | (() => React.ReactNode);
  hasPin: boolean;
  hasShadow: boolean;
  hasAnimations?: boolean;
  margin: number;
  opened: boolean;
  pinOffset: number;
  pinSize: number;
  popupOffset: number;
  positions: PopupPosition[];
  onCloseRequest?: () => void;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
}

export default class Popup extends React.Component<PopupProps> {}
