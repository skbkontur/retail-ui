import type { AriaAttributes } from 'react';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import type { SafeTimer } from '@skbkontur/global-object';
import { globalObject } from '@skbkontur/global-object';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme, ThemeIn } from '../../lib/theming/Theme';
import { RenderContainer } from '../../internal/RenderContainer';
import type { Nullable } from '../../typings/utility-types';
import type { CommonProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import { isTestEnv } from '../../lib/currentEnvironment';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';

import { styles } from './Toast.styles';
import type { ToastViewProps } from './ToastView';
import { ToastView } from './ToastView';
import { ToastStatic } from './ToastStatic';

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

/** @deprecated выпилить старый подход к api push Toast-а в react-ui 6.0 */
export type ToastPush = (
  notification: React.ReactNode,
  action?: Nullable<Action>,
  showTime?: number,
  showCloseIcon?: boolean,
) => void;

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

/** TODO: Новый Api для метода push в Toast. Станет api по-умолчанию с версии 6.0. В мажоре нужно будет убрать New из названия */
export type ToastNewPushApi = (notification: React.ReactNode, config: ToastPushConfig) => void;

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
 * Доступен статический метод: `Toast.push(notification, action?, showTime?)`.
 * Однако, при его использовании не работает кастомизация и могут быть проблемы с перекрытием уведомления другими элементами страницы.
 *
 * В обозримом будущем планируем **полностью избавиться** от статического метода в компоненте `Toast`.
 *
 * В качестве альтернативы для `Toast.push` мы рекомендуем использовать компонент `SingleToast` или вызов метода push через `ref`.
 *
 * Метод `push` через ref поддерживает два api.
 *
 * 1. Устаревший с последовательной передачей аргументов: `toastRef.current.push('Hi', { label: 'Cancel', handler: () => {} }, 15000)`
 * 2. Новый с передачей объекта конфигурации: `toastRef.current.push('Hi', { action: { label: 'Cancel', handler: () => {} }, showTime: 15000 })`
 *
 * Устаревший подход с передачей аргументов последовательным образом **будет удалён** в следующей мажорной версии.
 */
@rootNode
export class Toast extends React.Component<ToastProps, ToastState> {
  public static __KONTUR_REACT_UI__ = 'Toast';
  public static displayName = 'Toast';

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private theme!: Theme;

  /** @deprecated use `push` method in ref or `SingleToast.push` */
  public static push: ToastPush = (
    notification: React.ReactNode,
    action?: Nullable<Action>,
    showTime?: number,
    showCloseIcon?: boolean,
  ) => {
    ToastStatic.push(notification, action, showTime, showCloseIcon);
  };

  /** @deprecated use `close` method in ref or `SingleToast.close` */
  public static close: ToastClose = () => {
    ToastStatic.close();
  };

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
   *
   * @description Сейчас есть поддержка старого api метода push с передачей аргументов последовательно, но с версии 6.0 этот функционал будет удалён.
   * @example
   * // Будет удален в 6.0
   * push('notification', { label: "cat meow", handler: () => {} }, 15_000, false, "error")
   *
   * @example
   * // Останется в > 6.0
   * push('notification', { action: { label: "cat meow", handler: () => {} }, showTime: 15_000, showCloseIcon: false, use: "error" })
   */
  public push(
    notification: React.ReactNode,
    configOrAction?: ToastPushConfig | Nullable<Action>,
    showTime?: number,
    showCloseIcon?: boolean,
    use?: ToastUse,
  ) {
    if (this.state.notification) {
      this.close();
    }

    if (isNewToastPushApi(configOrAction)) {
      const { action, showTime, showCloseIcon, use } = configOrAction;

      safelyCall(this.props.onPush, notification, action);

      this.setState(
        ({ id }) => ({
          notification,
          action,
          id: id + 1,
          showTime,
          showCloseIcon,
          currentUse: use ?? 'default',
        }),
        this._setTimer,
      );
    }

    /** @deprecated выпилить старый подход к api push Toast-а в react-ui 6.0 */
    if (isOldToastPushApi(configOrAction) || isEmptySecondArg(configOrAction)) {
      const action = configOrAction;
      safelyCall(this.props.onPush, notification, action);

      this.setState(
        ({ id }) => ({
          notification,
          action,
          id: id + 1,
          showTime,
          showCloseIcon,
          currentUse: use ?? 'default',
        }),
        this._setTimer,
      );
    }
  }

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
          enter: styles.enter(),
          enterActive: styles.enterActive(),
          exit: styles.exit(),
          exitActive: styles.exitActive(),
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
      globalObject.clearTimeout(this._timeout);
      this._timeout = null;
    }
  };

  private _setTimer = () => {
    this._clearTimer();

    let showTime = this.state.action ? 7000 : 3000;
    showTime = this.state.showTime ?? showTime;
    this._timeout = globalObject.setTimeout(this.close, showTime);
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

export function isNewToastPushApi(value: unknown): value is ToastPushConfig {
  return Boolean(value && typeof value === 'object' && !('label' in value));
}

export function isOldToastPushApi(value: unknown): value is Action {
  return Boolean(value && typeof value === 'object' && 'label' in value);
}

/** Хелпер для случая, когда передаём только текст */
export function isEmptySecondArg(value: unknown): value is null | undefined {
  return !value;
}
