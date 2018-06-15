
import * as React from 'react';

type Props = {
  children?: React.Node
};

class Prevent extends React.Component<Props> {
  render() {
    return <span onClick={this._prevent}>{this.props.children}</span>;
  }

  _prevent = event => {
    event.stopPropagation();
    event.preventDefault();
  };
}

export default Prevent;
