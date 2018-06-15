import { Reducer } from './default';

// eslint-disable-next-line flowtype/no-weak-types
function createReducer(reducers: { [key: string]: Reducer }): Reducer {
  return (state: any, props: any, action: any) => {
    const { type } = action;
    const reducer = reducers[type] || (() => state);
    return reducer(state, props, action);
  };
}

export default createReducer;
