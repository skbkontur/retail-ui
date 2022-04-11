import React from 'react';

type ActionCheck = (x0: React.KeyboardEvent<HTMLElement>) => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface KeyboardActionMatcher<Actions = any> {
  type: Actions;
  check: (x0: React.KeyboardEvent<HTMLElement>) => boolean;
}

export class KeyboardActionExctracterBuilder<T> {
  private _actionMatchers: Array<KeyboardActionMatcher>;

  constructor(actionMatchers: Array<KeyboardActionMatcher<T>> = []) {
    this._actionMatchers = actionMatchers;
  }

  public add<T>(type: T, check: ActionCheck): KeyboardActionExctracterBuilder<T> {
    return new KeyboardActionExctracterBuilder(this._actionMatchers.concat({ type, check }));
  }

  public build<P = T>(defaultAction: P): (x0: React.KeyboardEvent<HTMLElement>) => T {
    return (event) => {
      const action = this._actionMatchers.find((x) => x.check(event));
      return (action && action.type) || defaultAction;
    };
  }
}
