import { Nullable } from '../typings/utility-types';

export interface TaskWithDelayAndMinimalDurationProps {
  delayBeforeTaskStart: number;
  durationOfTask: number;
  taskStartCallback: () => void;
  taskStopCallback: () => void;
}

export class TaskWithDelayAndMinimalDuration {
  private timeoutBeforeTaskStart: Nullable<NodeJS.Timeout>;
  private timeoutBeforeTaskStop: Nullable<NodeJS.Timeout>;
  private taskParams: TaskWithDelayAndMinimalDurationProps;
  private isTaskActive = false;

  constructor(initialValues: TaskWithDelayAndMinimalDurationProps) {
    this.taskParams = initialValues;
  }

  private setTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart = setTimeout(() => {
      this.isTaskActive && this.taskParams.taskStartCallback();
      this.clearTimeoutBeforeTaskStart();
      this.setTimeoutBeforeTaskStop();
    }, this.taskParams.delayBeforeTaskStart);
  };

  private setTimeoutBeforeTaskStop = () => {
    this.timeoutBeforeTaskStop = setTimeout(() => {
      !this.isTaskActive && this.taskParams.taskStopCallback();
      this.clearTimeoutBeforeTaskStop();
    }, this.taskParams.durationOfTask);
  };

  private clearTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart && clearTimeout(this.timeoutBeforeTaskStart);
    this.timeoutBeforeTaskStart = null;
  };

  private clearTimeoutBeforeTaskStop = () => {
    this.timeoutBeforeTaskStop && clearTimeout(this.timeoutBeforeTaskStop);
    this.timeoutBeforeTaskStop = null;
  };

  public start = () => {
    if (this.isTaskActive) {
      return;
    }

    this.isTaskActive = true;

    if (this.timeoutBeforeTaskStart) {
      this.clearTimeoutBeforeTaskStart();
    }

    this.setTimeoutBeforeTaskStart();
  };

  public update = (updateData: Partial<TaskWithDelayAndMinimalDurationProps>) => {
    this.taskParams = { ...this.taskParams, ...updateData };
  };

  public stop = () => {
    if (!this.isTaskActive) return;

    this.isTaskActive = false;

    if (this.timeoutBeforeTaskStart) {
      this.clearTimeoutBeforeTaskStart();
    }

    if (!this.timeoutBeforeTaskStop) {
      this.taskParams.taskStopCallback();
    }
  };

  public clearTask = () => {
    this.clearTimeoutBeforeTaskStart();
    this.clearTimeoutBeforeTaskStop();
  };
}
