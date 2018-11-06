import {
  AddressObject,
  AddressValue,
  FiasId,
  Fields,
  House,
  ResponseAddress,
  SearchResponse,
  Stead,
  VerifyResponse
} from './types';
import {Nullable} from '../../typings/utility-types';
import abbreviations from './constants/abbreviations';
import warning from 'warning';

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

interface SearchOptions {
  parentFiasId?: Nullable<FiasId>;
  field?: Fields;
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
      limit
    };

    if (searchText) {
      if (!field) {
        const text = this.trimSearchText(searchText);
        return text
          ? this.resolveAddress(text, limit)
          : Promise.resolve([]);
      }

      if (field === Fields.region) {
        return this.searchRegions(searchText);
      }

      if (field === Fields.house) {
        if (parentFiasId) {
          return this.searchHouse(query);
        }
      } else if (field === Fields.stead) {
        if (parentFiasId) {
          return this.searchStead(query);
        }
      } else {
        query.levels = [field];

        if (
          field === Fields.district ||
          field === Fields.city ||
          field === Fields.intracityarea ||
          field === Fields.settlement ||
          field === Fields.planningstructure
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

  private resolveAddress = (address: string, limit?: number, level: Fields = Fields.house): Promise<SearchResponse> => {
    return this.send(`addresses/resolve?${this.createQuery({
      address,
      limit,
      level
    })}`);
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
    const isStartsWithSearchText = (str: string) => {
      return str && str.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    };
    return this.regionsPromise.then((response: ResponseAddress[]) => {
      return response.filter((address: ResponseAddress) => {
        const { name, code } = address.region as AddressObject;
        return (
          isStartsWithSearchText(name) || isStartsWithSearchText(code)
        );
      });
    });
  };

  private createQuery = (query: { [key: string]: any }): string => {
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
