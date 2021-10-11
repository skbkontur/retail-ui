import React from 'react';

import { Nullable } from '../../typings/utility-types';

import { GlobalLoaderView } from './GlabalLoaderView';

export interface GlobalLoaderProps {
  /**
   * Время в миллисекундах до появления глобального лоадера после начала запроса на сервер.
   * @default 1000
   */
  delayBeforeGlobalLoaderShow?: number;
  /**
   * Время в миллисекундах до исчезновения глобального лоадера после успешной загрузки данных.
   * @default 1000
   */
  delayBeforeGlobalLoaderDisappear?: number;
  /**
   * Ожидаемое время загрузки данных с сервера
   */
  expectedDownloadTime?: number;
  downloadSuccess?: boolean;
  downloadError?: boolean;
  isLoading?: boolean;
}
export interface GlobalLoaderState {
  isVisible: boolean;
  isDone: boolean;
  isRejected: boolean;
  amIDead: boolean;
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
 */
export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private globalLoaderVisibleTimeout: Nullable<NodeJS.Timeout>;
  private globalLoaderSuccessTimeout: Nullable<NodeJS.Timeout>;

  public static defaultProps: Partial<GlobalLoaderProps> = {
    expectedDownloadTime: 1000,
    delayBeforeGlobalLoaderShow: 1000,
    delayBeforeGlobalLoaderDisappear: 1000,
    downloadError: false,
    downloadSuccess: false,
    isLoading: false,
  };

  constructor(props: GlobalLoaderProps) {
    super(props);
    this.state = {
      isVisible: false,
      isDone: false,
      isRejected: false,
      amIDead: false,
    };
    this.globalLoaderVisibleTimeout = null;
    this.globalLoaderSuccessTimeout = null;
    currentGlobalLoader?.kill();
    currentGlobalLoader = this;
  }
  componentDidMount() {
    if (!this.state.amIDead && this.props.isLoading) {
      this.globalLoaderVisibleTimeout = setTimeout(() => {
        this.setState({ isVisible: true });
      }, this.props.delayBeforeGlobalLoaderShow);
    }
    if (this.props.downloadSuccess) {
      currentGlobalLoader.setDone(true);
    }
    if (this.props.downloadError) {
      currentGlobalLoader.setReject(true);
    }
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>, prevState: Readonly<GlobalLoaderState>, snapshot?: any) {
    if (!this.state.amIDead) {
      if (this.props.downloadSuccess && this.props.downloadSuccess !== prevProps.downloadSuccess) {
        currentGlobalLoader.setDone(true);
      }
      if (this.props.downloadError && this.props.downloadError !== prevProps.downloadError) {
        currentGlobalLoader.setReject(true);
      }
      if (this.props.isLoading && this.props.isLoading !== prevProps.isLoading) {
        currentGlobalLoader.setActive(true, this.props.delayBeforeGlobalLoaderShow);
      }
    }
  }

  componentWillUnmount() {
    GlobalLoader.stopTimeout(this.globalLoaderVisibleTimeout);
    GlobalLoader.stopTimeout(this.globalLoaderSuccessTimeout);
  }

  public render() {
    return (
      !this.state.amIDead && (
        <GlobalLoaderView
          expectedDownloadTime={this.props.expectedDownloadTime}
          isGlobalLoaderVisible={this.state.isVisible}
          downloadSuccess={this.state.isDone}
          downloadError={this.state.isRejected}
        />
      )
    );
  }

  public static start = (delayBeforeGlobalLoaderShow?: number) => {
    currentGlobalLoader.setActive(true, delayBeforeGlobalLoaderShow);
  };

  public static done = () => {
    currentGlobalLoader.setDone(true);
  };

  public static reject = () => {
    currentGlobalLoader.setReject(true);
  };

  public setActive = (active: boolean, delay?: number) => {
    if (!this.state.amIDead) {
      this.setState({ isVisible: false, isDone: false, isRejected: false });
      this.globalLoaderVisibleTimeout = setTimeout(() => {
        this.setState({ isVisible: active });
      }, delay || this.props.delayBeforeGlobalLoaderShow);
    }
  };

  public setDone = (done: boolean) => {
    if (!this.state.amIDead) {
      this.setState({ isDone: done });
      this.globalLoaderSuccessTimeout = setTimeout(() => {
        this.setState({ isVisible: false });
      }, this.props.delayBeforeGlobalLoaderDisappear);
    }
  };

  public setReject = (reject: boolean) => {
    if (!this.state.amIDead) {
      this.setState({ isRejected: reject });
    }
  };

  public kill = () => {
    this.setState({
      amIDead: true,
    });
  };

  private static stopTimeout(timeoutId: Nullable<NodeJS.Timeout>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}
