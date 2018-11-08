import {
  AddressValue, APIProvider,
  Fields,
  ResponseAddress, SearchOptions,
  SearchResponse,
  VerifyResponse
} from '../types';
const addresses: SearchResponse = require('./data.json');

export class MockAPI implements APIProvider {

  public verify = async (address: AddressValue): Promise<VerifyResponse> => {
    return Promise.resolve([]);
  };

  public search = async ({ fiasId, searchText, field, parentFiasId, limit, fullAddress } : SearchOptions): Promise<SearchResponse> => {
    if (fiasId) {
      return [addresses[0]];
    }

    if (searchText) {
      if (!field) {
        return addresses;
      }
      return this.getAddresses(field, fullAddress);
    }
    return Promise.resolve([]);
  };

  private getAddresses = (field: Fields, fullAddress?: boolean): ResponseAddress[] => {
    return addresses
      .filter((address: ResponseAddress) => address[field])
      .map((address: ResponseAddress) => fullAddress ? address : {
        [field]: address[field]
      });
  }
}

export default MockAPI;
