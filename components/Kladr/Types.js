/* @flow */

export type PlaceDescription = {
  code: string,
  fiasGuid: string,
  name: string,
  abbreviation: string,
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
