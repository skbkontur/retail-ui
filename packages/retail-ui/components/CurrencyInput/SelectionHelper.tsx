export interface Selection {
  start: number;
  end: number;
  direction: SelectionDirection;
}

export type SelectionDirection = 'forward' | 'backward' | 'none';

export default class SelectionHelper {
  public static fromPosition = (position: number): Selection => {
    return { start: position, end: position, direction: 'none' };
  };
  public static toBegin = (position: number): Selection => {
    return { start: 0, end: position, direction: 'backward' };
  };
  public static toEnd = (start: number, end: number): Selection => {
    return { start, end, direction: 'forward' };
  };
}
