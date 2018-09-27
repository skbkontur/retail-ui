import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from '../Popup';
import RenderLayer from '../RenderLayer';
import CROSS from '../internal/cross';
import { PopupPosition } from '../Popup';

import styles = require('./Tooltip.less');
import { Nullable } from '../../typings/utility-types';

const supportsPortal = 'createPortal' in ReactDOM;

const Positions: PopupPosition[] = [
  'right bottom',
  'right middle',
  'right top',
  'top right',
  'top center',
  'top left',
  'left top',
  'left middle',
  'left bottom',
  'bottom left',
  'bottom center',
  'bottom right'
];

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'opened' | 'closed';

export interface TooltipProps {
  /**
   * Относительно какого элемента позиционировать тултип
   */
  anchorElement?: HTMLElement;

  /**
   * Если не указан `anchorElement` то тултип будет позиционироваться
   * относительно дочерних элементов
   */
  children?: React.ReactNode;

  className?: string;

  /**
   * Показывать крестик для закрытия тултипа. По-умолчанию крестик
   * показывается если проп *trigger* не `hover` и не `focus`.
   */
  closeButton?: boolean;

  /**
   * Функция, которая возвращает содержимое тултипа.
   *
   * Если эта функция вернула `null`, то тултип не показывается.
   */
  render?: Nullable<() => React.ReactNode>;

  pos: PopupPosition;

  trigger?: TooltipTrigger;

  /**
   * Хэндлер, вызываемый при клике по крестику
   */
  onCloseClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * Хэндлер, вызываемый при клике по крестику или
   * снаружи тултипа
   */
  onCloseRequest?: () => void;

  /**
   * Список позиций, которые тултип будет занимать.
   * Если положение тултипа в определенной позиции
   * будет выходить за край экрана, то будет выбрана
   * следующая позиция. Обязательно должен включать
   * позицию указанную в `pos`
   *
   * ```ts
   * type PopupPosition =
   *   'right bottom',
   * | 'right middle',
   * | 'right top',
   * | 'top right',
   * | 'top center',
   * | 'top left',
   * | 'left top',
   * | 'left middle',
   * | 'left bottom',
   * | 'bottom left',
   * | 'bottom center',
   * | 'bottom right'
   * ```
   */
  allowedPositions: PopupPosition[];

  /**
   * Конфигурация отображения анимации.
   * Стандартное значение true.
   */
  disableAnimations?: boolean;
}

export interface TooltipState {
  opened: boolean;
}

// TODO Эта хрено ломает вложенные тултипы,
// так как обходит React.Children.only проверку в RenderLayer,
// который делает findDOMNode
// findDOMNode на нескольких элементах возвращает только первый
class ContentWrapper extends React.Component<any> {
  public render() {
    return this.props.children;
  }
}

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  public static defaultProps = {
    pos: 'top left',
    trigger: 'hover',
    allowedPositions: Positions,
    disableAnimations: false
  };

  public state = {
    opened: false
  };

  private hoverTimeout: number | null = null;

  private wrapperElement: HTMLElement | null = null;

  public componentDidMount() {
    /**
     * _wrapperElement is absent on initial mount
     * Rendering again to show popup
     */
    if (this.props.trigger === 'opened') {
      this.forceUpdate();
    }
  }

  public render(): JSX.Element | null {
    const { popupProps, layerProps } = this._getProps();
    const anchorElement = this.props.children
      ? this.wrapperElement
      : this.props.anchorElement;
    const content = this.renderContent();

    return (
      <RenderLayer {...layerProps}>
        <ContentWrapper ref={this.refWrapper}>
          {this.props.children}
          {anchorElement &&
            content && (
              <Popup
                anchorElement={anchorElement}
                backgroundColor={'white'}
                hasPin
                hasShadow
                margin={15}
                maxWidth="none"
                opened={this.state.opened}
                pinOffset={17}
                pinSize={8}
                popupOffset={0}
                disableAnimations={this.props.disableAnimations}
                positions={this._getPositions()}
                {...popupProps}
              >
                {content}
              </Popup>
            )}
        </ContentWrapper>
      </RenderLayer>
    );
  }

  public renderContent = () => {
    const content = this.props.render ? this.props.render() : null;
    if (content == null) {
      return null;
    }
    return (
      <div style={{ padding: '15px 20px', position: 'relative' }}>
        {content}
        {this._renderCross()}
      </div>
    );
  };

  public _renderCross() {
    const hasCross =
      this.props.closeButton === undefined
        ? this.props.trigger !== 'hover' && this.props.trigger !== 'focus'
        : this.props.closeButton;

    if (!hasCross) {
      return null;
    }

    return (
      <span className={styles.cross} onClick={this.handleCrossClick}>
        {CROSS}
      </span>
    );
  }

  private refWrapper = (node: React.ReactInstance | null) => {
    // TODO Надо искать соседей
    this.wrapperElement = (node
      ? ReactDOM.findDOMNode(node)
      : null) as HTMLElement;

    if (this.wrapperElement == null) {
      return;
    }

    // TODO Сделать по нормальному
    const { wrapperProps } = this._getProps();

    if ('onMouseEnter' in wrapperProps) {
      this.wrapperElement.addEventListener(
        'mouseenter',
        wrapperProps.onMouseEnter
      );
    }
    if ('onMouseLeave' in wrapperProps) {
      this.wrapperElement.addEventListener(
        'mouseleave',
        wrapperProps.onMouseLeave
      );
    }
    if ('onClick' in wrapperProps) {
      this.wrapperElement.addEventListener('click', wrapperProps.onClick);
    }
    if ('onFocus' in wrapperProps) {
      this.wrapperElement.addEventListener('focus', wrapperProps.onFocus);
    }
    if ('onBlur' in wrapperProps) {
      this.wrapperElement.addEventListener('blur', wrapperProps.onBlur);
    }
  };

  private _getPositions() {
    const allowedPositions = this.props.allowedPositions;
    const index = allowedPositions.indexOf(this.props.pos);
    if (index === -1) {
      throw new Error(
        'Unexpected position passed to Tooltip. Expected one of: ' +
          allowedPositions.join(', ')
      );
    }
    return [
      ...allowedPositions.slice(index),
      ...allowedPositions.slice(0, index)
    ];
  }

  private _getProps() {
    const commonWrapperProps = {
      className: styles.wrapper
    };

    switch (this.props.trigger) {
      case 'opened':
        return {
          layerProps: {
            active: true,
            onClickOutside: this.handleClickOutside
          },
          wrapperProps: { ...commonWrapperProps },
          popupProps: {
            opened: true
          }
        };

      case 'closed':
        return {
          layerProps: {},
          wrapperProps: { ...commonWrapperProps },
          popupProps: {
            opened: false
          }
        };

      case 'hover':
        return {
          layerProps: {},
          wrapperProps: {
            ...commonWrapperProps,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
          },
          popupProps: supportsPortal
            ? {}
            : {
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave
              }
        };

      case 'click':
        return {
          layerProps: {
            active: this.state.opened,
            onClickOutside: this.handleClickOutside
          },
          wrapperProps: {
            ...commonWrapperProps,
            onClick: this.handleClick
          },
          popupProps: {}
        };

      case 'focus':
        return {
          layerProps: {},
          wrapperProps: {
            ...commonWrapperProps,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur
          },
          popupProps: {}
        };

      default:
        throw new Error('Unknown trigger specified: ' + this.props.trigger);
    }
  }

  private _open() {
    this.setState({ opened: true });
  }

  private _close() {
    this.setState({ opened: false });
  }

  private handleMouseEnter = () => {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this._open();
  };

  private handleMouseLeave = () => {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    this.hoverTimeout = window.setTimeout(() => {
      this._close();
    }, 100);
  };

  private handleClick = () => {
    this._open();
  };

  private handleClickOutside = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
    this._close();
  };

  private handleFocus = () => {
    this._open();
  };

  private handleBlur = () => {
    this._close();
  };

  private handleCrossClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (this.props.onCloseClick) {
      this.props.onCloseClick(event);
    }

    if (event.defaultPrevented) {
      return;
    }

    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }

    this._close();
  };
}

export default Tooltip;
