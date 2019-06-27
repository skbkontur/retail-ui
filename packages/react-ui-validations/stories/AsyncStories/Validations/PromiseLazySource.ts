import { Nullable } from '../../../typings/Types';

export type PromiseResolveCallback<T> = (value?: T | PromiseLike<T>) => void;
export type PromiseRejectCallback = (reason?: any) => void;

interface PromiseData<T> {
  promise: Promise<T>;
  resolve: PromiseResolveCallback<T>;
  reject: PromiseRejectCallback;
}

export default class PromiseLazySource<T> {
  private promiseData: Nullable<PromiseData<T>> = null;
  private func: Nullable<() => Promise<T>> = null;

  public resolve(func: () => Promise<T>): void {
    if (this.func) {
      throw new Error('cannot change func');
    }
    this.func = func;
    this.runFunc();
  }

  public get promise(): Promise<T> {
    if (!this.promiseData) {
      this.promiseData = this.getPromiseData();
      this.runFunc();
    }
    return this.promiseData.promise;
  }

  private runFunc(): void {
    if (this.func && this.promiseData) {
      this.func().then(this.promiseData.resolve, this.promiseData.reject);
    }
  }

  private getPromiseData(): PromiseData<T> {
    let resolve: PromiseResolveCallback<T>;
    let reject: PromiseRejectCallback;
    const promise = new Promise<T>((resolveCallback, rejectCallback) => {
      resolve = resolveCallback;
      reject = rejectCallback;
    });
    // @ts-ignore
    return { promise, resolve, reject };
  }
}
