import React from 'react';

import { Gapped } from '../../Gapped';
import { Button } from '../../Button';
import { locale } from '../../../lib/locale/decorators';
import { FiasLocale, FiasLocaleHelper } from '../locale';
import {
  FiasAddressResponse,
  FiasAPIProvider,
  FiasAPIResult,
  FiasExtraFields,
  FiasCountry,
  FiasFields,
  FiasFieldsSettings,
  FiasFormValidation,
  FiasSearchOptions,
  FiasVerifyResponse,
} from '../types';
import { FiasAddressElement } from '../models/FiasAddressElement';
import { Tooltip } from '../../Tooltip';
import { Input, InputProps } from '../../Input';
import { FiasSearch } from '../FiasSearch/FiasSearch';
import { Textarea } from '../../Textarea';
import { FiasAddress } from '../models/FiasAddress';

import { FiasCountrySelector } from './FiasCountrySelector';
import { jsStyles } from './FiasForm.styles';
import { FiasComboBox, FiasComboBoxProps } from './FiasComboBox';

interface FiasFormProps {
  api: FiasAPIProvider;
  address: FiasAddress;
  fieldsSettings: FiasFieldsSettings;
  search?: boolean;
  limit?: number;
  validationLevel?: FiasFormValidation;
  countrySelector?: boolean;
}

interface FiasFormState {
  address: FiasAddress;
}

type FiasFormFields = {
  [field in FiasFields | FiasExtraFields]?: {
    meta: FiasFormFieldMeta;
    render: () => React.ReactNode;
  };
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

@locale('Fias', FiasLocaleHelper)
export class FiasForm extends React.Component<FiasFormProps, FiasFormState> {
  public static __KONTUR_REACT_UI__ = 'FiasForm';

  public static defaultProps = {
    validationLevel: 'Error',
    limit: 5,
    fieldsSettings: {},
    countrySelector: false,
  };

  public static Field = ({ label, children }: { label?: string; children?: React.ReactNode }) => (
    <div className={jsStyles.row()}>
      {label && <div className={jsStyles.label()}>{label}</div>}
      <div className={jsStyles.field()}>{children}</div>
    </div>
  );

  public static isComboboxMeta = (meta: FiasFormFieldMeta): meta is ComboBoxMeta => {
    const { props } = meta;
    return (
      Object.prototype.hasOwnProperty.call(props, 'onUnexpectedInput') &&
      Object.prototype.hasOwnProperty.call(props, 'getItems')
    );
  };

  public static isInputMeta = (meta: FiasFormFieldMeta): meta is InputMeta => {
    const { props } = meta;
    return !FiasForm.isComboboxMeta(meta) && Object.prototype.hasOwnProperty.call(props, 'onValueChange');
  };

  public state: FiasFormState = {
    address: this.props.address,
  };

  private readonly locale!: FiasLocale;

  private fields: FiasFormFields;

  private lastVerifyPromise: Promise<FiasAddress> | null = null;

  constructor(props: FiasFormProps) {
    super(props);

    this.fields = FiasAddress.ALL_FIELDS.reduce<FiasFormFields>(
      (fields: FiasFormFields, field: FiasFields | FiasExtraFields) => {
        switch (field) {
          case FiasFields.region:
          case FiasFields.district:
          case FiasFields.city:
          case FiasFields.intracityarea:
          case FiasFields.settlement:
          case FiasFields.planningstructure:
          case FiasFields.street:
          case FiasFields.stead:
          case FiasFields.house:
          case FiasFields.room:
            return {
              ...fields,
              [field]: {
                meta: this.createAddressComboboxMeta(field),
                render: () => this.renderAddressComboBox(field),
              },
            };
          case FiasExtraFields.postalcode:
            return {
              ...fields,
              [field]: {
                meta: this.createPostalCodeInputMeta(),
                render: () => this.renderPostalCodeInput(),
              },
            };
          default:
            return fields;
        }
      },
      {},
    );
  }

  public get isForeignForm(): boolean {
    const { address } = this.state;
    const { countrySelector } = this.props;
    return address.isForeign || (Boolean(countrySelector) && !address.country);
  }

  public componentDidMount() {
    this.validate();
  }

  public submit = async (): Promise<FiasAddress> => {
    await this.lastVerifyPromise;
    return this.state.address;
  };

  public render() {
    const { address } = this.state;
    const { api, limit, countrySelector } = this.props;
    return (
      <div>
        <Gapped vertical>
          {countrySelector && (
            <FiasForm.Field label={this.locale.countryLabel}>
              <FiasCountrySelector
                api={api}
                country={address.country}
                onValueChange={this.handleCountryChange}
                limit={limit}
              />
            </FiasForm.Field>
          )}
          {this.props.search && (
            <FiasForm.Field>
              <FiasSearch
                api={api}
                address={address}
                onValueChange={this.handleSearchChange}
                limit={limit}
                placeholder={this.locale.searchPlaceholder}
              />
            </FiasForm.Field>
          )}
          {this.isForeignForm ? (
            <Gapped vertical>
              <FiasForm.Field label={this.locale.foreignAddressLabel}>
                <Textarea
                  value={address.foreignAddress}
                  onValueChange={this.handleForeignAddressChange}
                  placeholder={this.locale.foreignAddressPlaceholder}
                  width="100%"
                  resize="none"
                />
              </FiasForm.Field>
              {this.renderFields([FiasExtraFields.postalcode])}
            </Gapped>
          ) : (
            this.renderFields(FiasAddress.ALL_FIELDS)
          )}
        </Gapped>
      </div>
    );
  }

  private getCommonFieldProps = (
    field: FiasFields | FiasExtraFields,
  ): {
    warning: boolean;
    error: boolean;
    placeholder: string;
  } => {
    const { address } = this.state;
    const { validationLevel } = this.props;
    return {
      error: address.hasError(field) && validationLevel === FiasFormValidation.Error,
      warning: address.hasError(field) && validationLevel === FiasFormValidation.Warning,
      placeholder: this.locale[`${field}Placeholder` as keyof FiasLocale],
    };
  };

  private renderFields = (fields: Array<FiasFields | FiasExtraFields>): React.ReactNode => {
    const { fieldsSettings } = this.props;
    return fields.map((field: FiasFields | FiasExtraFields) => {
      const control = this.fields[field];
      const settings = fieldsSettings[field];
      if (control && Boolean(settings && settings.visible)) {
        const { meta, render } = control;
        const label = this.locale[`${field}Label` as keyof FiasLocale];
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

  private renderAddressComboBox = (field: FiasFields, width: string | number = '100%'): React.ReactNode => {
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
          drawArrow={false}
          searchOnFocus={false}
          limit={this.props.limit}
          ref={createRef}
        />
      );
    }
  };

  private renderPostalCodeInput = (): React.ReactNode => {
    const inputField = this.fields[FiasExtraFields.postalcode];
    if (inputField && FiasForm.isInputMeta(inputField.meta)) {
      const { address } = this.state;
      const { props, createRef } = inputField.meta;
      const commonProps = this.getCommonFieldProps(FiasExtraFields.postalcode);
      const value = address.postalCode;
      return <Input {...commonProps} {...props} value={value} width={130} ref={createRef} />;
    }
  };

  private createAddressComboboxMeta = (field: FiasFields): ComboBoxMeta => {
    return {
      ref: null,
      props: this.createAddressComboBoxProps(field),
      tooltip: this.createAddressComboBoxTooltip(field),
      createRef: (ref: FiasComboBox | null) => {
        const comboboxField = this.fields[field];
        if (comboboxField) {
          comboboxField.meta.ref = ref;
        }
      },
    };
  };

  private createPostalCodeInputMeta = (): InputMeta => {
    return {
      ref: null,
      props: this.createPostalCodeInputProps(),
      tooltip: () => this.createPostalCodeTooltip(),
      createRef: (ref: Input | null) => {
        const inputField = this.fields[FiasExtraFields.postalcode];
        if (inputField) {
          inputField.meta.ref = ref;
        }
      },
    };
  };

  private createAddressComboBoxProps = (field: FiasFields): FiasComboBoxProps => {
    const getItems = async (searchText: string) => this.createItemsSource(searchText, field);

    const onValueChange = (value: FiasAddress) => {
      const { address } = this.state;
      const newFields = {
        ...address.fields,
        ...value.fields,
      };
      // get rid of undefineds
      let addressField: FiasFields;
      for (addressField in newFields) {
        if (!newFields[addressField]) {
          delete newFields[addressField];
        }
      }
      this.handleAddressChange(FiasAddress.createFromAddress(address, { fields: newFields }), this.validate);
    };

    const onInputValueChange = () => {
      this.resetAddressErrors();
    };

    const onUnexpectedInput = (query: string) => {
      const { address } = this.state;
      const newFields = {
        ...address.fields,
        [field]: query ? new FiasAddressElement(field, query) : undefined,
      };
      return FiasAddress.createFromAddress(address, { fields: newFields });
    };

    const renderItem = (address: FiasAddress): string => {
      const element = address.fields[field];
      if (!element) {
        return '';
      }

      if (field === FiasFields.region && element.data) {
        const regionCode = element.data.code.substr(0, 2);
        return `${regionCode} ${element.getText()}`;
      }

      const diffAddress = new FiasAddress({
        fields: this.state.address.getDiffFields(address, this.props.fieldsSettings),
      });
      const hasParentFields = Boolean(diffAddress.getClosestParentFiasId(field));
      return hasParentFields ? diffAddress.getText() : element.getText(element.isTypeMatchField(field));
    };

    const renderValue = (address: FiasAddress): React.ReactNode => {
      const element = address.fields[field];
      return element && element.getText(element.isTypeMatchField(field));
    };

    const renderNotFound = (): React.ReactNode => {
      const { address } = this.state;
      let messages = [this.locale[`${field}NotFound` as keyof FiasLocale] || this.locale.addressNotFound];

      if (address.isAllowedToFill(field)) {
        if (address.hasOnlyIndirectParent(field)) {
          messages.push(this.locale.addressFillParentOrSearch);
        }
      } else {
        messages = this.locale[`${field}FillBefore` as keyof FiasLocale]
          ? [this.locale[`${field}FillBefore` as keyof FiasLocale]]
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

    const valueToString = (address: FiasAddress): string => {
      const element = address.fields[field];
      return element ? element.name : '';
    };

    const itemToValue = valueToString;

    return {
      getItems,
      onValueChange,
      onInputValueChange,
      onUnexpectedInput: onUnexpectedInput,
      renderItem,
      renderValue,
      itemToValue,
      valueToString,
      renderNotFound,
    };
  };

  private createPostalCodeInputProps(): InputProps {
    return {
      onValueChange: (value: string) => {
        const { address } = this.state;
        const newAdditionalFields = {
          ...address.additionalFields,
          [FiasExtraFields.postalcode]: value,
        };
        this.handleAddressChange(
          FiasAddress.createFromAddress(address, {
            additionalFields: newAdditionalFields,
          }),
        );
      },
    };
  }

  private createItemsSource = async (searchText: string, field: FiasFields) => {
    const { address } = this.state;
    const limit = this.props.limit || FiasForm.defaultProps.limit;

    if (address.isAllowedToFill(field)) {
      const options: FiasSearchOptions = {
        searchText,
        field,
        parentFiasId: address.getClosestParentFiasId(field),
        fullAddress: address.isAllowedToSearchFullAddress(field),
        directParent: !address.isAllowedToSearchThroughChildrenOfDirectParent(field, this.props.fieldsSettings),
        limit: limit + 1, // +1 to detect if there are more items
      };
      return this.props.api.search(options).then(result => {
        const { success, data, error } = result;
        return success && data
          ? Promise.resolve(
              data.map((item: FiasAddressResponse) => {
                return FiasAddress.createFromResponse(item);
              }),
            )
          : Promise.reject(error);
      });
    }
    return Promise.resolve([]);
  };

  private getFieldTooltipContent = (field: FiasFields | FiasExtraFields): React.ReactNode => {
    const { address } = this.state;
    const { validationLevel } = this.props;
    if (validationLevel !== FiasFormValidation.None && address.hasError(field)) {
      return address.getError(field);
    }
    return null;
  };

  private createAddressComboBoxTooltip = (field: FiasFields) => (): React.ReactNode => {
    const tooltipContent = this.getFieldTooltipContent(field);
    const comboboxField = this.fields[field];
    if (comboboxField && FiasForm.isComboboxMeta(comboboxField.meta)) {
      const combobox = comboboxField.meta.ref;
      const hasItems = combobox ? combobox.hasItems : false;
      return tooltipContent !== null && hasItems ? this.locale.addressSelectItemFromList : tooltipContent;
    }
    return tooltipContent;
  };

  private createPostalCodeTooltip = (): React.ReactNode => {
    const tooltipContent = this.getFieldTooltipContent(FiasExtraFields.postalcode);
    const replacePostalCode = () => {
      const { address } = this.state;
      const additionalFields = { ...address.additionalFields };
      delete additionalFields[FiasExtraFields.postalcode];
      this.handleAddressChange(FiasAddress.createFromAddress(address, { additionalFields }));
    };
    return (
      tooltipContent && (
        <div>
          <span>{tooltipContent}</span>
          {this.state.address.isPostalCodeAltered && (
            <div>
              <Button onClick={replacePostalCode} use="link">
                {this.locale.postalcodeReplace}
              </Button>
            </div>
          )}
        </div>
      )
    );
  };

  private verify = (): Promise<FiasAddress> => {
    const { address } = this.state;
    const { api } = this.props;

    return api.verify(address).then((result: FiasAPIResult<FiasVerifyResponse>) => {
      const { success, data } = result;
      if (success && data) {
        return FiasAddress.verify(address, data);
      }
      return FiasAddress.removeFiasData(address);
    });
  };

  private validate(): void {
    const verifyPromise = (this.lastVerifyPromise = this.verify());

    verifyPromise.then(verifiedAddress => {
      if (verifyPromise === this.lastVerifyPromise) {
        this.setState({
          address: FiasAddress.validate(verifiedAddress, this.locale),
        });
      }
    });
  }

  private handleCountryChange = (country?: FiasCountry) => {
    this.handleAddressChange(FiasAddress.createFromAddress(this.state.address, { country }));
  };

  private handleForeignAddressChange = (value: string) => {
    this.handleAddressChange(
      FiasAddress.createFromAddress(this.state.address, {
        foreignAddress: value,
      }),
    );
  };

  private handleAddressChange = (address: FiasAddress, callback?: () => void) => {
    this.setState(
      {
        address: FiasAddress.createFromAddress(address, {
          fields: FiasAddress.filterVisibleFields(address.fields, this.props.fieldsSettings),
        }),
      },
      callback,
    );
  };

  private handleSearchChange = (address: FiasAddress) => {
    this.handleAddressChange(address);
  };

  private resetAddressErrors = () => {
    const { address } = this.state;
    if (address.hasErrors) {
      this.setState({
        address: FiasAddress.createFromAddress(address, { errors: {} }),
      });
    }
  };
}
