import * as React from 'react';
import cn from 'classnames';
import Link from '../Link';
import {
  Fields,
  ExtraFields,
  FiasValue,
  FormValidation,
  FiasLocale,
  APIProvider,
  AdditionalFields,
  FieldsSettings
} from './types';
import EditIcon from '@skbkontur/react-icons/Edit';
import FiasModal from './FiasModal';
import FiasForm from './Form/FiasForm';
import { FiasAPI } from './api/FiasAPI';
import { Address } from './models/Address';
import { defaultLocale } from './constants/locale';
import styles from './Fias.less';
import isEqual from 'lodash.isequal';
import { Logger } from './logger/Logger';

export interface FiasProps {
  /**
   * Значение адреса. См. формат в примерах
   */
  value?: Partial<FiasValue>;
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
  /**
   * API URL. Существует тестовый
   * `https://api.testkontur.ru/fias/v1/` и боевой `https://api.kontur.ru/fias/v1/`
   */
  baseUrl?: string;
  /**
   * API instance. Если нет возможности использовать стандартный API.
   */
  api?: APIProvider;
  /**
   * Позволяет получить полный FiasValue после обработки входного `value`
   */
  onInit?: (value: FiasValue) => void;
  onChange?: (value: FiasValue) => void;
  onClose?: () => void;
  /**
   * Добавляет поле поиска адреса в произвольной форме
   */
  search?: boolean;
  /**
   * Количество отображаемых элементов в выпадающих списках
   */
  limit?: number;
  /**
   * Словарь текстовых констант. См. полный список ниже
   */
  locale?: FiasLocale;
  /**
   * Уровень критичности ошибок валидации полей адреса
   */
  formValidation?: FormValidation;
  /**
   * Разрешать ли сохранять неверефицированный (произвольный, не из базы) адрес
   */
  allowNotVerified?: boolean;
  /**
   * Версия базы данных ФИАС. Формат: "2018-10-22"
   */
  version?: string;
  /**
   * Настройка полей. Достаточно переопределить только нужные.
   * Внимание, не рекомендуется скрывать поля в произвольном порядке. Это может привести
   * к невозможности заполнения некоторых адресов.
   * Значение по умолчанию:
   *
   * ```ts
   *  {
   *     region:
   *     ...
   *     room: {
   *       visible: true
   *     },
   *     postalcode: {
   *       visible: false
   *     }
   *  }```
   *
   */
  fieldsSettings: FieldsSettings;
}

export interface FiasState {
  opened: boolean;
  address: Address;
  locale: FiasLocale;
  fieldsSettings: FieldsSettings;
}

function deepMerge<T>(dst: T, ...src: T[]): T {
  src.forEach(obj => {
    for (const k in obj) {
      if (dst[k] != null && typeof obj[k] === 'object') {
        dst[k] = deepMerge(dst[k], obj[k]);
      } else {
        dst[k] = obj[k];
      }
    }
  });
  return dst;
}

export class Fias extends React.Component<FiasProps, FiasState> {
  public static defaultProps = {
    showAddressText: true,
    error: false,
    warning: false,
    readonly: false,
    search: false,
    icon: <EditIcon />,
    allowNotVerified: true,
    fieldsSettings: {}
  };

  public state: FiasState = {
    opened: false,
    address: new Address(),
    locale: this.locale,
    fieldsSettings: this.fieldsSettings
  };

  private api: APIProvider =
    this.props.api || new FiasAPI(this.props.baseUrl, this.props.version);
  private form: FiasForm | null = null;

  public get locale(): FiasLocale {
    return {
      ...defaultLocale,
      ...this.props.locale
    };
  }

  public get fieldsSettings(): FieldsSettings {
    const { fieldsSettings: userSettings } = this.props;
    // TODO: implement deepMerge with clone
    const defaultSettings = Address.ALL_FIELDS.reduce<FieldsSettings>(
      (settings: FieldsSettings, field: Fields | ExtraFields) => ({
        ...settings,
        [field]: {
          visible: true
        }
      }),
      {}
    );
    return deepMerge<FieldsSettings>(
      defaultSettings,
      {
        [ExtraFields.postalcode]: {
          visible: false
        }
      },
      userSettings
    );
  }

  constructor(props: FiasProps) {
    super(props);
    if (!props.baseUrl && !props.api) {
      Logger.log(Logger.warnings.baseUrlOrApiIsRequired);
    }
  }

  public componentDidMount = () => {
    this.init();
  };

  public componentDidUpdate = (prevProps: FiasProps) => {
    if (!isEqual(prevProps.value, this.props.value)) {
      this.updateAddress();
    }
    if (!isEqual(prevProps.locale, this.props.locale)) {
      this.updateLocale();
    }
    if (!isEqual(prevProps.fieldsSettings, this.props.fieldsSettings)) {
      this.updateFieldsSettings();
    }
  };

  public isFieldVisible(field: Fields | ExtraFields): boolean {
    const settings = this.state.fieldsSettings[field];
    return Boolean(settings && settings.visible);
  }

  public render() {
    const {
      showAddressText,
      label,
      icon,
      error,
      warning,
      feedback
    } = this.props;
    const { opened, address, locale } = this.state;

    const linkText =
      label || (address.isEmpty ? locale.addressFill : locale.addressEdit);

    const validation =
      (error || warning) && feedback ? (
        <span
          className={cn({ [styles.error]: error, [styles.warning]: warning })}
        >
          {feedback}
        </span>
      ) : null;

    return (
      <div>
        {!address.isEmpty &&
          showAddressText && (
            <span>
              {address.getFullText(this.isFieldVisible(ExtraFields.postalcode))}
            </span>
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
    const { address, locale, fieldsSettings } = this.state;
    const { search, limit, formValidation } = this.props;
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
          validationLevel={formValidation}
          fieldsSettings={fieldsSettings}
        />
      </FiasModal>
    );
  }

  private init = async () => {
    const address = await this.updateAddress();
    if (this.props.onInit) {
      this.props.onInit(
        address.getValue(this.isFieldVisible(ExtraFields.postalcode))
      );
    }
  };

  private updateAddress = async (): Promise<Address> => {
    const address = await this.getAddress(this.props.value);
    this.setState({
      address
    });
    return address;
  };

  private updateLocale = (): void => {
    this.setState({
      locale: this.locale
    });
  };

  private updateFieldsSettings = (): void => {
    this.setState({
      fieldsSettings: this.fieldsSettings
    });
  };

  private getAddress = async (value: Partial<FiasValue> | undefined) => {
    if (value) {
      const { address, addressString, fiasId, postalCode } = value;
      const additionalFields: AdditionalFields = {};
      const { fieldsSettings } = this.state;
      if (postalCode) {
        additionalFields[ExtraFields.postalcode] = postalCode;
      }
      if (address) {
        const addressValue = Address.filterVisibleFields(
          address,
          fieldsSettings
        );
        return Address.createFromAddressValue(addressValue, additionalFields);
      } else {
        let options = {};
        if (fiasId) {
          options = {
            fiasId
          };
        }
        if (addressString) {
          options = {
            searchText: addressString,
            limit: 1
          };
        }
        const { success, data } = await this.api.search(options);
        if (success && data && data.length) {
          const addressResponse = Address.filterVisibleFields(
            data[0],
            fieldsSettings
          );
          return Address.createFromResponse(addressResponse, additionalFields);
        }
      }
    }
    return new Address();
  };

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
      this.handleChange(address);
    }
    this.handleClose();
  };

  private handleChange = (address: Address) => {
    if (this.props.onChange) {
      this.props.onChange(
        address.getValue(this.isFieldVisible(ExtraFields.postalcode))
      );
    }
  };

  private refForm = (element: FiasForm | null) => {
    this.form = element;
  };
}

export default Fias;
