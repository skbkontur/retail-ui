import {
  FiasId,
  AddressObject,
  House,
  Levels,
  ResponseAddress,
  SearchResponse,
  Stead,
  AddressValue,
  VerifyResponse
} from './types';
import { Nullable } from '../../typings/utility-types';
import abbreviations from './constants/abbreviations';
import warning from 'warning';

interface SearchQuery {
  [key: string]: any;
  address?: string;
  prefix?: string;
  parentFiasId?: Nullable<FiasId>;
  levels?: Levels[];
  fullAddress?: boolean;
  directParent?: boolean;
  limit?: number;
}

interface SearchOptions {
  parentFiasId?: Nullable<FiasId>;
  field?: string;
  limit?: number;
}

export class FiasAPI {
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

  public verifyPromise: Nullable<Promise<VerifyResponse>> = null;
  public regionsPromise: Nullable<Promise<SearchResponse>> = null;

  constructor(private baseUrl: string = '') {
    warning(baseUrl, '[Fias]: property "baseUrl" is required');
  }

  public verify = (address: AddressValue): Promise<VerifyResponse> => {
    const query = {
      directParent: false,
      search: false
    };
    const promise = this.send(`verify?${this.createQuery(query)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([address])
    });
    this.verifyPromise = promise;

    return promise.then((response: VerifyResponse) => {
      if (promise !== this.verifyPromise) {
        return Promise.resolve([]);
      }
      return Promise.resolve(response);
    });
  };

  public search = (
    searchText: string,
    options: SearchOptions = {}
  ): Promise<SearchResponse> => {
    const { field, parentFiasId, limit } = options;
    const query: SearchQuery = {
      prefix: searchText,
      actual: true,
      parentFiasId,
      field,
      limit
    };

    if (searchText) {
      if (!field) {
        const text = this.trimSearchText(searchText);
        return text
          ? this.resolveAddress({
              address: text,
              level: 'House',
              limit
            })
          : Promise.resolve([]);
      }

      if (field === 'region') {
        return this.searchRegions(searchText);
      }

      if (field === 'house') {
        if (parentFiasId) {
          return this.searchHouse(query);
        }
      } else if (field === 'stead') {
        if (parentFiasId) {
          return this.searchStead(query);
        }
      } else {
        query.levels = [this.getLevelFromField(field)];

        if (
          field === 'district' ||
          field === 'city' ||
          field === 'intracityarea' ||
          field === 'settlement' ||
          field === 'planningstructure'
        ) {
          if (parentFiasId) {
            query.directParent = false;
          } else {
            query.fullAddress = true;
          }
        }

        return this.searchAddressObject(query);
      }
    }
    return Promise.resolve([]);
  };

  public searchByFiasId = (fiasId: FiasId): Promise<ResponseAddress> => {
    return this.send(`addresses/structural/${fiasId}`).catch(e => undefined);
  };

  private send = (path: string, params = {}): Promise<any> => {
    if (this.baseUrl) {
      return fetch(`${this.baseUrl}${path}`, {
        credentials: 'same-origin',
        method: 'GET',
        ...params
      }).then(res => res.json());
    } else {
      return Promise.reject().catch(e => e);
    }
  };

  private searchAddressObject = (
    query: SearchQuery
  ): Promise<SearchResponse> => {
    return this.send(`addresses?${this.createQuery(query)}`);
  };

  private resolveAddress = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`addresses/resolve?${this.createQuery(query)}`);
  };

  private searchStead = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`steads?${this.createQuery(query)}`).then(data =>
      data.map((item: Stead) => ({
        stead: {
          ...item
        }
      }))
    );
  };

  private searchHouse = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`houses?${this.createQuery(query)}`).then(data =>
      data.map((item: House) => ({
        house: {
          ...item
        }
      }))
    );
  };

  private searchRegions = (searchText: string): Promise<SearchResponse> => {
    if (!this.regionsPromise) {
      this.regionsPromise = this.send('addresses/regions');
    }
    if (!searchText) {
      return this.regionsPromise;
    }
    return this.regionsPromise.then((response: ResponseAddress[]) => {
      return response.filter((address: ResponseAddress) => {
        const { name, code } = address.region as AddressObject;
        return (
          (name && name.startsWith(searchText)) ||
          (code && code.startsWith(searchText))
        );
      });
    });
  };

  private createQuery = (query: SearchQuery): string => {
    const params = [];
    for (const key of Object.keys(query)) {
      const param = query[key];
      if (param !== undefined) {
        if (key === 'levels' && Array.isArray(param)) {
          for (const level of param) {
            params.push(`level[]=${encodeURIComponent(level as string)}`);
          }
        } else {
          params.push(`${key}=${encodeURIComponent(query[key])}`);
        }
      }
    }
    return params.join('&');
  };

  private getLevelFromField = (field: string): Levels => {
    return Levels[field as keyof typeof Levels];
  };

  private trimSearchText = (searchText: string): string => {
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
}
