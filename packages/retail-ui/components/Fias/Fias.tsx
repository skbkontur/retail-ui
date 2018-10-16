import * as React from 'react';
import cn from 'classnames';
import Link from '../Link';
import { getAddressText, isEmptyAddress } from './utils';
import { Address, ErrorMessages } from './types';
import EditIcon from '@skbkontur/react-icons/Edit';
import FiasModal from './FiasModal';
import FiasForm from './Form/FiasForm';
import { FiasAPI } from './FiasAPI';
import styles from './Fias.less';
import { Nullable } from '../../typings/utility-types';

interface FiasValue {
  address: Address;
}

interface FiasProps {
  value?: FiasValue;
  error?: boolean;
  warning?: boolean;
  feedback?: string;
  showAddressText?: boolean;
  label?: string;
  icon?: React.ReactElement<any>;
  readonly?: boolean;
  title?: string;
  baseUrl?: string;
  validFn?: (address: Address) => ErrorMessages;
  onChange?: (value: { address: Address }) => void;
  onClose?: () => void;
  search?: boolean;
}

interface FiasState {
  opened: boolean;
  error: boolean;
  warning: boolean;
}

export class Fias extends React.Component<FiasProps, FiasState> {
  public static defaultTexts = {
    modal_title: 'Адрес',
    fill_address: 'Заполнить адрес',
    edit_address: 'Изменить адрес',
    feedback: 'Заполнено не по справочнику адресов',
    not_valid_message: 'Неверный адрес'
  };

  public static defaultProps = {
    title: Fias.defaultTexts.modal_title,
    feedback: Fias.defaultTexts.feedback,
    showAddressText: true,
    error: false,
    warning: false,
    icon: <EditIcon />
  };

  public state: FiasState = {
    opened: false,
    error: Boolean(this.props.error),
    warning: Boolean(this.props.warning)
  };

  private api: FiasAPI = new FiasAPI(this.props.baseUrl);
  private form: Nullable<FiasForm> = null;

  public render() {
    const { value, showAddressText, label, icon, feedback } = this.props;
    const { error, warning, opened } = this.state;

    const empty = isEmptyAddress(value && value.address);
    const linkText =
      label ||
      (empty ? Fias.defaultTexts.fill_address : Fias.defaultTexts.edit_address);

    const validation =
      error || warning ? (
        <span
          className={cn({ [styles.error]: error, [styles.warning]: warning })}
        >
          {feedback}
        </span>
      ) : null;

    return (
      <div>
        {!empty &&
          showAddressText && (
            <span>{getAddressText(value && value.address)}</span>
          )}
        {!this.props.readonly && (
          <div>
            <Link icon={icon} onClick={this.handleOpen}>
              {linkText}
            </Link>
          </div>
        )}
        {validation}
        {opened && this.renderModal()}
      </div>
    );
  }

  private renderModal() {
    const { validFn, value, title, search } = this.props;
    return (
      <FiasModal
        title={title}
        onClose={this.handleClose}
        onSave={this.handleSave}
      >
        <FiasForm
          ref={this.refForm}
          address={value && value.address}
          validFn={validFn}
          api={this.api}
          search={search}
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
      this.setState({ error: false });
      const { address, errorMessages } = await this.form.submit();
      if (errorMessages && Object.keys(errorMessages).length) {
        this.setState({ error: true });
      }
      this.handleChange({ address });
    }
    this.handleClose();
  };

  private handleChange = (value: { address: Address }) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  };

  private refForm = (element: Nullable<FiasForm>) => {
    this.form = element;
  };
}

export default Fias;
