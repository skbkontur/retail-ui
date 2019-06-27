import CancellationTokenSource from './CancellationTokenSource';
import CancellationTokenRegistration from './CancellationTokenRegistration';
import OperationCanceledError from './OperationCanceledError';
import { Nullable } from '../../../typings/Types';

export default class CancellationToken {
  private readonly source: Nullable<CancellationTokenSource>;

  public constructor();
  public constructor(canceled: boolean);
  public constructor(source: CancellationTokenSource);
  public constructor(value?: CancellationTokenSource | boolean) {
    if (value == null) {
      this.source = null;
    } else if (value instanceof CancellationTokenSource) {
      this.source = value;
    } else {
      this.source = new CancellationTokenSource(value);
    }
  }

  public get canBeCanceled(): boolean {
    return this.source != null && this.source.canBeCanceled;
  }

  public get isCancellationRequested(): boolean {
    return this.source != null && this.source.isCancellationRequested;
  }

  public static get none(): CancellationToken {
    return new CancellationToken();
  }

  public throwIfCancellationRequested = (): void => {
    if (this.isCancellationRequested) {
      this.throwOperationCanceledError();
    }
  };

  public throwOperationCanceledError = (): void => {
    throw new OperationCanceledError('Operation canceled', this);
  };

  public register = (action: () => void): CancellationTokenRegistration => {
    if (!action) {
      throw new Error('action is empty');
    }

    if (!this.source) {
      return new CancellationTokenRegistration();
    }

    return this.source.internalRegister(action);
  };
}
