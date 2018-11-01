import {
  FiasId,
  FiasObject,
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
  limit?: number;
  parentFiasId?: Nullable<FiasId>;
  levels?: Levels[];
  fullAddress?: boolean;
  directParent?: boolean;
}

export class FiasAPI {
  public verifyPromise: Nullable<Promise<VerifyResponse>> = null;
  private regionsPromise: Nullable<Promise<SearchResponse>> = null;

  constructor(public baseUrl: string) {
    warning(baseUrl, '[Fias]: property "baseUrl" is required');
  }

  public send = (path: string, params = {}): Promise<any> => {
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

  public verify = (address: AddressValue): Promise<VerifyResponse> => {
    const query = {
      directParent: false,
      search: false
    };
    const promise = this.send(`verify?${createQuery(query)}`, {
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
    limit?: number,
    field?: string,
    parentFiasId?: Nullable<FiasId>
  ): Promise<SearchResponse> => {
    const query: SearchQuery = {
      prefix: searchText,
      limit: limit && limit + 1,
      parentFiasId,
      actual: true
    };

    if (searchText) {
      if (!field) {
        const text = trimSearchText(searchText);
        return text
          ? this.resolveAddress({
              address: text,
              level: 'House',
              limit: query.limit
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
        query.levels = [fieldToLevel(field)];

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

  public searchAddressObject = (
    query: SearchQuery
  ): Promise<SearchResponse> => {
    return this.send(`addresses?${createQuery(query)}`);
  };

  public resolveAddress = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`addresses/resolve?${createQuery(query)}`);
  };

  public searchByFiasId = (fiasId: FiasId): Promise<ResponseAddress> => {
    return this.send(`addresses/structural/${fiasId}`).catch(e => undefined);
  };

  public searchStead = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`steads?${createQuery(query)}`).then(data =>
      data.map((item: Stead) => ({
        stead: {
          ...item
        }
      }))
    );
  };

  public searchHouse = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`houses?${createQuery(query)}`).then(data =>
      data.map((item: House) => ({
        house: {
          ...item
        }
      }))
    );
  };

  public searchRegions = (searchText: string): Promise<SearchResponse> => {
    if (!this.regionsPromise) {
      this.regionsPromise = this.send('addresses/regions');
    }
    if (searchText) {
      return this.regionsPromise.then(filterRegions(searchText));
    } else {
      return this.regionsPromise;
    }
  };
}

function isStartMatch(value: string | undefined, searchText: string) {
  return value && value.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
}

function filterRegions(searchText: string) {
  return (list: ResponseAddress[]) =>
    list.filter((address: ResponseAddress) => {
      const region: FiasObject = address.region as AddressObject;
      return (
        isStartMatch(region.name, searchText) ||
        isStartMatch(region.code, searchText)
      );
    });
}

function createQuery(query: SearchQuery): string {
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
}

const searchStopWords: { [key: string]: boolean } = Object.keys(
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

function trimSearchText(searchText: string): string {
  return searchText
    .toLowerCase()
    .replace(/югра/g, '')
    .replace(/(строение|сооружение|литера)\s[а-я\w]+/g, '')
    .replace(/\s-\s/g, ' ')
    .replace(/[,]/g, '')
    .replace(/\s[\s]*/g, ' ')
    .split(' ')
    .filter(word => !Boolean(searchStopWords[word]))
    .slice(0, 6)
    .join(' ');
}

function fieldToLevel(field: string): Levels {
  return Levels[field as keyof typeof Levels];
}
