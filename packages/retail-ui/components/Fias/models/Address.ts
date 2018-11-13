import {
  ValueAddress,
  ResponseAddress,
  AddressFields,
  FiasValue,
  VerifyResponse,
  ErrorMessages
} from '../types';
import { Nullable } from '../../../typings/utility-types';
import { AddressElement } from './AddressElement';
import { FiasData } from './FiasData';

export class Address {
  public static ALL_FIELDS = [
    'region',
    'district',
    'city',
    'intracityarea',
    'settlement',
    'planningstructure',
    'street',
    'stead',
    'house',
    'room'
  ];

  public static VERIFIABLE_FIELDS = [
    'region',
    'district',
    'city',
    'intracityarea',
    'settlement',
    'planningstructure',
    'street'
  ];

  public static createFromResponse = (response: ResponseAddress) => {
    const fields: AddressFields = {};
    if (response) {
      Address.ALL_FIELDS.forEach(field => {
        if (response[field]) {
          const data: FiasData = new FiasData(response[field]);
          fields[field] = new AddressElement(field, data.name, data);
        }
      });
    }
    return new Address(fields);
  };

  public static createFromValue = (value: Nullable<FiasValue>) => {
    const fields: AddressFields = {};
    if (value && value.address) {
      const address: ValueAddress = value.address;
      Address.ALL_FIELDS.forEach(field => {
        if (address[field]) {
          const { name, data } = address[field];
          fields[field] = new AddressElement(
            field,
            name,
            data && new FiasData(data)
          );
        }
      });
    }
    return new Address(fields);
  };

  public static verify = (
    address: Address,
    response: VerifyResponse,
    notVerifiedMessage: string
  ): {
    address: Address;
    errorMessages: ErrorMessages;
  } => {
    const addressFields = { ...address.fields };
    const errorMessages: ErrorMessages = {};

    if (response[0]) {
      const { address: verifiedFields, invalidLevel } = response[0];
      for (const field of Address.VERIFIABLE_FIELDS) {
        if (addressFields[field]) {
          if (verifiedFields[field]) {
            const data = new FiasData(verifiedFields[field]);
            addressFields[field] = new AddressElement(field, data.name, data);
          } else {
            delete addressFields[field]!.data;
          }
          if (invalidLevel && String(invalidLevel).toLowerCase() === field) {
            errorMessages[field] = notVerifiedMessage;
            break;
          }
        }
      }
    }
    return {
      address: new Address(addressFields),
      errorMessages
    };
  };

  public static getParentFields = (field: string): string[] => {
    const index = Address.ALL_FIELDS.indexOf(field);
    return index > -1 ? Address.ALL_FIELDS.slice(0, index) : [];
  };

  constructor(public fields: AddressFields = {}) {}

  public get isEmpty(): boolean {
    return !Address.ALL_FIELDS.some(field => this.fields.hasOwnProperty(field));
  }

  public getText = (
    minField?: string,
    skipTypes: boolean = false,
    connector: string = ', '
  ): string => {
    if (this.isEmpty) {
      return '';
    }
    const getElementText = (element: Nullable<AddressElement>) => {
      return element && element.getText(skipTypes);
    };
    const fields = minField
      ? Address.getParentFields(minField)
      : Address.ALL_FIELDS;
    return fields
      .map(field => getElementText(this.fields[field]))
      .filter(Boolean)
      .join(connector);
  };

  public isTheFieldAllowedToFill = (field: Nullable<string>): boolean => {
    if (!field) {
      return true;
    }
    const { region, city, settlement, street } = this.fields;
    return !(
      (field === 'street' &&
        !(city || settlement) &&
        !(region && region.isFederalCity)) ||
      (field === 'stead' && !street) ||
      (field === 'house' && !street)
    );
  };

  public hasOnlyIndirectParent = (field: Nullable<string>): boolean => {
    if (field) {
      const parents = Address.getParentFields(field);
      if (parents.length > 1) {
        const directParent = this.fields[parents.pop() || ''];
        return (
          !directParent && parents.some(parent => Boolean(this.fields[parent]))
        );
      }
    }
    return false;
  };

  public getClosestParentFiasId = (field: string): Nullable<string> => {
    if (!this.isEmpty) {
      const parents = Address.getParentFields(field).reverse();
      for (const parentField of parents) {
        const parent: Nullable<AddressElement> = this.fields[parentField];
        if (parent && parent.data) {
          return parent.data.fiasId;
        }
      }
    }
  };

  public toValue = (): ValueAddress => {
    return Object.keys(this.fields).reduce((value, field) => {
      const element = this.fields[field];
      if (!element) {
        return value;
      }
      const { name, data } = element;
      return {
        ...value,
        [field]: {
          name,
          ...(data ? { data: data.data } : {})
        }
      };
    }, {});
  };

  public convertForVerification = () => {
    return Address.VERIFIABLE_FIELDS.reduce((value, field) => {
      const element = this.fields[field];
      if (!element) {
        return value;
      }
      const { name, data } = element;
      const abbreviation = data && data.abbreviation;
      return {
        ...value,
        [field]: {
          name,
          abbreviation
        }
      };
    }, {});
  };
}
