

import {
  KeyboardActionExctracterBuilder,
  isSeparator,
  isModified
} from '../internal/extractKeyboardAction';

export const Actions = {
  Unknown: 0,
  Ignore: 1,
  MoveSelectionLeft: 11,
  MoveSelectionRight: 12,
  Decrement: 13,
  Increment: 14,
  FullSelection: 23,
  ClearSelection: 31,
  Digit: 101,
  Separator: 103,
  WrongInput: 201
};

const extractAction = new KeyboardActionExctracterBuilder()
  .add(Actions.MoveSelectionLeft, e => e.key === 'ArrowLeft')
  .add(Actions.MoveSelectionRight, e => e.key === 'ArrowRight')
  .add(Actions.MoveSelectionRight, isSeparator)
  .add(Actions.Increment, e => e.key === 'ArrowUp')
  .add(Actions.Decrement, e => e.key === 'ArrowDown')
  .add(Actions.FullSelection, e => (e.ctrlKey || e.metaKey) && e.key === 'a')
  .add(Actions.ClearSelection, e => e.key === 'Backspace' || e.key === 'Delete')
  .add(Actions.Digit, e => /^\d$/.test(e.key))
  .add(Actions.Ignore, e => isModified(e) || e.key === 'Tab')
  .add(Actions.WrongInput, e => e.key === ' ' || /^[A-Za-zА-Яа-я]$/.test(e.key))
  .build(Actions.Unknown);

export { extractAction };
