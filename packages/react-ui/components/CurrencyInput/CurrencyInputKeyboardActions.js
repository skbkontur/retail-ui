import {
  KeyboardActionExctracterBuilder,
  isSeparator,
  isModified
} from '../internal/extractKeyboardAction';

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
  ExtendSelectionToBegin: 24,
  ExtendSelectionToEnd: 25,

  Backspace: 31,
  Delete: 32,
  Submit: 33,

  Digit: 101,
  Minus: 102,
  Separator: 103
};

export const extractAction = new KeyboardActionExctracterBuilder()
  .add(CURRENCY_INPUT_ACTIONS.Submit, e => e.key === 'Enter')
  .add(
    CURRENCY_INPUT_ACTIONS.ExtendSelectionLeft,
    e => e.shiftKey && e.key === 'ArrowLeft'
  )
  .add(
    CURRENCY_INPUT_ACTIONS.ExtendSelectionRight,
    e => e.shiftKey && e.key === 'ArrowRight'
  )
  .add(CURRENCY_INPUT_ACTIONS.FullSelection, e => e.ctrlKey && e.key === 'a')
  .add(
    CURRENCY_INPUT_ACTIONS.ExtendSelectionToBegin,
    e => e.shiftKey && e.key === 'Home'
  )
  .add(
    CURRENCY_INPUT_ACTIONS.ExtendSelectionToEnd,
    e => e.shiftKey && e.key === 'End'
  )
  .add(CURRENCY_INPUT_ACTIONS.MoveCursorLeft, e => e.key === 'ArrowLeft')
  .add(CURRENCY_INPUT_ACTIONS.MoveCursorRight, e => e.key === 'ArrowRight')
  .add(CURRENCY_INPUT_ACTIONS.Home, e => !isModified(e) && e.key === 'Home')
  .add(CURRENCY_INPUT_ACTIONS.End, e => !isModified(e) && e.key === 'End')
  .add(CURRENCY_INPUT_ACTIONS.Backspace, e => e.key === 'Backspace')
  .add(CURRENCY_INPUT_ACTIONS.Delete, e => e.key === 'Delete')
  .add(CURRENCY_INPUT_ACTIONS.Minus, e => e.key === '-' || e.key === 'Subtract')
  .add(CURRENCY_INPUT_ACTIONS.Separator, isSeparator)
  .add(CURRENCY_INPUT_ACTIONS.Digit, e => /^\d$/.exec(e.key))
  .add(CURRENCY_INPUT_ACTIONS.Ignore, e => isModified || e.key === 'Tab')
  .build(CURRENCY_INPUT_ACTIONS.Unknown);
