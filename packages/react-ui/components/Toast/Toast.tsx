import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { RenderContainer } from '../../internal/RenderContainer';
import { Nullable } from '../../typings/utility-types';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { isTestEnv } from '../../lib/currentEnvironment';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Toast.styles';
import { ToastView, toastViewDataTid, ToastViewProps } from './ToastView';
import { ToastStatic, toastStaticDataTid } from './ToastStatic';

export interface Action {
  label: string;
  handler: () => void;
}

export interface ToastState {
  notification: Nullable<string>;
  action: Nullable<Action>;
  id: number;
}

export interface ToastProps extends CommonProps {
  onPush?: (notification: string, action?: Action) => void;
  onClose?: (notification: string, action?: Action) => void;
}

export const toastDataTid = {
  toastStatic: toastStaticDataTid,
  toastView: toastViewDataTid,
};

/**
 * Показывает уведомления.
 *
 * Доступен статический метод: `Toast.push(notification, action?)`.
 * Однако, при его использовании не работает кастомизация и могут быть проблемы
 * с перекрытием уведомления другими элементами страницы.
 *
 * Рекомендуется использовать Toast через `ref` (см. примеры).
 */
@rootNode
export class Toast extends React.Component<ToastProps, ToastState> {
  public static __KONTUR_REACT_UI__ = 'Toast';
  private setRootNode!: TSetRootNode;

  public static push(notification: string, action?: Action) {
    ToastStatic.push(notification, action);
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
   *
   * @public
   * @param {string} notification
   * @param {Action} action `action` опциональный параметр формата `{ label: string, handler: function }`
   * добавляет кнопку в виде ссылки при клике на которую вызывается переданный handler
   */
  public push(notification: string, action?: Action) {
    if (this.state.notification) {
      this.close();
    }

    safelyCall(this.props.onPush, notification, action);

    this.setState(({ id }) => ({ notification, action, id: id + 1 }), this._setTimer);
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

  private setRootRef = (element: Nullable<HTMLElement>) => {
    this.setRootNode(element);
    // @ts-ignore
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

    const timeOut = this.state.action ? 7 : 3;

    this._timeout = window.setTimeout(this.close, timeOut * 1000);
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
