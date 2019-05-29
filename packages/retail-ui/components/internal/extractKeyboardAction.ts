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

  public add<P>(type: P, check: ActionCheck): KeyboardActionExctracterBuilder<T | P> {
    return new KeyboardActionExctracterBuilder(this._actionMatchers.concat({ type, check }));
  }

  public build<P>(defaultAction: P): (x0: React.KeyboardEvent<HTMLElement>) => T | P {
    return event => {
      const action = this._actionMatchers.find(x => x.check(event));
      return (action && action.type) || defaultAction;
    };
  }
}

export const isModified: ActionCheck = e => e.shiftKey || e.metaKey || e.ctrlKey || e.altKey;
export const isFkeys: ActionCheck = e => e.keyCode >= 112 && e.keyCode <= 123;
