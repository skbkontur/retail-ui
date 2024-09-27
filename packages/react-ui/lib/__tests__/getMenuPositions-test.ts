import { getMenuPositions } from '../getMenuPositions';

describe('getMenuPositions', () => {
  it('correctly transforms menuPos & menuAlign to popup positions', () => {
    expect(getMenuPositions()).toEqual(['bottom left', 'top left']);
    expect(getMenuPositions('top')).toEqual(['top left']);
    expect(getMenuPositions(undefined, 'right')).toEqual(['bottom right', 'top right']);
    expect(getMenuPositions('top', 'right')).toEqual(['top right']);
    expect(getMenuPositions('bottom', 'left')).toEqual(['bottom left']);
  });
});
