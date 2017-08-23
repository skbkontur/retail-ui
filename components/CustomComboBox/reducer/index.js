// @flow
// eslint-disable-next-line flowtype/no-weak-types
function createReducer(reducers: { [string]: Function }) {
  return (state: *, props: *, action: *) => {
    const { type } = action;
    const reducer = reducers[type] || (() => state);
    return reducer(state, props, action);
  };
}

export default createReducer;
