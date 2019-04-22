import {
  AddressObject,
  APIProvider,
  FiasId,
  Fields,
  House,
  AddressResponse,
  SearchOptions,
  SearchResponse,
  Stead,
  Room,
  VerifyResponse,
  APIResult,
  FetchFn,
  FetchResponse,
  FiasCountry,
} from '../types';
import abbreviations from '../constants/abbreviations';
import { Logger } from '../logger/Logger';
import { APIResultFactory } from './APIResultFactory';
import xhrFetch from '../../../lib/net/fetch-cors';
import { Address } from '../models/Address';

interface SearchQuery {
  [key: string]: string | number | boolean | FiasId | Fields[] | undefined;
  address?: string;
  prefix?: string;
  parentFiasId?: FiasId;
  levels?: Fields[];
  fullAddress?: boolean;
  directParent?: boolean;
  limit?: number;
  actual?: boolean;
  version?: string;
}

export class FiasAPI implements APIProvider {
  private static searchStopWords: { [key: string]: boolean } = Object.keys(abbreviations).reduce((words, abbr) => {
    return {
      ...words,
      ...abbreviations[abbr].split(' ').reduce((abbrWords, word) => ({ ...abbrWords, [word.toLowerCase()]: true }), {}),
    };
  }, {});

  private static createQuery = (query: SearchQuery): string => {
    const params = [];
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
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
      .filter(word => !Boolean(FiasAPI.searchStopWords[word]))
      .slice(0, 6)
      .join(' ');
  };

  private regionsPromise: Promise<APIResult<SearchResponse>> | null = null;

  constructor(private baseUrl: string = '', private version?: string, private fetchFn: FetchFn = xhrFetch) {}

  public verify = (address: Address): Promise<APIResult<VerifyResponse>> => {
    const query = {
      directParent: false,
      search: false,
    };
    return this.send<VerifyResponse[]>(`verify?${FiasAPI.createQuery(query)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([address.convertForVerification()]),
    }).then(({ success, data, error }: APIResult<VerifyResponse[]>) => {
      if (success && data) {
        const { address: verifiedAddress = {}, isValid = false, invalidLevel }: VerifyResponse = data[0] || {};
        return APIResultFactory.success<VerifyResponse>({
          address: verifiedAddress,
          isValid,
          ...(invalidLevel ? { invalidLevel: invalidLevel.toLowerCase() as Fields } : {}),
        });
      } else {
        return APIResultFactory.fail<VerifyResponse>(error && error.message);
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
  }: SearchOptions): Promise<APIResult<SearchResponse>> => {
    const query: SearchQuery = {
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
          case Fields.region:
            return this.searchRegions(searchText);
          case Fields.house:
            return this.searchHouse(query);
          case Fields.stead:
            return this.searchStead(query);
          case Fields.room:
            return this.searchRoom(query);
          default:
            return this.searchAddressObject({ ...query, levels: [field] });
        }
      }
    }

    return Promise.resolve(emptyResult);
  };

  public searchCountry = (query: { prefix: string; limit?: number }): Promise<APIResult<FiasCountry[]>> => {
    return this.send(`countries?${FiasAPI.createQuery(query)}`);
  };

  private send = <Data>(path: string, params = {}): Promise<APIResult<Data>> => {
    const resultPromise = this.baseUrl
      ? this.fetchFn(`${this.baseUrl}${path}`, {
          method: 'GET',
          ...params,
        }).then((result: FetchResponse) => {
          return result.ok
            ? result.json().then((data: Data) => APIResultFactory.success<Data>(data))
            : Promise.reject(new Error(Logger.warnings.fetchError));
        })
      : Promise.reject(new Error(Logger.warnings.noBaseUrl));

    return resultPromise.catch(({ message }) => {
      Logger.log(message);
      return APIResultFactory.fail<Data>(message);
    });
  };

  private resolveFiasId = (fiasId: FiasId): Promise<APIResult<SearchResponse>> => {
    return this.send<AddressResponse>(`addresses/structural/${fiasId}`).then(result => {
      const { success, data, error } = result;
      if (success && data) {
        return APIResultFactory.success<SearchResponse>([data]);
      } else {
        return APIResultFactory.fail<SearchResponse>(error && error.message);
      }
    });
  };

  private searchAddressObject = (query: SearchQuery): Promise<APIResult<SearchResponse>> => {
    return this.send<SearchResponse>(`addresses?${FiasAPI.createQuery(query)}`);
  };

  private resolveAddress = (
    address: string,
    limit?: number,
    level: Fields = Fields.house,
  ): Promise<APIResult<SearchResponse>> => {
    return this.send<SearchResponse>(
      `addresses/resolve?${FiasAPI.createQuery({
        address,
        limit,
        level,
      })}`,
    );
  };

  private searchStead = (query: SearchQuery): Promise<APIResult<SearchResponse>> => {
    return this.send<Stead[]>(`steads?${FiasAPI.createQuery(query)}`).then(result => {
      const { success, data, error } = result;
      if (success && data) {
        return APIResultFactory.success<SearchResponse>(
          data.map((stead: Stead) => {
            return {
              stead,
            };
          }),
        );
      } else {
        return APIResultFactory.fail<SearchResponse>(error && error.message);
      }
    });
  };

  private searchHouse = (query: SearchQuery): Promise<APIResult<SearchResponse>> => {
    return this.send<House[]>(`houses?${FiasAPI.createQuery(query)}`).then(result => {
      const { success, data, error } = result;
      if (success && data) {
        return APIResultFactory.success<SearchResponse>(
          data.map((house: House) => {
            return {
              house,
            };
          }),
        );
      } else {
        return APIResultFactory.fail<SearchResponse>(error && error.message);
      }
    });
  };

  private searchRoom = (query: SearchQuery): Promise<APIResult<SearchResponse>> => {
    return this.send<Room[]>(`rooms?${FiasAPI.createQuery(query)}`).then(result => {
      const { success, data, error } = result;
      if (success && data) {
        return APIResultFactory.success<SearchResponse>(
          data.map((room: Room) => {
            return {
              room,
            };
          }),
        );
      } else {
        return APIResultFactory.fail<SearchResponse>(error && error.message);
      }
    });
  };

  private searchRegions = (searchText: string): Promise<APIResult<SearchResponse>> => {
    if (!this.regionsPromise) {
      this.regionsPromise = this.send<SearchResponse>('addresses/regions');
    }
    if (!searchText) {
      return this.regionsPromise;
    }

    const isStartsWithSearchText = (str: string) => {
      return str && str.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    };

    return this.regionsPromise.then(result => {
      const { success, data } = result;
      if (success && data) {
        return APIResultFactory.success<SearchResponse>(
          data.filter((address: AddressResponse) => {
            const { name, code = '' } = address.region as AddressObject;
            return isStartsWithSearchText(name) || isStartsWithSearchText(code);
          }),
        );
      }
      return result;
    });
  };
}

export default FiasAPI;
