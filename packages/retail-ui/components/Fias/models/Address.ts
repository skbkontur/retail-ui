import {
  AddressErrors,
  AddressFields,
  AdditionalFields,
  AddressResponse,
  AddressValue,
  FiasId,
  FiasValue,
  Fields,
  ExtraFields,
  FiasLocale,
  FieldsSettings,
  FiasCountry,
} from '../types';
import { AddressElement } from './AddressElement';
import { FiasData } from './FiasData';
import isEqual from 'lodash.isequal';

export interface AddressOptions {
  fields?: AddressFields;
  additionalFields?: AdditionalFields;
  errors?: AddressErrors;
  country?: FiasCountry;
  foreignAddress?: string;
}

export class Address {
  public static MAIN_FIELDS = [
    Fields.region,
    Fields.district,
    Fields.city,
    Fields.intracityarea,
    Fields.settlement,
    Fields.planningstructure,
    Fields.street,
    Fields.stead,
    Fields.house,
    Fields.room,
  ];

  public static ADDITIONAL_FIELDS = [ExtraFields.postalcode];

  public static ALL_FIELDS = [...Address.MAIN_FIELDS, ...Address.ADDITIONAL_FIELDS];

  public static VERIFIABLE_FIELDS = [
    Fields.region,
    Fields.district,
    Fields.city,
    Fields.intracityarea,
    Fields.settlement,
    Fields.planningstructure,
    Fields.street,
    Fields.house,
  ];

  public static FULL_ADDRESS_SEARCH_FIELDS = [
    Fields.district,
    Fields.city,
    Fields.intracityarea,
    Fields.settlement,
    Fields.planningstructure,
  ];

  public static ALL_PARENTS_SEARCH_FIELDS = [
    Fields.district,
    Fields.city,
    Fields.intracityarea,
    Fields.settlement,
    Fields.planningstructure,
  ];

  public static IS_RUSSIA = (country: FiasCountry): boolean => {
    return isEqual(country, {
      shortName: 'Россия',
      fullName: 'Российская Федерация',
      code: '643',
    });
  };

  public static createFromResponse = (
    response: AddressResponse,
    additionalFields?: AdditionalFields,
    country?: FiasCountry,
  ) => {
    const fields: AddressFields = {};
    if (response) {
      Address.MAIN_FIELDS.forEach(field => {
        const fiasObject = response[field];
        if (fiasObject) {
          const data: FiasData = new FiasData(fiasObject);
          fields[field] = new AddressElement(field, data.name, data);
        }
      });
    }
    return new Address({ fields, additionalFields, country });
  };

  public static createFromAddressValue = (
    addressValue: AddressValue,
    additionalFields?: AdditionalFields,
    country?: FiasCountry,
  ) => {
    const fields: AddressFields = {};
    if (addressValue) {
      Address.MAIN_FIELDS.forEach(field => {
        const addressField = addressValue[field];
        if (addressField) {
          const { name, data } = addressField;
          fields[field] = new AddressElement(field, name, data && new FiasData(data));
        }
      });
    }
    return new Address({ fields, additionalFields, country });
  };

  public static createFromAddress = (address: Address, options: AddressOptions) => {
    const { fields, additionalFields, errors, country, foreignAddress } = address;
    return new Address({
      fields,
      additionalFields,
      errors,
      country,
      foreignAddress,
      ...options,
    });
  };

  public static verify = (address: Address, verifiedFields: AddressResponse, locale: FiasLocale): Address => {
    const { fields } = address;
    const errors: AddressErrors = {};

    for (const field of Address.VERIFIABLE_FIELDS) {
      const addressField = fields[field];
      let error = '';

      if (addressField) {
        if (field === Fields.house && !addressField.data) {
          // force invalidate address
          // if house wasn't chosen from the list
          error = locale.addressSelectItemFromList;
        }
        if (!address.isAllowedToFill(field)) {
          error = locale[`${field}FillBefore`];
        }

        const fiasObject = verifiedFields[field];

        if (Boolean(error) || !fiasObject) {
          errors[field] = error || locale.addressNotVerified;
          delete addressField.data;
          break;
        } else {
          const fiasData = new FiasData(fiasObject);
          fields[field] = new AddressElement(field, fiasData.name, fiasData);
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      if (address.postalCode && !address.isPostalCodeValid) {
        errors[ExtraFields.postalcode] = locale.postalcodeNotValid;
      } else if (address.isPostalCodeAltered) {
        errors[ExtraFields.postalcode] = locale.postalcodeNotFound;
      }
    }

    return Address.createFromAddress(address, { fields, errors });
  };

  public static filterVisibleFields = (
    fields: { [key in Fields]?: any },
    fieldsSettings: FieldsSettings,
  ): { [key in Fields]?: any } => {
    const filteredFields: { [key in Fields]?: any } = {};
    const isFieldVisible = (f: Fields): boolean => {
      const settings = fieldsSettings[f];
      return Boolean(settings && settings.visible);
    };
    let field: Fields;
    for (field in fields) {
      if (isFieldVisible(field)) {
        filteredFields[field] = fields[field];
      }
    }
    return filteredFields;
  };

  public static getParentFields = (field: Fields) => {
    const index = Address.MAIN_FIELDS.indexOf(field);
    return index > -1 ? Address.MAIN_FIELDS.slice(0, index) : [];
  };

  public fields: AddressFields;
  public additionalFields: AdditionalFields;
  public errors: AddressErrors;
  public country: FiasCountry | undefined;
  public foreignAddress: string;

  constructor({ fields, additionalFields, errors, country, foreignAddress }: AddressOptions = {}) {
    this.fields = fields || {};
    this.additionalFields = additionalFields || {};
    this.errors = errors || {};
    this.country = country;
    this.foreignAddress = foreignAddress || '';
  }

  public get isForeign(): boolean {
    return Boolean(this.country && !Address.IS_RUSSIA(this.country));
  }

  public get isEmpty(): boolean {
    return !Address.MAIN_FIELDS.some(field => this.fields.hasOwnProperty(field));
  }

  public get hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  public get postalCode(): string {
    const value = this.additionalFields[ExtraFields.postalcode];
    return typeof value === 'string' ? value : this.getFiasPostalCode();
  }

  public get isPostalCodeValid(): boolean {
    const rusFormat = /^[\d]{6}$/;
    const foreignFormat = /^[\w\.\-\s]*$/;
    return (!this.country || this.isForeign ? foreignFormat : rusFormat).test(this.postalCode);
  }

  public get isPostalCodeAltered(): boolean {
    const fiasPostalCode = this.getFiasPostalCode();
    return Boolean(fiasPostalCode) && this.postalCode !== fiasPostalCode;
  }

  public hasError(field: Fields | ExtraFields): boolean {
    return this.errors.hasOwnProperty(field);
  }

  public getError(field: Fields | ExtraFields): string | undefined {
    return this.errors[field];
  }

  public getAddressErrors = () => {
    return {
      ...this.errors,
    };
  };

  public getText = (minField?: Fields, skipTypes: boolean = false, connector: string = ', '): string => {
    if (this.isEmpty) {
      return '';
    }
    const getElementText = (element?: AddressElement): string => {
      return element ? element.getText(skipTypes) : '';
    };
    const fields = minField ? Address.getParentFields(minField) : Address.MAIN_FIELDS;
    return fields
      .map(field => getElementText(this.fields[field]))
      .filter(Boolean)
      .join(connector);
  };

  public getFullText = (withPostalCode: boolean = false) => {
    const substrings: string[] = [];

    if (withPostalCode) {
      substrings.push(this.postalCode);
    }

    if (this.country) {
      substrings.push(this.country.fullName);
    }

    substrings.push(this.isForeign ? this.foreignAddress : this.getText());

    return substrings.filter(Boolean).join(', ');
  };

  public isAllowedToFill = (field?: Fields): boolean => {
    const { region, city, settlement } = this.fields;
    const hasCityOrSettlement = city || settlement || (region && region.isFederalCity);
    if (!hasCityOrSettlement && (field === Fields.street || field === Fields.stead || field === Fields.house)) {
      return false;
    }
    return true;
  };

  public isAllowedToSearchFullAddress = (field?: Fields): boolean => {
    if (field && Address.FULL_ADDRESS_SEARCH_FIELDS.includes(field)) {
      if (!this.getClosestParentFiasId(field)) {
        return true;
      }
    }
    return false;
  };

  public isAllowedToSearchThroughAllParents = (field?: Fields): boolean => {
    return Boolean(field && Address.ALL_PARENTS_SEARCH_FIELDS.includes(field));
  };

  public hasOnlyIndirectParent = (field?: Fields): boolean => {
    if (field) {
      const parents = Address.getParentFields(field);
      if (parents.length > 1) {
        const directParent = this.fields[parents.pop() as Fields];
        return !directParent && parents.some(parent => Boolean(this.fields[parent]));
      }
    }
    return false;
  };

  public getClosestParentFiasId = (field?: Fields): FiasId | undefined => {
    if (field && !this.isEmpty) {
      const parents = Address.getParentFields(field)
        .slice()
        .reverse();
      for (const parentField of parents) {
        const parent = this.fields[parentField];
        if (parent && parent.data) {
          return parent.data.fiasId;
        }
      }
    }
  };

  public getFiasId = (): FiasId => {
    if (!this.isEmpty) {
      const fields = Address.VERIFIABLE_FIELDS.slice().reverse();
      for (const field of fields) {
        const element = this.fields[field];
        if (element && element.data) {
          return element.data.fiasId;
        }
      }
    }
    return '';
  };

  public getFiasPostalCode = (): string => {
    if (!this.isEmpty) {
      const fields = Address.VERIFIABLE_FIELDS.slice().reverse();
      for (const field of fields) {
        const element = this.fields[field];
        if (element && element.data) {
          return element.data.postalCode;
        }
      }
    }
    return '';
  };

  public getAddressValue = (): AddressValue => {
    const fields = Object.keys(this.fields) as Fields[];
    return fields.reduce((value, field) => {
      const element = this.fields[field];
      if (!element) {
        return value;
      }
      const { name, data } = element;
      return {
        ...value,
        [field]: {
          name,
          ...(data ? { data: data.data } : {}),
        },
      };
    }, {});
  };

  // TODO: get fields usage from fieldsSettings
  public getValue = (withPostalCode: boolean): FiasValue => {
    const { country, foreignAddress } = this;
    return {
      address: this.getAddressValue(),
      addressString: this.getFullText(withPostalCode),
      addressErrors: this.getAddressErrors(),
      fiasId: this.getFiasId(),
      postalCode: this.postalCode,
      ...(country ? { country } : {}),
      ...(this.isForeign ? { foreignAddress } : {}),
    };
  };

  public convertForVerification = () => {
    return Address.VERIFIABLE_FIELDS.reduce((value, field) => {
      const element = this.fields[field];
      if (!element) {
        return value;
      }
      return {
        ...value,
        [field]: {
          ...element.verifiableData,
        },
      };
    }, {});
  };
}

export default Address;
