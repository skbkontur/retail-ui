import {
  ValueAddress,
  ResponseAddress,
  AddressFields,
  FiasValue,
  VerifyResponse
} from '../types';
import { Nullable } from '../../../typings/utility-types';
import { AddressElement } from './AddressElement';
import { FiasData } from './FiasData';

export class Address {
  public static FIELDS = [
    'region',
    'district',
    'city',
    'settlement',
    'planningstructure',
    'stead',
    'street',
    'house',
    'room'
  ];

  public static createFromResponse = (response: ResponseAddress) => {
    const fields: AddressFields = {};
    if (response) {
      Address.FIELDS.forEach(field => {
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
      Address.FIELDS.forEach(field => {
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
    response: VerifyResponse
  ): Address => {
    const resultFields = { ...address.fields };
    if (response[0]) {
      const { address: verifiedAddress, invalidLevel } = response[0];
      for (const field of Object.keys(resultFields)) {
        const element = resultFields[field];
        if (element) {
          if (verifiedAddress[field]) {
            element.data = new FiasData(verifiedAddress[field]);
          } else {
            delete element.data;
          }
          if (invalidLevel && String(invalidLevel).toLowerCase() === field) {
            break;
          }
        }
      }
    }
    return new Address(resultFields);
  };

  public static getParentFields = (field: string): string[] => {
    const index = Address.FIELDS.indexOf(field);
    return index > -1 ? Address.FIELDS.slice(0, index) : [];
  };

  constructor(public fields: AddressFields = {}) {}

  public get isEmpty(): boolean {
    return !Address.FIELDS.some(field => this.fields.hasOwnProperty(field));
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
      : Address.FIELDS;
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
          ...(data ? data.data : {})
        }
      };
    }, {});
  };

  public isEqualTo = (address: Address): boolean => {
    for (const field of Address.FIELDS) {
      const current: Nullable<AddressElement> = this.fields[field];
      const target: Nullable<AddressElement> = address.fields[field];
      if (
        Boolean(current) !== Boolean(target) ||
        (current && target && current.name !== target.name)
      ) {
        return false;
      }
    }
    return true;
  };
}
