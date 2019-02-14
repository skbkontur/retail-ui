import * as React from 'react';
import Gapped from '../../Gapped';
import Button from '../../Button';
import {
  FiasComboBox,
  FiasComboBoxChangeEvent,
  FiasComboBoxProps
} from './FiasComboBox';
import styles from './FiasForm.less';
import {
  Fields,
  FormValidation,
  FiasLocale,
  AddressResponse,
  VerifyResponse,
  APIProvider,
  SearchOptions,
  APIResult,
  ExtraFields,
  FieldsSettings
} from '../types';
import { Address } from '../models/Address';
import { AddressElement } from '../models/AddressElement';
import Tooltip from '../../Tooltip/Tooltip';
import { InputProps } from '../../Input';
import Input from '../../Input/Input';
import FiasSearch from './FiasSearch';

interface FiasFormProps {
  api: APIProvider;
  address: Address;
  locale: FiasLocale;
  fieldsSettings: FieldsSettings;
  search?: boolean;
  limit?: number;
  validationLevel?: FormValidation;
}

interface FiasFormState {
  address: Address;
}

type FiasFormFields = {
  [field in Fields | ExtraFields]?: {
    meta: FiasFormFieldMeta;
    render: () => React.ReactNode;
  }
};

interface FieldMeta<C, P> {
  ref: C | null;
  props: P;
  createRef: (ref: C | null) => any;
  tooltip: () => React.ReactNode;
}

type ComboBoxMeta = FieldMeta<FiasComboBox, FiasComboBoxProps>;
type InputMeta = FieldMeta<Input, InputProps>;
type FiasFormFieldMeta = ComboBoxMeta | InputMeta;

export class FiasForm extends React.Component<FiasFormProps, FiasFormState> {
  public static defaultProps = {
    validationLevel: 'Error',
    limit: 5,
    fieldsSettings: {}
  };

  public static Field = ({
    label,
    children
  }: {
    label?: string;
    children?: React.ReactNode;
  }) => (
    <div className={styles.row}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.field}>{children}</div>
    </div>
  );

  public static isComboboxMeta = (
    meta: FiasFormFieldMeta
  ): meta is ComboBoxMeta => {
    const { props } = meta;
    return (
      props.hasOwnProperty('onUnexpectedInput') &&
      props.hasOwnProperty('getItems')
    );
  };

  public static isInputMeta = (meta: FiasFormFieldMeta): meta is InputMeta => {
    const { props } = meta;
    return !FiasForm.isComboboxMeta(meta) && props.hasOwnProperty('onChange');
  };

  public state: FiasFormState = {
    address: this.props.address
  };

  private fields: FiasFormFields;

  private verifyPromise: Promise<APIResult<VerifyResponse>> | null = null;

  constructor(props: FiasFormProps) {
    super(props);

    this.fields = Address.ALL_FIELDS.reduce<FiasFormFields>(
      (fields: FiasFormFields, field: Fields | ExtraFields) => {
        switch (field) {
          case Fields.region:
          case Fields.district:
          case Fields.city:
          case Fields.intracityarea:
          case Fields.settlement:
          case Fields.planningstructure:
          case Fields.street:
          case Fields.stead:
          case Fields.house:
            return {
              ...fields,
              [field]: {
                meta: this.createAddressComboboxMeta(field),
                render: () => this.renderAddressComboBox(field)
              }
            };
          case Fields.room:
            return {
              ...fields,
              [field]: {
                meta: this.createAddressInputMeta(Fields.room),
                render: () => this.renderAddressInput(Fields.room)
              }
            };
          case ExtraFields.postalcode:
            return {
              ...fields,
              [field]: {
                meta: this.createPostalCodeInputMeta(),
                render: () => this.renderPostalCodeInput()
              }
            };
          default:
            return fields;
        }
      },
      {}
    );
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
            <FiasForm.Field>
              <FiasSearch
                source={this.createItemsSource}
                address={address}
                onChange={this.handleAddressChange}
                limit={this.props.limit}
                locale={this.props.locale}
              />
            </FiasForm.Field>
          )}
          {this.renderFields()}
        </Gapped>
      </div>
    );
  }

  private getCommonFieldProps = (
    field: Fields | ExtraFields
  ): {
    warning: boolean;
    error: boolean;
    placeholder: string;
  } => {
    const { address } = this.state;
    const { validationLevel, locale } = this.props;
    return {
      error:
        address.hasError(field) && validationLevel === FormValidation.Error,
      warning:
        address.hasError(field) && validationLevel === FormValidation.Warning,
      placeholder: locale[`${field}Placeholder`]
    };
  };

  private renderFields = (): React.ReactNode => {
    const { locale, fieldsSettings } = this.props;
    return Address.ALL_FIELDS.map((field: Fields | ExtraFields) => {
      const control = this.fields[field];
      const settings = fieldsSettings[field];
      if (control && Boolean(settings && settings.visible)) {
        const { meta, render } = control;
        const label = locale[`${field}Label`];
        return (
          control && (
            <FiasForm.Field label={label} key={field}>
              <Tooltip pos={'right middle'} render={meta.tooltip}>
                {render()}
              </Tooltip>
            </FiasForm.Field>
          )
        );
      }
    });
  };

  private renderAddressComboBox = (
    field: Fields,
    width: string | number = '100%'
  ): React.ReactNode => {
    const comboboxField = this.fields[field];
    if (comboboxField && FiasForm.isComboboxMeta(comboboxField.meta)) {
      const { address } = this.state;
      const { props, createRef } = comboboxField.meta;
      const commonProps = this.getCommonFieldProps(field);
      return (
        <FiasComboBox
          {...commonProps}
          {...props}
          value={address}
          width={width}
          autocomplete={true}
          limit={this.props.limit}
          ref={createRef}
        />
      );
    }
  };

  private renderAddressInput = (
    field: Fields,
    width: string | number = 130
  ): React.ReactNode => {
    const inputField = this.fields[field];
    if (inputField && FiasForm.isInputMeta(inputField.meta)) {
      const { address } = this.state;
      const { props, createRef } = inputField.meta;
      const commonProps = this.getCommonFieldProps(field);
      const addressField = address.fields[field];
      const value = addressField ? addressField.name : '';
      return (
        <Input
          {...commonProps}
          {...props}
          value={value}
          width={width}
          ref={createRef}
        />
      );
    }
  };

  private renderPostalCodeInput = (): React.ReactNode => {
    const inputField = this.fields[ExtraFields.postalcode];
    if (inputField && FiasForm.isInputMeta(inputField.meta)) {
      const { address } = this.state;
      const { props, createRef } = inputField.meta;
      const commonProps = this.getCommonFieldProps(ExtraFields.postalcode);
      const value = address.postalCode;
      return (
        <Input
          {...commonProps}
          {...props}
          value={value}
          width={130}
          ref={createRef}
          mask={'999999'}
          maskChar={''}
        />
      );
    }
  };

  private createAddressComboboxMeta = (field: Fields): ComboBoxMeta => {
    return {
      ref: null,
      props: this.createAddressComboBoxProps(field),
      tooltip: this.createAddressComboBoxTooltip(field),
      createRef: (ref: FiasComboBox | null) => {
        const comboboxField = this.fields[field];
        if (comboboxField) {
          comboboxField.meta.ref = ref;
        }
      }
    };
  };

  private createAddressInputMeta = (field: Fields): InputMeta => {
    return {
      ref: null,
      props: this.createAddressInputProps(field),
      tooltip: () => this.getFieldTooltipContent(field),
      createRef: (ref: Input | null) => {
        const inputField = this.fields[field];
        if (inputField) {
          inputField.meta.ref = ref;
        }
      }
    };
  };

  private createPostalCodeInputMeta = (): InputMeta => {
    return {
      ref: null,
      props: this.createPostalCodeInputProps(),
      tooltip: () => this.createPostalCodeTooltip(),
      createRef: (ref: Input | null) => {
        const inputField = this.fields[ExtraFields.postalcode];
        if (inputField) {
          inputField.meta.ref = ref;
        }
      }
    };
  };

  private createAddressComboBoxProps(field: Fields): FiasComboBoxProps {
    const getItems = async (searchText: string) =>
      this.createItemsSource(searchText, field);

    const onChange = (e: FiasComboBoxChangeEvent, value: Address) => {
      const { fields: oldFields, additionalFields } = this.state.address;
      const newFields = {
        ...oldFields,
        ...value.fields
      };
      let addressField: Fields;
      for (addressField in newFields) {
        if (!newFields[addressField]) {
          delete newFields[addressField];
        }
      }
      this.handleAddressChange(new Address(newFields, additionalFields));
    };

    const onInputChange = () => {
      this.resetAddressErrors();
    };

    const onUnexpectedInput = (query: string) => {
      const newFields = {
        ...this.state.address.fields,
        [field]: query ? new AddressElement(field, query) : undefined
      };
      return new Address(newFields);
    };

    const renderItem = (address: Address): string => {
      const element = address.fields[field];
      const hasParents = Boolean(address.getClosestParentFiasId(field));

      const fieldText = element
        ? element.getText(!hasParents && element.isTypeMatchField(field))
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
      return element && element.getText(element.isTypeMatchField(field));
    };

    const renderNotFound = (): React.ReactNode => {
      const { address } = this.state;
      const { locale } = this.props;
      let messages = [
        locale[`${field}NotFound` as keyof FiasLocale] || locale.addressNotFound
      ];

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

  private createAddressInputProps(field: Fields): InputProps {
    return {
      onChange: (e: React.ChangeEvent, value: string) => {
        const { fields, additionalFields } = this.state.address;
        if (value) {
          fields[field] = new AddressElement(field, value);
        } else {
          delete fields[field];
        }
        this.handleAddressChange(new Address(fields, additionalFields));
      }
    };
  }

  private createPostalCodeInputProps(): InputProps {
    return {
      onChange: (e: React.ChangeEvent, value: string) => {
        const { fields, additionalFields, errors } = this.state.address;
        const newAdditionalFields = {
          ...additionalFields,
          [ExtraFields.postalcode]: value
        };
        this.handleAddressChange(
          new Address(fields, newAdditionalFields, errors)
        );
      }
    };
  }

  private createItemsSource = async (searchText: string, field?: Fields) => {
    const { address } = this.state;
    const limit = this.props.limit || FiasForm.defaultProps.limit;

    if (address.isAllowedToFill(field)) {
      const options: SearchOptions = {
        searchText,
        field,
        parentFiasId: address.getClosestParentFiasId(field),
        fullAddress: address.isAllowedToSearchFullAddress(field),
        directParent: !address.isAllowedToSearchThroughAllParents(field),
        limit: limit + 1 // +1 to detect if there are more items
      };
      return this.props.api.search(options).then(result => {
        const { success, data, error } = result;
        return success && data
          ? Promise.resolve(
              data.map((item: AddressResponse) => {
                return Address.createFromResponse(item);
              })
            )
          : Promise.reject(error);
      });
    }
    return Promise.resolve([]);
  };

  private getFieldTooltipContent = (
    field: Fields | ExtraFields
  ): React.ReactNode => {
    const { address } = this.state;
    const { validationLevel } = this.props;
    if (validationLevel !== FormValidation.None && address.hasError(field)) {
      return address.getError(field);
    }
    return null;
  };

  private createAddressComboBoxTooltip = (
    field: Fields
  ) => (): React.ReactNode => {
    const { locale } = this.props;
    const tooltipContent = this.getFieldTooltipContent(field);
    const comboboxField = this.fields[field];
    if (comboboxField && FiasForm.isComboboxMeta(comboboxField.meta)) {
      const combobox = comboboxField.meta.ref;
      const hasItems = combobox ? combobox.hasItems : false;
      return tooltipContent !== null && hasItems
        ? locale.addressSelectItemFromList
        : tooltipContent;
    }
    return tooltipContent;
  };

  private createPostalCodeTooltip = (): React.ReactNode => {
    const { locale } = this.props;
    const tooltipContent = this.getFieldTooltipContent(ExtraFields.postalcode);
    const replacePostalCode = () => {
      const { fields, additionalFields } = this.state.address;
      delete additionalFields[ExtraFields.postalcode];
      this.handleAddressChange(new Address(fields, additionalFields));
    };
    return (
      tooltipContent && (
        <div>
          <span>{tooltipContent}</span>
          {this.state.address.isPostalCodeAltered && (
            <div>
              <Button onClick={replacePostalCode} use="link">
                {locale.postalcodeReplace}
              </Button>
            </div>
          )}
        </div>
      )
    );
  };

  private check(): void {
    const { address } = this.state;
    const { api, locale } = this.props;

    this.verifyPromise = api
      .verify(address.convertForVerification())
      .then(result => {
        const { success, data } = result;
        if (success && data) {
          const verifiedFields = (data[0] && data[0].address) || {};
          const verifiedAddress = Address.verify(
            address,
            verifiedFields,
            locale
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
        address: this.filterInvisibleFields(address)
      },
      () => {
        this.check();
      }
    );
  };

  private resetAddressErrors = () => {
    const { address } = this.state;
    if (address.hasErrors) {
      this.setState({
        address: new Address(address.fields, address.additionalFields)
      });
    }
  };

  private filterInvisibleFields = (address: Address): Address => {
    const { fieldsSettings } = this.props;
    const isFieldVisible = (field: Fields): boolean => {
      const settings = fieldsSettings[field];
      return Boolean(settings && settings.visible);
    };
    const { fields, additionalFields, errors } = address;
    let addressField: Fields;
    for (addressField in fields) {
      if (!isFieldVisible(addressField)) {
        delete fields[addressField];
      }
    }
    return new Address(fields, additionalFields, errors);
  };
}

export default FiasForm;
