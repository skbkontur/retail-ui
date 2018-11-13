import {
  AddressObject,
  AddressValue, APIProvider,
  FiasId,
  Fields,
  House,
  AddressResponse, SearchOptions,
  SearchResponse,
  Stead,
  VerifyResponse,
  APIResult,
  FetchFn, FetchResponse
} from '../types';
import {Nullable} from '../../../typings/utility-types';
import abbreviations from '../constants/abbreviations';
import {Logger} from '../logger/Logger';
import {APIResultFactory} from './APIResultFactory';
import xhrFetch from '../../../lib/net/fetch-cors';

interface SearchQuery {
  address?: string;
  prefix?: string;
  parentFiasId?: Nullable<FiasId>;
  levels?: Fields[];
  fullAddress?: boolean;
  directParent?: boolean;
  limit?: number;
  actual?: boolean;
  version?: string;
}

export class FiasAPI implements APIProvider {
  private static searchStopWords: { [key: string]: boolean } = Object.keys(
    abbreviations
  ).reduce((words, abbr) => {
    return {
      ...words,
      ...abbreviations[abbr]
        .split(' ')
        .reduce(
          (abbrWords, word) => ({ ...abbrWords, [word.toLowerCase()]: true }),
          {}
        )
    };
  }, {});

  private static createQuery = (query: { [key: string]: any }): string => {
    const params = [];
    for (const key of Object.keys(query)) {
      const param = query[key];
      if (param !== undefined) {
        if (key === 'levels' && Array.isArray(param)) {
          for (const level of param) {
            params.push(`level[]=${encodeURIComponent(level)}`);
          }
        } else {
          params.push(`${key}=${encodeURIComponent(param)}`);
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

  private verifyPromise: Nullable<Promise<APIResult<VerifyResponse>>> = null;
  private regionsPromise: Nullable<Promise<APIResult<SearchResponse>>> = null;

  constructor(
    private baseUrl: string = '',
    private version?: string,
    private fetchFn: FetchFn = xhrFetch,
  ) {}

  public verify = (address: AddressValue): Promise<APIResult<VerifyResponse>> => {
    const query = {
      directParent: false,
      search: false
    };
    const emptyResult = {
      success: true,
      data: []
    };
    const promise = this.send<VerifyResponse>(`verify?${FiasAPI.createQuery(query)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([address])
    });
    this.verifyPromise = promise;

    return promise
      .then(result => {
        if (promise !== this.verifyPromise) {
          return emptyResult;
        }
        return result;
      });
  };

  public search = ({ fiasId, searchText, field, parentFiasId, limit, fullAddress } : SearchOptions): Promise<APIResult<SearchResponse>> => {
    const query: SearchQuery = {
      prefix: searchText,
      actual: true,
      directParent: false,
      parentFiasId,
      limit,
      fullAddress,
      version: this.version,
    };
    const emptyResult = {
      success: true,
      status: 200,
      data: []
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
        switch(field) {
          case Fields.region:
            return this.searchRegions(searchText);
          case Fields.house:
            return this.searchHouse(query);
          case Fields.stead:
            return this.searchStead(query);
          default:
            return this.searchAddressObject({ ...query, levels: [field] });
        }
      }
    }

    return Promise.resolve(emptyResult);
  };

  private send = <Data>(path: string, params = {}): Promise<APIResult<Data>> => {
    const resultPromise = this.baseUrl
      ? this.fetchFn(`${this.baseUrl}${path}`, {
          method: 'GET',
          ...params
        })
        .then((result: FetchResponse) => {
          return result.ok
            ? result.json()
                .then((data: Data) =>
                  APIResultFactory.success<Data>(data)
                )
            : Promise.reject(new Error(Logger.warnings.fetchError));
        })
      : Promise.reject(new Error(Logger.warnings.noBaseUrl));

    return resultPromise
      .catch(({ message }) => {
        Logger.log(message);
        return APIResultFactory.fail<Data>(message);
      })
  };

  private resolveFiasId = (fiasId: FiasId): Promise<APIResult<SearchResponse>> => {
    return this.send<AddressResponse>(`addresses/structural/${fiasId}`)
      .then((result) => {
        const { success, data, error } = result;
        if (success && data) {
          return APIResultFactory.success<SearchResponse>([data]);
        } else {
          return APIResultFactory.fail<SearchResponse>(error && error.message);
        }
      });
  };

  private searchAddressObject = (
    query: SearchQuery
  ): Promise<APIResult<SearchResponse>> => {
    return this.send<SearchResponse>(`addresses?${FiasAPI.createQuery(query)}`);
  };

  private resolveAddress = (address: string, limit?: number, level: Fields = Fields.house): Promise<APIResult<SearchResponse>> => {
    return this.send<SearchResponse>(`addresses/resolve?${FiasAPI.createQuery({
      address,
      limit,
      level
    })}`);
  };

  private searchStead = (query: SearchQuery): Promise<APIResult<SearchResponse>> => {
    return this.send<Stead[]>(`steads?${FiasAPI.createQuery(query)}`)
      .then(result => {
        const { success, data, error } = result;
        if (success && data) {
          return APIResultFactory.success<SearchResponse>(
            data.map((stead: Stead) => {
              return {
                stead
              }
            })
          );
        } else {
          return APIResultFactory.fail<SearchResponse>(error && error.message);
        }
      })
  };

  private searchHouse = (query: SearchQuery): Promise<APIResult<SearchResponse>> => {
    return this.send<House[]>(`houses?${FiasAPI.createQuery(query)}`)
      .then(result => {
        const { success, data, error } = result;
        if (success && data) {
          return APIResultFactory.success<SearchResponse>(
            data.map((house: House) => {
              return {
                house
              }
            })
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

    return this.regionsPromise
      .then(result => {
        const { success, data } = result;
        if (success && data) {
          return APIResultFactory.success<SearchResponse>(
            data.filter((address: AddressResponse) => {
              const { name, code } = address.region as AddressObject;
              return (
                isStartsWithSearchText(name) || isStartsWithSearchText(code)
              );
            })
          );
        }
        return result;
      });
  };
}

export default FiasAPI;
