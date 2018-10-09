import * as React from 'react';
import Gapped from '../Gapped';
import ComboBox from '../ComboBox';
import { FiasAPI } from './FiasAPI';
import {
  getAddressElementName,
  getAddressElementText,
  getAddressText,
  getLastFiasId
} from './utils';
import styles from './FiasForm.less';
import {
  Address,
  ADDRESS_FIELDS,
  AddressElement,
  AddressFieldName,
  ErrorMessages,
  Levels,
  Room,
  VerifyResponse
} from './types';

const VERIFY_ERROR_MESSAGE = 'Неверный адрес';

interface Fields {
  [field: string]: FieldProps | null;
}

interface FieldProps {
  getItems: (searchText: string) => Promise<Address[]>;
  onChange: (e: ChangeEvent<Address>, value: Address) => void;
  renderItem: (address: Address) => React.ReactNode;
  renderValue: (address: Address) => React.ReactNode;
  valueToString: (address: Address) => string;
  onInputChange: (value: string) => void;
  onUnexpectedInput?: (searchText: string) => void;
}

interface ChangeEvent<T> {
  target: {
    value: T;
  };
}

interface Props {
  address?: Address;
  baseUrl?: string;
  validFn?: (address: Address) => ErrorMessages;
  search?: boolean;
}

interface State {
  address: Address;
  errorMessages: ErrorMessages;
}

export class FiasForm extends React.Component<Props, State> {
  public state: State;
  public api: FiasAPI;

  private _verifyPromise: Promise<VerifyResponse> | null = null;
  private _fields: Fields = {};
  private readonly _searchProps: FieldProps | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      address: { ...this.props.address } || {},
      errorMessages: {}
    };

    this.api = new FiasAPI(this.props.baseUrl);

    this._fields = ADDRESS_FIELDS.reduce(
      (fields: Fields, field: AddressFieldName) => {
        return {
          ...fields,
          [field]: this.getFieldProps(field)
        };
      },
      {}
    );

    if (props.search) {
      this._searchProps = this.createSearchProps();
    }
  }

  public getFieldProps(field: AddressFieldName): FieldProps | null {
    switch (field) {
      case 'room':
        return {
          ...this.createFieldProps(field),
          onChange: (e, newAddress) => {
            const roomField = 'room';
            const element = newAddress[roomField];
            const currentAddress = { ...this.state.address };
            if (newAddress) {
              for (const i in ADDRESS_FIELDS) {
                if (ADDRESS_FIELDS.hasOwnProperty(i)) {
                  const addressField = ADDRESS_FIELDS[i];
                  if (addressField !== roomField && newAddress[addressField]) {
                    currentAddress[addressField] = newAddress[
                      addressField
                    ] as Room;
                  } else if (addressField === roomField) {
                    currentAddress[roomField] = element as Room;
                    break;
                  }
                }
              }
            } else {
              currentAddress[roomField] = element as Room;
            }
            this.setState({ address: currentAddress });
          }
        };
      default:
        return this.createFieldProps(field);
    }
  }

  public createFieldProps(field: AddressFieldName): FieldProps {
    return {
      getItems: this.createFieldSource(field, Levels[field]),
      onChange: this.createFieldChangeHandler(field),
      renderItem: this.createFieldItemRenderer(field),
      renderValue: this.createFieldValueRenderer(field),
      valueToString: this.createFieldValueToStringConverter(field),
      onInputChange: this.createFieldInputHandler(field),
      onUnexpectedInput: this.createFieldUnexpectedInputHandler(field)
    };
  }

  public createFieldChangeHandler(field: string) {
    return (e: ChangeEvent<Address>, newAddress: Address) => {
      const currentAddress = { ...this.state.address };
      const element = newAddress[field]!;
      if (newAddress) {
        for (const i in ADDRESS_FIELDS) {
          if (ADDRESS_FIELDS.hasOwnProperty(i)) {
            const addressField = ADDRESS_FIELDS[i];
            if (addressField !== field && newAddress[addressField]) {
              currentAddress[addressField] = newAddress[addressField];
            } else if (addressField === field) {
              currentAddress[field] = element;
              break;
            }
          }
        }
      }
      this.setState({ address: currentAddress });
      this.check(currentAddress);
    };
  }

  public createFieldInputHandler(field: string) {
    return (value: string) => {
      if (!value) {
        const errorMessages = { ...this.state.errorMessages };
        delete errorMessages[field];
        this.setState({ errorMessages });
      }
    };
  }

  public createFieldUnexpectedInputHandler(field: string) {
    return (searchText: string) => {
      if (!searchText) {
        const address = { ...this.state.address };
        delete address[field];
        this.setState({ address });
      }
    };
  }

  public createFieldItemRenderer(field: AddressFieldName) {
    return (address: Address): React.ReactNode => {
      const element = address[field]!;
      let text = getAddressElementText(element, field);

      if (element.level === Levels.region) {
        const regionCode = element.code ? element.code.substr(0, 2) : '';
        text = regionCode + ' ' + text;
      }

      const parentTexts: string[] = [];
      const parents = ADDRESS_FIELDS.slice(
        0,
        ADDRESS_FIELDS.indexOf(field)
      ).filter(key => Boolean(address[key]));
      parents.forEach((parentField: string) => {
        const parent = address[parentField];
        if (parent) {
          parentTexts.push(getAddressElementText(parent));
        }
      });

      return [...parentTexts, text].join(', ');
    };
  }

  public createFieldValueRenderer(field: AddressFieldName) {
    return (address: Address) => {
      const element = address[field];
      return element ? getAddressElementText(element, field) : '';
    };
  }

  public createFieldValueToStringConverter(field: AddressFieldName) {
    return (address: Address) => getAddressElementName(address[field]);
  }

  public createSearchProps(): FieldProps {
    return {
      getItems: this.createSearchSource(),
      onChange: (e, address: Address) => {
        this.setState({ address });
        this.check(address);
      },
      renderItem: address => getAddressText(address),
      renderValue: address => getAddressText(address),
      valueToString: address => getAddressText(address),
      onInputChange: (value: string) => {
        if (!value) {
          this.setState({
            address: {},
            errorMessages: {}
          });
        }
      }
    };
  }

  public getInvalidLevelErrors(invalidLevel: Levels, address: Address): any {
    const errorMessages: any = {};
    let isSearchInvalidLevel = false;
    for (const field of ADDRESS_FIELDS) {
      if (field === invalidLevel.toLowerCase() && address[field]) {
        isSearchInvalidLevel = true;
      }
      if (
        address[field] &&
        Object.keys(address[field] as object).length &&
        isSearchInvalidLevel
      ) {
        errorMessages[field] = VERIFY_ERROR_MESSAGE;
      }
    }
    return errorMessages;
  }

  public check(address: Address): void {
    const promise = this.api.verify(address);
    this._verifyPromise = promise;

    promise.then(result => {
      if (promise !== this._verifyPromise) {
        return;
      }
      this._verifyPromise = null;

      if (!result || !result[0]) {
        return;
      }

      const newAddress = {
        ...this.state.address, // здесь сохраняются поля, которые не одобрил метод verify
        ...result[0].address
      };

      let errorMessages = {};
      if (!result[0].isValid) {
        errorMessages = this.getInvalidLevelErrors(
          result[0].invalidLevel!,
          newAddress
        );
      }

      if (this.props.validFn) {
        const customErrorMessages = this.props.validFn(result[0].address); // только верифицированный адрес
        errorMessages = { ...errorMessages, ...customErrorMessages };
      }

      this.setState({
        address: newAddress,
        errorMessages
      });
    });
  }

  public createFieldSource(field: AddressFieldName, level: Levels) {
    const depth = ADDRESS_FIELDS.indexOf(field);
    return (searchText: string) => {
      const parentFiasId = getLastFiasId(
        this.state.address,
        ADDRESS_FIELDS.slice(0, depth)
      );
      return this.api.search(searchText, level, parentFiasId);
    };
  }

  public createSearchSource() {
    return (searchText: string) => this.api.search(searchText);
  }

  public setStateAddress(key: string, value: AddressElement) {
    this.setState({
      address: {
        ...this.state.address,
        [key]: value
      }
    });
  }

  public submit = async (): Promise<State> => {
    await this._verifyPromise;
    return {
      ...this.state
    };
  };

  public render() {
    const { address } = this.state;
    return (
      <div>
        <Gapped vertical>
          {this.props.search && (
            <div className={styles.row}>
              <div className={styles.field}>
                <ComboBox
                  {...this._searchProps}
                  value={address}
                  placeholder="Начните вводить адрес в свободной форме"
                  autocomplete={true}
                  width="100%"
                />
              </div>
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.label}>Регион</div>
            <div className={styles.field}>
              {this._renderField('region', 'Можно вводить код или название')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Район</div>
            <div className={styles.field}>{this._renderField('district')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Город</div>
            <div className={styles.field}>{this._renderField('city')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Населенный пункт</div>
            <div className={styles.field}>
              {this._renderField('settlement')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Иная территория</div>
            <div className={styles.field}>
              {this._renderField('planningstructure')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Улица</div>
            <div className={styles.field}>{this._renderField('street')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Земельный участок</div>
            <div className={styles.field}>
              {this._renderField('stead', '', 130)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Дом, сооружение</div>
            <div className={styles.field}>
              {this._renderField('house', '', 130)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Квартира, офис</div>
            <div className={styles.field}>
              {this._renderField('room', '', 130)}
            </div>
          </div>
        </Gapped>
      </div>
    );
  }

  private _renderField(
    field: AddressFieldName,
    placeholder: string = '',
    width: string | number = '100%'
  ) {
    const { address, errorMessages } = this.state;
    return (
      <ComboBox
        {...this._fields[field]}
        value={address}
        error={errorMessages.hasOwnProperty(field)}
        placeholder={placeholder}
        autocomplete={true}
        width={width}
      />
    );
  }
}

export default FiasForm;
