import * as React from 'react';
import cn from 'classnames';
import Link from '../Link';
import { FiasValue, ErrorMessages } from './types';
import EditIcon from '@skbkontur/react-icons/Edit';
import FiasModal from './FiasModal';
import FiasForm from './Form/FiasForm';
import { FiasAPI } from './FiasAPI';
import { Nullable } from '../../typings/utility-types';
import { Address } from './models/Address';
import { defaultLocale, FiasLocale } from './constants/locale';
import styles from './Fias.less';

interface FiasProps {
  value?: FiasValue;
  error?: boolean;
  warning?: boolean;
  showAddressText?: boolean;
  label?: string;
  icon?: React.ReactElement<any>;
  readonly?: boolean;
  baseUrl?: string;
  onChange?: (value: FiasValue) => void;
  onClose?: () => void;
  search?: boolean;
  limit?: number;
  locale?: FiasLocale;
}

interface FiasState {
  opened: boolean;
}

export class Fias extends React.Component<FiasProps, FiasState> {
  public static defaultProps = {
    limit: 5,
    showAddressText: true,
    error: false,
    warning: false,
    icon: <EditIcon />
  };

  public state: FiasState = {
    opened: false
  };

  private api: FiasAPI = new FiasAPI(this.props.baseUrl);
  private form: Nullable<FiasForm> = null;

  public render() {
    const { showAddressText, label, icon, error, warning } = this.props;
    const { opened } = this.state;
    const address = Address.createFromValue(this.props.value);
    const locale: FiasLocale = {
      ...defaultLocale,
      ...this.props.locale
    };

    const linkText =
      label || (address.isEmpty ? locale.address_fill : locale.address_edit);

    const validation =
      error || warning ? (
        <span
          className={cn({ [styles.error]: error, [styles.warning]: warning })}
        >
          {locale.address_not_verified}
        </span>
      ) : null;

    return (
      <div>
        {!address.isEmpty &&
          showAddressText && <span>{address.getText()}</span>}
        {!this.props.readonly && (
          <div>
            <Link icon={icon} onClick={this.handleOpen}>
              {linkText}
            </Link>
          </div>
        )}
        {validation}
        {opened && this.renderModal(address, locale)}
      </div>
    );
  }

  private renderModal(address: Address, locale: FiasLocale) {
    const { search, limit } = this.props;
    return (
      <FiasModal
        locale={locale}
        onClose={this.handleClose}
        onSave={this.handleSave}
      >
        <FiasForm
          ref={this.refForm}
          address={address}
          api={this.api}
          search={search}
          limit={limit}
          locale={locale}
        />
      </FiasModal>
    );
  }

  private handleOpen = () => {
    this.setState({ opened: true });
  };

  private handleClose = () => {
    this.setState({ opened: false });
    const onClose = this.props.onClose;
    if (onClose) {
      onClose();
    }
  };

  private handleSave = async () => {
    if (this.form) {
      const { address, errorMessages } = await this.form.submit();
      this.handleChange(address, errorMessages);
    }
    this.handleClose();
  };

  private handleChange = (address: Address, errorMessages: ErrorMessages) => {
    if (this.props.onChange) {
      this.props.onChange({
        address: address.toValue(),
        errorMessages
      });
    }
  };

  private refForm = (element: Nullable<FiasForm>) => {
    this.form = element;
  };
}

export default Fias;
