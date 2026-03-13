import React from 'react';
import debounce from 'lodash.debounce';

import { isTestEnv } from '../../lib/currentEnvironment.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode//rootNodeDecorator.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';

import type { GlobalLoaderViewProps } from './GlobalLoaderView.js';
import { GlobalLoaderView } from './GlobalLoaderView.js';

export interface GlobalLoaderProps {
  /** Задержка до появления лоадера в миллисекундах. */
  delayBeforeShow?: number;

  /** Задержка до исчезновения лоадера в миллисекундах. */
  delayBeforeHide?: number;

  /** Ожидаемое время(ms) ответа сервера. */
  expectedResponseTime?: number;

  /** Показывать лоадер в виде бегающей полоски. */
  rejected?: boolean;

  /** Показывать лоадер. */
  active?: boolean;

  /** Отключить анимацию. */
  disableAnimations?: boolean;

  /** Событие после появления лоадера. */
  onStart?(): void;

  /** Событие после исчезновения лоадера. */
  onDone?(): void;

  /** Событие после вызова reject. */
  onReject?(): void;

  /** Событие после вызова accept. */
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

let currentGlobalLoader: GlobalLoader | null;

/**
 * Универсальный индикатор обмена данными с сервером.
 * Он появляется у верхней границы экрана и выглядит как тоненькая полоска, окрашенная в фирменный цвет продукта.
 *
 * Глобальный лоадер может быть только один в приложении. Поэтому каждый новый экземпляр компонента заменяет предыдущий экземпляр и начинает перехватывать статические методы.
 *
 * Предполагается монтирование компонента в единственном месте. И управление им через статические методы, либо через пропсы.
 *
 */
@rootNode
export class GlobalLoader extends React.Component<GlobalLoaderProps, GlobalLoaderState> {
  public static __KONTUR_REACT_UI__ = 'GlobalLoader';
  public static displayName = 'GlobalLoader';

  public getRootNode!: TGetRootNode;
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

  private readonly resumeTaskAfterSuccessAnimation = debounce(() => {
    this.setActive();
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
  }
  componentDidMount() {
    currentGlobalLoader?.kill();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    currentGlobalLoader = this;
    const { active, rejected } = this.getProps();
    if (active) {
      this.setActive();
    }
    if (rejected) {
      this.setReject(true);
    }
  }

  componentWillUnmount(): void {
    currentGlobalLoader = null;
  }

  componentDidUpdate(prevProps: Readonly<GlobalLoaderProps>) {
    const { expectedResponseTime, rejected, active } = this.getProps();
    if (expectedResponseTime !== prevProps.expectedResponseTime) {
      this.setState({ expectedResponseTime });
    }
    if (rejected !== prevProps.rejected) {
      this.setReject(rejected);
    }
    if (active !== prevProps.active) {
      if (active) {
        this.setActive();
      } else {
        this.setDone();
      }
    }
  }

  public render(): React.JSX.Element | false {
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
   * Запускает анимацию лоадера. <br />
   * Равносильно установке пропа `active = true`.
   *
   * @public
   */
  public static start = (expectedResponseTime?: number): void => {
    currentGlobalLoader?.setActive();
    if (typeof expectedResponseTime === 'number') {
      currentGlobalLoader?.updateExpectedResponseTime(expectedResponseTime);
    }
  };

  /**
   * Показывает анимацию успешного завершения загрузки. <br />
   * Равносильно установке пропа `active = false`.
   *
   * @public
   */
  public static done = (): void => {
    currentGlobalLoader?.setDone();
  };

  /**
   * Переключает анимацию лоадера в состояние бегающей полоски. <br />
   * Равносильно установке пропа `rejected = true`.
   *
   * @public
   */
  public static reject = (): void => {
    currentGlobalLoader?.setReject(true);
  };

  /**
   * Возвращает лоадер из состояния бегающей полоски в обычное и продолжает анимацию с того места, на котором она была прервана. <br />
   * Равносильно установке пропа `rejected = false`.
   *
   * @public
   */
  public static accept = (): void => {
    currentGlobalLoader?.setReject(false);
  };

  public setActive = (): void => {
    this.startTask.cancel();
    if (this.state.successAnimationInProgress) {
      this.resumeTaskAfterSuccessAnimation();
    } else {
      this.setState({ visible: false, done: false, rejected: false, accept: false, started: true });
      if (this.getProps().rejected) {
        this.setReject(true);
      } else {
        this.stopTask.cancel();
        this.startTask();
      }
    }
  };

  public setDone = (): void => {
    if (!this.state.started) {
      return;
    }
    this.setState({ done: true, successAnimationInProgress: true });
    this.startTask.cancel();
    this.resumeTaskAfterSuccessAnimation.cancel();
    this.stopTask();
  };

  public setReject = (reject: boolean): void => {
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

  public updateExpectedResponseTime(expectedResponseTime: number): void {
    this.setState({ expectedResponseTime });
  }

  public kill = (): void => {
    this.stopTask.cancel();
    this.startTask.cancel();
    this.resumeTaskAfterSuccessAnimation.cancel();
    this.setState({
      dead: true,
    });
  };
}
