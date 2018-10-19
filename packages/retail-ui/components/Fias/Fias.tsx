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
import styles from './Fias.less';

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
  onChange?: (value: FiasValue) => void;
  onClose?: () => void;
  search?: boolean;
  limit?: number;
}

interface FiasState {
  opened: boolean;
  address: Address;
}

export class Fias extends React.Component<FiasProps, FiasState> {
  public static defaultTexts = {
    modal_title: 'Адрес',
    fill_address: 'Заполнить адрес',
    edit_address: 'Изменить адрес',
    feedback: 'Заполнено не по справочнику адресов',
    not_valid_message: 'Адрес не найден в справочнике'
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
    address: Address.createFromValue(this.props.value)
  };

  private api: FiasAPI = new FiasAPI(this.props.baseUrl);
  private form: Nullable<FiasForm> = null;

  public componentDidUpdate(prevProps: FiasProps, prevState: FiasState) {
    if (prevProps.value !== this.props.value) {
      const address = Address.createFromValue(this.props.value);
      if (!address.isEqualTo(this.state.address)) {
        this.setState({
          address
        });
      }
    }
  }

  public render() {
    const {
      showAddressText,
      label,
      icon,
      feedback,
      error,
      warning
    } = this.props;
    const { opened, address } = this.state;
    const linkText =
      label ||
      (address.isEmpty
        ? Fias.defaultTexts.fill_address
        : Fias.defaultTexts.edit_address);

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
        {opened && this.renderModal()}
      </div>
    );
  }

  private renderModal() {
    const { title, search, limit } = this.props;
    const { address } = this.state;
    return (
      <FiasModal
        title={title}
        onClose={this.handleClose}
        onSave={this.handleSave}
      >
        <FiasForm
          ref={this.refForm}
          address={address}
          api={this.api}
          search={search}
          limit={limit}
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
    this.setState({ address });
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
