
import * as React from 'react';

export interface PreventProps {
  children?: React.ReactNode;
};

class Prevent extends React.Component<PreventProps> {
  public render() {
    return <span onClick={this._prevent}>{this.props.children}</span>;
  }

  private _prevent = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };
}

export default Prevent;
