export interface Selection {
  start: number;
  end: number;
  direction: SelectionDirection;
}

export type SelectionDirection = 'forward' | 'backward' | 'none';

export class SelectionHelper {
  public static fromPosition = (position: number): Selection => {
    return { start: position, end: position, direction: 'none' };
  };

  public static backward = (start: number, end: number): Selection => {
    return { start, end, direction: 'backward' };
  };

  public static forward = (start: number, end: number): Selection => {
    return { start, end, direction: 'forward' };
  };
}
