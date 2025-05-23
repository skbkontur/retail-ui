import { globalObject, SafeTimer } from '@skbkontur/global-object';

export interface TaskWithDelayAndMinimalDurationProps {
  delayBeforeTaskStart: number;
  durationOfTask: number;
  taskStartCallback: () => void;
  taskStopCallback: () => void;
}

export class TaskWithDelayAndMinimalDuration {
  private timeoutBeforeTaskStart: SafeTimer;
  private timeoutBeforeTaskStop: SafeTimer;
  private taskParams: TaskWithDelayAndMinimalDurationProps;
  private isTaskActive = false;

  constructor(initialValues: TaskWithDelayAndMinimalDurationProps) {
    this.taskParams = initialValues;
  }

  private setTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart = globalObject.setTimeout(() => {
      this.isTaskActive && this.taskParams.taskStartCallback();
      this.clearTimeoutBeforeTaskStart();
      this.setTimeoutBeforeTaskStop();
    }, this.taskParams.delayBeforeTaskStart);
  };

  private setTimeoutBeforeTaskStop = () => {
    this.timeoutBeforeTaskStop = globalObject.setTimeout(() => {
      !this.isTaskActive && this.taskParams.taskStopCallback();
      this.clearTimeoutBeforeTaskStop();
    }, this.taskParams.durationOfTask);
  };

  private clearTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart && globalObject.clearTimeout(this.timeoutBeforeTaskStart);
    this.timeoutBeforeTaskStart = null;
  };

  private clearTimeoutBeforeTaskStop = () => {
    this.timeoutBeforeTaskStop && globalObject.clearTimeout(this.timeoutBeforeTaskStop);
    this.timeoutBeforeTaskStop = null;
  };

  public start = () => {
    if (this.isTaskActive) {
      return;
    }

    this.isTaskActive = true;

    if (this.timeoutBeforeTaskStop) {
      return;
    }

    if (this.timeoutBeforeTaskStart) {
      this.clearTimeoutBeforeTaskStart();
    }

    this.setTimeoutBeforeTaskStart();
  };

  public update = (updateData: Partial<TaskWithDelayAndMinimalDurationProps>) => {
    this.taskParams = { ...this.taskParams, ...updateData };
  };

  public stop = () => {
    if (!this.isTaskActive) {
      return;
    }

    this.isTaskActive = false;

    if (!this.timeoutBeforeTaskStart && !this.timeoutBeforeTaskStop) {
      this.taskParams.taskStopCallback();
    }

    if (this.timeoutBeforeTaskStart) {
      this.clearTimeoutBeforeTaskStart();
    }
  };

  public clearTask = () => {
    this.isTaskActive = false;
    this.clearTimeoutBeforeTaskStart();
    this.clearTimeoutBeforeTaskStop();
  };
}
