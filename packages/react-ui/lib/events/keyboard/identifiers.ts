import { isMac } from '../../client';

import { extractCode } from './extractCode';
import { KeyboardEventCodes as Codes } from './KeyboardEventCodes';

type E = React.KeyboardEvent<HTMLElement> | KeyboardEvent;
type IS = (e: E) => boolean;
type ISMod = (is?: IS) => IS;
type ISSome = (...is: IS[]) => IS;

// IE 9+ supports char attribute
// https://developer.mozilla.org/ru/docs/Web/API/KeyboardEvent
const getChar = (e: E) => (e instanceof KeyboardEvent ? e.char : e.nativeEvent.char);

export const isShortcutCopy: IS = (e) =>
  ((isMac ? e.metaKey : e.ctrlKey) && extractCode(e) === Codes.KeyC) ||
  (!isMac && e.ctrlKey && isKeyInsert(e)) ||
  e.key === 'Copy';

export const isShortcutPaste: IS = (e) =>
  ((isMac ? e.metaKey : e.ctrlKey) && extractCode(e) === Codes.KeyV) ||
  (!isMac && e.shiftKey && isKeyInsert(e)) ||
  e.key === 'Paste';

export const isShortcutCut: IS = (e) =>
  ((isMac ? e.metaKey : e.ctrlKey) && extractCode(e) === Codes.KeyX) ||
  (!isMac && e.shiftKey && isKeyDelete(e)) ||
  e.key === 'Cut';

export const isShortcutSelectAll: IS = (e) => (isMac ? e.metaKey : e.ctrlKey) && extractCode(e) === Codes.KeyA;

export const isKeyEscape: IS = (e) => e.key === 'Escape' || e.key === 'Esc';
export const isKeyHome: IS = (e) => e.key === 'Home';
export const isKeyEnd: IS = (e) => e.key === 'End';
export const isKeyMeta: IS = (e) => e.key === 'Meta' || e.key === 'Win';
export const isKeyControl: IS = (e) => e.key === 'Control';
export const isKeyShift: IS = (e) => e.key === 'Shift';
export const isKeyAlt: IS = (e) => e.key === 'Alt';
export const isKeyDelete: IS = (e) => e.key === 'Delete' || e.key === 'Del';
export const isKeyBackspace: IS = (e) => e.key === 'Backspace';
export const isKeyCapsLock: IS = (e) => e.key === 'CapsLock';
export const isKeyInsert: IS = (e) => e.key === 'Insert';
export const isKeyTab: IS = (e) => e.key === 'Tab';
export const isKeyEnter: IS = (e) => e.key === 'Enter';
export const isKeyArrowUp: IS = (e) => e.key === 'ArrowUp' || e.key === 'Up';
export const isKeyArrowRight: IS = (e) => e.key === 'ArrowRight' || e.key === 'Right';
export const isKeyArrowDown: IS = (e) => e.key === 'ArrowDown' || e.key === 'Down';
export const isKeyArrowLeft: IS = (e) => e.key === 'ArrowLeft' || e.key === 'Left';
export const isKeySpace: IS = (e) => e.key === ' ' || e.key === 'Spacebar';
export const isKeyComma: IS = (e) => e.key === ',' || getChar(e) === ',';

export const isCodeMinus: IS = (e) => extractCode(e) === Codes.Minus;
export const isCodeNumpadDecimal: IS = (e) => extractCode(e) === Codes.NumpadDecimal;
export const isCodeNumpadDivide: IS = (e) => extractCode(e) === Codes.NumpadDivide;
export const isCodeNumpadSubtract: IS = (e) => extractCode(e) === Codes.NumpadSubtract;
export const isCodeSlash: IS = (e) => extractCode(e) === Codes.Slash;
export const isCodeBackslash: IS = (e) => extractCode(e) === Codes.Backslash;
export const isCodeIntlBackslash: IS = (e) => extractCode(e) === Codes.IntlBackslash;
export const isCodeComma: IS = (e) => extractCode(e) === Codes.Comma;
export const isCodePeriod: IS = (e) => extractCode(e) === Codes.Period;

export const isKeyArrowHorizontal: IS = (e) => isKeyArrowRight(e) || isKeyArrowLeft(e);
export const isKeyArrowVertical: IS = (e) => isKeyArrowUp(e) || isKeyArrowDown(e);
export const isKeyArrow: IS = (e) => isKeyArrowHorizontal(e) || isKeyArrowVertical(e);
export const isKeyNumber: IS = (e) => /^\d+$/.test(e.key);
export const isKeyChar: IS = (e) => e.key.trim().length === 1;
export const isKeyFs: IS = (e) => /^(?:F[1-9]|F1[0-2]|Soft[1-4])$/.test(e.key);

export const isModified: ISMod = (is) => (e) =>
  (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) && (is ? is(e) : true);
export const isUnmodified: ISMod = (is) => (e) => !isModified()(e) && (is ? is(e) : true);
export const isModShift: ISMod = (is) => (e) => e.shiftKey && (is ? is(e) : true);

export const someKeys: ISSome =
  (...iss) =>
  (e) =>
    iss.some((is) => is(e));
