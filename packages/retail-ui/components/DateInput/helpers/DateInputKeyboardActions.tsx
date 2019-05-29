// @ts-ignore noUnusedVar
import * as React from 'react';
import { RE_DELIMITERS } from '../../../lib/date/constants';
import { KeyboardActionExctracterBuilder, isModified, isFkeys } from '../../internal/extractKeyboardAction';

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

const extractAction = new KeyboardActionExctracterBuilder()
  .add(Actions.PasteValue, e => (e.ctrlKey || e.metaKey) && e.key === 'v')
  .add(Actions.CopyValue, e => (e.ctrlKey || e.metaKey) && e.key === 'c')
  .add(Actions.FullSelection, e => (e.ctrlKey || e.metaKey) && e.key === 'a')
  .add(Actions.Ignore, e => isModified(e) || isFkeys(e) || e.key === 'Tab')
  .add(Actions.MoveSelectionLeft, e => e.key === 'ArrowLeft')
  .add(Actions.MoveSelectionRight, e => e.key === 'ArrowRight')
  .add(Actions.MoveSelectionFirst, e => e.key === 'Home')
  .add(Actions.MoveSelectionLast, e => e.key === 'End')
  .add(Actions.Separator, e => RE_DELIMITERS.includes(e.key))
  .add(Actions.Increment, e => e.key === 'ArrowUp')
  .add(Actions.Decrement, e => e.key === 'ArrowDown')
  .add(Actions.ClearSelection, e => e.key === 'Delete')
  .add(Actions.ClearOneChar, e => e.key === 'Backspace')
  .add(Actions.Digit, e => /^\d$/.test(e.key))
  .add(Actions.WrongInput, e => e.key === ' ' || /^[A-Za-zА-Яа-я]$/.test(e.key))
  .build(Actions.Unknown);

export { extractAction };
