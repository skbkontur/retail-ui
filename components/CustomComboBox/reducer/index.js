// @flow

function createReducer(reducers: {[string]: Function}) {
  return (state: *, props: *, action: *) => {
    const { type } = action;
    const reducer = reducers[type] || (() => state);
    return reducer(state, props, action);
  };
}

export default createReducer;
