import React from 'react';

import { SEPARATOR } from '../../../lib/date/constants';
import * as Keyboard from '../../../lib/events/keyboard/identifiers';
import { KeyboardActionExctracterBuilder } from '../../../lib/extractKeyboardAction';

const delimiters = [
  (e: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => new RegExp(SEPARATOR).test(e.key),
  Keyboard.isKeySpace,
  Keyboard.isCodeMinus,
  Keyboard.isCodeComma,
  Keyboard.isCodePeriod,
  Keyboard.isCodeSlash,
  Keyboard.isCodeBackslash,
  Keyboard.isCodeIntlBackslash,
  Keyboard.isCodeNumpadDecimal,
  Keyboard.isCodeNumpadDivide,
  Keyboard.isCodeNumpadSubtract,
];

export enum Actions {
  Unknown,
  Ignore,
  MoveSelectionLeft,
  MoveSelectionRight,
  MoveSelectionFirst,
  MoveSelectionLast,
  Decrement,
  Increment,
  FullSelection,
  ClearSelection,
  ClearOneChar,
  Digit,
  Separator,
  WrongInput,
  PasteValue,
  CopyValue,
}

const extractAction = new KeyboardActionExctracterBuilder<Actions>()
  .add(Actions.PasteValue, Keyboard.isShortcutPaste)
  .add(Actions.CopyValue, Keyboard.isShortcutCopy)
  .add(Actions.FullSelection, Keyboard.isShortcutSelectAll)
  .add(Actions.Ignore, Keyboard.someKeys(Keyboard.isModified(), Keyboard.isKeyFs, Keyboard.isKeyTab))
  .add(Actions.MoveSelectionLeft, Keyboard.isKeyArrowLeft)
  .add(Actions.MoveSelectionRight, Keyboard.isKeyArrowRight)
  .add(Actions.MoveSelectionFirst, Keyboard.isKeyHome)
  .add(Actions.MoveSelectionLast, Keyboard.isKeyEnd)
  .add(Actions.Separator, Keyboard.someKeys(...delimiters))
  .add(Actions.Increment, Keyboard.isKeyArrowUp)
  .add(Actions.Decrement, Keyboard.isKeyArrowDown)
  .add(Actions.ClearSelection, (e) => Keyboard.isKeyDelete(e))
  .add(Actions.ClearOneChar, Keyboard.isKeyBackspace)
  .add(Actions.Digit, Keyboard.isKeyNumber)
  .add(Actions.WrongInput, (e) => !Keyboard.isKeyNumber(e))
  .build(Actions.Unknown);

export { extractAction };
