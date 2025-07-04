import { getMenuPositions } from '../getMenuPositions';

describe('getMenuPositions', () => {
  it('correctly transforms menuPos & menuAlign to popup positions', () => {
    expect(getMenuPositions()).toEqual(['bottom left', 'top left', 'bottom right', 'top right']);
    expect(getMenuPositions('top', undefined)).toEqual(['top left', 'top right']);
    expect(getMenuPositions('bottom', undefined)).toEqual(['bottom left', 'bottom right']);
    expect(getMenuPositions('middle', undefined)).toEqual(['middle left', 'middle right']);
    expect(getMenuPositions(undefined, 'left')).toEqual(['bottom left', 'top left']);
    expect(getMenuPositions(undefined, 'right')).toEqual(['bottom right', 'top right']);
    expect(getMenuPositions('top', 'right')).toEqual(['top right']);
    expect(getMenuPositions('bottom', 'left')).toEqual(['bottom left']);
    expect(getMenuPositions('middle', 'left')).toEqual(['middle left']);
    expect(getMenuPositions('middle', 'right')).toEqual(['middle right']);
  });
});
