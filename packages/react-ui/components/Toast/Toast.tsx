import React, { AriaAttributes } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
}

export interface ToastProps extends Pick<AriaAttributes, 'aria-label'>, CommonProps {
  onPush?: (notification: string, action?: Action) => void;
  onClose?: (notification: string, action?: Action) => void;
}

export const ToastDataTids = {
  toastStatic: 'StaticToast',
  toastView: 'ToastView__root',
  action: 'ToastView__action',
  close: 'ToastView__close',
} as const;

/**
 * Показывает уведомления.
 *
 * Доступен статический метод: `Toast.push(notification, action?, showTime?)`.
 * Однако, при его использовании не работает кастомизация и могут быть проблемы
 * с перекрытием уведомления другими элементами страницы.
 *
 * Рекомендуется использовать Toast через `ref` (см. примеры).
 */
@rootNode
export class Toast extends React.Component<ToastProps, ToastState> {
  public static __KONTUR_REACT_UI__ = 'Toast';
  private setRootNode!: TSetRootNode;

  public static push(notification: string, action?: Nullable<Action>, showTime?: number) {
    ToastStatic.push(notification, action, showTime);
  }

  public static close() {
    ToastStatic.close();
  }

  public _toast: Nullable<ToastView>;
  private _timeout: Nullable<number> = null;
  private rootRef = React.createRef<HTMLElement>();

  constructor(props: ToastProps) {
    super(props);
    this.state = {
      notification: null,
      action: null,
      id: 0,
      showTime: null,
    };
  }

  public componentWillUnmount() {
    this._clearTimer();
  }

  public render() {
    return (
      <RenderContainer>
        <TransitionGroup>{this._renderToast()}</TransitionGroup>
      </RenderContainer>
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
   */
  public push(notification: string, action?: Nullable<Action>, showTime?: number) {
    if (this.state.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, action);

    this.setState(({ id }) => ({ notification, action, id: id + 1, showTime }), this._setTimer);
  }

  /**
   * @public
   */
  public close = () => {
    safelyCall(this.props.onClose, this.state.notification, this.state.action);
    this.setState({ notification: null, action: null });
  };

  private _renderToast() {
    const { notification, action, id } = this.state;

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
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  };

  private _setTimer = () => {
    this._clearTimer();

    let showTime = this.state.action ? 7000 : 3000;
    showTime = this.state.showTime ?? showTime;

    this._timeout = window.setTimeout(this.close, showTime);
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
