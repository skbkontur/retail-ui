// @flow

import { KeyboardActionExctracterBuilder } from '../internal/extractKeyboardAction';

export const Actions: {|
  +Unknown: 0,
  +Ignore: 1,

  +MoveSelectionLeft: 11,
  +MoveSelectionRight: 12,
  +Decrement: 13,
  +Increment: 14,

  +FullSelection: 23,

  +ClearSelection: 31,

  +Digit: 101,
  +Separator: 103
|} = {
  Unknown: 0,
  Ignore: 1,

  MoveSelectionLeft: 11,
  MoveSelectionRight: 12,
  Decrement: 13,
  Increment: 14,

  FullSelection: 23,

  ClearSelection: 31,

  Digit: 101,
  Separator: 103
};

const isSeparator = e =>
  e.key === ',' ||
  e.key === '.' ||
  e.key === 'Decimal' ||
  e.keyCode === 188 ||
  e.keyCode === 190;

const actionExtracter =
  // prettier-ignore
  new KeyboardActionExctracterBuilder()
    .addMatcher(matcher => matcher
      .setType(Actions.MoveSelectionLeft)
      .setCheck(e => e.key === 'ArrowLeft')
    )
    .addMatcher(matcher => matcher
      .setType(Actions.MoveSelectionRight)
      .setCheck(e => e.key === 'ArrowRight')
    )
    .addMatcher(matcher => matcher
      .setType(Actions.MoveSelectionRight)
      .setCheck(isSeparator)
    )
    .addMatcher(matcher => matcher
      .setType(Actions.Increment)
      .setCheck(e => e.key === 'ArrowUp')
    )
    .addMatcher(matcher => matcher
      .setType(Actions.Decrement)
      .setCheck(e => e.key === 'ArrowDown')
    )
    .addMatcher(matcher => matcher
      .setType(Actions.FullSelection)
      .setCheck(e => (e.ctrlKey || e.metaKey) && e.key === 'a')
    )
    .addMatcher(matcher => matcher
      .setType(Actions.ClearSelection)
      .setCheck(e => e.key === 'Backspace' || e.key === 'Delete')
    )
    .addMatcher(matcher => matcher
      .setType(Actions.Digit)
      .setCheck(e => /^\d$/.test(e.key))
    )
    .addMatcher(matcher => matcher
      .setType(Actions.Ignore)
      .setCheck(e => e.key === 'Tab')
    )
    .build();

export const extractAction = (event: SyntheticKeyboardEvent<HTMLElement>) =>
  actionExtracter(event) || Actions.Unknown;
