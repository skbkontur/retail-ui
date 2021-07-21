const kladr = require('./kladr.json');

const delay = (ms) => (v) => new Promise((resolve) => setTimeout(resolve, ms, v));

const citiesFilterPredicate = (query) => (city) =>
  city.Id.toString() === query || city.City.toLowerCase().includes(query.toLowerCase());

const maxItems = 5;

export const getCities = (query) => {
  const items = kladr.filter(citiesFilterPredicate(query));
  const result = items.slice(0, maxItems);
  return Promise.resolve({
    foundItems: result,
    totalCount: items.length,
  }).then(delay(300));
};
