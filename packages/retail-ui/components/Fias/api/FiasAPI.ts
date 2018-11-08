import {
  AddressObject,
  AddressValue, APIProvider,
  FiasId,
  Fields,
  House,
  ResponseAddress, SearchOptions,
  SearchResponse,
  Stead,
  VerifyResponse
} from '../types';
import {Nullable} from '../../../typings/utility-types';
import abbreviations from '../constants/abbreviations';

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
    const promise = this.send(`verify?${FiasAPI.createQuery(query)}`, {
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

  public search = ({ fiasId, searchText, field, parentFiasId, limit, fullAddress } : SearchOptions): Promise<SearchResponse> => {
    const query: SearchQuery = {
      prefix: searchText,
      actual: true,
      directParent: false,
      parentFiasId,
      limit,
      fullAddress
    };

    if (fiasId) {
      return this.resolveFiasId(fiasId);
    }

    if (searchText) {
      if (!field) {
        const text = FiasAPI.trimSearchText(searchText);
        return text
          ? this.resolveAddress(text, limit)
          : Promise.resolve([]);
      }
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
    return Promise.resolve([]);
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

  private resolveFiasId = (fiasId: FiasId): Promise<SearchResponse> => {
    return this.send(`addresses/structural/${fiasId}`)
      .then(result => [result])
      .catch(e => []);
  };

  private searchAddressObject = (
    query: SearchQuery
  ): Promise<SearchResponse> => {
    return this.send(`addresses?${FiasAPI.createQuery(query)}`);
  };

  private resolveAddress = (address: string, limit?: number, level: Fields = Fields.house): Promise<SearchResponse> => {
    return this.send(`addresses/resolve?${FiasAPI.createQuery({
      address,
      limit,
      level
    })}`);
  };

  private searchStead = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`steads?${FiasAPI.createQuery(query)}`).then(data =>
      data.map((item: Stead) => ({
        stead: {
          ...item
        }
      }))
    );
  };

  private searchHouse = (query: SearchQuery): Promise<SearchResponse> => {
    return this.send(`houses?${FiasAPI.createQuery(query)}`).then(data =>
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
}

export default FiasAPI;
