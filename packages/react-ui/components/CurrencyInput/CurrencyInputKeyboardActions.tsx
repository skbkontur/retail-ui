import * as Keyboard from '../../lib/events/keyboard/identifiers';
import { KeyboardActionExctracterBuilder } from '../../lib/extractKeyboardAction';

export const CURRENCY_INPUT_ACTIONS = {
  Unknown: 0,
  Ignore: 1,

  MoveCursorLeft: 11,
  MoveCursorRight: 12,
  Home: 13,
  End: 14,

  ExtendSelectionLeft: 21,
  ExtendSelectionRight: 22,
  FullSelection: 23,
  ExtendSelectionToStart: 24,
  ExtendSelectionToEnd: 25,

  Backspace: 31,
  Delete: 32,
  Submit: 33,
};

export const extractAction = new KeyboardActionExctracterBuilder()
  .add(CURRENCY_INPUT_ACTIONS.Submit, Keyboard.isKeyEnter)
  .add(CURRENCY_INPUT_ACTIONS.ExtendSelectionLeft, Keyboard.isModShift(Keyboard.isKeyArrowLeft))
  .add(CURRENCY_INPUT_ACTIONS.ExtendSelectionRight, Keyboard.isModShift(Keyboard.isKeyArrowRight))
  .add(CURRENCY_INPUT_ACTIONS.FullSelection, Keyboard.isShortcutSelectAll)
  .add(CURRENCY_INPUT_ACTIONS.ExtendSelectionToStart, Keyboard.isModShift(Keyboard.isKeyHome))
  .add(CURRENCY_INPUT_ACTIONS.ExtendSelectionToEnd, Keyboard.isModShift(Keyboard.isKeyEnd))
  .add(CURRENCY_INPUT_ACTIONS.MoveCursorLeft, Keyboard.isKeyArrowLeft)
  .add(CURRENCY_INPUT_ACTIONS.MoveCursorRight, Keyboard.isKeyArrowRight)
  .add(CURRENCY_INPUT_ACTIONS.Home, Keyboard.isUnmodified(Keyboard.isKeyHome))
  .add(CURRENCY_INPUT_ACTIONS.End, Keyboard.isUnmodified(Keyboard.isKeyEnd))
  .add(CURRENCY_INPUT_ACTIONS.Backspace, Keyboard.isKeyBackspace)
  .add(CURRENCY_INPUT_ACTIONS.Delete, Keyboard.isKeyDelete)
  .add(CURRENCY_INPUT_ACTIONS.Ignore, e => Keyboard.isModified()(e) || Keyboard.isKeyTab(e))
  .build(CURRENCY_INPUT_ACTIONS.Unknown);
