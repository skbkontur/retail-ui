// @flow

function createReducer(reducers: *) {
  return (state: *, props: *, action: *) => {
    const { type } = action;
    const reducer = reducers[type] || (() => state);
    return reducer(state, props, action);
  };
}

export default createReducer;
