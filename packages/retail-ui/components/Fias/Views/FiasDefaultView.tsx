import * as React from 'react';
import cn from 'classnames';
import Link from '../../Link';
import { ExtraFields, Fields, FormValidation } from '../types';
import EditIcon from '@skbkontur/react-icons/Edit';
import FiasModal from '../FiasModal';
import FiasForm from '../Form/FiasForm';
import styles from './FiasDefaultView.less';
import { FiasViewBaseProps } from '../Fias';

export interface FiasDefaultViewProps {
  error?: boolean;
  warning?: boolean;
  /**
   * Сообщение пользователю в режиме `error` или `warning`
   */
  feedback?: string;
  /**
   * Выводить ли текстовую интерпретацию адреса над ссылкой
   */
  showAddressText?: boolean;
  /**
   * Текст ссылки
   */
  label?: string;
  /**
   * Иконка рядом со ссылкой
   */
  icon?: React.ReactElement<any>;
  readonly?: boolean;
  onClose?: () => void;
  /**
   * Добавляет поле поиска адреса в произвольной форме
   */
  search?: boolean;
  /**
   * Уровень критичности ошибок валидации полей адреса
   */
  formValidation?: FormValidation;
  /**
   * Разрешать ли сохранять неверифицированный (произвольный, не из базы) адрес
   */
  allowNotVerified?: boolean;
  /* Выбор страны */
  countrySelector: boolean;
  /**
   * Количество отображаемых элементов в выпадающих списках
   */
  limit?: number;
}

interface State {
  opened: boolean;
}

export class FiasDefaultView extends React.Component<FiasDefaultViewProps & FiasViewBaseProps, State> {
  public static defaultProps: Partial<FiasDefaultViewProps & FiasViewBaseProps> = {
    showAddressText: true,
    error: false,
    warning: false,
    readonly: false,
    search: false,
    icon: <EditIcon />,
    allowNotVerified: true,
    fieldsSettings: {},
    countrySelector: false,
  };

  public state: State = {
    opened: false,
  };

  private form: FiasForm | null = null;

  public render() {
    const { showAddressText, label, icon, error, warning, feedback, address } = this.props;
    const { opened } = this.state;

    const linkText = label || (address.isEmpty ? this.props.locale.addressFill : this.props.locale.addressEdit);

    const validation =
      (error || warning) && feedback ? (
        <span className={cn({ [styles.error]: error, [styles.warning]: warning })}>{feedback}</span>
      ) : null;

    return (
      <div>
        {showAddressText && <span>{address.getFullText(this.isFieldVisible(ExtraFields.postalcode))}</span>}
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

  public isFieldVisible(field: Fields | ExtraFields): boolean {
    const settings = this.props.fieldsSettings[field];
    return Boolean(settings && settings.visible);
  }

  private renderModal() {
    const { search, limit, formValidation, countrySelector, address, fieldsSettings } = this.props;
    return (
      <FiasModal locale={this.props.locale} onClose={this.handleClose} onSave={this.handleSave}>
        <FiasForm
          ref={this.refForm}
          address={address}
          api={this.props.api}
          search={search}
          limit={limit}
          locale={this.props.locale}
          validationLevel={formValidation}
          fieldsSettings={fieldsSettings}
          countrySelector={countrySelector}
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
      const address = await this.form.submit();
      if (address.hasErrors && this.props.allowNotVerified === false) {
        return;
      }
      this.props.onChange(address);
    }
    this.handleClose();
  };

  private refForm = (element: FiasForm | null) => {
    this.form = element;
  };
}
