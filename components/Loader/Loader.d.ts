import * as React from 'react';

export interface LoaderProps {
  active: boolean;
  caption?: string;
  className?: string;
  type?: 'mini' | 'normal' | 'big';
}

export interface LoaderState {}

export default class Loader extends React.Component<LoaderProps, LoaderState> {}
