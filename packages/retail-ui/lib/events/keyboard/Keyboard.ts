import { isWindows } from '../../utils';
import extractCode from './extractCode';
import Codes from './KeyboardEventCodes';

type E = React.KeyboardEvent<HTMLElement> | KeyboardEvent;
type IS = (e: E) => boolean;
type ISMod = (is?: IS) => IS;
type ISSome = (...is: IS[]) => IS;

export default class Keyboard {
  public static isShortcutCopy: IS = e =>
    ((e.metaKey || e.ctrlKey) && extractCode(e) === Codes.KeyC) ||
    (isWindows && e.ctrlKey && Keyboard.isKeyInsert(e)) ||
    e.key === 'Copy';

  public static isShortcutPaste: IS = e =>
    ((e.metaKey || e.ctrlKey) && extractCode(e) === Codes.KeyV) ||
    (isWindows && e.shiftKey && Keyboard.isKeyInsert(e)) ||
    e.key === 'Paste';

  public static isShortcutCut: IS = e => ((e.metaKey || e.ctrlKey) && extractCode(e) === Codes.KeyX) || e.key === 'Cut';
  public static isShortcutSelectAll: IS = e => (e.metaKey || e.ctrlKey) && extractCode(e) === Codes.KeyA;

  public static isKeyEscape: IS = e => e.key === 'Escape' || e.key === 'Esc';
  public static isKeyHome: IS = e => e.key === 'Home';
  public static isKeyEnd: IS = e => e.key === 'End';
  public static isKeyMeta: IS = e => e.key === 'Meta' || e.key === 'Win';
  public static isKeyControl: IS = e => e.key === 'Control';
  public static isKeyShift: IS = e => e.key === 'Shift';
  public static isKeyAlt: IS = e => e.key === 'Alt';
  public static isKeyDelete: IS = e => e.key === 'Delete' || e.key === 'Del';
  public static isKeyBackspace: IS = e => e.key === 'Backspace';
  public static isKeyCapsLock: IS = e => e.key === 'CapsLock';
  public static isKeyInsert: IS = e => e.key === 'Insert';
  public static isKeyTab: IS = e => e.key === 'Tab';
  public static isKeyEnter: IS = e => e.key === 'Enter';
  public static isKeyArrowUp: IS = e => e.key === 'ArrowUp' || e.key === 'Up';
  public static isKeyArrowRight: IS = e => e.key === 'ArrowRight' || e.key === 'Right';
  public static isKeyArrowDown: IS = e => e.key === 'ArrowDown' || e.key === 'Down';
  public static isKeyArrowLeft: IS = e => e.key === 'ArrowLeft' || e.key === 'Left';
  public static isKeySpace: IS = e => e.key === 'Space' || e.key === 'Spacebar';

  public static isCodeMinus: IS = e => extractCode(e) === Codes.Minus;
  public static isCodeNumpadDecimal: IS = e => extractCode(e) === Codes.NumpadDecimal;
  public static isCodeNumpadDivide: IS = e => extractCode(e) === Codes.NumpadDivide;
  public static isCodeNumpadSubtract: IS = e => extractCode(e) === Codes.NumpadSubtract;
  public static isCodeSlash: IS = e => extractCode(e) === Codes.Slash;
  public static isCodeBackslash: IS = e => extractCode(e) === Codes.Backslash;
  public static isCodeIntlBackslash: IS = e => extractCode(e) === Codes.IntlBackslash;
  public static isCodeComma: IS = e => extractCode(e) === Codes.Comma;
  public static isCodePeriod: IS = e => extractCode(e) === Codes.Period;

  public static isKeyArrowHorizontal: IS = e => Keyboard.isKeyArrowRight(e) || Keyboard.isKeyArrowLeft(e);
  public static isKeyArrowVertical: IS = e => Keyboard.isKeyArrowUp(e) || Keyboard.isKeyArrowDown(e);
  public static isKeyArrow: IS = e => Keyboard.isKeyArrowHorizontal(e) || Keyboard.isKeyArrowVertical(e);

  public static isKeyNumber: IS = e => /^\d+$/.test(e.key);
  public static isKeyChar: IS = e => e.key.trim().length === 1;

  public static isModified: ISMod = is => e =>
    (e.shiftKey || e.metaKey || e.ctrlKey || e.altKey) && (is ? is(e) : true);
  public static isUnmodified: ISMod = is => e => !Keyboard.isModified()(e) && (!!is ? is(e) : true);
  public static isModShift: ISMod = is => e => e.shiftKey && (!!is ? is(e) : true);

  public static some: ISSome = (...iss) => e => iss.some(is => is(e));
}
