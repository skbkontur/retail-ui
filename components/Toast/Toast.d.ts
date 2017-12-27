import * as React from 'react';

export type ToastAction = {
  label: string;
  handler: () => void;
};

export interface ToastProps {
  onPush?: (notification: string, action?: ToastAction) => void;
  onClose?: (notification: string, action?: ToastAction) => void;
}

export interface ToastState {
  notification: string | null;
  action: ToastAction | null;
  id: number;
}

export default class Toast extends React.Component<ToastProps, ToastState> {
  static push(notification: string, action?: ToastAction): void;
  static close(): void;
  push(notification: string, action?: ToastAction): void;
  close(): void;
}
