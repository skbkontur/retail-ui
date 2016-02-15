/* @flow */

import React, {PropTypes} from 'react';

import AddressModal from './AddressModal';
import Link from '../Link';

type State = {
  opened: bool,
};

class Kladr extends React.Component {
  static propTypes = {
    value: PropTypes.any,
  };

  state: State;

  constructor(props: any) {
    super(props);

    this.state = {
      opened: false,
    };
  }

  render() {
    return (
      <span>
        hi
        <Link onClick={this._handleOpen}>Edit</Link>
        {this.state.opened && this._renderModal()}
      </span>
    );
  }

  _renderModal() {
    return <AddressModal address={null} onClose={this._handleClose}/>;
  }


  // $FlowIssue 850
  _handleOpen = () => {
    this.setState({opened: true});
  };

  // $FlowIssue 850
  _handleClose = () => {
    this.setState({opened: false});
  };

}

export default Kladr;
