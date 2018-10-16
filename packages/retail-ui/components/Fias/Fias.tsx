import * as React from 'react';
import Link from '../Link';
import { getAddressText, isEmptyAddress } from './utils';
import { Address, ErrorMessages } from './types';
import EditIcon from '@skbkontur/react-icons/Edit';
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
  icon?: React.ReactElement<any>;
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
    showAddressText: true,
    icon: <EditIcon />
  };
  public state: State;

  private api: FiasAPI;
  private form: React.RefObject<FiasForm> = React.createRef();

  constructor(props: Props) {
    super(props);

    this.state = {
      opened: false,
      error: props.error || false
    };

    this.api = new FiasAPI(props.baseUrl);
  }

  public render() {
    const { value, showAddressText, label, icon, feedback } = this.props;
    const { error, opened } = this.state;

    const empty = !value || isEmptyAddress(value.address);
    const linkText = label || (empty ? 'Заполнить адрес' : 'Изменить адрес');

    const validation = error ? (
      <span style={{ color: '#ce0014' }}>{feedback}</span>
    ) : null;

    return (
      <div>
        {!empty &&
          showAddressText && <span>{getAddressText(value!.address)}</span>}
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
          ref={this.form}
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
    const form = this.form && this.form.current;
    if (form) {
      this.setState({ error: false });
      const { address, errorMessages } = await form.submit();
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
}

export default Fias;
