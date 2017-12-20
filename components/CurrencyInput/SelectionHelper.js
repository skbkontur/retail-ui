// @flow

export type Selection = {
  start: number,
  end: number,
  direction: SelectionDirection
};

export type SelectionDirection = 'forward' | 'backward' | 'none';

export default class SelectionHelper {
  static fromPosition = (position: number): Selection => {
    return { start: position, end: position, direction: 'none' };
  };
}
