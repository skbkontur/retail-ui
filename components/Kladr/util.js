// @flow

import type {PlaceDescription} from './Types';

export function placeName(region: PlaceDescription) {
  switch (region.abbreviation) {
    case 'обл':
      return region.name + ' область';

    case 'край':
      return region.name + ' край';

    case 'д':
      return 'деревня ' + region.name;

    case 'п':
      return 'поселок ' + region.name;

    case 'с':
      return 'село ' + region.name;

    case 'пер':
      return region.name + ' переулок';
  }

  return region.name;
}
