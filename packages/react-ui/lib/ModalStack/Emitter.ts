import EventEmitter from 'eventemitter3';

// There are cases when users use several versions of `@skbkontur/react-ui` in one app.
// Older versions use `fbemitter` package, which doesn't have a `removeListener()` method.
// Meanwhile, latest versions moved to `eventemitter3`, which doesn't have a `remove()` method.

// When this problem was found, we released fixes for more popular versions,
// but not all teams can move to fixed versions, that may cause app crashing.
// See all details https://github.com/skbkontur/retail-ui/issues/2197

/**
 * EventEmitter wrapper with compatibility with all older versions of `@skbkontur/react-ui`
 */
export class Emitter extends EventEmitter {
  // @ts-expect-error: Type 'FallbackFBEmitter' is not assignable to type 'this'
  public addListener = <T extends EventEmitter.EventNames<string | symbol>>(
    event: T,
    fn: EventEmitter.EventListener<string | symbol, T>,
    context?: any,
  ): FallbackFBEmitter => {
    super.addListener(event, fn, context);
    return new FallbackFBEmitter(() => this.removeListener?.(event, fn));
  };
}

// Backward compatible with older versions which use the `fbemitter` package
export class FallbackFBEmitter extends Emitter {
  constructor(public readonly remove: () => void) {
    super();
  }
}
