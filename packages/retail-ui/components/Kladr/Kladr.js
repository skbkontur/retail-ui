
/* eslint-disable flowtype/no-weak-types */

import * as React from 'react';

import PropTypes from 'prop-types';

import AddressModal from './AddressModal';
import Colors from '../../lib/Colors';
import Link from '../Link';
import type { Address } from './Types';
import * as util from './util';

type Props = {
  error?: ?string,
  title: string,
  value: any,
  warning?: ?string,
  onChange: any
};

type State = {
  opened: boolean
};

/**
 * DRAFT
 */
export default class Kladr extends React.Component<Props, State> {
  static propTypes = {
    error: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.any,
    warning: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props: any) {
    super(props);

    this.state = {
      opened: false
    };
  }

  render() {
    const value = this.props.value || {};
    const empty = isEmpty(value);
    const change = empty ? 'Заполнить адрес' : 'Изменить адрес';

    let validation = null;
    if (this.props.error) {
      validation = (
        <div style={{ color: Colors.ERROR, marginBottom: 5 }}>
          {this.props.error}
        </div>
      );
    } else if (this.props.warning) {
      validation = (
        <div style={{ color: Colors.WARNING, marginBottom: 5 }}>
          {this.props.warning}
        </div>
      );
    }

    return (
      <span>
        {!empty && (
          <div style={{ marginBottom: 5 }}>
            {this._renderAddress(value.address)}
          </div>
        )}
        {validation}
        <Link icon="Edit" onClick={this._handleOpen}>
          {change}
        </Link>
        {this.state.opened && this._renderModal()}
      </span>
    );
  }

  _renderAddress(address: ?Address) {
    if (!address) {
      return null;
    }

    const place = place => place && util.placeName(place);
    return [
      address.index,
      place(address.region),
      place(address.district),
      place(address.city),
      place(address.settlement),
      place(address.street),
      address.house && `дом ${address.house}`,
      address.building && `корпус ${address.building}`,
      address.room && `квартира ${address.room}`
    ]
      .filter(x => !!x)
      .join(', ');
  }

  _renderModal() {
    return (
      <AddressModal
        address={this.props.value && this.props.value.address}
        title={this.props.title}
        onChange={this._handleChange}
        onClose={this._handleClose}
      />
    );
  }

  _handleOpen = () => {
    this.setState({ opened: true });
  };

  _handleChange = (value: { address: Address }) => {
    const onChange = this.props.onChange;
    onChange && onChange(null, value);
  };

  _handleClose = () => {
    this.setState({ opened: false });
  };
}

function isEmpty(value) {
  const address = value.address;
  if (address) {
    for (const key of Object.keys(address)) {
      if (address[key]) {
        return false;
      }
    }
  }

  return true;
}
