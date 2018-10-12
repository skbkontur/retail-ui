import * as React from 'react';
import Link from '../Link';
import { getAddressText, isEmptyAddress } from './utils';
import { Address, ErrorMessages } from './types';
import { IconName } from '../Icon';
import FiasModal from './FiasModal';
import FiasForm from './Form/FiasForm';
import { FiasAPI } from './FiasAPI';

interface Props {
  value?: { address: Address };
  error?: boolean;
  warning?: boolean;
  feedback?: string;
  showAddressText?: boolean;
  label?: string;
  icon?: IconName;
  readonly?: boolean;
  title?: string;
  baseUrl?: string;
  validFn?: (address: Address) => ErrorMessages;
  onChange?: (value: { address: Address }) => void;
  onClose?: () => void;
  search?: boolean;
}

interface State {
  opened: boolean;
  error: boolean;
}

export class Fias extends React.Component<Props> {
  public static defaultProps = {
    title: 'Адрес',
    feedback: 'Заполнено не по справочнику адресов',
    showAddressText: true
  };
  public state: State;

  private _api: FiasAPI;
  private _form: React.RefObject<FiasForm> = React.createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      opened: false,
      error: props.error || false
    };

    this._api = new FiasAPI(props.baseUrl);
  }

  public render() {
    const { value, showAddressText, label, icon, feedback } = this.props;
    const { error, opened } = this.state;

    const empty = !value || isEmptyAddress(value.address);
    const linkText = label || (empty ? 'Заполнить адрес' : 'Изменить адрес');
    const linkIcon = icon || 'Edit';

    const validation = error ? (
      <span style={{ color: '#ce0014' }}>{feedback}</span>
    ) : null;

    return (
      <div>
        {!empty &&
          showAddressText && <span>{getAddressText(value!.address)}</span>}
        {!this.props.readonly && (
          <div>
            <Link icon={linkIcon} onClick={this._handleOpen}>
              {linkText}
            </Link>
          </div>
        )}
        {validation}
        {opened && this._renderModal()}
      </div>
    );
  }

  private _renderModal() {
    const { validFn, value, title, search } = this.props;
    return (
      <FiasModal
        title={title}
        onClose={this._handleClose}
        onSave={this._handleSave}
      >
        <FiasForm
          ref={this._form}
          address={value && value.address}
          validFn={validFn}
          api={this._api}
          search={search}
        />
      </FiasModal>
    );
  }

  private _handleOpen = () => {
    this.setState({ opened: true });
  };

  private _handleClose = () => {
    this.setState({ opened: false });
    const onClose = this.props.onClose;
    if (onClose) {
      onClose();
    }
  };

  private _handleSave = async () => {
    const form = this._form && this._form.current;
    if (form) {
      this.setState({ error: false });
      const { address, errorMessages } = await form.submit();
      if (errorMessages && Object.keys(errorMessages).length) {
        this.setState({ error: true });
      }
      this._handleChange({ address });
    }
    this._handleClose();
  };

  private _handleChange = (value: { address: Address }) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  };
}

export default Fias;
