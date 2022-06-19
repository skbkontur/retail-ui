import { Entries } from '../../../typings/utility-types';

import { KeyboardEventCodes as Codes } from './KeyboardEventCodes';
import { KeyboardKey, KeyboardMapKeys } from './KeyboardMapKeys';

export function extractCode(e: React.KeyboardEvent<HTMLElement> | KeyboardEvent): Codes {
  const event = (e as React.KeyboardEvent<HTMLElement>).nativeEvent || e;
  if (event.code) {
    return event.code as Codes;
  }

  const keyCode = event.keyCode || event.which;
  const location = event.location;
  const mapped = (Object.entries as Entries<Codes, KeyboardKey[]>)(KeyboardMapKeys).find(([, set]) =>
    set.some(([_keyCode, _location]) => _keyCode === keyCode && _location === location),
  );

  return mapped ? mapped[0] : Codes.Unidentified;
}
