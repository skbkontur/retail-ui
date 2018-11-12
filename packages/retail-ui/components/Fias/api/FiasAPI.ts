import {
  AddressObject,
  AddressValue, APIProvider,
  FiasId,
  Fields,
  House,
  AddressResponse, SearchOptions,
  SearchResponse,
  Stead,
  VerifyResponse
} from '../types';
import {Nullable} from '../../../typings/utility-types';
import abbreviations from '../constants/abbreviations';
import {Logger} from "../logger/Logger";

interface SearchQuery {
  address?: string;
  prefix?: string;
  parentFiasId?: Nullable<FiasId>;
  levels?: Fields[];
  fullAddress?: boolean;
  directParent?: boolean;
  limit?: number;
  actual?: boolean;
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

  private verifyPromise: Nullable<Promise<VerifyResponse>> = null;
  private regionsPromise: Nullable<Promise<SearchResponse>> = null;

  constructor(private baseUrl: string = '') {}

  public verify = (address: AddressValue): Promise<VerifyResponse> => {
    const query = {
      directParent: false,
      search: false
    };
    const emptyResponse = Promise.resolve([]);
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
      .catch(e => {
        Logger.log(Logger.warnings.fetchError, e.statusText);
        return emptyResponse;
      })
      .then((response: VerifyResponse) => {
        if (promise !== this.verifyPromise) {
          return emptyResponse;
        }
        return Promise.resolve(response);
      });
  };

  public search = ({ fiasId, searchText, field, parentFiasId, limit, fullAddress } : SearchOptions): Promise<SearchResponse> => {
    const query: SearchQuery = {
      prefix: searchText,
      actual: true,
      directParent: false,
      parentFiasId,
      limit,
      fullAddress
    };
    const emptyResponse = Promise.resolve([]);
    let response: Promise<SearchResponse> = emptyResponse;

    if (fiasId) {
      response = this.resolveFiasId(fiasId);
    }

    if (searchText) {
      if (!field) {
        const text = FiasAPI.trimSearchText(searchText);
        response = text
          ? this.resolveAddress(text, limit)
          : emptyResponse;
      } else {
        switch(field) {
          case Fields.region:
            response = this.searchRegions(searchText);
            break;
          case Fields.house:
            response = this.searchHouse(query);
            break;
          case Fields.stead:
            response = this.searchStead(query);
            break;
          default:
            response = this.searchAddressObject({ ...query, levels: [field] });
        }
      }
    }

    return response
      .catch(e => {
        switch (e.status) {
          case 404:
            return emptyResponse;
          default:
            Logger.log(Logger.warnings.fetchError, e.statusText);
            throw e;
        }
      });
  };

  private send = <Result>(path: string, params = {}): Promise<Result> => {
    if (!this.baseUrl) {
      return Promise.reject({
        status: 0,
        statusText: Logger.warnings.noBaseUrl
      });
    }
    return fetch(`${this.baseUrl}${path}`, {
        credentials: 'same-origin',
        method: 'GET',
        ...params
      })
      .then(result => {
        return result.ok
          ? result.json()
          : Promise.reject({
            status: result.status,
            statusText: result.statusText
          });
      });
  };

  private resolveFiasId = (fiasId: FiasId): Promise<SearchResponse> => {
    return this.send<AddressResponse>(`addresses/structural/${fiasId}`)
      .then(result => [result]);
  };

  private searchAddressObject = (
    query: SearchQuery
  ): Promise<SearchResponse> => {
    return this.send<SearchResponse>(`addresses?${FiasAPI.createQuery(query)}`);
  };

  private resolveAddress = (address: string, limit?: number, level: Fields = Fields.house): Promise<SearchResponse> => {
    return this.send<SearchResponse>(`addresses/resolve?${FiasAPI.createQuery({
      address,
      limit,
      level
    })}`);
  };

  private searchStead = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send<Stead[]>(`steads?${FiasAPI.createQuery(query)}`)
      .then(result => result.map((data: Stead) => ({
        stead: data
      }))
    );
  };

  private searchHouse = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send<House[]>(`houses?${FiasAPI.createQuery(query)}`)
      .then(result => result.map((data: House) => ({
          house: data
        }))
    );
  };

  private searchRegions = (searchText: string): Promise<SearchResponse> => {
    if (!this.regionsPromise) {
      this.regionsPromise = this.send<SearchResponse>('addresses/regions');
    }
    if (!searchText) {
      return this.regionsPromise;
    }
    const isStartsWithSearchText = (str: string) => {
      return str && str.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    };
    return this.regionsPromise.then((response: AddressResponse[]) => {
      return response.filter((address: AddressResponse) => {
        const { name, code } = address.region as AddressObject;
        return (
          isStartsWithSearchText(name) || isStartsWithSearchText(code)
        );
      });
    });
  };
}

export default FiasAPI;
