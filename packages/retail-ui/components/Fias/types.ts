export type FiasId = string;

export interface FiasEntity {
  id: string;
  fiasId: FiasId;
  parentFiasId?: FiasId;
  code: string;
}

export interface NamedAddressElement extends FiasEntity {
  name: string;
  abbreviation: string;
  level: Levels;
}

export interface Region extends NamedAddressElement {}
export interface District extends NamedAddressElement {}
export interface City extends NamedAddressElement {}
export interface Settlement extends NamedAddressElement {}
export interface PlanningStructure extends NamedAddressElement {}
export interface Street extends NamedAddressElement {}

export interface Stead extends FiasEntity {
  number: string;
  liveStatus: LiveStatuses;
}

export interface House extends FiasEntity {
  estateStatus: EstateStatuses;
  number: string;
  structureStatus?: StructureStatuses;
  structureNumber?: string;
  buildingNumber?: string;
}

export interface Room extends FiasEntity {
  flatNumber: string;
  flatType: number;
  liveStatus: LiveStatuses;
}

export enum Levels {
  Region = 'Region',
  District = 'District',
  City = 'City',
  Settlement = 'Settlement',
  PlanningStructure = 'PlanningStructure',
  Stead = 'Stead',
  Street = 'Street',
  House = 'House',
  Room = 'Room'
}

export const ADDRESS_FIELDS = Object.keys(Levels).map(key => {
  return key.charAt(0).toLowerCase() + key.slice(1);
});

export enum EstateStatuses {
  Hold = 'Hold',
  House = 'House',
  HouseHold = 'HouseHold',
  None = 'None'
}

export enum StructureStatuses {
  Structure = 'Structure',
  Construction = 'Construction',
  Liter = 'Liter',
  None = 'None'
}

// TODO: add all statuses
export enum LiveStatuses {
  Active = 'active'
}

export type AddressElement =
  | Region
  | District
  | City
  | Settlement
  | PlanningStructure
  | Street
  | Stead
  | House
  | Room
  | undefined;

export interface Address {
  [key: string]: AddressElement;
  region?: Region;
  district?: District;
  city?: City;
  settlement?: Settlement;
  street?: Street;
  house?: House;
  room?: Room;
}

export const isNamedAddressElement = (
  element: AddressElement
): element is NamedAddressElement => {
  return (element as NamedAddressElement).name !== undefined;
};

export const isHouse = (element: AddressElement): element is House => {
  return (element as House).estateStatus !== undefined;
};

export const isRoom = (element: AddressElement): element is Room => {
  return (element as Room).flatNumber !== undefined;
};

export type VerifyResponse = Array<{
  address: Address;
  isValid: boolean;
  invalidLevel?: Levels;
}>;

export interface ErrorMessages {
  [key: string]: string;
}
