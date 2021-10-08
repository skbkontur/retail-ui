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
   * Ожидаемое время загрузки данных с сервера
   */
  expectedDownloadTime?: number;
  downloadSuccess?: boolean;
  downloadError?: boolean;
  isActive?: boolean;
}
export interface GlobalLoaderState {
  isVisible: boolean;
  isDone: boolean;
  isRejected: boolean;
  amIDead: boolean;
}

let currentGlobalLoader: GlobalLoader;

export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private globalLoaderVisibleTimeout: Nullable<NodeJS.Timeout>;
  private globalLoaderSuccessTimeout: Nullable<NodeJS.Timeout>;
  // private static {delayBeforeGlobalLoaderShow, expectedDownloadTime, downloadSuccess, downloadError }: boolean | undefined;

  // private readonly globalLoaderRef: any;
  public static defaultProps: Partial<GlobalLoaderProps> = {
    expectedDownloadTime: 1000,
    delayBeforeGlobalLoaderShow: 1000,
    downloadError: false,
    downloadSuccess: false,
    isActive: false,
  };

  constructor(props: GlobalLoaderProps) {
    super(props);
    this.state = {
      isVisible: this.props.isActive || false,
      isDone: false,
      isRejected: false,
      amIDead: false,
    };
    this.globalLoaderVisibleTimeout = null;
    this.globalLoaderSuccessTimeout = null;
    currentGlobalLoader?.kill();
    currentGlobalLoader = this;
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>, prevState: Readonly<GlobalLoaderState>, snapshot?: any) {
    if (this.props.downloadSuccess && this.props.downloadSuccess !== prevProps.downloadSuccess) {
      currentGlobalLoader.setDone(true);
    }
    if (this.props.downloadError && this.props.downloadError !== prevProps.downloadError) {
      currentGlobalLoader.setReject(true);
    }
    if (this.props.isActive && this.props.isActive !== prevProps.isActive) {
      currentGlobalLoader.setActive(true, this.props.delayBeforeGlobalLoaderShow);
    }
  }

  componentWillUnmount() {
    GlobalLoader.stopTimeout(this.globalLoaderVisibleTimeout);
    GlobalLoader.stopTimeout(this.globalLoaderSuccessTimeout);
  }

  public render() {
    if (this.props.downloadSuccess) {
      this.globalLoaderSuccessTimeout = setTimeout(() => {
        this.setState({ isVisible: false });
      }, 1000);
    }
    if (this.props.downloadError) {
      this.setState({ isRejected: true });
    }
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
    this.setState({ isVisible: false, isDone: false, isRejected: false });
    this.globalLoaderVisibleTimeout = setTimeout(() => {
      this.setState({ isVisible: active });
    }, delay || this.props.delayBeforeGlobalLoaderShow);
  };
  public setDone = (done: boolean) => {
    this.setState({ isDone: done });
    this.globalLoaderSuccessTimeout = setTimeout(() => {
      this.setState({ isVisible: false });
    }, 1000);
  };
  public setReject = (reject: boolean) => {
    this.setState({ isRejected: reject });
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
