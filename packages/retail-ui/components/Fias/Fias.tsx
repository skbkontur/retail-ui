import * as React from 'react';
import { AddressModal } from './AddressModal';
import Link from '../Link';
import { getAddressText } from './utils';
import { Address } from './types';
import { IconName } from '../Icon';

interface Props {
  value?: { address: Address };
  error?: boolean;
  isShowAddressText?: boolean;
  btnTitle?: string;
  iconTitle?: IconName;
  readOnly?: boolean;
  title?: string;
  baseUrl?: string;
  validFn?: (address: Address) => any; // errors
  onChange?: (event: any, value: { address: Address }) => any;
}

interface State {
  opened: boolean;
}

export class Fias extends React.Component<Props> {
  public state: State = {
    opened: false
  };

  public render() {
    const { value, error, isShowAddressText, btnTitle, iconTitle } = this.props;

    const empty = !(
      value &&
      value.address &&
      Object.keys(value.address).length
    );

    let btnTitleTemplate;
    if (btnTitle) {
      btnTitleTemplate = btnTitle;
    } else {
      btnTitleTemplate = empty ? 'Заполнить адрес' : 'Изменить адрес';
    }

    let iconTitleTemplate: IconName = 'Edit';
    if (iconTitle) {
      iconTitleTemplate = iconTitle;
    }

    let validation;
    if (error) {
      validation = <span style={{ color: '#ce0014' }}>{error}</span>;
    }

    return (
      <span>
        {!empty &&
          isShowAddressText && <span>{getAddressText(value!.address)}</span>}
        {validation}
        {!this.props.readOnly && (
          <Link icon={iconTitleTemplate} onClick={this._handleOpen}>
            {btnTitleTemplate}
          </Link>
        )}
        {this.state.opened && this._renderModal()}
      </span>
    );
  }

  private _renderModal() {
    const { validFn, value, title, baseUrl } = this.props;
    return (
      <AddressModal
        address={value && value.address}
        title={title}
        validFn={validFn}
        onChange={this._handleChange}
        onClose={this._handleClose}
        baseUrl={baseUrl}
      />
    );
  }

  private _handleOpen = () => {
    this.setState({ opened: true });
  };

  private _handleChange = (value: { address: Address }) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(null, value);
    }
  };

  private _handleClose = () => {
    this.setState({ opened: false });
  };
}

export default Fias;
