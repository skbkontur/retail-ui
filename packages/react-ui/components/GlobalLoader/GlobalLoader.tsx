import React from 'react';
import debounce from 'lodash.debounce';

import { Nullable } from '../../typings/utility-types';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { GlobalLoaderView, GlobalLoaderViewProps } from './GlobalLoaderView';

export interface GlobalLoaderProps {
  /**
   * Время(ms) до появления лоадера
   */
  delayBeforeShow?: number;
  /**
   * Время(ms) до исчезновения лоадера
   */
  delayBeforeHide?: number;
  /**
   * Ожидаемое время(ms) ответа сервера
   */
  expectedResponseTime?: number;
  /**
   * Анимация лоадера в виде спиннера
   */
  rejected?: boolean;
  /**
   * Показывать лоадер
   */
  active?: boolean;
  /**
   * Не показывать анимацию
   */
  disableAnimations?: boolean;
  /**
   * Коллбек, вызывающийся после появления лоадера
   */
  onStart?(): void;
  /**
   * Коллбек, вызывающийся после исчезновения лоадера
   */
  onDone?(): void;
  /**
   * Коллбек, вызывающийся после вызова `GlobalLoader.reject()`.
   * Или после установки пропа `rejected = true`
   */
  onReject?(): void;
  /**
   * Коллбек, вызывающийся после вызова `GlobalLoader.accept()`.
   * Или после установки пропа `rejected = false`
   */
  onAccept?(): void;
}
export interface GlobalLoaderState {
  visible: boolean;
  done: boolean;
  rejected: boolean;
  accept: boolean;
  dead: boolean;
  successAnimationInProgress: boolean;
  expectedResponseTime: number;
  started: boolean;
}

export const GlobalLoaderDataTids = {
  root: 'GlobalLoader',
} as const;

type DefaultProps = Required<
  Pick<
    GlobalLoaderProps,
    'expectedResponseTime' | 'delayBeforeShow' | 'delayBeforeHide' | 'rejected' | 'active' | 'disableAnimations'
  >
>;

let currentGlobalLoader: GlobalLoader;

@rootNode
export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  private successAnimationInProgressTimeout: Nullable<NodeJS.Timeout>;
  private setRootNode!: TSetRootNode;
  private getProps = createPropsGetter(GlobalLoader.defaultProps);

  private readonly startTask = debounce(() => {
    this.setState({ visible: true });
    this.props.onStart?.();
  }, this.getProps().delayBeforeShow);

  private readonly stopTask = debounce(() => {
    this.setState({ visible: false, successAnimationInProgress: false, started: false });
    this.props.onDone?.();
  }, this.getProps().delayBeforeHide);

  public static defaultProps: DefaultProps = {
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
      started: false,
      visible: false,
      done: false,
      rejected: false,
      accept: false,
      dead: false,
      successAnimationInProgress: false,
      expectedResponseTime: this.getProps().expectedResponseTime,
    };
    this.successAnimationInProgressTimeout = null;
    currentGlobalLoader?.kill();
    currentGlobalLoader = this;
  }
  componentDidMount() {
    const { active, rejected } = this.getProps();
    if (active) {
      this.setActive();
    }
    if (rejected) {
      this.setReject(true);
    }
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>) {
    const { expectedResponseTime, rejected, active } = this.getProps();
    if (expectedResponseTime !== prevProps.expectedResponseTime) {
      this.setState({ expectedResponseTime });
    }
    if (rejected !== prevProps.rejected) {
      this.setReject(!!rejected);
    }
    if (active !== prevProps.active) {
      if (active) {
        this.setActive();
      } else {
        this.setDone();
      }
    }
  }

  componentWillUnmount() {
    this.successAnimationInProgressTimeout && clearTimeout(this.successAnimationInProgressTimeout);
  }

  public render() {
    let status: GlobalLoaderViewProps['status'] = 'standard';
    if (this.state.done) {
      status = 'success';
    } else if (this.state.rejected) {
      status = 'error';
    } else if (this.state.accept) {
      status = 'accept';
    }
    const { delayBeforeHide, disableAnimations } = this.getProps();
    return (
      !this.state.dead &&
      this.state.visible && (
        <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
          <GlobalLoaderView
            expectedResponseTime={this.state.expectedResponseTime}
            delayBeforeHide={delayBeforeHide}
            status={status}
            data-tid={GlobalLoaderDataTids.root}
            disableAnimations={disableAnimations}
          />
        </CommonWrapper>
      )
    );
  }

  /**
   * Запускает анимацию лоадера <br />
   * Равносильно установке пропа `active = true`
   *
   * @public
   */
  public static start = (expectedResponseTime?: number) => {
    currentGlobalLoader.setActive();
    if (typeof expectedResponseTime === 'number') {
      currentGlobalLoader.updateExpectedResponseTime(expectedResponseTime);
    }
  };

  /**
   * Показывает анимацию успешного завершения загрузки <br />
   * Равносильно установке пропа `active = false`
   *
   * @public
   */
  public static done = () => {
    currentGlobalLoader.setDone();
  };

  /**
   * Переключает анимацию лоадера в состояние спиннера <br />
   * Равносильно установке пропа `rejected = true`
   *
   * @public
   */
  public static reject = () => {
    currentGlobalLoader.setReject(true);
  };

  /**
   * Возвращает лоадер из состояния спиннера в обычное и продолжает анимацию с того места, на котором она была прерван <br />
   * Равносильно установке пропа `rejected = false`
   *
   * @public
   */
  public static accept = () => {
    currentGlobalLoader.setReject(false);
  };

  public setActive = () => {
    const { delayBeforeHide, rejected } = this.getProps();
    this.startTask.cancel();
    if (this.state.successAnimationInProgress) {
      this.successAnimationInProgressTimeout = setTimeout(() => {
        this.setActive();
      }, delayBeforeHide);
    } else {
      this.setState({ visible: false, done: false, rejected: false, accept: false, started: true });
      if (rejected) {
        this.setReject(true);
      } else {
        this.stopTask.cancel();
        this.startTask();
      }
    }
  };

  public setDone = () => {
    this.setState({ done: true, successAnimationInProgress: true });
    this.startTask.cancel();
    this.stopTask();
  };

  public setReject = (reject: boolean) => {
    if (!this.state.visible && (this.state.started || this.getProps().active)) {
      this.setState({ visible: true });
    }
    this.startTask.cancel();
    this.stopTask.cancel();
    if (reject) {
      this.props.onReject?.();
    } else if (this.state.rejected) {
      this.setState({ accept: true });
      this.props.onAccept?.();
    }
    this.setState({ rejected: reject });
  };

  public updateExpectedResponseTime(expectedResponseTime: number) {
    this.setState({ expectedResponseTime });
  }

  public kill = () => {
    this.stopTask.cancel();
    this.startTask.cancel();
    this.setState({
      dead: true,
    });
  };
}
