import * as React from 'react';
import Link from '../Link';
import { getAddressText } from './utils';
import { Address, ErrorMessages } from './types';
import { IconName } from '../Icon';
import FiasModal from './FiasModal';
import FiasForm from './FiasForm';

interface Props {
  value?: { address: Address };
  error?: boolean;
  warning?: boolean;
  feedback?: string;
  isShowAddressText?: boolean;
  btnTitle?: string;
  iconTitle?: IconName;
  readOnly?: boolean;
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
    feedback: 'Заполнено не по справочнику адресов'
  };
  public state: State;

  private _form: React.RefObject<FiasForm> = React.createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      opened: false,
      error: props.error || false
    };
  }

  public render() {
    const {
      value,
      isShowAddressText,
      btnTitle,
      iconTitle,
      feedback
    } = this.props;
    const { error, opened } = this.state;

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
      validation = <span style={{ color: '#ce0014' }}>{feedback}</span>;
    }

    return (
      <div>
        {!empty &&
          isShowAddressText && <span>{getAddressText(value!.address)}</span>}
        {!this.props.readOnly && (
          <div>
            <Link icon={iconTitleTemplate} onClick={this._handleOpen}>
              {btnTitleTemplate}
            </Link>
          </div>
        )}
        {validation}
        {opened && this._renderModal()}
      </div>
    );
  }

  private _renderModal() {
    const { validFn, value, title, baseUrl, search } = this.props;
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
          baseUrl={baseUrl}
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
