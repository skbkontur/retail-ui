import { EstateStatuses, FiasId, Fields, StructureStatuses, FiasObject } from '../types';
import { abbreviations } from '../constants/abbreviations';
import { FiasData } from './FiasData';

export class AddressElement {
  // Types (abbrevs) that match fields labels
  private static MATCHING_TYPES: {
    [key: string]: Fields;
  } = {
    'р-н': Fields.district,
    г: Fields.city,
    нп: Fields.settlement,
    ул: Fields.street,
  };

  private static FEDERAL_CITIES: FiasId[] = [
    '0c5b2444-70a0-4932-980c-b4dc0d3f02b5', // Москва
    'c2deb16a-0330-4f05-821f-1d09c93331e6', // Санкт-Петербург
    '6fdecb78-893a-4e3f-a5ba-aa062459463b', // Севастополь
    '63ed1a35-4be6-4564-a1ec-0c51f7383314', // Байконур
  ];

  constructor(public type: Fields, public name: string, public data?: FiasData) {}

  public get isFederalCity(): boolean {
    if (!this.fiasId) {
      return false;
    }
    return AddressElement.FEDERAL_CITIES.indexOf(this.fiasId) > -1;
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

  public getText(withoutType: boolean = false): string {
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

          case 'АО':
            let text = `${name}`;
            if (name !== 'Ханты-Мансийский Автономный округ - Югра') {
              text += ` ${type}`;
            }
            result = text;
            break;

          case 'Аобл':
          case 'край':
          case 'обл':
            result = `${name} ${type}`;
            break;

          case 'п':
            result = !withoutType ? `${this.type === Fields.district ? 'поселение' : 'поселок'} ${name}` : `${name}`;
            break;

          default:
            result = `${type} ${name}`;
        }
      }

      if (this.type === Fields.stead) {
        result = ' ' + data.number;
      }

      if (this.type === Fields.house) {
        if (data.estateStatus !== EstateStatuses.None) {
          switch (data.estateStatus) {
            case EstateStatuses.Hold:
              result = `${result} владение`;
              break;
            case EstateStatuses.House:
              result = `${result} дом`;
              break;
            case EstateStatuses.HouseHold:
              result = `${result} домовладение`;
              break;
          }
        }

        if (data.number) {
          result = `${result} ${data.number}`;
        }

        if (data.structureStatus && data.structureStatus !== StructureStatuses.None && data.structureNumber) {
          switch (data.structureStatus) {
            case StructureStatuses.Structure:
              result = `${result} строение ${data.structureNumber}`;
              break;
            case StructureStatuses.Construction:
              result = `${result} cооружение ${data.structureNumber}`;
              break;
            case StructureStatuses.Liter:
              result = `${result} литера ${data.structureNumber}`;
              break;
          }
        }

        if (data.buildingNumber) {
          result = `${result} корпус ${data.buildingNumber}`;
        }
      }

      if (this.type === Fields.room) {
        if (data) {
          result = `квартира ${name}`;
        } else {
          result = name;
        }
      }
    }

    return result.trim() || name;
  }

  public isTypeMatchField = (field: Fields): boolean => {
    const { data } = this;
    if (data && data.abbreviation) {
      return AddressElement.MATCHING_TYPES[data.abbreviation] === field;
    }
    return false;
  };

  get verifiableData(): Partial<FiasData> {
    const { type, data } = this;
    if (data) {
      const { name, abbreviation, number, structureNumber, buildingNumber, structureStatus } = data;
      switch (type) {
        case Fields.house:
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
}
