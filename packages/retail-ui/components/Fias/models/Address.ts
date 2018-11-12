import {
  AddressValue,
  AddressResponse,
  AddressFields,
  VerifyResponse,
  AddressErrors,
  FiasId,
  FiasValue,
  Fields
} from '../types';
import { Nullable } from '../../../typings/utility-types';
import { AddressElement } from './AddressElement';
import { FiasData } from './FiasData';

export class Address {
  public static ALL_FIELDS = Object.keys(Fields) as Fields[];

  public static VERIFIABLE_FIELDS = Address.ALL_FIELDS.filter(field => (
    field !== Fields.stead && field !== Fields.room
  ));

  public static createFromResponse = (response: AddressResponse) => {
    const fields: AddressFields = {};
    if (response) {
      Address.ALL_FIELDS.forEach(field => {
        const fiasObject = response[field];
        if (fiasObject) {
          const data: FiasData = new FiasData(fiasObject);
          fields[field] = new AddressElement(field, data.name, data);
        }
      });
    }
    return new Address(fields);
  };

  public static createFromAddressValue = (addressValue: AddressValue) => {
    const fields: AddressFields = {};
    if (addressValue) {
      Address.ALL_FIELDS.forEach((field) => {
        const addressField = addressValue[field];
        if (addressField) {
          const { name, data } = addressField;
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
  ): Address => {
    const addressFields = { ...address.fields };
    const addressErrors: AddressErrors = {};

    if (response[0]) {
      const { address: verifiedFields, invalidLevel } = response[0];
      for (const field of Address.VERIFIABLE_FIELDS) {
        if (addressFields[field]) {
          const fiasObject = verifiedFields[field];
          if (fiasObject) {
            const data = new FiasData(fiasObject);
            addressFields[field] = new AddressElement(field, data.name, data);
          } else {
            delete addressFields[field]!.data;
          }
          if (invalidLevel && String(invalidLevel).toLowerCase() === field) {
            addressErrors[field] = notVerifiedMessage;
            break;
          }
        }
      }
    }
    return new Address(addressFields, addressErrors);
  };

  public static getParentFields = (field: Fields) => {
    const index = Address.ALL_FIELDS.indexOf(field);
    return index > -1 ? Address.ALL_FIELDS.slice(0, index) : [];
  };

  constructor(
    public fields: AddressFields = {},
    public errors: AddressErrors = {}
  ) {}

  public get isEmpty(): boolean {
    return !Address.ALL_FIELDS.some(field => this.fields.hasOwnProperty(field));
  }

  public get hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  public hasError(field: Fields): boolean {
    return this.errors.hasOwnProperty(field);
  }

  public getError(field: Fields): string | undefined {
    return this.errors[field];
  }

  public getAddressErrors = () => {
    return {
      ...this.errors
    };
  };

  public getText = (
    minField?: Fields,
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

  public isAllowedToFill = (field: Nullable<Fields>): boolean => {
    const { region, city, settlement, street } = this.fields;
    if (
      (field === Fields.street && !(city || settlement || (region && region.isFederalCity))) ||
      (field === Fields.stead && !(street)) ||
      (field === Fields.house && !(street))
    ) {
      return false;
    }
    return true;
  };

  public isAllowedToSearchFullAddress = (field?: Fields): boolean => {
    if (
      field === Fields.district ||
      field === Fields.city ||
      field === Fields.intracityarea ||
      field === Fields.settlement ||
      field === Fields.planningstructure
    ) {
      if (!this.getClosestParentFiasId(field)) {
        return true;
      }
    }
    return false;
  };

  public hasOnlyIndirectParent = (field: Nullable<Fields>): boolean => {
    if (field) {
      const parents = Address.getParentFields(field);
      if (parents.length > 1) {
        const directParent = this.fields[parents.pop() as Fields];
        return (
          !directParent && parents.some(parent => Boolean(this.fields[parent]))
        );
      }
    }
    return false;
  };

  public getClosestParentFiasId = (field?: Fields): FiasId | undefined => {
    if (field && !this.isEmpty) {
      const parents = Address.getParentFields(field).reverse();
      for (const parentField of parents) {
        const parent: Nullable<AddressElement> = this.fields[parentField];
        if (parent && parent.data) {
          return parent.data.fiasId;
        }
      }
    }
  };

  public getFiasId = (): FiasId => {
    if (!this.isEmpty) {
      const fields = Address.VERIFIABLE_FIELDS.reverse();
      for (const field of fields) {
        const element: Nullable<AddressElement> = this.fields[field];
        if (element && element.data) {
          return element.data.fiasId;
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
          ...(data ? { data: data.data } : {})
        }
      };
    }, {});
  };

  public getValue = (): FiasValue => {
    return {
      address: this.getAddressValue(),
      addressString: this.getText(),
      addressErrors: this.getAddressErrors(),
      fiasId: this.getFiasId(),
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
          ...element.verifiableData
        }
      };
    }, {});
  };
}

export default Address;
