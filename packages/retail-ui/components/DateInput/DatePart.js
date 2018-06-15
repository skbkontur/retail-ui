

import * as React from 'react';
import { selectNodeContents } from './SelectionHelpers';

type Props = {
  selected?: boolean,
  children?: React.Node,
  onDoubleClick?: (event: SyntheticMouseEvent<HTMLSpanElement>) => void,
  onMouseDown?: (event: SyntheticMouseEvent<HTMLSpanElement>) => void
};

export class DatePart extends React.Component<Props> {
  _node: HTMLSpanElement | null = null;

  componentDidMount() {
    this._ensureSelection();
  }

  componentDidUpdate() {
    this._ensureSelection();
  }

  _ensureSelection() {
    if (this.props.selected) {
      this._node && selectNodeContents(this._node);
    }
  }

  render() {
    return (
      <span
        ref={el => (this._node = el)}
        onMouseDown={this.props.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      >
        {this.props.children}
      </span>
    );
  }
}
