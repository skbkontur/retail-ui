export type FiasId = string;

export interface FiasEntity {
  id: FiasId;
  fiasId: FiasId;
  parentFiasId?: FiasId;
  code: string;
}

export interface LevelElement extends FiasEntity {
  name: string;
  abbreviation: string;
  level: Levels;
}

export interface Region extends LevelElement {}
export interface District extends LevelElement {}
export interface City extends LevelElement {}
export interface Settlement extends LevelElement {}
export interface PlanningStructure extends LevelElement {} // TODO: find examples
export interface Street extends LevelElement {}
export interface Stead extends LevelElement {} // TODO: find examples

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

// TODO: add export as array
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
  district?: LevelElement;
  city?: LevelElement;
  settlement?: LevelElement;
  street?: LevelElement;
  house?: House;
  room?: Room;
}

export const isLevelElement = (
  element: AddressElement
): element is LevelElement => {
  return (element as LevelElement).level !== undefined;
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
