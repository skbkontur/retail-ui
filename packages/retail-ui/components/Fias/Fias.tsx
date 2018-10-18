import * as React from 'react';
import cn from 'classnames';
import Link from '../Link';
import { FiasValue, ErrorMessages, VerifyResponse } from './types';
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
  validFn?: (address: Address) => ErrorMessages;
  onChange?: (value: FiasValue) => void;
  onClose?: () => void;
  search?: boolean;
}

interface FiasState {
  opened: boolean;
  error: boolean;
  warning: boolean;
  address: Address;
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
    warning: Boolean(this.props.warning),
    address: new Address()
  };

  private api: FiasAPI = new FiasAPI(this.props.baseUrl);
  private form: Nullable<FiasForm> = null;

  public componentDidMount() {
    this.verifyAddress();
  }

  public componentDidUpdate(prevProps: FiasProps, prevState: FiasState) {
    this.verifyAddress();
  }

  public verifyAddress = (): void => {
    const address = Address.createFromValue(this.props.value);
    if (!address.isEqualTo(this.state.address)) {
      this.api.verify(address.toValue()).then((response: VerifyResponse) => {
        this.setState({
          address: Address.verify(address, response)
        });
      });
    }
  };

  public render() {
    const { showAddressText, label, icon, feedback } = this.props;
    const { error, warning, opened, address } = this.state;
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
    const { validFn, title, search } = this.props;
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
      this.handleChange(address, errorMessages);
    }
    this.handleClose();
  };

  private handleChange = (address: Address, errorMessages: ErrorMessages) => {
    // this.setState({ address });
    const onChange = this.props.onChange;
    if (onChange) {
      onChange({
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
