import Codes from './KeyboardEventCodes';

type KeyCodes = number[];

const KeyboardMapKeys: {
  [code in Codes]: KeyCodes;
} = {
  [Codes.Unidentified]: [0],
  [Codes.End]: [35],
  [Codes.Escape]: [27],
  [Codes.Equal]: [187],
  [Codes.Backspace]: [8],
  [Codes.Enter]: [13],
  [Codes.NumpadEnter]: [13],
  [Codes.Home]: [36],
  [Codes.Delete]: [66],
  [Codes.Insert]: [45],
  [Codes.PageUp]: [33],
  [Codes.PageDown]: [34],
  [Codes.Tab]: [9],
  [Codes.CapsLock]: [20],
  [Codes.KeyA]: [65],
  [Codes.KeyC]: [67],
  [Codes.KeyV]: [86],
  [Codes.KeyX]: [88],
  [Codes.NumpadDecimal]: [110, 46],
  [Codes.NumpadSubtract]: [109],
  [Codes.NumpadDivide]: [111],
  [Codes.Comma]: [188],
  [Codes.Minus]: [189],
  [Codes.Period]: [190],
  [Codes.Slash]: [191],
  [Codes.Backslash]: [220],
  [Codes.IntlBackslash]: [226],
  [Codes.Space]: [32],
};

export default KeyboardMapKeys;
