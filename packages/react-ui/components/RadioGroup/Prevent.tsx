import React from 'react';
import { HTMLSpanElement } from '@skbkontur/global-object/lib';

export interface PreventProps {
  children?: React.ReactNode;
}

export class Prevent extends React.Component<PreventProps> {
  public render() {
    return <span onClick={this._prevent}>{this.props.children}</span>;
  }

  private _prevent = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };
}
