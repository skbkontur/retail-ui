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
}

let currentGlobalLoader: GlobalLoader;

/**
 * Является индикатором загрузки данных с сервера.
 *
 * Доступны статические методы:
 * `GlobalLoader.start(delayBeforeGlobalLoaderShow?)` - позволяет запустить Глобальный лоадер с необходимой задержкой.
 * Равносильно установке пропа `isActive = true`
 *
 * `GlobalLoader.done()` - сигнализирует об окончании загрузки данных.
 * Равносильно установке пропа `downloadSuccess = true`
 *
 * `GlobalLoader.reject()` - сигнализирует об ошибке с сервера, глобальный лоадер при этом переходит в состояние спиннера.
 * Равносильно установке пропа `downloadError = true`
 *
 * Глобальный лоадер может быть только один в приложении. Если их несколько - работать будет последний.
 *
 * Родителю глобального лоадера нужно указать position: relative для того чтобы глобальный лоадер позиционировался относительно него.
 * Также через переменную темы globalLoaderPosition = 'fixed' можно задать фиксированное положение для глобального лоадера.
 *
 */
export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private successAnimationInProgressTimeout: Nullable<NodeJS.Timeout>;
  private globalLoaderStartTask: TaskWithDelayAndMinimalDuration;
  private globalLoaderStopTask: TaskWithDelayAndMinimalDuration;

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
    };
    this.successAnimationInProgressTimeout = null;
    currentGlobalLoader?.kill();
    currentGlobalLoader = this;
    this.globalLoaderStartTask = new TaskWithDelayAndMinimalDuration({
      delayBeforeTaskStart: this.props.delayBeforeShow!,
      durationOfTask: 0,
      taskStartCallback: () => this.setState({ visible: true }),
      taskStopCallback: () => ({}),
    });
    this.globalLoaderStopTask = new TaskWithDelayAndMinimalDuration({
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
      currentGlobalLoader.setReject(true);
    }
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>, prevState: Readonly<GlobalLoaderState>, snapshot?: any) {
    if (!this.state.dead) {
      if (this.props.rejected && this.props.rejected !== prevProps.rejected) {
        currentGlobalLoader.setReject(true);
      }
      if (this.props.active !== prevProps.active) {
        if (this.props.active) {
          currentGlobalLoader.setActive();
        } else {
          currentGlobalLoader.setDone(true);
        }
      }
    }
  }

  componentWillUnmount() {
    GlobalLoader.stopTimeout(this.successAnimationInProgressTimeout);
  }

  public render() {
    return (
      !this.state.dead && (
        <GlobalLoaderView
          expectedResponseTime={this.props.expectedResponseTime}
          isGlobalLoaderVisible={this.state.visible}
          downloadSuccess={this.state.done}
          rejected={this.state.rejected}
          data-tid={this.state.visible ? 'GlobalLoader' : ''}
        />
      )
    );
  }

  public static start = (delayBeforeGlobalLoaderShow?: number) => {
    currentGlobalLoader.setActive(delayBeforeGlobalLoaderShow);
  };

  public static done = () => {
    currentGlobalLoader.setDone(true);
  };

  public static reject = () => {
    currentGlobalLoader.setReject(true);
  };

  public setActive = (delay?: number) => {
    if (!this.state.dead) {
      if (this.state.successAnimationInProgress) {
        this.successAnimationInProgressTimeout = setTimeout(() => {
          this.setActive();
        }, this.props.delayBeforeHide);
      } else {
        this.setState({ visible: false, done: false, rejected: false });
        if (delay) {
          this.globalLoaderStartTask.update({ delayBeforeTaskStart: delay });
        }
        this.globalLoaderStopTask.stop();
        this.globalLoaderStartTask.start();
      }
    }
  };

  public setDone = (done: boolean) => {
    if (!this.state.dead) {
      this.setState({ done: done, successAnimationInProgress: true });
      this.globalLoaderStartTask.stop();
      this.globalLoaderStopTask.start();
    }
  };

  public setReject = (reject: boolean) => {
    if (!this.state.dead) {
      this.globalLoaderStartTask.stop();
      this.globalLoaderStopTask.stop();
      this.setState({ rejected: reject });
    }
  };

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
