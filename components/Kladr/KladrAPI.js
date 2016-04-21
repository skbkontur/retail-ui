/* @flow */

declare function fetch(): any;

const kladrUrl = 'https://kladr.kontur.ru/v1/';
const LIMIT = 50;

export function search(searchText: string, levels: string, parentCode: ?string) {
  const data = createQuery({
    prefix: searchText,
    parentKladr: parentCode || '',
    limit: LIMIT,
    desiredAoLevels: levels,
    strictSubordination: 'false',
  });
  return fetch(`${kladrUrl}suggest?${data}`)
    .then(response => response.json())
    .then(json => toJS(json));
}

export function searchIndex(code: string, house: ?string) {
  const data = createQuery({
    code,
    house: house || '',
  });

  return fetch(`${kladrUrl}kladr/index?${data}`)
    .then(response => response.text());
}

function createQuery(data){
  let params = [];
  for (const key in data) {
    if (data.hasOwnProperty) {
      params.push(`${key}=${encodeURIComponent(data[key])}`);
    }
  }
  return params.join('&');
}

function toJS(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toJS);
  } else if (obj && typeof obj === 'object') {
    const ret = {};
    for (const key in obj) {
      ret[key.charAt(0).toLowerCase() + key.substr(1)] = toJS(obj[key]);
    }
    return ret;
  }
  return obj;
}
