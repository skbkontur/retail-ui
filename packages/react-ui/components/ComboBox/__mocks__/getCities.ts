import type { City } from './cities.js';
import { cities } from './cities.js';

const delay = (ms: number) => (v: unknown) => new Promise((resolve) => setTimeout(resolve, ms, v));

const citiesFilterPredicate = (query: string) => (city: City) =>
  city.Id.toString() === query || city.City.toLowerCase().includes(query.toLowerCase());

const maxItems = 5;

export const getCities = (query: string) => {
  const items = cities.filter(citiesFilterPredicate(query));
  const result = items.slice(0, maxItems);
  return Promise.resolve({
    foundItems: result,
    totalCount: items.length,
  }).then(delay(300));
};
