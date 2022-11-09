import { Selection } from './SelectionHelper';

export type CursorMap = number[];

const calculateExtendedSelection = (map: CursorMap, selection: Selection, step: number): Selection => {
  if (selection.direction === 'backward') {
    return {
      start: CursorHelper.calculatePosition(map, selection.start, step),
      end: selection.end,
      direction: 'backward',
    };
  }

  return {
    start: selection.start,
    end: CursorHelper.calculatePosition(map, selection.end, step),
    direction: 'forward',
  };
};

export class CursorHelper {
  public static normalizePosition(map: CursorMap, position: number): number {
    return map[Math.min(Math.max(0, position), map.length - 1)];
  }

  public static calculatePosition(map: CursorMap, position: number, step: number) {
    if (position < 0 || map.length <= position) {
      throw new Error(`position out of range [${0} .. ${map.length - 1}], actual value: ${position}`);
    }
    const raw = CursorHelper.toRawPosition(map, position);
    return CursorHelper.toFormattedPosition(map, raw + step);
  }

  public static extendSelection(map: CursorMap, selection: Selection, step: number) {
    const normalizedSelection = CursorHelper.normalizeSelection(map, selection);

    return CursorHelper.normalizeSelection(map, calculateExtendedSelection(map, normalizedSelection, step));
  }

  public static normalizeSelection(map: CursorMap, selection: Selection): Selection {
    const start = CursorHelper.normalizePosition(map, selection.start);
    const end = CursorHelper.normalizePosition(map, selection.end);

    if (start === end) {
      return {
        start,
        end,
        direction: 'none',
      };
    }

    if (start < end) {
      return {
        start,
        end,
        direction: selection.direction === 'backward' ? 'backward' : 'forward',
      };
    }

    return {
      start: end,
      end: start,
      direction: selection.direction === 'backward' ? 'forward' : 'backward',
    };
  }

  public static toRawPosition(map: CursorMap, formattedPosition: number) {
    const count = Math.min(Math.max(0, formattedPosition), map.length - 1);
    return new Set(map.slice(0, count + 1)).size - 1;
  }

  public static toFormattedPosition(map: CursorMap, rawPosition: number) {
    const count = Math.max(0, rawPosition) + 1;
    const unique = new Set();

    for (const position of map) {
      unique.add(position);
      if (unique.size === count) {
        return position;
      }
    }

    return map[map.length - 1];
  }
}
