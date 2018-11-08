import { AddressElement } from './models/AddressElement';
import { Nullable } from '../../typings/utility-types';
import {defaultLocale} from "./constants/locale";

export type FiasId = string;

export interface FiasEntity {
  id: string;
  fiasId: FiasId;
  parentFiasId?: FiasId;
}

export interface AddressObject extends FiasEntity {
  name: string;
  abbreviation: string;
  code: string;
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

export enum LiveStatuses {
  active = 'active',
  inactive = 'inactive'
}

export type FiasObject = AddressObject | Stead | House | Room;

export enum Fields {
  region = 'region',
  district = 'district',
  city = 'city',
  intracityarea = 'intracityarea',
  settlement = 'settlement',
  planningstructure = 'planningstructure',
  street = 'street',
  stead = 'stead',
  house = 'house',
  room = 'room'
}

export type AddressFields = {
  [key in Fields]?: Nullable<AddressElement>;
}

export interface FiasValue {
  address?: AddressValue;
  addressString?: string;
  fiasId?: FiasId;
  errorMessages?: ErrorMessages;
}

export type AddressValue = {
  [key in Fields]?: {
    name: string;
    data?: FiasObject;
  };
}

export type ResponseAddress = {
  [key in Fields]?: FiasObject;
}

export type SearchResponse = ResponseAddress[];

export type VerifyResponse = Array<{
  address: ResponseAddress;
  isValid: boolean;
  invalidLevel?: string;
}>;

export type ErrorMessages = {
  [key in Fields]?: string;
}

export type FormValidation = 'Error' | 'Warning' | 'None';

export type FiasLocale = typeof defaultLocale;

export interface SearchOptions {
  fiasId?: FiasId;
  searchText?: string;
  field?: Fields;
  parentFiasId?: FiasId;
  limit?: number;
  fullAddress?: boolean;
}

export interface APIProvider {
  search: (options: SearchOptions) => Promise<SearchResponse>;
  verify: (address: AddressValue) => Promise<VerifyResponse>;
}
