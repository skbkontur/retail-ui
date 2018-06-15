

type ActionCheck = (SyntheticKeyboardEvent<HTMLElement>) => boolean;

type KeyboardActionMatcher<Actions> = {
  type: Actions,
  check: (SyntheticKeyboardEvent<HTMLElement>) => boolean
};

export class KeyboardActionExctracterBuilder<+T> {
  _actionMatchers: Array<KeyboardActionMatcher<*>>;

  constructor(actionMatchers: Array<KeyboardActionMatcher<T>> = []) {
    this._actionMatchers = actionMatchers;
  }

  add<P>(type: P, check: ActionCheck): KeyboardActionExctracterBuilder<T | P> {
    return new KeyboardActionExctracterBuilder(
      this._actionMatchers.concat({ type, check })
    );
  }

  build<P>(defaultAction: P): (SyntheticKeyboardEvent<HTMLElement>) => T | P {
    return event => {
      const action = this._actionMatchers.find(x => x.check(event));
      return (action && action.type) || defaultAction;
    };
  }
}

export const isModified: ActionCheck = e =>
  e.shiftKey || e.metaKey || e.ctrlKey || e.altKey;
export const isSeparator: ActionCheck = e =>
  e.key === ',' ||
  e.key === '.' ||
  e.key === 'Decimal' ||
  e.keyCode === 188 ||
  e.keyCode === 190;
