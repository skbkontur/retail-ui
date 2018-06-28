

export type PlaceDescription = {
  code: string,
  fiasGuid: string,
  name: string,
  abbreviation: string,
  isError: boolean
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
  building: string,
  room: string
};

export type Place =
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

export type VerifyResult = {
  address: Address,
  invalidItem: number,
  isKladrAddress: boolean
};
