import EventEmitter from 'eventemitter3';

// there are cases when users use several versions of `@skbkontur/react-ui` in one app.
// later versions use the `fbemitter` package, which does not have a `removeListener()` method
// meanwhile, `eventemitter3` does not have a `remove()` method.
// we didn't take this into account when we replaced `fbemitter` with `eventemitter3`.

// when this problem was found, we released fixes for more popular versions.
// but not all teams can move to fixed versions, that may cause app crashing.
// see all details https://github.com/skbkontur/retail-ui/issues/2197

/**
 * EventEmitter wrapper with compatibility with all later versions of `@skbkontur/react-ui`.
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

  public emit = <T extends EventEmitter.EventNames<string | symbol>>(event: T, ...args: unknown[]): boolean => {
    return super.emit(event, ...args);
  };

  // @ts-expect-error Method is optional because it is not present in `fbemitter`
  public removeListener? = <T extends EventEmitter.EventNames<string | symbol>>(
    event: T,
    fn?: EventEmitter.EventListener<string | symbol, T>,
    context?: any,
    once?: boolean,
  ): this => {
    return super.removeListener(event, fn, context, once);
  };
}

// Backward compatible with versions using the `fbemitter` package.
export class FallbackFBEmitter extends Emitter {
  // Method is optional because it is not present in `eventemitter3`
  constructor(public readonly remove?: () => void) {
    super();
  }
}
