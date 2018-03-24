import * as React from 'react';
import { PopupPosition } from './PopupPosition';

export interface PopupProps {
  anchorElement: HTMLElement;
  backgroundColor: string;
  children: React.ReactNode | (() => React.ReactNode);
  hasPin: boolean;
  hasShadow: boolean;
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
