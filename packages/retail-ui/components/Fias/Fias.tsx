import * as React from 'react';
import { locale } from '../LocaleProvider/decorators';
import { FiasLocale, FiasLocaleHelper } from './locale';
import { APIProvider, ExtraFields, FiasValue, Fields, FieldsSettings } from './types';
import { Address } from './models/Address';
import { FiasDefaultView } from './Views/FiasDefaultView';
import { FiasAPI } from './api/FiasAPI';
import { Logger } from './logger/Logger';
import isEqual from 'lodash.isequal';
import warningOutput from 'warning';

export interface FiasViewBaseProps {
  onChange: (address: Address) => void;
  address: Address;
  api: APIProvider;
  locale: FiasLocale;
  fieldsSettings: FieldsSettings;
}

export interface FiasState {
  address: Address;
  locale: FiasLocale;
  fieldsSettings: FieldsSettings;
}

export interface FiasProps<TProps> {
  ViewComponent: React.ComponentClass<TProps & FiasViewBaseProps>;
  /**
   * Значение адреса. См. формат в примерах
   */
  value?: Partial<FiasValue>;
  error?: boolean;
  warning?: boolean;
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
   * Версия базы данных ФИАС. Формат: "2018-10-22"
   */
  version?: string;
  /**
   * Позволяет получить полный FiasValue после обработки входного `value`
   */
  onInit?: (value: FiasValue) => void;
  onChange?: (value: FiasValue) => void;
  /**
   * Словарь текстовых констант. См. полный список ниже
   * @deprecated используйте LocaleProvider
   */
  locale?: FiasLocale;
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
  /* Выбор страны */
  countrySelector: boolean;
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

type Take<T, V> = T & Pick<V, Exclude<keyof V, keyof T>>;

type ResultFiasProps<TProps> = Take<FiasProps<TProps>, TProps>;

@locale('Fias', FiasLocaleHelper)
export class Fias<TProps> extends React.Component<ResultFiasProps<TProps>, FiasState> {

  public get fieldsSettings(): FieldsSettings {
    const { fieldsSettings: userSettings, countrySelector} = this.props;
    // TODO: implement deepMerge with clone
    const defaultSettings = Address.ALL_FIELDS.reduce<FieldsSettings>(
      (settings: FieldsSettings, field: Fields | ExtraFields) => ({
        ...settings,
        [field]: {
          visible: true,
        },
      }),
      {},
    );
    return deepMerge<FieldsSettings>(
      defaultSettings,
      {
        [ExtraFields.postalcode]: {
          visible: Boolean(countrySelector),
        },
      },
      userSettings,
    );
  }
  public static defaultProps = {
    ViewComponent: FiasDefaultView,
    limit: 5,
    fieldsSettings: {},
    countrySelector: false,
  };

  public state: FiasState = {
    address: new Address(),
    fieldsSettings: this.fieldsSettings,
    locale: this.getLocaleMix(),
  };

  private readonly api: APIProvider;
  private readonly locale!: FiasLocale;

  constructor(props: ResultFiasProps<TProps>) {
    super(props);
    if (!props.baseUrl && !props.api) {
      Logger.log(Logger.warnings.baseUrlOrApiIsRequired);
    }
    // @ts-ignore
    this.api = this.props.api || new FiasAPI(this.props.baseUrl, this.props.version)
  }

  public componentDidMount = () => {
    this.updateLocale();
    this.init();

    warningOutput(this.props.locale === undefined, `[Fias]: Prop 'locale' has been deprecated. See 'LocaleProvider'`);
  };

  public componentDidUpdate = (prevProps: ResultFiasProps<TProps>, prevState: FiasState) => {
    if (!isEqual(prevProps.value, this.props.value)) {
      this.updateAddress();
    }
    const nextLocale = this.getLocaleMix(this.locale);
    if (!isEqual(prevState.locale, nextLocale)) {
      this.updateLocale(nextLocale);
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
    const {ViewComponent, ...props} = this.props;

    // @ts-ignore
    return <ViewComponent
      {...props}
      api={this.api}
      locale={this.state.locale}
      onChange={this.handleChange}
      address={this.state.address}
      fieldsSettings={this.state.fieldsSettings}
    />
  }

  private handleChange = (address: Address) => {
    this.setState({address});
    if (this.props.onChange) {
      this.props.onChange(address.getValue(this.isFieldVisible(ExtraFields.postalcode)));
    }
  };

  private init = async () => {
    const address = await this.updateAddress();
    if (this.props.onInit) {
      this.props.onInit(address.getValue(this.isFieldVisible(ExtraFields.postalcode)));
    }
  };

  private updateAddress = async (): Promise<Address> => {
    const address = await Address.getAddress(this.props.value, this.state.fieldsSettings, this.props.api);
    this.setState({
      address,
    });
    return address;
  };

  private updateLocale = (nextLocale: FiasLocale = this.getLocaleMix()): void => {
    this.setState({ locale: nextLocale });
  };

  private updateFieldsSettings = (): void => {
    this.setState({
      fieldsSettings: this.fieldsSettings,
    });
  };

  private getLocaleMix(localeFromContext: FiasLocale = FiasLocaleHelper.get()): FiasLocale {
    return {
      ...localeFromContext,
      ...this.props.locale,
    };
  }
}
