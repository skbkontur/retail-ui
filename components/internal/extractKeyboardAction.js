// @flow

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

  addMatcher<P>(
    setup: (InternalActionMatcher<null>) => InternalActionMatcher<P>
  ): KeyboardActionExctracterBuilder<T | P> {
    const { type, check }: InternalActionMatcher<P> = setup(
      new InternalActionMatcher(null, null)
    );
    if (type == null) {
      throw new Error('KeyboardActionMatcher type is not defined');
    }
    if (check == null) {
      throw new Error('KeyboardActionMatcher check is not defined');
    }
    return new KeyboardActionExctracterBuilder(
      this._actionMatchers.concat({ type, check })
    );
  }

  build(): (SyntheticKeyboardEvent<HTMLElement>) => ?T {
    return (event: SyntheticKeyboardEvent<HTMLElement>): ?T => {
      const action = this._actionMatchers.find(x => x.check(event));
      return action && action.type;
    };
  }
}

class InternalActionMatcher<+T> {
  +type: T;
  +check: ActionCheck | null;

  constructor(type: T, check: ActionCheck | null) {
    this.type = type;
    this.check = check;
  }

  setType<P>(type: P): InternalActionMatcher<P> {
    return new InternalActionMatcher(type, this.check);
  }

  setCheck(check: ActionCheck): InternalActionMatcher<T> {
    return new InternalActionMatcher(this.type, check);
  }
}
