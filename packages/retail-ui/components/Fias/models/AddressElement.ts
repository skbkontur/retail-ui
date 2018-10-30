import { EstateStatuses, FiasId, StructureStatuses } from '../types';
import { abbreviations } from '../constants/abbreviations';
import { Nullable } from '../../../typings/utility-types';
import { FiasData } from './FiasData';

const FEDERAL_CITIES: FiasId[] = [
  '0c5b2444-70a0-4932-980c-b4dc0d3f02b5', // Москва
  'c2deb16a-0330-4f05-821f-1d09c93331e6', // Санкт-Петербург
  '6fdecb78-893a-4e3f-a5ba-aa062459463b', // Севастополь
  '63ed1a35-4be6-4564-a1ec-0c51f7383314' // Байконур
];

export class AddressElement {
  constructor(
    public type: string,
    public name: string,
    public data?: Nullable<FiasData>
  ) {}

  public getText(withoutType: boolean = false): string {
    const { name, data } = this;
    let result = '';

    if (!name) {
      return '';
    }

    if (data) {
      const { abbreviation } = data;
      if (abbreviation) {
        const type = !withoutType
          ? abbreviations[abbreviation] || abbreviation
          : '';
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
            result = !withoutType
              ? `${this.type === 'district' ? 'поселение' : 'поселок'} ${name}`
              : `${name}`;
            break;

          default:
            result = `${type} ${name}`;
        }
      }

      if (this.type === 'stead') {
        result = ' ' + data.number;
      }

      if (this.type === 'house') {
        if (data.estateStatus !== EstateStatuses.None) {
          switch (data.estateStatus) {
            case EstateStatuses.Hold:
              result = result + ' владение';
              break;
            case EstateStatuses.House:
              result = result + ' дом';
              break;
            case EstateStatuses.HouseHold:
              result = result + ' домовладение';
              break;
          }
        }

        if (data.number) {
          result = result + ' ' + data.number;
        }

        if (
          data.structureStatus &&
          data.structureStatus !== StructureStatuses.None &&
          data.structureNumber
        ) {
          switch (data.structureStatus) {
            case StructureStatuses.Structure:
              result = result + ' строение ' + data.structureNumber;
              break;
            case StructureStatuses.Construction:
              result = result + ' cооружение ' + data.structureNumber;
              break;
            case StructureStatuses.Liter:
              result = result + ' литера ' + data.structureNumber;
              break;
          }
        }

        if (data.buildingNumber) {
          result = result + ' корпус ' + data.buildingNumber;
        }
      }

      if (this.type === 'room') {
        if (data) {
          result = `квартира ${name}`;
        } else {
          result = name;
        }
      }
    }

    return result.trim() || name;
  }

  public get isFederalCity(): boolean {
    if (!(this.data && this.data.fiasId)) {
      return false;
    }
    return FEDERAL_CITIES.includes(this.data.fiasId);
  }

  public doesTheTypeMatchTheField = (field: string): boolean => {
    const types: {
      [key: string]: string;
    } = {
      'р-н': 'district',
      г: 'city',
      нп: 'settlement',
      ул: 'street'
    };
    const { data } = this;
    if (data && data.abbreviation) {
      return types[data.abbreviation] === field;
    }
    return false;
  };

  get verifiableData(): Partial<FiasData> {
    const { type, data } = this;
    if (data) {
      const {
        name,
        abbreviation,
        number,
        structureNumber,
        buildingNumber
      } = data;
      switch (type) {
        case 'house':
          return {
            number,
            structureNumber,
            buildingNumber
          };
        default:
          return {
            name,
            abbreviation
          };
      }
    }
    return {
      name: this.name
    };
  }
}
