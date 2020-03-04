import { FiasAddressElement } from './models/FiasAddressElement';
import { FiasAddress } from './models/FiasAddress';

export type FiasId = string;

export interface FiasEntity {
  id: string;
  fiasId: FiasId;
  parentFiasId?: FiasId;
  postalCode?: string;
}

export interface FiasAddressObject extends FiasEntity {
  name: string;
  abbreviation: string;
  code?: string;
}

export interface FiasStead extends FiasEntity {
  number: string;
  liveStatus: FiasLiveStatuses;
}

export interface FiasHouse extends FiasEntity {
  estateStatus: FiasEstateStatuses;
  structureStatus: FiasStructureStatuses;
  number?: string;
  structureNumber?: string;
  buildingNumber?: string;
}

export interface FiasRoom extends FiasEntity {
  flatNumber: string;
  flatType: number;
  liveStatus: FiasLiveStatuses;
}

export enum FiasEstateStatuses {
  Hold = 'Hold',
  House = 'House',
  HouseHold = 'HouseHold',
  None = 'None',
}

export enum FiasStructureStatuses {
  Structure = 'Structure',
  Construction = 'Construction',
  Liter = 'Liter',
  None = 'None',
}

export enum FiasLiveStatuses {
  active = 'active',
  inactive = 'inactive',
}

export type FiasObject = FiasAddressObject | FiasStead | FiasHouse | FiasRoom;

export enum FiasFields {
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

export enum FiasExtraFields {
  postalcode = 'postalcode',
}

export type FiasAddressFields = { [key in FiasFields]?: FiasAddressElement };

export type FiasAdditionalFields = { [key in FiasExtraFields]?: string };

export interface FiasValue {
  address: FiasAddressValue;
  addressString: string;
  addressErrors: FiasAddressErrors;
  fiasId: FiasId;
  postalCode: string;
  country?: FiasCountry;
  foreignAddress?: string;
}

export type FiasAddressValue = {
  [key in FiasFields]?: {
    name: string;
    data?: FiasObject;
  };
};

export type FiasAddressResponse = { [key in FiasFields]?: FiasObject };

export type FiasSearchResponse = FiasAddressResponse[];

export interface FiasVerifyResponse {
  address: FiasAddressResponse;
  isValid: boolean;
  invalidLevel?: FiasFields;
}

export type FiasAddressErrors = { [key in FiasFields | FiasExtraFields]?: string };

export enum FiasFormValidation {
  Error = 'Error',
  Warning = 'Warning',
  None = 'None',
}

export interface FiasSearchOptions {
  fiasId?: FiasId;
  searchText?: string;
  field?: FiasFields;
  parentFiasId?: FiasId;
  limit?: number;
  fullAddress?: boolean;
  directParent?: boolean;
}

export interface FiasAPIProvider {
  search: (options: FiasSearchOptions) => Promise<FiasAPIResult<FiasSearchResponse>>;
  searchCountry: (options: { prefix: string; limit?: number }) => Promise<FiasAPIResult<FiasCountry[]>>;
  verify: (address: FiasAddress) => Promise<FiasAPIResult<FiasVerifyResponse>>;
}

export interface FiasAPIResult<Data> {
  success: boolean;
  data?: Data;
  error?: Error;
}

export type FiasFetchFn = (
  uri: string,
  options: {
    method?: 'GET' | 'POST';
    body?: string;
  },
) => Promise<FiasFetchResponse>;

export interface FiasFetchResponse {
  ok: boolean;
  status: number;
  statusText: string;
  json: () => Promise<any>;
}

export type FiasFieldsSettings = {
  [field in FiasFields | FiasExtraFields]?: {
    visible?: boolean;
  };
};

export interface FiasCountry {
  shortName: string;
  fullName: string;
  code: string;
}
