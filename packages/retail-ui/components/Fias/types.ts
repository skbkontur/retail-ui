import { AddressElement } from './models/AddressElement';
import { Nullable } from '../../typings/utility-types';

export type FiasId = string;

export interface FiasEntity {
  id: string;
  fiasId: FiasId;
  parentFiasId?: FiasId;
}

export interface AddressObject extends FiasEntity {
  level: Levels;
  name: string;
  abbreviation: string;
  code: string;
}

export enum Levels {
  region = 'Region',
  district = 'District',
  city = 'City',
  settlement = 'Settlement',
  planningstructure = 'PlanningStructure',
  stead = 'Stead',
  street = 'Street',
  house = 'House',
  room = 'Room'
}

export interface Stead extends FiasEntity {
  number: string;
  liveStatus: LiveStatuses;
}

export interface House extends FiasEntity {
  estateStatus: EstateStatuses;
  structureStatus: StructureStatuses;
  number?: string;
  structureNumber?: string;
  buildingNumber?: string;
}

export interface Room extends FiasEntity {
  flatNumber: string;
  flatType: number;
  liveStatus: LiveStatuses;
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

export type FiasObject = AddressObject | Stead | House | Room;

export interface AddressFields {
  [key: string]: Nullable<AddressElement>;
}

export interface FiasValue {
  address: ValueAddress;
  errorMessages?: ErrorMessages;
}

export interface ValueAddress {
  [key: string]: {
    name: string;
    data?: FiasObject;
  };
}

export interface ResponseAddress {
  [key: string]: FiasObject;
}

export type SearchResponse = ResponseAddress[];

export type VerifyResponse = Array<{
  address: ResponseAddress;
  isValid: boolean;
  invalidLevel?: Levels;
}>;

export interface ErrorMessages {
  [key: string]: string;
}
