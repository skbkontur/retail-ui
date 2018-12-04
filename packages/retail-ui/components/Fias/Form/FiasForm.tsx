import * as React from 'react';
import Gapped from '../../Gapped';
import {FiasComboBox, FiasComboBoxChangeEvent, FiasComboBoxProps} from './FiasComboBox';
import styles from './FiasForm.less';
import {
  Fields,
  FormValidation,
  FiasLocale,
  AddressResponse,
  VerifyResponse,
  APIProvider,
  SearchOptions, APIResult
} from '../types';
import {Nullable} from '../../../typings/utility-types';
import {Address} from '../models/Address';
import {AddressElement} from '../models/AddressElement';
import Tooltip from '../../Tooltip/Tooltip';
import {InputProps} from '../../Input';
import Input from '../../Input/Input';
import FiasSearch from './FiasSearch';

interface FiasFormProps {
  api: APIProvider;
  address: Address;
  locale: FiasLocale;
  search?: boolean;
  limit?: number;
  validationLevel?: FormValidation;
}

interface FiasFormState {
  address: Address;
}

export class FiasForm extends React.Component<FiasFormProps, FiasFormState> {
  public static defaultProps = {
    validationLevel: 'Error',
    limit: 5
  };

  public state: FiasFormState = {
    address: this.props.address
  };

  private readonly comboboxes: {
    [key: string]: {
      ref: Nullable<FiasComboBox>;
      props: FiasComboBoxProps;
      createRef: (element: FiasComboBox) => void;
      tooltip: () => Nullable<React.ReactNode>;
    };
  } = {};

  private readonly inputs: {
    [key: string]: {
      props: InputProps;
    };
  } = {};

  private verifyPromise: Nullable<Promise<APIResult<VerifyResponse>>> = null;

  constructor(props: FiasFormProps) {
    super(props);

    this.comboboxes = [
      Fields.region,
      Fields.district,
      Fields.city,
      Fields.intracityarea,
      Fields.settlement,
      Fields.planningstructure,
      Fields.street,
      Fields.stead,
      Fields.house
    ].reduce((comboboxes, field) => {
      return {
        ...comboboxes,
        [field]: {
          ref: null,
          props: this.createComboBoxProps(field),
          tooltip: this.createFieldTooltip(field),
          createRef: (element: FiasComboBox) => {
            this.comboboxes[field].ref = element;
          }
        }
      };
    }, {});

    this.inputs = [Fields.room].reduce((inputs, field) => {
      return {
        ...inputs,
        [field]: {
          props: this.createInputProps(field)
        }
      };
    }, {});
  }

  public componentDidMount() {
    this.check();
  }

  public submit = async (): Promise<Address> => {
    await this.verifyPromise;
    return this.state.address;
  };

  public render() {
    const { address } = this.state;
    return (
      <div>
        <Gapped vertical>
          {this.props.search && (
            <div className={styles.row}>
              <div className={styles.field}>
                <FiasSearch
                  source={this.createItemsSource}
                  address={address}
                  onChange={this.handleAddressChange}
                  limit={this.props.limit}
                  locale={this.props.locale}
                />
              </div>
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.label}>Регион</div>
            <div className={styles.field}>{this.renderField(Fields.region)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Район</div>
            <div className={styles.field}>{this.renderField(Fields.district)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Город</div>
            <div className={styles.field}>{this.renderField(Fields.city)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Внутригородская территория</div>
            <div className={styles.field}>
              {this.renderField(Fields.intracityarea)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Населенный пункт</div>
            <div className={styles.field}>{this.renderField(Fields.settlement)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Иная территория</div>
            <div className={styles.field}>
              {this.renderField(Fields.planningstructure)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Улица</div>
            <div className={styles.field}>{this.renderField(Fields.street)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Земельный участок</div>
            <div className={styles.field}>{this.renderField(Fields.stead, 130)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Дом, сооружение</div>
            <div className={styles.field}>{this.renderField(Fields.house, 130)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Квартира, офис</div>
            <div className={styles.field}>
              <Input
                {...this.inputs.room.props}
                value={address.fields.room ? address.fields.room.name : ''}
                error={address.hasError(Fields.room)}
                placeholder={this.props.locale.roomPlaceholder}
                width={130}
              />
            </div>
          </div>
        </Gapped>
      </div>
    );
  }

  private renderField = (field: Fields, width: string | number = '100%') => {
    const { address } = this.state;
    const { locale, validationLevel } = this.props;
    const { props, createRef, tooltip } = this.comboboxes[field];
    const error = address.hasError(field) && validationLevel === 'Error';
    const warning = address.hasError(field) && validationLevel === 'Warning';
    const placeholder = locale[`${field}Placeholder` as keyof FiasLocale];
    return (
      <Tooltip pos={'right middle'} render={tooltip}>
        <FiasComboBox
          {...props}
          value={address}
          placeholder={placeholder}
          width={width}
          error={error}
          warning={warning}
          autocomplete={true}
          limit={this.props.limit}
          ref={createRef}
        />
      </Tooltip>
    );
  };

  private createComboBoxProps(field: Fields): FiasComboBoxProps {
    const getItems = async (searchText: string) => this.createItemsSource(searchText, field);

    const onChange = (e: FiasComboBoxChangeEvent, value: Address) => {
      const fields = {
        ...this.state.address.fields,
        ...value.fields
      };
      for (const checkField of Object.keys(fields) as Fields[]) {
        if (!fields[checkField]) {
          delete fields[checkField];
        }
      }
      this.handleAddressChange(new Address(fields));
    };

    const onInputChange = () => {
      const { address } = this.state;
      if (address.hasErrors) {
        this.setState({
          address: new Address(address.fields)
        });
      }
    };

    const onUnexpectedInput = (query: string) => {
      const fields = { ...this.state.address.fields };
      fields[field] = query ? new AddressElement(field, query) : undefined;
      return new Address(fields);
    };

    const renderItem = (address: Address): string => {
      const element: Nullable<AddressElement> = address.fields[field];
      const hasParents = Boolean(address.getClosestParentFiasId(field));

      const fieldText = element
        ? element.getText(
            !hasParents && element.isTypeMatchField(field)
          )
        : '';

      if (field === Fields.region && element && element.data) {
        const regionCode = element.data.code.substr(0, 2);
        return `${regionCode} ${fieldText}`;
      }

      return hasParents
        ? [address.getText(field), fieldText].join(', ')
        : fieldText;
    };

    const renderValue = (address: Address): React.ReactNode => {
      const element = address.fields[field];
      return (
        element && element.getText(element.isTypeMatchField(field))
      );
    };

    const renderNotFound = (): React.ReactNode => {
      const { address } = this.state;
      const { locale } = this.props;
      let messages = [locale[`${field}NotFound` as keyof FiasLocale] || locale.addressNotFound];

      if (address.isAllowedToFill(field)) {
        if (address.hasOnlyIndirectParent(field)) {
          messages.push(locale.addressFillParentOrSearch);
        }
      } else {
        messages = locale[`${field}FillBefore` as keyof FiasLocale]
          ? [locale[`${field}FillBefore` as keyof FiasLocale]]
          : messages;
      }

      return (
        <div>
          {messages.map((message, i, m) => (
            <div key={i}>{message + (m[i + 1] ? '.' : '')}</div>
          ))}
        </div>
      );
    };

    const valueToString = (address: Address): string => {
      const element = address.fields[field];
      return element ? element.name : '';
    };

    return {
      getItems,
      onChange,
      onInputChange,
      onUnexpectedInput,
      renderItem,
      renderValue,
      valueToString,
      renderNotFound
    };
  }

  private createInputProps(field: Fields): InputProps {
    return {
      onChange: (e: React.ChangeEvent, value: string) => {
        const fields = { ...this.state.address.fields };
        if (value) {
          fields[field] = new AddressElement(field, value);
        } else {
          delete fields[field];
        }
        this.handleAddressChange(new Address(fields));
      }
    };
  }

  private createItemsSource = async (
    searchText: string,
    field?: Fields
  ) => {
    const { address } = this.state;
    const limit = this.props.limit || FiasForm.defaultProps.limit;

    if (address.isAllowedToFill(field)) {
      const options: SearchOptions = {
        searchText,
        field,
        parentFiasId: address.getClosestParentFiasId(field),
        fullAddress: address.isAllowedToSearchFullAddress(field),
        directParent: !address.isAllowedToSearchThroughAllParents(field),
        limit: limit + 1, // +1 to detect if there are more items
      };
      return this.props.api.search(options)
        .then(result => {
          const { success, data, error } = result;
          return success && data
            ? Promise.resolve(data.map((item: AddressResponse) => {
                return Address.createFromResponse(item);
              })
            )
            : Promise.reject(error);
        })
    }
    return Promise.resolve([]);
  };

  private createFieldTooltip = (field: Fields): React.ReactNode => {
    return () => {
      const { address } = this.state;
      const { validationLevel, locale } = this.props;
      const combobox = this.comboboxes[field].ref;
      const hasItems = combobox ? combobox.hasItems : false;
      if (validationLevel !== 'None' && address.hasError(field)) {
        return hasItems
          ? locale.addressSelectItemFromList
          : address.getError(field);
      }
      return null;
    };
  };

  private check(): void {
    const { address } = this.state;
    const { api, locale } = this.props;

    this.verifyPromise = api.verify(address.convertForVerification())
      .then(result => {
        const { success, data } = result;
        if (success && data && data.length) {
          const verifiedAddress = Address.verify(
            address,
            data,
            locale.addressNotVerified
          );

          this.setState({
            address: verifiedAddress
          });
        }
        return result;
      });
  }

  private handleAddressChange = (address: Address) => {
    this.setState(
      {
        address
      },
      () => {
        this.check();
      }
    );
  };
}

export default FiasForm;
