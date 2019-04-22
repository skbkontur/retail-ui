import {
  APIProvider,
  Fields,
  AddressResponse,
  SearchOptions,
  SearchResponse,
  VerifyResponse,
  APIResult,
  FiasCountry,
} from '../types';
import { APIResultFactory } from './APIResultFactory';
import { Address } from '../models/Address';

const addresses: SearchResponse = require('./data.json');

export class MockAPI implements APIProvider {
  public verify = async (address: Address): Promise<APIResult<VerifyResponse>> => {
    return Promise.resolve(
      APIResultFactory.success({
        address: {},
        isValid: true,
      }),
    );
  };

  public search = async ({
    fiasId,
    searchText,
    field,
    parentFiasId,
    limit,
    fullAddress,
  }: SearchOptions): Promise<APIResult<SearchResponse>> => {
    let data: SearchResponse = [];

    if (fiasId) {
      data = [addresses[0]];
    }

    if (searchText) {
      if (field) {
        data = this.getAddresses(field, fullAddress);
      } else {
        data = addresses;
      }
    }

    return Promise.resolve(APIResultFactory.success(data));
  };

  public searchCountry = async (options: SearchOptions): Promise<APIResult<FiasCountry[]>> => {
    return Promise.resolve(APIResultFactory.success([]));
  };

  private getAddresses = (field: Fields, fullAddress?: boolean): AddressResponse[] => {
    return addresses.filter((address: AddressResponse) => address[field]).map(
      (address: AddressResponse) =>
        fullAddress
          ? address
          : {
              [field]: address[field],
            },
    );
  };
}

export default MockAPI;
