import { ActionDetails } from '../../core/action-details.js';
import { DIRECTION } from '../../core/utils.js';

describe('ActionDetails', function () {
  it('should handle insert', function () {
    const ad = new ActionDetails({
      value: '1234',
      cursorPos: 3,
      oldValue: '124',
      oldSelection: { start: 2, end: 2 },
    });

    expect(ad.removedCount).toBe(0);
    expect(ad.insertedCount).toBe(1);
    expect(ad.removeDirection).toBe(DIRECTION.NONE);
  });

  it('should handle backspace', function () {
    const ad = new ActionDetails({
      value: '124',
      cursorPos: 2,
      oldValue: '1234',
      oldSelection: { start: 3, end: 3 },
    });

    expect(ad.removedCount).toBe(1);
    expect(ad.insertedCount).toBe(0);
    expect(ad.removeDirection).toBe(DIRECTION.LEFT);
  });

  it('should handle delete', function () {
    const ad = new ActionDetails({
      value: '124',
      cursorPos: 2,
      oldValue: '1234',
      oldSelection: { start: 2, end: 2 },
    });

    expect(ad.removedCount).toBe(1);
    expect(ad.insertedCount).toBe(0);
    expect(ad.removeDirection).toBe(DIRECTION.RIGHT);
  });

  it('should fix old selection end', function () {
    const ad = new ActionDetails({
      value: '1111',
      cursorPos: 4,
      oldValue: '0000',
      // this is not common for input text
      // but sometimes happens because of HMR/autocomplete
      oldSelection: { start: 0, end: 0 },
    });

    expect(ad.removedCount).toBe(4);
    expect(ad.insertedCount).toBe(4);
    expect(ad.removeDirection).toBe(DIRECTION.NONE);
  });
});
