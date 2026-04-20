import type { Entries } from '../../../typings/utility-types.js';
import { KeyboardEventCodes as Codes } from './KeyboardEventCodes.js';
import type { KeyboardKey } from './KeyboardMapKeys.js';
import { KeyboardMapKeys } from './KeyboardMapKeys.js';

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
