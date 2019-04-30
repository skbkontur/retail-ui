import { AddressElement } from './models/AddressElement';
import { defaultLocale } from './constants/locale';
import { Address } from './models/Address';

export type FiasId = string;

export interface FiasEntity {
  id: string;
  fiasId: FiasId;
  parentFiasId?: FiasId;
  postalCode?: string;
}

export interface AddressObject extends FiasEntity {
  name: string;
  abbreviation: string;
  code?: string;
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
  None = 'None',
}

export enum StructureStatuses {
  Structure = 'Structure',
  Construction = 'Construction',
  Liter = 'Liter',
  None = 'None',
}

export enum LiveStatuses {
  active = 'active',
  inactive = 'inactive',
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
  room = 'room',
}

export enum ExtraFields {
  postalcode = 'postalcode',
}

export type AddressFields = { [key in Fields]?: AddressElement };

export type AdditionalFields = { [key in ExtraFields]?: string };

export interface FiasValue {
  address: AddressValue;
  addressString: string;
  addressErrors: AddressErrors;
  fiasId: FiasId;
  postalCode: string;
  country?: FiasCountry;
  foreignAddress?: string;
}

export type AddressValue = {
  [key in Fields]?: {
    name: string;
    data?: FiasObject;
  }
};

export type AddressResponse = { [key in Fields]?: FiasObject };

export type SearchResponse = AddressResponse[];

export interface VerifyResponse {
  address: AddressResponse;
  isValid: boolean;
  invalidLevel?: Fields;
}

export type AddressErrors = { [key in Fields | ExtraFields]?: string };

export enum FormValidation {
  Error = 'Error',
  Warning = 'Warning',
  None = 'None',
}

export type FiasLocale = typeof defaultLocale;

export interface SearchOptions {
  fiasId?: FiasId;
  searchText?: string;
  field?: Fields;
  parentFiasId?: FiasId;
  limit?: number;
  fullAddress?: boolean;
  directParent?: boolean;
}

export interface APIProvider {
  search: (options: SearchOptions) => Promise<APIResult<SearchResponse>>;
  searchCountry: (options: { prefix: string; limit?: number }) => Promise<APIResult<FiasCountry[]>>;
  verify: (address: Address) => Promise<APIResult<VerifyResponse>>;
}

export interface APIResult<Data> {
  success: boolean;
  data?: Data;
  error?: Error;
}

export type FetchFn = (
  uri: string,
  options: {
    method?: 'GET' | 'POST';
    body?: string;
  },
) => Promise<FetchResponse>;

export interface FetchResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<any>;
}

export type FieldsSettings = {
  [field in Fields | ExtraFields]?: {
    visible?: boolean;
  }
};

export interface FiasCountry {
  shortName: string;
  fullName: string;
  code: string;
}
