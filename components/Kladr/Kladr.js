/* @flow */

import React, {PropTypes} from 'react';

import AddressModal from './AddressModal';
import Link from '../Link';
import type {Address} from './Types';

type State = {
  opened: bool,
};

/**
 * DRAFT
 */
class Kladr extends React.Component {
  static propTypes = {
    value: PropTypes.any,

    onChange: PropTypes.func,
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
        {this._renderAddress(this.props.value && this.props.value.address)}
        {' '}
        <Link onClick={this._handleOpen}>Изменить</Link>
        {this.state.opened && this._renderModal()}
      </span>
    );
  }

  _renderAddress(address: ?Address) {
    if (!address) {
      return null;
    }

    const place = place => (place && place.name);
    return [
      address.index,
      place(address.region),
      place(address.district),
      place(address.city),
      place(address.settlement),
      place(address.street),
      address.house,
      address.room,
    ].filter(x => !!x).join(', ');
  }

  _renderModal() {
    return (
      <AddressModal
        address={this.props.value && this.props.value.address}
        onChange={this._handleChange}
        onClose={this._handleClose}
      />
    );
  }


  // $FlowIssue 850
  _handleOpen = () => {
    this.setState({opened: true});
  };

  _handleChange: Function = value => {
    const onChange = this.props.onChange;
    onChange && onChange(null, value);
  };

  // $FlowIssue 850
  _handleClose = () => {
    this.setState({opened: false});
  };

}

export default Kladr;
