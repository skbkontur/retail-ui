import { FiasEstateStatuses, FiasId, FiasFields, FiasStructureStatuses, FiasObject } from '../types';
import { abbreviations } from '../constants/abbreviations';

import { FiasData } from './FiasData';

export class FiasAddressElement {
  // Types (abbrevs) that match fields labels
  private static MATCHING_TYPES: {
    [key: string]: FiasFields;
  } = {
    'р-н': FiasFields.district,
    г: FiasFields.city,
    нп: FiasFields.settlement,
    ул: FiasFields.street,
  };

  private static FEDERAL_CITIES: FiasId[] = [
    '0c5b2444-70a0-4932-980c-b4dc0d3f02b5', // Москва
    'c2deb16a-0330-4f05-821f-1d09c93331e6', // Санкт-Петербург
    '6fdecb78-893a-4e3f-a5ba-aa062459463b', // Севастополь
    '63ed1a35-4be6-4564-a1ec-0c51f7383314', // Байконур
  ];

  constructor(public type: FiasFields, public name: string, public data?: FiasData) {}

  public get isFederalCity(): boolean {
    if (!this.fiasId) {
      return false;
    }
    return FiasAddressElement.FEDERAL_CITIES.includes(this.fiasId);
  }

  public get fiasData(): FiasObject | undefined {
    if (this.data && this.data.data) {
      return this.data.data;
    }
  }

  public get fiasId(): FiasId | undefined {
    if (this.data) {
      return this.data.fiasId;
    }
  }

  public getText(withoutType = false): string {
    const { name, data } = this;
    let result = '';

    if (!name) {
      return '';
    }

    if (data) {
      const { abbreviation } = data;
      if (abbreviation) {
        const type = !withoutType ? abbreviations[abbreviation] || abbreviation : '';
        switch (abbreviation) {
          case 'Чувашия':
            result = `${type} Чувашия`;
            break;

          case 'АО': {
            let text = name;
            if (name !== 'Ханты-Мансийский Автономный округ - Югра') {
              text += ` ${type}`;
            }
            result = text;
            break;
          }

          case 'Аобл':
          case 'край':
          case 'обл':
            result = `${name} ${type}`;
            break;

          case 'п':
            result = !withoutType
              ? `${this.type === FiasFields.district ? 'поселение' : 'поселок'} ${name}`
              : `${name}`;
            break;

          default:
            result = `${type} ${name}`;
        }
      }

      if (this.type === FiasFields.stead) {
        result = ' ' + data.number;
      }

      if (this.type === FiasFields.house) {
        if (data.estateStatus !== FiasEstateStatuses.None) {
          switch (data.estateStatus) {
            case FiasEstateStatuses.Hold:
              result = `${result} владение`;
              break;
            case FiasEstateStatuses.House:
              result = `${result} дом`;
              break;
            case FiasEstateStatuses.HouseHold:
              result = `${result} домовладение`;
              break;
          }
        }

        if (data.number) {
          result = `${result} ${data.number}`;
        }

        if (data.structureStatus && data.structureStatus !== FiasStructureStatuses.None && data.structureNumber) {
          switch (data.structureStatus) {
            case FiasStructureStatuses.Structure:
              result = `${result} строение ${data.structureNumber}`;
              break;
            case FiasStructureStatuses.Construction:
              result = `${result} cооружение ${data.structureNumber}`;
              break;
            case FiasStructureStatuses.Liter:
              result = `${result} литера ${data.structureNumber}`;
              break;
          }
        }

        if (data.buildingNumber) {
          result = `${result} корпус ${data.buildingNumber}`;
        }
      }

      if (this.type === FiasFields.room) {
        if (data) {
          result = `квартира ${name}`;
        } else {
          result = name;
        }
      }
    }

    return result.trim() || name;
  }

  public isTypeMatchField = (field: FiasFields): boolean => {
    const { data } = this;
    if (data && data.abbreviation) {
      return FiasAddressElement.MATCHING_TYPES[data.abbreviation] === field;
    }
    return false;
  };

  get verifiableData(): Partial<FiasData> {
    const { type, data } = this;
    if (data) {
      const { name, abbreviation, number, structureNumber, buildingNumber, structureStatus } = data;
      switch (type) {
        case FiasFields.house:
          return {
            number,
            structureNumber,
            structureStatus,
            buildingNumber,
          };
        default:
          return {
            name,
            abbreviation,
          };
      }
    }
    return {
      name: this.name,
    };
  }

  public removeData = () => {
    delete this.data;
  };

  public isEqualTo = (element: FiasAddressElement | undefined): boolean => {
    if (element && element.fiasId) {
      return this.fiasId === element.fiasId;
    }
    return false;
  };
}
