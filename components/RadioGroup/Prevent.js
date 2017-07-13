// @flow
import React from 'react';

class Prevent extends React.Component {
  render() {
    return <span onClick={this._prevent}>{this.props.children}</span>;
  }

  _prevent = event => {
    event.stopPropagation();
  };
}

export default Prevent;
