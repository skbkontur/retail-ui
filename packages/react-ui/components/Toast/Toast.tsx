import React, { AriaAttributes } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { globalObject, SafeTimer } from '@skbkontur/global-object';

import { ThemeFactory } from '../../lib/theming/ThemeFactory';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme, ThemeIn } from '../../lib/theming/Theme';
import { RenderContainer } from '../../internal/RenderContainer';
import { Nullable } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { isTestEnv } from '../../lib/currentEnvironment';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Toast.styles';
import { ToastView, ToastViewProps } from './ToastView';
import { ToastStatic } from './ToastStatic';

export interface Action {
  label: string;
  handler: () => void;
  'aria-label'?: string;
}

export interface ToastState {
  notification: Nullable<string>;
  action: Nullable<Action>;
  id: number;
  showTime: Nullable<number>;
  showCloseIcon?: boolean;
}

export interface ToastProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  /** Задает функцию, которая вызывается при возникновении тоста. */
  onPush?: (notification: string, action?: Action) => void;

  /** Задает функцию, которая вызывается при закрытии тоста. */
  onClose?: (notification: string, action?: Action) => void;

  /** Задает объект с переменными темы. Он будет объединён с темой из контекста. */
  theme?: ThemeIn;
}

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
 * Однако, при его использовании не работает кастомизация, они не поддерживаются в `React@18`, а также могут быть проблемы с перекрытием уведомления другими элементами страницы.
 *
 * Для статических тостов рекомендуется использовать компонент SingleToast - в нём исправлены эти проблемы.
 */
@rootNode
export class Toast extends React.Component<ToastProps, ToastState> {
  public static __KONTUR_REACT_UI__ = 'Toast';
  public static displayName = 'Toast';

  private setRootNode!: TSetRootNode;
  private theme!: Theme;

/** @deprecated use `push` method in ref or `SingleToast.push` */
  public static push(notification: string, action?: Nullable<Action>, showTime?: number, showCloseIcon?: boolean) {
    ToastStatic.push(notification, action, showTime, showCloseIcon);
  }

  /** @deprecated use `close` method in ref or `SingleToast.close` */
  public static close() {
    ToastStatic.close();
  }

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
   * в зависимости от наличия у него кнопки `action`.
   * Время показа можно задать вручную, передав `showTime`.
   *
   * @public
   * @param {string} notification
   * @param {Action} action `action` опциональный параметр формата `{ label: string, handler: function }`
   * добавляет кнопку в виде ссылки при клике на которую вызывается переданный handler
   * @param {number} showTime Время существования Toast в миллисекундах
   * @param {boolean} showCloseIcon Добавляет крестик для закрытия тоста. При указывании action в onPush крестик отображается всегда.
   */
  public push(notification: string, action?: Nullable<Action>, showTime?: number, showCloseIcon?: boolean) {
    if (this.state.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, action);

    this.setState(({ id }) => ({ notification, action, id: id + 1, showTime, showCloseIcon }), this._setTimer);
  }

  /**
   * @public
   */
  public close = () => {
    safelyCall(this.props.onClose, this.state.notification, this.state.action);
    this.setState({ notification: null, action: null });
  };

  private _renderToast() {
    const { notification, action, id, showCloseIcon } = this.state;

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
