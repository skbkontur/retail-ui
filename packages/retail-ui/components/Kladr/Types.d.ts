import { Nullable } from '../../typings/utility-types';

export interface PlaceDescription {
  code: string;
  fiasGuid: string;
  name: string;
  abbreviation: string;
  isError: boolean;
}

export interface Address {
  region: Nullable<PlaceDescription>;
  district: Nullable<PlaceDescription>;
  city: Nullable<PlaceDescription>;
  settlement: Nullable<PlaceDescription>;
  street: Nullable<PlaceDescription>;
  index: Nullable<string>;
  okato: Nullable<string>;
  house: Nullable<string>;
  building: Nullable<string>;
  room: Nullable<string>;
}

export declare type Place =
  | 'region'
  | 'district'
  | 'city'
  | 'settlement'
  | 'street'
  | 'index'
  | 'okato'
  | 'house'
  | 'building'
  | 'room';

export interface VerifyResult {
  address: Address;
  invalidItem: number;
  isKladrAddress: boolean;
}
