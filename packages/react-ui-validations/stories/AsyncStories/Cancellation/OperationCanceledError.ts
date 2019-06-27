import CancellationToken from './CancellationToken';

export default class OperationCanceledError extends Error {
  private readonly _cancellationToken: CancellationToken;

  public constructor(message: string, cancellationToken: CancellationToken) {
    super(message);
    this._cancellationToken = cancellationToken;
    Object.setPrototypeOf(this, OperationCanceledError.prototype);
  }

  public get cancellationToken(): CancellationToken {
    return this._cancellationToken;
  }
}
