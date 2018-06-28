

import fetch from '../../lib/net/fetch-cors';

import type { Address, VerifyResult } from './Types';

const kladrUrl = 'https://kladr.kontur.ru/v1/';
const LIMIT = 50;

export function search(
  searchText: string,
  levels: string,
  parentCode: ?string
): Promise<Array<Address>> {
  const data = createQuery({
    prefix: searchText,
    parentKladr: parentCode || '',
    limit: LIMIT,
    desiredAoLevels: levels,
    strictSubordination: 'false'
  });
  return fetch(`${kladrUrl}suggest?${data}`)
    .then(res => res.json())
    .then(toJS);
}

export function searchIndex(code: string, house: ?string) {
  const data = createQuery({
    code,
    house: house || ''
  });

  return fetch(`${kladrUrl}kladr/index?${data}`).then(response =>
    response.text()
  );
}

export function verify(req: Address): Promise<VerifyResult> {
  return fetch(`${kladrUrl}verify/`, {
    method: 'POST',
    body: JSON.stringify(toJSON({ address: req }))
  })
    .then(res => res.json())
    .then(toJS);
}

function createQuery(data) {
  const params = [];
  for (const key in data) {
    if (data.hasOwnProperty) {
      params.push(`${key}=${encodeURIComponent(data[key])}`);
    }
  }
  return params.join('&');
}

function toJSON(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toJSON);
  } else if (obj && typeof obj === 'object') {
    const ret = {};
    for (const key in obj) {
      ret[key.charAt(0).toUpperCase() + key.substr(1)] = toJSON(obj[key]);
    }
    return ret;
  }
  return obj;
}
// eslint-disable-next-line flowtype/no-weak-types
function toJS(obj): any {
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
