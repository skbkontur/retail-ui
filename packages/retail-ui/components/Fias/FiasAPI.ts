import {
  FiasId,
  House,
  Levels,
  Stead,
  SearchResponse,
  VerifyResponse,
  ValueAddress,
  ResponseAddress,
  FiasObject,
  AddressObject
} from './types';
import { Nullable } from '../../typings/utility-types';

interface SearchQuery {
  [key: string]: any;
  address?: string;
  prefix?: string;
  limit?: number;
  parentFiasId?: Nullable<FiasId>;
  level?: Levels;
  fullAddress?: boolean;
  directParent?: boolean;
}

const BASE_URL = 'https://api.kontur.ru/fias/v1/';

export class FiasAPI {
  private regionsPromise: Nullable<Promise<SearchResponse>> = null;

  constructor(public baseUrl: string = BASE_URL) {}

  public send = (path: string, params = {}): Promise<any> => {
    return fetch(`${this.baseUrl}${path}`, {
      credentials: 'same-origin',
      method: 'GET',
      ...params
    }).then(res => res.json());
  };

  public verify = (address: ValueAddress): Promise<VerifyResponse> => {
    delete address.room;
    const query = {
      directParent: false,
      search: false
    };
    return this.send(`verify?${createQuery(query)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([address])
    });
  };

  public search = (
    searchText: string,
    limit?: number,
    level?: Levels,
    parentFiasId?: Nullable<FiasId>
  ): Promise<SearchResponse> => {
    const query: SearchQuery = {
      prefix: searchText,
      limit: limit && limit + 1,
      parentFiasId,
      level,
      actual: false
    };

    if (!level && searchText) {
      return this.resolveAddress({
        address: trimSearchText(searchText),
        limit: query.limit
      });
    }

    if (level === Levels.region) {
      return this.searchRegions(searchText);
    }

    if (
      level === Levels.district ||
      level === Levels.city ||
      level === Levels.settlement ||
      level === Levels.planningstructure
    ) {
      if (parentFiasId) {
        query.directParent = false;
      } else {
        query.fullAddress = true;
      }
    }

    if (searchText && level) {
      if (parentFiasId) {
        // if (level === Levels.room) {
        //   return this.searchRooms(query);
        // }
        if (level === Levels.house) {
          return this.searchHouse(query);
        }
        if (level === Levels.stead) {
          return this.searchStead(query);
        }
      }
      return this.searchAddressObject(query, level);
    } else {
      return Promise.resolve([]);
    }
  };

  public searchAddressObject = (
    query: SearchQuery,
    level: Levels
  ): Promise<SearchResponse> => {
    return this.send(`addresses?${createQuery(query)}`).then(
      data => data.filter((item: ResponseAddress) => item[level.toLowerCase()])
      // data.map((address: ResponseAddress) => Address.createFromResponse(address))
    );
  };

  public resolveAddress = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`addresses/resolve?${createQuery(query)}`);
  };

  public searchStead = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`steads?${createQuery(query)}`).then(data =>
      data.map((item: Stead) => ({
        stead: {
          ...item,
          level: Levels.stead
        }
      }))
    );
  };

  public searchHouse = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`houses?${createQuery(query)}`).then(data =>
      data.map((item: House) => ({
        house: {
          ...item,
          level: Levels.house
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
  for (const key in query) {
    if (query.hasOwnProperty(key) && query[key] !== undefined) {
      if (key === 'level') {
        params.push(`${key}[]=${encodeURIComponent(query[key] as string)}`);
      } else {
        params.push(`${key}=${encodeURIComponent(query[key])}`);
      }
    }
  }
  return params.join('&');
}

function trimSearchText(searchText: string): string {
  return searchText
    .toLowerCase()
    .replace(/[,]/g, '')
    .replace(/\s[\s]*/g, ' ');
}
