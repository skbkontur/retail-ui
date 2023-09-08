import { Nullable } from '../typings/utility-types';

import { globalThat, Timeout } from './globalThat';

export interface TaskWithDelayAndMinimalDurationProps {
  delayBeforeTaskStart: number;
  durationOfTask: number;
  taskStartCallback: () => void;
  taskStopCallback: () => void;
}

export class TaskWithDelayAndMinimalDuration {
  private timeoutBeforeTaskStart: Nullable<Timeout>;
  private timeoutBeforeTaskStop: Nullable<Timeout>;
  private taskParams: TaskWithDelayAndMinimalDurationProps;
  private isTaskActive = false;

  constructor(initialValues: TaskWithDelayAndMinimalDurationProps) {
    this.taskParams = initialValues;
  }

  private setTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart = globalThat.setTimeout(() => {
      this.isTaskActive && this.taskParams.taskStartCallback();
      this.clearTimeoutBeforeTaskStart();
      this.setTimeoutBeforeTaskStop();
    }, this.taskParams.delayBeforeTaskStart);
  };

  private setTimeoutBeforeTaskStop = () => {
    this.timeoutBeforeTaskStop = globalThat.setTimeout(() => {
      !this.isTaskActive && this.taskParams.taskStopCallback();
      this.clearTimeoutBeforeTaskStop();
    }, this.taskParams.durationOfTask);
  };

  private clearTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart && globalThat.clearTimeout(this.timeoutBeforeTaskStart);
    this.timeoutBeforeTaskStart = null;
  };

  private clearTimeoutBeforeTaskStop = () => {
    this.timeoutBeforeTaskStop && globalThat.clearTimeout(this.timeoutBeforeTaskStop);
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
    this.clearTimeoutBeforeTaskStart();
    this.clearTimeoutBeforeTaskStop();
  };
}
