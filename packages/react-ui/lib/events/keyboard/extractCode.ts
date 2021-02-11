import { Entries } from '../../../typings/utility-types';

import { KeyboardEventCodes as Codes } from './KeyboardEventCodes';
import { KeyboardMapKeys, KeyCode, Location } from './KeyboardMapKeys';

export function extractCode(e: React.KeyboardEvent<HTMLElement> | KeyboardEvent): Codes {
  e = (e as React.KeyboardEvent<HTMLElement>).nativeEvent || e;
  if (e.code) {
    return e.code as Codes;
  }
  const keyCode = e.keyCode || e.which;
  const location = e.location;
  const mapped = (Object.entries as Entries<Codes, Array<[KeyCode, Location]>>)(KeyboardMapKeys).find(([, set]) =>
    set.some(([_keyCode, _location]) => _keyCode === keyCode && _location === location),
  );
  return mapped ? mapped[0] : Codes.Unidentified;
}
