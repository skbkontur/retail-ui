

import type { Place, PlaceDescription } from './Types';

export function placeName(region: PlaceDescription, _for: ?Place = null) {
  switch (region.abbreviation) {
    case 'обл':
      return region.name + ' область';

    case 'край':
      return region.name + ' край';

    case 'р-н':
      return (_for !== 'district' ? 'район ' : '') + region.name;

    case 'г':
      return (_for !== 'city' ? 'город ' : '') + region.name;

    case 'д':
      return 'деревня ' + region.name;

    case 'п':
      return 'поселок ' + region.name;

    case 'с':
      return 'село ' + region.name;

    case 'ст-ца':
      return 'станица ' + region.name;

    case 'с/с':
      return 'сельсовет ' + region.name;

    case 'ул':
      return (_for !== 'street' ? 'улица ' : '') + region.name;

    case 'пл':
      return 'площадь ' + region.name;

    case 'пр-кт':
      return 'проспект ' + region.name;

    case 'проезд':
      return 'проезд ' + region.name;

    case 'тер':
      return 'тер ' + region.name;

    case 'кв-л':
      return region.name + ' квартал';

    case 'пер':
      return region.name + ' переулок';
  }

  return region.name;
}
