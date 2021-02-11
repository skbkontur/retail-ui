import {
  FiasAddressObject,
  FiasAddressResponse,
  FiasAPIProvider,
  FiasAPIResult,
  FiasFetchFn,
  FiasFetchResponse,
  FiasCountry,
  FiasId,
  FiasFields,
  FiasHouse,
  FiasRoom,
  FiasSearchOptions,
  FiasSearchResponse,
  FiasStead,
  FiasVerifyResponse,
} from '../types';
import { abbreviations } from '../constants/abbreviations';
import { FiasLogger } from '../logger/FiasLogger';
import { fetch } from '../../../lib/net/fetch';
import { FiasAddress } from '../models/FiasAddress';

import { FiasAPIResultFactory } from './FiasAPIResultFactory';

interface FiasSearchQuery {
  [key: string]: string | number | boolean | FiasId | FiasFields[] | undefined;
  address?: string;
  prefix?: string;
  parentFiasId?: FiasId;
  levels?: FiasFields[];
  fullAddress?: boolean;
  directParent?: boolean;
  limit?: number;
  actual?: boolean;
  version?: string;
}

export class FiasAPI implements FiasAPIProvider {
  private static searchStopWords: { [key: string]: boolean } = Object.keys(abbreviations).reduce((words, abbr) => {
    return {
      ...words,
      ...abbreviations[abbr].split(' ').reduce((abbrWords, word) => ({ ...abbrWords, [word.toLowerCase()]: true }), {}),
    };
  }, {});

  private static createQuery = (query: FiasSearchQuery): string => {
    const params = [];
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const param = query[key];
        if (param !== undefined) {
          if (key === 'levels' && Array.isArray(param)) {
            for (const level of param) {
              params.push(`level[]=${encodeURIComponent(level)}`);
            }
          } else {
            params.push(`${key}=${encodeURIComponent(`${param}`)}`);
          }
        }
      }
    }
    return params.join('&');
  };

  private static trimSearchText = (searchText: string): string => {
    return searchText
      .toLowerCase()
      .replace(/югра/g, '')
      .replace(/(строение|сооружение|литера)\s[а-я\w]+/g, '')
      .replace(/\s-\s/g, ' ')
      .replace(/[,]/g, '')
      .replace(/\s[\s]*/g, ' ')
      .split(' ')
      .filter(word => !FiasAPI.searchStopWords[word])
      .slice(0, 6)
      .join(' ');
  };

  private regionsPromise: Promise<FiasAPIResult<FiasSearchResponse>> | null = null;

  constructor(private baseUrl: string = '', private version?: string, private fetchFn: FiasFetchFn = fetch) {}

  public verify = (address: FiasAddress): Promise<FiasAPIResult<FiasVerifyResponse>> => {
    const query = {
      directParent: true,
      search: false,
      version: this.version,
    };
    return this.send<FiasVerifyResponse[]>(`verify?${FiasAPI.createQuery(query)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([address.convertForVerification()]),
    }).then(({ success, data, error }: FiasAPIResult<FiasVerifyResponse[]>) => {
      if (success && data) {
        const { address: verifiedAddress = {}, isValid = false, invalidLevel }: FiasVerifyResponse = data[0] || {};
        return FiasAPIResultFactory.success<FiasVerifyResponse>({
          address: verifiedAddress,
          isValid,
          ...(invalidLevel ? { invalidLevel: invalidLevel.toLowerCase() as FiasFields } : {}),
        });
      } else {
        return FiasAPIResultFactory.fail<FiasVerifyResponse>(error && error.message);
      }
    });
  };

  public search = ({
    fiasId,
    searchText,
    field,
    parentFiasId,
    limit,
    fullAddress,
    directParent,
  }: FiasSearchOptions): Promise<FiasAPIResult<FiasSearchResponse>> => {
    const query: FiasSearchQuery = {
      prefix: searchText,
      actual: true,
      parentFiasId,
      limit,
      fullAddress,
      directParent,
      version: this.version,
    };
    const emptyResult = {
      success: true,
      status: 200,
      data: [],
    };

    if (fiasId) {
      return this.resolveFiasId(fiasId);
    }

    if (searchText) {
      if (!field) {
        const text = FiasAPI.trimSearchText(searchText);
        if (text) {
          return this.resolveAddress(text, limit);
        }
      } else {
        switch (field) {
          case FiasFields.region:
            return this.searchRegions(searchText);
          case FiasFields.house:
            return this.searchHouse(query);
          case FiasFields.stead:
            return this.searchStead(query);
          case FiasFields.room:
            return this.searchRoom(query);
          default:
            return this.searchAddressObject({ ...query, levels: [field] });
        }
      }
    }

    return Promise.resolve(emptyResult);
  };

  public searchCountry = (query: { prefix: string; limit?: number }): Promise<FiasAPIResult<FiasCountry[]>> => {
    return this.send(`countries?${FiasAPI.createQuery(query)}`);
  };

  private send = <Data>(path: string, params = {}): Promise<FiasAPIResult<Data>> => {
    const resultPromise = this.baseUrl
      ? this.fetchFn(`${this.baseUrl}${path}`, {
          method: 'GET',
          ...params,
        }).then((result: FiasFetchResponse) => {
          return result.ok
            ? result.json().then((data: Data) => FiasAPIResultFactory.success<Data>(data))
            : Promise.reject(new Error(FiasLogger.warnings.fetchError));
        })
      : Promise.reject(new Error(FiasLogger.warnings.noBaseUrl));

    return resultPromise.catch(({ message }) => {
      FiasLogger.log(message);
      return FiasAPIResultFactory.fail<Data>(message);
    });
  };

  private resolveFiasId = (fiasId: FiasId): Promise<FiasAPIResult<FiasSearchResponse>> => {
    const query = {
      version: this.version,
    };
    return this.send<FiasAddressResponse>(`addresses/structural/${fiasId}?${FiasAPI.createQuery(query)}`).then(
      result => {
        const { success, data, error } = result;
        if (success && data) {
          return FiasAPIResultFactory.success<FiasSearchResponse>([data]);
        } else {
          return FiasAPIResultFactory.fail<FiasSearchResponse>(error && error.message);
        }
      },
    );
  };

  private searchAddressObject = (query: FiasSearchQuery): Promise<FiasAPIResult<FiasSearchResponse>> => {
    return this.send<FiasSearchResponse>(`addresses?${FiasAPI.createQuery(query)}`);
  };

  private resolveAddress = (
    address: string,
    limit?: number,
    level: FiasFields = FiasFields.house,
  ): Promise<FiasAPIResult<FiasSearchResponse>> => {
    return this.send<FiasSearchResponse>(
      `addresses/resolve?${FiasAPI.createQuery({
        address,
        limit,
        level,
        version: this.version,
      })}`,
    );
  };

  private searchStead = (query: FiasSearchQuery): Promise<FiasAPIResult<FiasSearchResponse>> => {
    return this.send<FiasStead[]>(`steads?${FiasAPI.createQuery(query)}`).then(result => {
      const { success, data, error } = result;
      if (success && data) {
        return FiasAPIResultFactory.success<FiasSearchResponse>(
          data.map((stead: FiasStead) => {
            return {
              stead,
            };
          }),
        );
      } else {
        return FiasAPIResultFactory.fail<FiasSearchResponse>(error && error.message);
      }
    });
  };

  private searchHouse = (query: FiasSearchQuery): Promise<FiasAPIResult<FiasSearchResponse>> => {
    return this.send<FiasHouse[]>(`houses?${FiasAPI.createQuery(query)}`).then(result => {
      const { success, data, error } = result;
      if (success && data) {
        return FiasAPIResultFactory.success<FiasSearchResponse>(
          data.map((house: FiasHouse) => {
            return {
              house,
            };
          }),
        );
      } else {
        return FiasAPIResultFactory.fail<FiasSearchResponse>(error && error.message);
      }
    });
  };

  private searchRoom = (query: FiasSearchQuery): Promise<FiasAPIResult<FiasSearchResponse>> => {
    return this.send<FiasRoom[]>(`rooms?${FiasAPI.createQuery(query)}`).then(result => {
      const { success, data, error } = result;
      if (success && data) {
        return FiasAPIResultFactory.success<FiasSearchResponse>(
          data.map((room: FiasRoom) => {
            return {
              room,
            };
          }),
        );
      } else {
        return FiasAPIResultFactory.fail<FiasSearchResponse>(error && error.message);
      }
    });
  };

  private searchRegions = (searchText: string): Promise<FiasAPIResult<FiasSearchResponse>> => {
    if (!this.regionsPromise) {
      this.regionsPromise = this.send<FiasSearchResponse>('addresses/regions');
    }
    if (!searchText) {
      return this.regionsPromise;
    }

    const isStartsWithSearchText = (str: string) => {
      return str && str.toLowerCase().includes(searchText.toLowerCase());
    };

    return this.regionsPromise.then(result => {
      const { success, data } = result;
      if (success && data) {
        return FiasAPIResultFactory.success<FiasSearchResponse>(
          data.filter((address: FiasAddressResponse) => {
            const { name, code = '' } = address.region as FiasAddressObject;
            return isStartsWithSearchText(name) || isStartsWithSearchText(code);
          }),
        );
      }
      return result;
    });
  };
}
