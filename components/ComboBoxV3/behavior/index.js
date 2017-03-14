// @flow

import defaultBehaviorReducers, { defaultState } from './default';

function createBehavior(reducers: *) {
  return (state: *, props: *, action: *) => {
    const { type } = action;
    const reducer = reducers[type] || (() => state);
    return reducer(state, props, action);
  };
}

export default createBehavior;
export { defaultBehaviorReducers };
export { defaultState };
