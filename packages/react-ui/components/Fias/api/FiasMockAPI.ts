import {
  FiasAPIProvider,
  FiasFields,
  FiasAddressResponse,
  FiasSearchOptions,
  FiasSearchResponse,
  FiasVerifyResponse,
  FiasAPIResult,
  FiasCountry,
} from '../types';
import { FiasAddress } from '../models/FiasAddress';

import { FiasAPIResultFactory } from './FiasAPIResultFactory';

const addresses: FiasSearchResponse = require('./data.json');

export class FiasMockAPI implements FiasAPIProvider {
  public verify = async (address: FiasAddress): Promise<FiasAPIResult<FiasVerifyResponse>> => {
    return Promise.resolve(
      FiasAPIResultFactory.success({
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
  }: FiasSearchOptions): Promise<FiasAPIResult<FiasSearchResponse>> => {
    let data: FiasSearchResponse = [];

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

    return Promise.resolve(FiasAPIResultFactory.success(data));
  };

  public searchCountry = async (options: FiasSearchOptions): Promise<FiasAPIResult<FiasCountry[]>> => {
    return Promise.resolve(FiasAPIResultFactory.success([]));
  };

  private getAddresses = (field: FiasFields, fullAddress?: boolean): FiasAddressResponse[] => {
    return addresses
      .filter((address: FiasAddressResponse) => address[field])
      .map((address: FiasAddressResponse) =>
        fullAddress
          ? address
          : {
              [field]: address[field],
            },
      );
  };
}
