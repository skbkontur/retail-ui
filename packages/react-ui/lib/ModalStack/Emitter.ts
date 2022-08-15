import EventEmitter from 'eventemitter3';

// there are cases when users use several versions of `@skbkontur/react-ui` in one app.
// later versions use the `fbemitter` package, which does not have a `removeListener()` method
// meanwhile, `eventemitter3` does not have a `remove()` method.
// we didn't take this into account when we replaced `eventemitter3` with `fbemitter`.

// when this problem was found, we released fixes for more popular versions.
// but not all teams can move to fixed versions, that may cause app crashing.
// see all details https://github.com/skbkontur/retail-ui/issues/2197

// this code almost eliminates this risk because it adds compatibility with all later versions.

export class Emitter {
  public _emitter: EventEmitter;
  constructor() {
    this._emitter = new EventEmitter();
  }

  public addListener = <T extends EventEmitter.EventNames<string | symbol>>(
    event: T,
    fn: EventEmitter.EventListener<string | symbol, T>,
  ): FallbackFBEmitter => {
    this._emitter.addListener(event, fn);

    return new FallbackFBEmitter(() => this.removeListener(event, fn));
  };

  public emit = <T extends EventEmitter.EventNames<string | symbol>>(event: T, ...args: unknown[]): boolean => {
    return this._emitter.emit(event, ...args);
  };

  public removeListener = <T extends EventEmitter.EventNames<string | symbol>>(
    event: T,
    fn?: EventEmitter.EventListener<string | symbol, T>,
  ): this => {
    this._emitter.removeListener(event, fn);
    return this;
  };
}

// Backward compatible with versions using the `fbemitter` package.
export class FallbackFBEmitter extends Emitter {
  constructor(public readonly remove: () => void) {
    super();
  }
}
