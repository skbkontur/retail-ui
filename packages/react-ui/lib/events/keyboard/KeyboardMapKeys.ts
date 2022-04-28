import { KeyboardEventCodes as Codes } from './KeyboardEventCodes';

export type Location = number;
export type KeyCode = number;
export type KeyboardKey = [KeyCode, Location];

const STANDARD = 0; //KeyboardEvent.DOM_KEY_LOCATION_STANDARD;
const NUMPAD = 3; //KeyboardEvent.DOM_KEY_LOCATION_NUMPAD;

export const KeyboardMapKeys: { [code in Codes]: KeyboardKey[] } = {
  [Codes.Unidentified]: [[0, 0]],
  [Codes.End]: [[35, STANDARD]],
  [Codes.Escape]: [[27, STANDARD]],
  [Codes.Equal]: [[187, STANDARD]],
  [Codes.Backspace]: [[8, STANDARD]],
  [Codes.Enter]: [[13, STANDARD]],
  [Codes.NumpadEnter]: [[13, NUMPAD]],
  [Codes.Home]: [[36, STANDARD]],
  [Codes.Delete]: [[46, STANDARD]],
  [Codes.Insert]: [[45, STANDARD]],
  [Codes.PageUp]: [[33, STANDARD]],
  [Codes.PageDown]: [[34, STANDARD]],
  [Codes.Tab]: [[9, STANDARD]],
  [Codes.CapsLock]: [[20, STANDARD]],
  [Codes.KeyA]: [[65, STANDARD]],
  [Codes.KeyC]: [[67, STANDARD]],
  [Codes.KeyV]: [[86, STANDARD]],
  [Codes.KeyX]: [[88, STANDARD]],
  [Codes.NumpadDecimal]: [
    [110, NUMPAD],
    [46, NUMPAD],
  ],
  [Codes.NumpadSubtract]: [[109, NUMPAD]],
  [Codes.NumpadDivide]: [[111, NUMPAD]],
  [Codes.Comma]: [[188, STANDARD]],
  [Codes.Minus]: [[189, STANDARD]],
  [Codes.Period]: [[190, STANDARD]],
  [Codes.Slash]: [[191, STANDARD]],
  [Codes.Backslash]: [[220, STANDARD]],
  [Codes.IntlBackslash]: [[226, STANDARD]],
  [Codes.Space]: [[32, STANDARD]],
};
