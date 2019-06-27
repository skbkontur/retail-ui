export type PromiseState = 'loading' | 'resolved' | 'rejected';

interface CancellationToken {
  isCancellationRequested(): boolean;
}

type AsyncCallback<T> = (cancellation: CancellationToken) => Promise<T>;

export class PromiseWrapper<T> {
  private _reject: () => void;
  private _promise: Promise<T>;
  private _state: PromiseState;
  private _value?: T;
  private _reason?: any;

  get promise(): Promise<T> {
    return this._promise;
  }

  get value(): T {
    if (this.loading) {
      throw new Error('promise is loading');
    }
    return this._value as any;
  }

  get reason(): T {
    if (this.loading) {
      throw new Error('promise is loading');
    }
    return this._reason as any;
  }

  get state(): PromiseState {
    return this._state;
  }

  get loading(): boolean {
    return this._state === 'loading';
  }

  get success(): boolean {
    if (this.loading) {
      throw new Error('promise is loading');
    }
    return this._state === 'resolved';
  }

  private constructor(func: AsyncCallback<T>) {
    this._state = 'loading';
    this._reject = () => undefined;
    let isCancelled = false;
    const cancellationPromise = new Promise<void>((_, reject) => {
      this._reject = () => {
        isCancelled = true;
        reject(new Error('PromiseCancelledError'));
      };
    });
    const cancellation: CancellationToken = {
      isCancellationRequested(): boolean {
        return isCancelled;
      },
    };
    this._promise = Promise.race([cancellationPromise, func(cancellation)]) as Promise<T>;
    this._promise.then(this.onResolve, this.onReject);
  }

  public cancel() {
    this._reject();
  }

  private onResolve = (value: T): void => {
    this._value = value;
    this._state = 'resolved';
  };

  private onReject = (reason: any): void => {
    this._reason = reason;
    this._state = 'rejected';
  };

  public static run = <T>(func: AsyncCallback<T>): PromiseWrapper<T> => {
    return new PromiseWrapper(func);
  };
}
