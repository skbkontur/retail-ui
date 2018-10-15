import {
  Address,
  ADDRESS_FIELDS,
  AddressElement,
  AddressObject,
  EstateStatuses,
  House,
  Levels,
  Room,
  Stead,
  StructureStatuses
} from './types';
import { abbreviations } from './abbreviations';
import { Nullable } from '../../typings/utility-types';

export const isAddressObject = (
  element: AddressElement
): element is AddressObject => {
  return (
    element.hasOwnProperty('name') && element.hasOwnProperty('abbreviation')
  );
};

export const isStead = (element: AddressElement): element is Stead => {
  return (
    element.hasOwnProperty('number') &&
    element.hasOwnProperty('liveStatus') &&
    !element.hasOwnProperty('estateStatus')
  );
};

export const isHouse = (element: AddressElement): element is House => {
  return (
    element.hasOwnProperty('number') && element.hasOwnProperty('estateStatus')
  );
};

export const isRoom = (element: AddressElement): element is Room => {
  return element.hasOwnProperty('flatNumber');
};

export const isEmptyAddress = (address: Nullable<Address>): boolean => {
  return !address || !ADDRESS_FIELDS.some(field => Boolean(address[field]));
};

export function getAddressElementName(element: Nullable<AddressElement>) {
  if (element) {
    if (isAddressObject(element)) {
      return element.name;
    } else if (isHouse(element) || isStead(element)) {
      return element.number;
    } else if (isRoom(element)) {
      return element.flatNumber;
    }
  }
  return '';
}

// TODO неразрывнях пробелов наставить между топонимом и его типом
export function getAddressElementText(
  element: AddressElement,
  skipTypeFor?: string
): string {
  if (!element) {
    return '';
  }

  // TODO найти все возможные аббревиатуры
  if (isAddressObject(element)) {
    const { abbreviation, name } = element;
    const type = abbreviations[abbreviation] || abbreviation;
    switch (abbreviation) {
      case 'Респ':
        return `Республика ${name}`;

      case 'Чувашия': // FIAS bug
        return `Республика Чувашия`;

      case 'АО':
        let text = `${name}`;
        if (name !== 'Ханты-Мансийский Автономный округ - Югра') {
          text += ` ${type}`;
        }
        return text;

      case 'обл':
        return `${name} ${type}`;

      case 'край':
        return `${name} ${type}`;

      case 'Аобл':
        return `${name} ${type}`;

      case 'п':
        return `${
          element.level === Levels.district ? 'Поселение' : 'Поселок'
        } ${name}`;

      case 'р-н':
        return (skipTypeFor !== 'district' ? `${type} ` : ``) + `${name}`;

      case 'г':
        return (skipTypeFor !== 'city' ? `${type} ` : ``) + `${name}`;

      case 'ул':
        return (skipTypeFor !== 'street' ? `${type} ` : ``) + `${name}`;

      default:
        return `${type} ${element.name}`;
    }
  }

  let result = '';

  if (isStead(element)) {
    result = ' ' + element.number;
  }

  if (isHouse(element)) {
    if (element.estateStatus !== EstateStatuses.None) {
      switch (element.estateStatus) {
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

    if (element.number) {
      result = result + ' ' + element.number;
    }

    if (
      element.structureStatus &&
      element.structureStatus !== StructureStatuses.None
    ) {
      const structureNumber = element.structureNumber
        ? ' ' + element.structureNumber
        : '';
      switch (element.structureStatus) {
        case StructureStatuses.Structure:
          result = result + ' строение' + structureNumber;
          break;
        case StructureStatuses.Construction:
          result = result + ' cооружение' + structureNumber;
          break;
        case StructureStatuses.Liter:
          result = result + ' литера' + structureNumber;
          break;
      }
    }

    if (element.buildingNumber) {
      result = result + ' корпус ' + element.buildingNumber;
    }
  }

  if (isRoom(element)) {
    if (element.fiasId) {
      result = `квартира ${element.flatNumber}`;
    } else {
      result = element.flatNumber;
    }
  }

  return result.trim() || getAddressElementName(element);
}

export function getFieldParents(field: string): string[] {
  return ADDRESS_FIELDS.slice(0, ADDRESS_FIELDS.indexOf(field));
}
export function getParentFiasId(
  address: Nullable<Address>,
  field: string
): string | undefined {
  if (!isEmptyAddress(address)) {
    const parents = getFieldParents(field).reverse();
    for (const parentName of parents) {
      const parent: Nullable<AddressElement> = address![parentName];
      if (parent) {
        return parent.fiasId;
      }
    }
  }
}

export function getAddressText(address: Address): string {
  if (!address) {
    return '';
  }
  const getText = (element: Nullable<AddressElement>) =>
    element && getAddressElementText(element);

  return ADDRESS_FIELDS.map(field => getText(address[field]))
    .filter(Boolean)
    .join(', ');
}
