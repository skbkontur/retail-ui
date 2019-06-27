import CancellationToken from './Cancellation/CancellationToken';
import CancellationTokenSource from './Cancellation/CancellationTokenSource';
import { Nullable } from '../../typings/Types';

export default class PromiseHelper {
  public static delay = (timeout: number, cancellation?: Nullable<CancellationToken>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const token = cancellation || CancellationToken.none;
      const timer = !token.isCancellationRequested ? window.setTimeout(() => resolve(), timeout) : 0;
      token.register(() => {
        window.clearTimeout(timer);
        try {
          token.throwIfCancellationRequested();
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  public static resolveAfter = <T>(
    promise: Promise<T>,
    timeout: number,
    cancellation?: Nullable<CancellationToken>,
  ): Promise<T> => {
    return Promise.all([
      PromiseHelper.withCancellation(promise, cancellation),
      PromiseHelper.delay(timeout, cancellation),
    ]).then(x => x[0]);
  };

  public static rejectAfter = <T>(
    promise: Promise<T>,
    timeout: number,
    cancellation?: Nullable<CancellationToken>,
  ): Promise<T> => {
    const timeoutToken = new CancellationTokenSource(timeout).token;
    const linkedToken = CancellationTokenSource.createLinkedTokenSource(timeoutToken, cancellation).token;
    return PromiseHelper.withCancellation(promise, linkedToken);
  };

  public static continueAfter = <T>(
    promise: Promise<T>,
    timeout: number,
    cancellation?: Nullable<CancellationToken>,
  ): Promise<T> => {
    return PromiseHelper.delay(timeout, cancellation).then(() => PromiseHelper.withCancellation(promise, cancellation));
  };

  public static fromToken = <T = void>(cancellation: Nullable<CancellationToken>): Promise<T> => {
    const token = cancellation || CancellationToken.none;
    return new Promise<T>((resolve, reject) => {
      token.register(() => {
        try {
          token.throwIfCancellationRequested();
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  public static withCancellation = <T>(promise: Promise<T>, cancellation: Nullable<CancellationToken>): Promise<T> => {
    return Promise.race([PromiseHelper.fromToken<T>(cancellation), promise]);
  };

  public static run = <T>(func: () => Promise<T>): Promise<T> => {
    return func();
  };
}
