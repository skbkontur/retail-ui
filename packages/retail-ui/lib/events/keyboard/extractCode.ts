import { Entries } from '../../../typings/utility-types';
import Codes from './KeyboardEventCodes';
import KeyboardMapKeys from './KeyboardMapKeys';

export default function extractCode(e: React.KeyboardEvent<HTMLElement> | KeyboardEvent): Codes {
  e = (e as React.KeyboardEvent<HTMLElement>).nativeEvent || e;
  if (e.code) {
    return e.code as Codes;
  }
  const keyCode = e.keyCode || e.which;
  const mapped = (Object.entries as Entries<Codes, number[]>)(KeyboardMapKeys).find(([, _keyCodes]) =>
    _keyCodes.includes(keyCode),
  );
  return mapped ? mapped[0] : Codes.Unidentified;
}
