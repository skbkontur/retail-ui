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
          if (data) {
            fields[field] = new AddressElement(field, data.name, data);
          }
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
          fields[field] = new AddressElement(field, address[field].name);
        }
      });
    }
    return new Address(fields);
  };

  public static verify = (
    address: Address,
    response: VerifyResponse
  ): Address => {
    const fields = { ...address.fields };
    if (response[0]) {
      const result: ResponseAddress = response[0].address;
      Address.FIELDS.forEach(field => {
        const element: Nullable<AddressElement> = fields[field];
        if (element) {
          if (result[field]) {
            element.data = new FiasData(result[field]);
          } else {
            delete element.data;
          }
        }
      });
    }
    return new Address(fields);
  };

  public static getParentFields = (field: string): string[] => {
    const index = Address.FIELDS.indexOf(field);
    return index > -1 ? Address.FIELDS.slice(0, index) : [];
  };

  constructor(public fields: AddressFields = {}) {}

  public get isEmpty(): boolean {
    return !Address.FIELDS.some(field => Boolean(this.fields[field]));
  }

  public getText = (minField?: string): string => {
    if (this.isEmpty) {
      return '';
    }
    const getElementText = (element: Nullable<AddressElement>) => {
      return element && element.getText();
    };
    const fields = minField
      ? Address.getParentFields(minField)
      : Address.FIELDS;
    return fields
      .map(field => getElementText(this.fields[field]))
      .filter(Boolean)
      .join(', ');
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
    return Address.FIELDS.reduce((object, field) => {
      const element = this.fields[field];
      return {
        ...object,
        ...(element
          ? {
              [field]: {
                name: element.name
              }
            }
          : {})
      };
    }, {});
  };

  public isEqualTo = (address: Address): boolean => {
    for (const field of Address.FIELDS) {
      const current = this.fields[field];
      const target = address.fields[field];
      if (Boolean(current) !== Boolean(target)) {
        return false;
      } else if (current && target) {
        if (current.name !== target.name) {
          return false;
        }
      }
    }
    return true;
  };
}
