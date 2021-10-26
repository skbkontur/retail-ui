import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { TaskWithDelayAndMinimalDuration } from '../../lib/taskWithDelayAndMinimalDuration';

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

/**
 * Является индикатором загрузки данных с сервера.
 *
 * Доступны статические методы:
 * `GlobalLoader.start(args?: {
 * delayBeforeShow?: number;
 * delayBeforeHide?: number;
 * expectedResponseTime?: number;
 * })` - позволяет запустить Глобальный лоадер с необходимой задержкой.
 * Равносильно установке пропа `active = true`
 *
 * `GlobalLoader.done()` - сигнализирует об окончании загрузки данных.
 * Равносильно установке пропа `active = false`
 *
 * `GlobalLoader.reject()` - сигнализирует об ошибке с сервера, глобальный лоадер при этом переходит в состояние спиннера.
 * Равносильно установке пропа `rejected = true`
 *
 * `GlobalLoader.accept()` - сигнализирует об щотмене ошибки с сервера.
 * Равносильно установке пропа `rejected = false`
 *
 * Глобальный лоадер может быть только один в приложении. Если их несколько - работать будет последний.
 *
 * Родителю глобального лоадера нужно указать position: relative для того чтобы глобальный лоадер позиционировался относительно него.
 * Также через переменную темы globalLoaderPosition = 'fixed' можно задать фиксированное положение для глобального лоадера.
 *
 */
export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private successAnimationInProgressTimeout: Nullable<NodeJS.Timeout>;
  private startTask: TaskWithDelayAndMinimalDuration;
  private stopTask: TaskWithDelayAndMinimalDuration;

  public static defaultProps: Partial<GlobalLoaderProps> = {
    expectedResponseTime: 1000,
    delayBeforeShow: 1000,
    delayBeforeHide: 1000,
    rejected: false,
    active: false,
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
      taskStartCallback: () => this.setState({ visible: true }),
      taskStopCallback: () => ({}),
    });
    this.stopTask = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart: this.props.delayBeforeHide!,
      durationOfTask: 0,
      taskStartCallback: () => this.setState({ visible: false, successAnimationInProgress: false }),
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
    let status: 'success' | 'error' | undefined;
    if (this.state.done) {
      status = 'success';
    } else if (this.state.rejected) {
      status = 'error';
    }
    return (
      !this.state.dead &&
      this.state.visible && (
        <GlobalLoaderView
          expectedResponseTime={this.state.expectedResponseTime}
          status={status}
          data-tid={this.state.visible ? 'GlobalLoader' : ''}
        />
      )
    );
  }

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

  public static done = () => {
    currentGlobalLoader.setDone();
  };

  public static reject = () => {
    currentGlobalLoader.setReject(true);
  };

  public static accept = () => {
    currentGlobalLoader.setReject(false);
  };

  public setActive = (delay?: number) => {
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
    this.startTask.stop();
    this.stopTask.start();
  };

  public setReject = (reject: boolean) => {
    this.startTask.stop();
    this.stopTask.stop();
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
