import React from 'react';
import debounce from 'lodash.debounce';

import { Nullable } from '../../typings/utility-types';
import { isTestEnv } from '../../lib/currentEnvironment';

import { GlobalLoaderView, GlobalLoaderViewProps } from './GlabalLoaderView';

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
  /**
   * Время медленной анимации
   */
  overtime?: number;
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

  private readonly startTask = debounce(() => {
    this.setState({ visible: true });
    this.props.onStart?.();
    this.errorTask();
  }, this.props.delayBeforeShow!);

  private readonly errorTask = debounce(() => {
    this.setState({ rejected: true });
  }, this.props.expectedResponseTime + this.props.overtime!);

  private readonly stopTask = debounce(() => {
    this.setState({ visible: false, successAnimationInProgress: false });
    this.props.onDone?.();
  }, this.props.delayBeforeHide!);

  public static defaultProps: Partial<GlobalLoaderProps> = {
    expectedResponseTime: 1000,
    delayBeforeShow: 1000,
    delayBeforeHide: 1000,
    rejected: false,
    active: false,
    disableAnimations: isTestEnv,
    overtime: 5000,
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
    let status: GlobalLoaderViewProps['status'] = 'standard';
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
          delayBeforeHide={this.props.delayBeforeHide!}
          status={status}
          data-tid="GlobalLoader"
          disableAnimations={this.props.disableAnimations}
          overtime={this.props.overtime!}
        />
      )
    );
  }

  /**
   * Позволяет запустить Глобальный лоадер.
   * Равносильно установке пропа `active = true`
   * @public
   *
   */
  public static start = (expectedResponseTime?: number) => {
    currentGlobalLoader.setActive();
    if (typeof expectedResponseTime === 'number') {
      currentGlobalLoader.updateExpectedResponseTime(expectedResponseTime);
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

  public setActive = () => {
    this.startTask.cancel();
    if (this.state.successAnimationInProgress) {
      this.successAnimationInProgressTimeout = setTimeout(() => {
        this.setActive();
      }, this.props.delayBeforeHide);
    } else {
      this.setState({ visible: false, done: false, rejected: false });
      if (this.props.rejected) {
        this.setReject(true);
      } else {
        this.errorTask.cancel();
        this.stopTask.cancel();
        this.startTask();
      }
    }
  };

  public setDone = () => {
    this.setState({ done: true, successAnimationInProgress: true });
    this.errorTask.cancel();
    this.startTask.cancel();
    this.stopTask();
  };

  public setReject = (reject: boolean) => {
    if (!this.state.visible && this.props.active) {
      this.setState({ visible: true });
    }
    this.errorTask.cancel();
    this.startTask.cancel();
    this.stopTask.cancel();
    if (reject) {
      this.props.onReject?.();
    } else {
      this.props.onAccept?.();
    }
    this.setState({ rejected: reject });
    if (!reject) {
      this.errorTask();
    }
  };

  public updateExpectedResponseTime(expectedResponseTime: number) {
    this.setState({ expectedResponseTime });
  }

  public kill = () => {
    this.errorTask.cancel();
    this.stopTask.cancel();
    this.startTask.cancel();
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
