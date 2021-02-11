import isEqual from 'lodash.isequal';

import { FiasLocale } from '../locale';
import {
  FiasAddressErrors,
  FiasAddressFields,
  FiasAdditionalFields,
  FiasVerifyResponse,
  FiasAddressResponse,
  FiasAddressValue,
  FiasId,
  FiasValue,
  FiasFields,
  FiasExtraFields,
  FiasFieldsSettings,
  FiasCountry,
  FiasSearchOptions,
  FiasAPIProvider,
} from '../types';

import { FiasAddressElement } from './FiasAddressElement';
import { FiasData } from './FiasData';

export interface FiasAddressOptions {
  fields?: FiasAddressFields;
  additionalFields?: FiasAdditionalFields;
  errors?: FiasAddressErrors;
  country?: FiasCountry;
  foreignAddress?: string;
}

export class FiasAddress {
  public static MAIN_FIELDS = [
    FiasFields.region,
    FiasFields.district,
    FiasFields.city,
    FiasFields.intracityarea,
    FiasFields.settlement,
    FiasFields.planningstructure,
    FiasFields.street,
    FiasFields.stead,
    FiasFields.house,
    FiasFields.room,
  ];

  public static ADDITIONAL_FIELDS = [FiasExtraFields.postalcode];

  public static ALL_FIELDS = [...FiasAddress.MAIN_FIELDS, ...FiasAddress.ADDITIONAL_FIELDS];

  public static VERIFIABLE_FIELDS = [
    FiasFields.region,
    FiasFields.district,
    FiasFields.city,
    FiasFields.intracityarea,
    FiasFields.settlement,
    FiasFields.planningstructure,
    FiasFields.street,
  ];

  public static FULL_ADDRESS_SEARCH_FIELDS = [
    FiasFields.district,
    FiasFields.city,
    FiasFields.intracityarea,
    FiasFields.settlement,
    FiasFields.planningstructure,
    FiasFields.street,
  ];

  public static NOT_ONLY_DIRECT_PARENT_SEARCH_FIELDS = [
    FiasFields.district,
    FiasFields.city,
    FiasFields.intracityarea,
    FiasFields.settlement,
    FiasFields.planningstructure,
    FiasFields.street,
  ];

  public static IS_RUSSIA = (country: FiasCountry): boolean => {
    return isEqual(country, {
      shortName: 'Россия',
      fullName: 'Российская Федерация',
      code: '643',
    });
  };

  public static responseToFields = (response: FiasAddressResponse): FiasAddressFields => {
    const fields: FiasAddressFields = {};
    if (response) {
      FiasAddress.MAIN_FIELDS.forEach(field => {
        const fiasObject = response[field];
        if (fiasObject) {
          const data: FiasData = new FiasData(fiasObject);
          fields[field] = new FiasAddressElement(field, data.name, data);
        }
      });
    }
    return fields;
  };

  public static fieldsToResponse = (fields: FiasAddressFields): FiasAddressResponse => {
    const response: FiasAddressResponse = {};
    if (fields) {
      FiasAddress.MAIN_FIELDS.forEach(field => {
        const element = fields[field];
        if (element && element.fiasData) {
          response[field] = element.fiasData;
        }
      });
    }
    return response;
  };

  public static createFromResponse = (
    response: FiasAddressResponse,
    additionalFields?: FiasAdditionalFields,
    country?: FiasCountry,
  ) => {
    return new FiasAddress({ fields: FiasAddress.responseToFields(response), additionalFields, country });
  };

  public static createFromAddressValue = (
    addressValue: FiasAddressValue,
    additionalFields?: FiasAdditionalFields,
    country?: FiasCountry,
  ) => {
    const fields: FiasAddressFields = {};
    if (addressValue) {
      FiasAddress.MAIN_FIELDS.forEach(field => {
        const addressField = addressValue[field];
        if (addressField) {
          const { name, data } = addressField;
          fields[field] = new FiasAddressElement(field, name, data && new FiasData(data));
        }
      });
    }
    return new FiasAddress({ fields, additionalFields, country });
  };

  public static createFromAddress = (address: FiasAddress, options: FiasAddressOptions) => {
    const { fields, additionalFields, errors, country, foreignAddress } = address;
    return new FiasAddress({
      fields,
      additionalFields,
      errors,
      country,
      foreignAddress,
      ...options,
    });
  };

  public static validate = (address: FiasAddress, locale: FiasLocale): FiasAddress => {
    const { fields } = address;
    const errors: FiasAddressErrors = {};

    for (const field of FiasAddress.MAIN_FIELDS) {
      const element = fields[field];
      let error = '';

      if (element) {
        if (!element.data) {
          error = locale.addressNotVerified;
        }

        if (!address.isAllowedToFill(field)) {
          error = locale[`${field}FillBefore` as keyof FiasLocale];
        }

        if (error) {
          errors[field] = error;
          break;
        }
      }
    }

    if (Object.keys(errors).length === 0) {
      if (address.postalCode && !address.isPostalCodeValid) {
        errors[FiasExtraFields.postalcode] = locale.postalcodeNotValid;
      } else if (address.isPostalCodeAltered) {
        errors[FiasExtraFields.postalcode] = locale.postalcodeNotFound;
      }
    }

    return FiasAddress.createFromAddress(address, { errors });
  };

  public static verify = (address: FiasAddress, response: FiasVerifyResponse): FiasAddress => {
    if (address.isEmpty) {
      return address;
    }

    const { address: addressResponse, invalidLevel } = response;
    const verifiedAddress = FiasAddress.createFromAddress(address, {
      fields: {
        ...address.fields,
        ...FiasAddress.responseToFields(addressResponse),
      },
    });

    const invalidField = invalidLevel || verifiedAddress.verifyConsistency().invalidLevel;

    if (invalidField) {
      return FiasAddress.removeFiasData(verifiedAddress, [invalidField, ...FiasAddress.getChildFields(invalidField)]);
    }

    return verifiedAddress;
  };

  // TODO: Hide invisible fields without removing them.
  // (removing can break the verification)
  public static filterVisibleFields = (
    fields: { [key in FiasFields]?: any },
    fieldsSettings: FiasFieldsSettings,
  ): { [key in FiasFields]?: any } => {
    const filteredFields: { [key in FiasFields]?: any } = {};
    let field: FiasFields;
    for (field in fields) {
      if (FiasAddress.isFieldVisible(field, fieldsSettings)) {
        filteredFields[field] = fields[field];
      }
    }
    return filteredFields;
  };

  public static isFieldVisible = (field: FiasFields | FiasExtraFields, fieldsSettings: FiasFieldsSettings): boolean => {
    const settings = fieldsSettings[field];
    return Boolean(settings && settings.visible);
  };

  public static getParentFields = (field: FiasFields) => {
    const index = FiasAddress.MAIN_FIELDS.indexOf(field);
    return index > -1 ? FiasAddress.MAIN_FIELDS.slice(0, index) : [];
  };

  public static getChildFields = (field: FiasFields) => {
    const index = FiasAddress.MAIN_FIELDS.indexOf(field);
    return index > -1 ? FiasAddress.MAIN_FIELDS.slice(index + 1) : [];
  };

  public static removeFiasData = (
    address: FiasAddress,
    fields: FiasFields[] = FiasAddress.MAIN_FIELDS,
  ): FiasAddress => {
    const addressFields = { ...address.fields };
    for (const field of fields) {
      const element = addressFields[field];
      if (element) {
        element.removeData();
      }
    }
    return FiasAddress.createFromAddress(address, { fields: addressFields });
  };

  public static getAddress = async (
    api: FiasAPIProvider,
    value?: Partial<FiasValue>,
    fieldsSettings?: FiasFieldsSettings,
  ) => {
    if (!value) {
      return new FiasAddress();
    }

    const { address, addressString, fiasId, postalCode, country, foreignAddress } = value;
    const additionalFields: FiasAdditionalFields = {};
    let searchOptions: FiasSearchOptions = {};

    if (postalCode) {
      additionalFields[FiasExtraFields.postalcode] = postalCode;
    }

    if (country && !FiasAddress.IS_RUSSIA(country)) {
      return new FiasAddress({
        country,
        foreignAddress,
        additionalFields: { [FiasExtraFields.postalcode]: postalCode },
      });
    }

    if (address) {
      const addressValue = fieldsSettings ? FiasAddress.filterVisibleFields(address, fieldsSettings) : address;
      return FiasAddress.createFromAddressValue(addressValue, additionalFields, country);
    }

    if (fiasId) {
      searchOptions = {
        fiasId,
      };
    }

    if (addressString) {
      searchOptions = {
        searchText: addressString,
        limit: 1,
      };
    }

    if (api) {
      const { success, data } = await api.search(searchOptions);
      if (success && data && data.length) {
        const addressResponse = fieldsSettings ? FiasAddress.filterVisibleFields(data[0], fieldsSettings) : data[0];
        return FiasAddress.createFromResponse(addressResponse, additionalFields, country);
      }
    }

    return new FiasAddress({ country });
  };

  public fields: FiasAddressFields;
  public additionalFields: FiasAdditionalFields;
  public errors: FiasAddressErrors;
  public country: FiasCountry | undefined;
  public foreignAddress: string;

  constructor({ fields, additionalFields, errors, country, foreignAddress }: FiasAddressOptions = {}) {
    this.fields = fields || {};
    this.additionalFields = additionalFields || {};
    this.errors = errors || {};
    this.country = country;
    this.foreignAddress = foreignAddress || '';
  }

  public get isForeign(): boolean {
    return Boolean(this.country && !FiasAddress.IS_RUSSIA(this.country));
  }

  public get isEmpty(): boolean {
    return !FiasAddress.MAIN_FIELDS.some(field => Object.prototype.hasOwnProperty.call(this.fields, field));
  }

  public get hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  public get postalCode(): string {
    const value = this.additionalFields[FiasExtraFields.postalcode];
    return typeof value === 'string' ? value : this.getFiasPostalCode();
  }

  public get isPostalCodeValid(): boolean {
    const rusFormat = /^[\d]{6}$/;
    const foreignFormat = /^[\w.\-\s]*$/;
    return (!this.country || this.isForeign ? foreignFormat : rusFormat).test(this.postalCode);
  }

  public get isPostalCodeAltered(): boolean {
    const fiasPostalCode = this.getFiasPostalCode();
    return Boolean(fiasPostalCode) && this.postalCode !== fiasPostalCode;
  }

  public hasError(field: FiasFields | FiasExtraFields): boolean {
    return Object.prototype.hasOwnProperty.call(this.errors, field);
  }

  public getError(field: FiasFields | FiasExtraFields): string | undefined {
    return this.errors[field];
  }

  public getAddressErrors = () => {
    return {
      ...this.errors,
    };
  };

  public getText = (minField?: FiasFields, skipTypes = false, connector = ', '): string => {
    if (this.isEmpty) {
      return '';
    }
    const getElementText = (element?: FiasAddressElement): string => {
      return element ? element.getText(skipTypes) : '';
    };
    const fields = minField ? FiasAddress.getParentFields(minField) : FiasAddress.MAIN_FIELDS;
    return fields
      .map(field => getElementText(this.fields[field]))
      .filter(Boolean)
      .join(connector);
  };

  public getFullText = (withPostalCode = false) => {
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

  public isAllowedToFill = (field: FiasFields): boolean => {
    const { region, city, settlement, house } = this.fields;
    const hasCityOrSettlement = city || settlement || (region && region.isFederalCity);
    if (
      (!hasCityOrSettlement &&
        (field === FiasFields.street || field === FiasFields.stead || field === FiasFields.house)) ||
      (!house && field === FiasFields.room)
    ) {
      return false;
    }
    return true;
  };

  public isAllowedToSearchFullAddress = (field: FiasFields): boolean => {
    return FiasAddress.FULL_ADDRESS_SEARCH_FIELDS.includes(field);
  };

  // doesn't fully work on api side yet
  // @see https://yt.skbkontur.ru/issue/PS-1401
  public isAllowedToSearchThroughChildrenOfDirectParent = (
    field: FiasFields,
    fieldsSettings?: FiasFieldsSettings,
  ): boolean => {
    if (fieldsSettings) {
      for (const parentField of FiasAddress.getParentFields(field)) {
        if (!FiasAddress.isFieldVisible(parentField, fieldsSettings)) {
          return false;
        }
      }
    }
    return FiasAddress.NOT_ONLY_DIRECT_PARENT_SEARCH_FIELDS.includes(field);
  };

  public hasOnlyIndirectParent = (field?: FiasFields): boolean => {
    if (field) {
      const parents = FiasAddress.getParentFields(field);
      if (parents.length > 1) {
        const directParent = this.fields[parents.pop() as FiasFields];
        return !directParent && parents.some(parent => Boolean(this.fields[parent]));
      }
    }
    return false;
  };

  public getClosestParentFiasId = (field: FiasFields): FiasId | undefined => {
    if (!this.isEmpty) {
      const parents = FiasAddress.getParentFields(field)
        .slice()
        .reverse();
      for (const parentField of parents) {
        const parent = this.fields[parentField];
        if (parent) {
          return parent.fiasId;
        }
      }
    }
  };

  public getFiasId = (): FiasId => {
    if (!this.isEmpty) {
      const fields = FiasAddress.MAIN_FIELDS.slice().reverse();
      for (const field of fields) {
        const element = this.fields[field];
        if (element && element.fiasId) {
          return element.fiasId;
        }
      }
    }
    return '';
  };

  public getParent = (field: FiasFields): FiasAddressElement | undefined => {
    if (this.fields[field]) {
      const parents = FiasAddress.getParentFields(field).filter(f => Boolean(this.fields[f]));
      const closest = parents.pop();
      if (closest) {
        return this.fields[closest];
      }
    }
  };

  public verifyConsistency = (): FiasVerifyResponse => {
    const verifiedFields: FiasAddressFields = { ...this.fields };

    for (const field of FiasAddress.MAIN_FIELDS) {
      const element = this.fields[field];
      if (element) {
        if (element.data) {
          const expectedParentFiasId = element.data.parentFiasId;
          const parent = this.getParent(field);
          if (!parent || parent.fiasId === expectedParentFiasId) {
            verifiedFields[field] = element;
            continue;
          }
        }
        return {
          address: FiasAddress.fieldsToResponse(verifiedFields),
          isValid: false,
          invalidLevel: field,
        };
      }
    }
    return {
      address: FiasAddress.fieldsToResponse(verifiedFields),
      isValid: true,
    };
  };

  public getFiasPostalCode = (): string => {
    if (!this.isEmpty) {
      const fields = FiasAddress.MAIN_FIELDS.slice().reverse();
      for (const field of fields) {
        const element = this.fields[field];
        if (element && element.data && element.data.postalCode) {
          return element.data.postalCode;
        }
      }
    }
    return '';
  };

  public getAddressValue = (): FiasAddressValue => {
    const fields = Object.keys(this.fields) as FiasFields[];
    return fields.reduce((value, field) => {
      const element = this.fields[field];
      if (!element) {
        return value;
      }
      const { name, fiasData } = element;
      return {
        ...value,
        [field]: {
          name,
          ...(fiasData ? { data: fiasData } : {}),
        },
      };
    }, {});
  };

  // TODO: get fields usage from fieldsSettings
  public getValue = (withPostalCode = false): FiasValue => {
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
    return FiasAddress.VERIFIABLE_FIELDS.reduce((value, field) => {
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

  public getDiffFields = (address: FiasAddress, fieldsSettings?: FiasFieldsSettings): FiasAddressFields => {
    const fields = fieldsSettings
      ? FiasAddress.filterVisibleFields(address.fields, fieldsSettings)
      : { ...address.fields };
    for (const field of FiasAddress.MAIN_FIELDS) {
      const element = fields[field];
      if (element) {
        if (element.isEqualTo(this.fields[field])) {
          delete fields[field];
        } else {
          break;
        }
      }
    }
    return fields;
  };
}
