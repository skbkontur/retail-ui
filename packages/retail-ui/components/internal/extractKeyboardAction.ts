import React from 'react';

type ActionCheck = (x0: React.KeyboardEvent<HTMLElement>) => boolean;

interface KeyboardActionMatcher<Actions> {
  type: Actions;
  check: (x0: React.KeyboardEvent<HTMLElement>) => boolean;
}

export class KeyboardActionExctracterBuilder<T> {
  private _actionMatchers: Array<KeyboardActionMatcher<any>>;

  constructor(actionMatchers: Array<KeyboardActionMatcher<T>> = []) {
    this._actionMatchers = actionMatchers;
  }

  public add<P = T>(type: T, check: ActionCheck): KeyboardActionExctracterBuilder<T> {
    return new KeyboardActionExctracterBuilder(this._actionMatchers.concat({ type, check }));
  }

  public build<P = T>(defaultAction: P): (x0: React.KeyboardEvent<HTMLElement>) => T {
    return event => {
      const action = this._actionMatchers.find(x => x.check(event));
      return (action && action.type) || defaultAction;
    };
  }
}
