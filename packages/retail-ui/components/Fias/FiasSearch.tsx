import isEqual from 'lodash.isequal';
import * as React from 'react';
import { FiasAPI } from './api/FiasAPI';
import InternalFiasSearch from './Form/InternalFiasSearch';
import { Logger } from './logger/Logger';
import { Address } from './models/Address';
import {
  AddressResponse,
  APIProvider,
  FiasValue,
  SearchOptions,
} from './types';
import { FiasLocale, FiasLocaleHelper } from './locale';
import { locale } from '../LocaleProvider/decorators';

export interface FiasSearchProps {
  /**
   * Значение адреса. См. формат в примерах
   */
  value?: Partial<FiasValue>;
  onChange?: (value: FiasValue) => void;
  width?: number | string;
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
   * Количество отображаемых элементов в выпадающих списках
   */
  limit?: number;

  /**
   * Версия базы данных ФИАС. Формат: "2018-10-22"
   */
  version?: string;
}

export interface FiasSearchState {
  address: Address;
}

@locale('Fias', FiasLocaleHelper)
export class FiasSearch extends React.Component<FiasSearchProps, FiasSearchState> {
  public static defaultProps = {
    validationLevel: 'Error',
    limit: 5,
    countrySelector: false,
  };

  public state: Readonly<FiasSearchState> = {
    address: new Address(),
  };

  private readonly locale!: FiasLocale;

  private api: APIProvider = this.props.api || new FiasAPI(this.props.baseUrl, this.props.version);

  constructor(props: FiasSearchProps) {
    super(props);
    if (!props.baseUrl && !props.api) {
      Logger.log(Logger.warnings.baseUrlOrApiIsRequired);
    }
  }

  public componentDidMount = () => {
    this.updateAddress();
  };

  public componentDidUpdate = (prevProps: FiasSearchProps) => {
    if (!isEqual(prevProps.value, this.props.value)) {
      this.updateAddress();
    }
  };

  public render() {
    const { width, error, warning } = this.props;
    return (
      <InternalFiasSearch
        source={this.getItems}
        locale={this.locale}
        address={this.state.address}
        onChange={this.handleChange}
        width={width}
        error={error}
        warning={warning}
      />
    );
  }

  private getItems = async (searchText: string) => {
    const limit = this.props.limit || FiasSearch.defaultProps.limit;

      const options: SearchOptions = {
        searchText,
        fullAddress: true,
        directParent: false,
        limit: limit + 1, // +1 to detect if there are more items
      };
      return this.api.search(options).then(result => {
        const { success, data, error } = result;
        return success && data
          ? Promise.resolve(data.map((item: AddressResponse) => Address.createFromResponse(item)))
          : Promise.reject(error);
      });
  };

  private handleChange = (address: Address) => {
      this.setState({address});
      if (this.props.onChange) {
        this.props.onChange(address.getValue(false));
      }
  };

  private updateAddress = async () => {
    const address = await Address.getAddress(this.props.value, undefined, this.api);
    this.setState({
      address,
    });
  };
}

export default FiasSearch;
