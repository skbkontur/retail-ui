import {
  Address,
  AddressObject,
  FiasId,
  House,
  Levels,
  LiveStatuses,
  Room,
  Stead,
  VerifyResponse
} from './types';

type SearchResponse = Promise<Address[]>;

interface SearchQuery {
  [key: string]: any;
  address?: string;
  prefix?: string;
  limit?: number;
  parentFiasId?: FiasId;
  level?: Levels;
  fullAddress?: boolean;
  directParent?: boolean;
}

const BASE_URL = 'https://api.kontur.ru/fias/v1/';
const LIMIT = 50;

export class FiasAPI {
  private _regionsPromise: Promise<
    Array<{ region: AddressObject }>
  > | null = null;

  constructor(public baseUrl: string = BASE_URL) {}

  public send = (path: string, params = {}): Promise<any> => {
    return fetch(`${this.baseUrl}${path}`, {
      credentials: 'same-origin',
      method: 'GET',
      ...params
    }).then(res => res.json());
  };

  public verify = (address: Address): Promise<VerifyResponse> => {
    Object.keys(address).forEach(key => !address[key] && delete address[key]);
    delete address.room;

    // TODO: find out why houses can have name
    if (address.house && address.house.name) {
      address.house.number = address.house.name;
      delete address.house.name;
    }

    return this.send('verify', {
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
    level?: Levels,
    parentFiasId?: FiasId
  ): SearchResponse => {
    const query: SearchQuery = {
      prefix: searchText,
      limit: LIMIT,
      parentFiasId,
      level
    };

    if (!level && searchText) {
      return this.resolveAddress({
        address: trimSearchText(searchText),
        limit: LIMIT
      });
    }

    if (level === Levels.region) {
      return this.searchRegions(searchText);
    }

    if (
      level === Levels.district ||
      level === Levels.city ||
      level === Levels.settlement
    ) {
      if (parentFiasId) {
        query.directParent = false;
      } else {
        query.fullAddress = true;
      }
    }

    if (searchText && level) {
      if (parentFiasId) {
        if (level === Levels.room) {
          return this.searchRooms(query);
        }
        if (level === Levels.house) {
          return this.searchHouse(query);
        }
        if (level === Levels.stead) {
          return this.searchStead(query);
        }
      }
      return this.searchAddressSuggest(query, level);
    } else {
      return Promise.resolve([]);
    }
  };

  public searchAddressSuggest = (
    query: SearchQuery,
    level: Levels
  ): SearchResponse => {
    return this.send(`addresses?${createQuery(query)}`).then(data =>
      data.filter((item: Address) => item[level.toLowerCase()])
    );
  };

  public resolveAddress = (query: SearchQuery): SearchResponse => {
    return this.send(`addresses/resolve?${createQuery(query)}`);
  };

  public searchRooms = (query: SearchQuery): SearchResponse => {
    return this.send(`rooms?${createQuery(query)}`).then(
      (roomsList: Room[]): Address[] => {
        return roomsList.reduce((filteredList: Address[], item: Room) => {
          if (!filteredList.length) {
            return [{ room: { ...item, level: Levels.room } }];
          }

          for (const i in filteredList) {
            if (filteredList[i].room!.flatNumber === item.flatNumber) {
              if (item.liveStatus === LiveStatuses.Active) {
                filteredList[i] = { room: { ...item, level: Levels.room } };
              }
              return filteredList;
            }
          }

          filteredList.push({
            room: { ...item, level: Levels.room }
          });
          return filteredList;
        }, []);
      }
    );
  };

  public searchStead = (query: SearchQuery): SearchResponse => {
    return this.send(`steads?${createQuery(query)}`).then(data =>
      data.map((item: Stead) => ({
        stead: {
          ...item,
          level: Levels.stead
        }
      }))
    );
  };

  public searchHouse = (query: SearchQuery): SearchResponse => {
    return this.send(`houses?${createQuery(query)}`).then(data =>
      data.map((item: House) => ({
        house: {
          ...item,
          level: Levels.house
        }
      }))
    );
  };

  public searchRegions = (searchText: string): SearchResponse => {
    if (!this._regionsPromise) {
      this._regionsPromise = this.send('addresses/regions');
    }
    if (searchText) {
      return this._regionsPromise.then(filterRegions(searchText));
    } else {
      return this._regionsPromise;
    }
  };
}

function isStartMatch(value: string, searchText: string) {
  return value.toLowerCase().indexOf(searchText.toLowerCase()) === 0;
}

function filterRegions(searchText: string) {
  return (list: Address[]) =>
    list.filter(({ region }: Address) => {
      return (
        isStartMatch(region!.name!, searchText) ||
        isStartMatch(region!.code, searchText)
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
  // TODO: trim abbreviations and full types of toponyms
}
