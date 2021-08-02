import { Nullable } from '../../typings/utility-types';

export interface TaskWithDelayAndMinimalDurationProps {
  delayBeforeTaskStart: number;
  durationOfTask: number;
  isTaskActive: boolean;
  taskStartCallback: () => void;
  taskFinishCallback: () => void;
}

export class TaskWithDelayAndMinimalDuration {
  private timeoutBeforeTaskStart: Nullable<NodeJS.Timeout>;
  private timeoutBeforeTaskFinish: Nullable<NodeJS.Timeout>;
  private taskParams: TaskWithDelayAndMinimalDurationProps;

  constructor(initialValues: TaskWithDelayAndMinimalDurationProps) {
    this.taskParams = initialValues;
  }

  public start = () => {
    if (this.taskParams.isTaskActive && this.timeoutBeforeTaskFinish) {
      return;
    }

    if (!this.taskParams.isTaskActive && !this.timeoutBeforeTaskFinish) {
      this.taskParams.taskFinishCallback();
      this.clearTimeoutBeforeTaskStart();
      this.clearTimeoutBeforeTaskFinish();
      return;
    }

    this.setTimeoutBeforeTaskStart();
  };

  public update = (updateData: Partial<TaskWithDelayAndMinimalDurationProps>) => {
    this.taskParams = { ...this.taskParams, ...updateData };
    // тут может прилететь undefined
    this.start();
  };

  public stop = () => {
    this.clearTimeoutBeforeTaskStart();
    this.clearTimeoutBeforeTaskFinish();
  };

  private setTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart = setTimeout(() => {
      if (this.taskParams.isTaskActive) {
        this.taskParams.taskStartCallback();
      }
      this.clearTimeoutBeforeTaskStart();
      this.setTimeoutBeforeTaskFinish();
    }, this.taskParams.delayBeforeTaskStart);
  };

  private setTimeoutBeforeTaskFinish = () => {
    this.timeoutBeforeTaskFinish = setTimeout(() => {
      !this.taskParams.isTaskActive && this.taskParams.taskFinishCallback();
      this.clearTimeoutBeforeTaskFinish();
    }, this.taskParams.durationOfTask);
  };

  private clearTimeoutBeforeTaskStart = () => {
    this.timeoutBeforeTaskStart && clearTimeout(this.timeoutBeforeTaskStart);
    this.timeoutBeforeTaskStart = null;
  };

  private clearTimeoutBeforeTaskFinish = () => {
    this.timeoutBeforeTaskFinish && clearTimeout(this.timeoutBeforeTaskFinish);
    this.timeoutBeforeTaskFinish = null;
  };
}
