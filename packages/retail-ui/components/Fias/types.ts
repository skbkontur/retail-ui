export type FiasId = string;

export interface AddressObject {
  id: string;
  code: string;
  fiasId: FiasId;
  level: Levels;

  name?: string;
  abbreviation?: string;
  parentFiasId?: FiasId;
}

export interface Stead extends AddressObject {
  number: string;
  liveStatus: LiveStatuses;
}

export interface House extends AddressObject {
  number: string;
  estateStatus: EstateStatuses;
  structureStatus?: StructureStatuses;
  structureNumber?: string;
  buildingNumber?: string;
}

export interface Room extends AddressObject {
  flatNumber: string;
  flatType: number;
  liveStatus: LiveStatuses;
}

export enum Levels {
  region = 'Region',
  district = 'District',
  city = 'City',
  settlement = 'Settlement',
  stead = 'Stead',
  street = 'Street',
  house = 'House',
  room = 'Room'
}

export const ADDRESS_FIELDS: AddressFieldName[] = Object.keys(Levels).map(
  field => field as AddressFieldName
);

export type AddressFieldName = keyof typeof Levels;

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

export type AddressElement = AddressObject | Stead | House | Room;

export interface Address {
  [key: string]: AddressElement | undefined;
  region?: AddressObject;
  district?: AddressObject;
  city?: AddressObject;
  settlement?: AddressObject;
  street?: AddressObject;
  stead?: Stead;
  house?: House;
  room?: Room;
}

export type VerifyResponse = Array<{
  address: Address;
  isValid: boolean;
  invalidLevel?: Levels;
}>;

export interface ErrorMessages {
  [key: string]: string;
}
