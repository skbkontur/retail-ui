

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
  static toBegin = (position: number): Selection => {
    return { start: 0, end: position, direction: 'backward' };
  };
  static toEnd = (start: number, end: number): Selection => {
    return { start, end, direction: 'forward' };
  };
}
