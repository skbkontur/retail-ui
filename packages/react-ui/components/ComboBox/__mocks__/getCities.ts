import type { City } from './cities';
import { cities } from './cities';

const delay = (ms: number) => (v: any) => new Promise((resolve) => setTimeout(resolve, ms, v));

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
