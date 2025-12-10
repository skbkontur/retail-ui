import type { AriaAttributes } from 'react';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import type { Emotion } from '@emotion/css/create-instance';

import type { SafeTimer } from '../../lib/globalObject.js';
import { ThemeFactory } from '../../lib/theming/ThemeFactory.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme, ThemeIn } from '../../lib/theming/Theme.js';
import { RenderContainer } from '../../internal/RenderContainer/index.js';
import type { Nullable } from '../../typings/utility-types.js';
import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles } from './Toast.styles.js';
import type { ToastViewProps } from './ToastView.js';
import { ToastView } from './ToastView.js';

export interface Action {
  label: string;
  handler: () => void;
  'aria-label'?: string;
}

/**
 * Состояния тоста:
 *
 * - default стиль для отображения по-умолчанию
 * - error стиль для отображения ошибок
 **/
export type ToastUse = 'default' | 'error';

export interface ToastState {
  notification: Nullable<React.ReactNode>;
  action: Nullable<Action>;
  id: number;
  showTime: Nullable<number>;
  showCloseIcon?: boolean;
  currentUse: ToastUse;
}

export interface ToastProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  /** Задает функцию, которая вызывается при возникновении тоста. */
  onPush?: (notification: string, action?: Action) => void;

  /** Задает функцию, которая вызывается при закрытии тоста. */
  onClose?: (notification: string, action?: Action) => void;

  /** Задает объект с переменными темы. Он будет объединён с темой из контекста. */
  theme?: ThemeIn;
}

/** Объект с конфигурацией отображения Toast-а */
export interface ToastPushConfig {
  action?: Nullable<Action>;
  showTime?: number;
  showCloseIcon?: boolean;
  /**
   * Определяет стили для тоста.
   *
   * - default стиль для отображения по-умолчанию
   * - error стиль для отображения ошибок
   *
   * По-умолчанию будет использован стиль default.
   **/
  use?: ToastUse;
}

export type ToastPushApi = (notification: React.ReactNode, config?: ToastPushConfig) => void;

export type ToastClose = () => void;

export const ToastDataTids = {
  toastStatic: 'StaticToast',
  toastView: 'ToastView__root',
  action: 'ToastView__action',
  close: 'ToastView__close',
} as const;

/**
 * `Toast` — это короткое немодальное уведомление, которое сообщает пользователю о результате выполнения его команды.
 * Результат может быть положительным, отрицательным или нейтральным.
 *
 */
@withRenderEnvironment
@rootNode
export class Toast extends React.Component<ToastProps, ToastState> {
  public static __KONTUR_REACT_UI__ = 'Toast';
  public static displayName = 'Toast';

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private styles!: ReturnType<typeof getStyles>;
  private emotion!: Emotion;
  private theme!: Theme;

  public _toast: Nullable<ToastView>;
  private _timeout: SafeTimer;
  private rootRef = React.createRef<HTMLElement>();

  constructor(props: ToastProps) {
    super(props);
    this.state = {
      notification: null,
      action: null,
      id: 0,
      showTime: null,
      showCloseIcon: false,
      currentUse: 'default',
    };
  }

  public componentWillUnmount() {
    this._clearTimer();
  }

  public render() {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = this.props.theme ? ThemeFactory.create(this.props.theme as Theme, theme) : theme;
          return (
            <ThemeContext.Provider value={this.theme}>
              <RenderContainer>
                <TransitionGroup>{this._renderToast()}</TransitionGroup>
              </RenderContainer>
            </ThemeContext.Provider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  /**
   * Показывает тост с `notification` в качестве сообщения.
   * Тост автоматически скрывается через 3 или 7 секунд,
   * в зависимости от наличия у него кнопки `action` внутри config-а.
   * Время показа можно задать вручную, передав `showTime` внутри config-а.
   *
   * @public
   * @param {React.ReactNode} notification
   * @param {ToastPushConfig} config объект с конфигурацией отображения компонента Toast
   */
  public push: ToastPushApi = (notification: React.ReactNode, config?: ToastPushConfig) => {
    if (this.state.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, config?.action);

    this.setState(
      ({ id }) => ({
        notification,
        action: config?.action,
        id: id + 1,
        showTime: config?.showTime,
        showCloseIcon: config?.showCloseIcon,
        currentUse: config?.use ?? 'default',
      }),
      this._setTimer,
    );
  };

  /**
   * @public
   */
  public close = () => {
    safelyCall(this.props.onClose, this.state.notification, this.state.action);
    this.setState({ notification: null, action: null });
  };

  private _renderToast() {
    const { notification, action, id, showCloseIcon, currentUse } = this.state;

    if (!notification) {
      return null;
    }

    const toastProps: ToastViewProps = {
      onMouseEnter: this._clearTimer,
      onMouseLeave: this._setTimer,
      onClose: this.close,
      children: notification,
      'aria-label': this.props['aria-label'],
      action,
      showCloseIcon,
      use: currentUse,
    };

    return (
      <CSSTransition
        key={id}
        classNames={{
          enter: this.styles.enter(),
          enterActive: this.styles.enterActive(),
          exit: this.styles.exit(),
          exitActive: this.styles.exitActive(),
        }}
        timeout={{
          enter: 200,
          exit: 150,
        }}
        enter={!isTestEnv}
        exit={!isTestEnv}
        nodeRef={this.rootRef}
      >
        <CommonWrapper rootNodeRef={this.setRootRef} {...this.props}>
          <ToastView ref={this._refToast} {...toastProps} />
        </CommonWrapper>
      </CSSTransition>
    );
  }

  private setRootRef = (element: Nullable<Element>) => {
    this.setRootNode(element);
    // @ts-expect-error: See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31065.
    this.rootRef.current = element;
  };

  private _clearTimer = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  };

  private _setTimer = () => {
    this._clearTimer();

    let showTime = this.state.action ? 7000 : 3000;
    showTime = this.state.showTime ?? showTime;
    this._timeout = setTimeout(this.close, showTime);
  };

  private _refToast = (element: ToastView) => {
    this._toast = element;
  };
}

function safelyCall(fn: Nullable<(a?: any) => any>, ...args: any[]) {
  if (fn) {
    fn(...args);
  }
}
