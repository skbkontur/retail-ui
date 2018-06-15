import * as React from 'react';

export interface ToastAction {
  label: string;
  handler: () => void;
}

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
  public static push(notification: string, action?: ToastAction): void;
  public static close(): void;
  public push(notification: string, action?: ToastAction): void;
  public close(): void;
}
