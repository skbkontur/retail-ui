import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { TaskWithDelayAndMinimalDuration } from '../../lib/taskWithDelayAndMinimalDuration';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { isTestEnv } from '../../lib/currentEnvironment';

import { GlobalLoaderView } from './GlabalLoaderView';

export interface GlobalLoaderProps {
  /**
   * Время в миллисекундах до появления глобального лоадера после начала запроса на сервер.
   * @default 1000
   */
  delayBeforeShow?: number;
  /**
   * Время в миллисекундах до исчезновения глобального лоадера после успешной загрузки данных.
   * @default 1000
   */
  delayBeforeHide?: number;
  /**
   * Ожидаемое время загрузки данных с сервера
   */
  expectedResponseTime: number;
  rejected?: boolean;
  active?: boolean;
  disableAnimations: boolean;
  onStart?(): void;
  onDone?(): void;
  onReject?(): void;
  onAccept?(): void;
}
export interface GlobalLoaderState {
  visible: boolean;
  done: boolean;
  rejected: boolean;
  dead: boolean;
  successAnimationInProgress: boolean;
  expectedResponseTime: number;
}

let currentGlobalLoader: GlobalLoader;

export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private successAnimationInProgressTimeout: Nullable<NodeJS.Timeout>;
  private startTask: TaskWithDelayAndMinimalDuration;
  private errorTask: TaskWithDelayAndMinimalDuration;
  private stopTask: TaskWithDelayAndMinimalDuration;

  public static defaultProps: Partial<GlobalLoaderProps> = {
    expectedResponseTime: 1000,
    delayBeforeShow: 1000,
    delayBeforeHide: 1000,
    rejected: false,
    active: false,
    disableAnimations: isTestEnv,
  };

  constructor(props: GlobalLoaderProps) {
    super(props);
    this.state = {
      visible: false,
      done: false,
      rejected: false,
      dead: false,
      successAnimationInProgress: false,
      expectedResponseTime: this.props.expectedResponseTime,
    };
    this.successAnimationInProgressTimeout = null;
    currentGlobalLoader?.kill();
    currentGlobalLoader = this;
    this.startTask = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart: this.props.delayBeforeShow!,
      durationOfTask: 0,
      taskStartCallback: () => {
        this.setState({ visible: true });
        this.props.onStart?.();
        this.errorTask.start();
      },
      taskStopCallback: () => ({}),
    });
    this.errorTask = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart: 0,
      durationOfTask: 0,
      taskStartCallback: () => {
        this.setState({ rejected: true });
      },
      taskStopCallback: () => ({}),
    });
    this.stopTask = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart: this.props.delayBeforeHide!,
      durationOfTask: 0,
      taskStartCallback: () => {
        this.setState({ visible: false, successAnimationInProgress: false });
        this.props.onDone?.();
      },
      taskStopCallback: () => ({}),
    });
  }
  componentDidMount() {
    if (this.props.active) {
      this.setActive();
    }
    if (this.props.rejected) {
      this.setReject(true);
    }
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>) {
    if (this.props.rejected !== prevProps.rejected) {
      this.setReject(!!this.props.rejected);
    }
    if (this.props.active !== prevProps.active) {
      if (this.props.active) {
        this.setActive();
      } else {
        this.setDone();
      }
    }
  }

  componentWillUnmount() {
    GlobalLoader.stopTimeout(this.successAnimationInProgressTimeout);
  }

  public render() {
    let status: 'success' | 'error' | 'standard';
    if (this.state.done) {
      status = 'success';
    } else if (this.state.rejected) {
      status = 'error';
    } else {
      status = 'standard';
    }
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.errorTask.update({
            delayBeforeTaskStart: this.props.expectedResponseTime * (1 + parseInt(theme.globalLoaderWaitingFactor)),
          });
          return (
            !this.state.dead &&
            this.state.visible && (
              <GlobalLoaderView
                expectedResponseTime={this.state.expectedResponseTime}
                status={status}
                data-tid="GlobalLoader"
                disableAnimations={this.props.disableAnimations}
              />
            )
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * Позволяет запустить Глобальный лоадер с необходимой задержкой.
   * Равносильно установке пропа `active = true`
   * @public
   *
   */
  public static start = (args?: {
    delayBeforeShow?: number;
    delayBeforeHide?: number;
    expectedResponseTime?: number;
  }) => {
    currentGlobalLoader.setActive(args?.delayBeforeShow);
    if (args?.expectedResponseTime) {
      currentGlobalLoader.updateExpectedResponseTime(args?.expectedResponseTime);
    }
    if (args?.delayBeforeHide) {
      currentGlobalLoader.stopTask.update({ delayBeforeTaskStart: args.delayBeforeHide });
    }
  };

  /**
   * Сигнализирует об окончании загрузки данных.
   * Равносильно установке пропа `active = false`
   * @public
   *
   */
  public static done = () => {
    currentGlobalLoader.setDone();
  };

  /**
   * Сигнализирует об ошибке с сервера, глобальный лоадер при этом переходит в состояние спиннера.
   * Равносильно установке пропа `rejected = true`
   * @public
   *
   */
  public static reject = () => {
    currentGlobalLoader.setReject(true);
  };

  /**
   * Сигнализирует об отмене ошибки с сервера.
   * Равносильно установке пропа `rejected = false`
   * @public
   *
   */
  public static accept = () => {
    currentGlobalLoader.setReject(false);
  };

  public setActive = (delay?: number) => {
    this.startTask.stop();
    if (this.state.successAnimationInProgress) {
      this.successAnimationInProgressTimeout = setTimeout(() => {
        this.setActive();
      }, this.props.delayBeforeHide);
    } else {
      this.setState({ visible: false, done: false, rejected: false });
      if (delay) {
        this.startTask.update({ delayBeforeTaskStart: delay });
      }
      this.stopTask.stop();
      this.startTask.start();
    }
  };

  public setDone = () => {
    this.setState({ done: true, successAnimationInProgress: true });
    this.errorTask.stop();
    this.startTask.stop();
    this.stopTask.start();
  };

  public setReject = (reject: boolean) => {
    if (!this.state.visible && this.props.active) {
      this.setState({ visible: true });
    }
    this.errorTask.stop();
    this.startTask.stop();
    this.stopTask.stop();
    if (reject) {
      this.props.onReject?.();
    } else {
      this.props.onAccept?.();
    }
    this.setState({ rejected: reject });
  };

  public updateExpectedResponseTime(expectedResponseTime: number) {
    this.setState({ expectedResponseTime });
  }

  public kill = () => {
    this.setState({
      dead: true,
    });
  };

  private static stopTimeout(timeoutId: Nullable<NodeJS.Timeout>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
