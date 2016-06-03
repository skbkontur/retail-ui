/* @flow */

export type PlaceDescription = {
  code: string,
  fiasGuid: string,
  name: string,
  abbreviation: string,
  isError: bool,
};

export type Address = {
  region: PlaceDescription,
  district: PlaceDescription,
  city: PlaceDescription,
  settlement: PlaceDescription,
  street: PlaceDescription,
  index: string,
  okato: string,
  house: string,
  room: string,
};

export type Place =
  'region' |
  'district' |
  'city' |
  'settlement' |
  'street' |
  'index' |
  'okato' |
  'house' |
  'room';

export type VerifyResult = {
  address: Address,
  invalidItem: number,
  isKladrAddress: bool,
};
