import { InputHistory } from '../../controls/input-history.js';

describe('InputHistory', function () {
  const history = new InputHistory();

  beforeEach(function () {
    history.clear();
  });

  it('should work', function () {
    const state1 = { unmaskedValue: '1', selection: { start: 0, end: 1 } };
    const state2 = { unmaskedValue: '2', selection: { start: 1, end: 2 } };

    history.push(state1);
    history.push(state2);
    expect(history.currentIndex).toBe(1);

    expect(history.undo()).toBe(state1);
    expect(history.currentIndex).toBe(0);

    expect(history.redo()).toBe(state2);
    expect(history.currentIndex).toBe(1);

    history.clear();
    expect(history.states.length).toBe(0);
  });
});
