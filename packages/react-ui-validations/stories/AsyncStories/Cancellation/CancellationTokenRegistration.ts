import { Nullable } from '../../../typings/Types';

export default class CancellationTokenRegistration {
  private readonly actions: Nullable<Array<() => void>>;
  private readonly action: Nullable<() => void>;

  public constructor();
  public constructor(actions: Array<() => void>, action: () => void);
  public constructor(actions?: Array<() => void>, action?: () => void) {
    this.actions = actions;
    this.action = action;
  }

  public dispose = (): void => {
    if (this.actions && this.action) {
      const index = this.actions.indexOf(this.action);
      if (index !== -1) {
        this.actions.splice(index, 1);
      }
    }
  };
}
