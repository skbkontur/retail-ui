import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Popup from '../Popup';
import RenderLayer from '../RenderLayer';
import CROSS from '../internal/cross';
import { PopupPosition } from '../Popup';

import styles = require('./Tooltip.less');

const supportsPortal = 'createPortal' in ReactDOM;

const Positions: PopupPosition[] = [
  'top left',
  'top center',
  'top right',
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left middle',
  'left bottom',
  'right top',
  'right middle',
  'right bottom'
];

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'opened' | 'closed';

export type TooltipProps = {
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
  render: () => React.ReactNode;

  pos?: PopupPosition;

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
   */
  allowedPositions?: PopupPosition[];

  /**
   * Конфигурация отображения анимации.
   * Стандартное значение true.
   */
  allowedAnimations?: boolean;
};

export type TooltipState = {
  opened: boolean;
};

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  static defaultProps = {
    pos: 'top left',
    trigger: 'hover',
    allowedPositions: Positions,
    allowedAnimations: true
  };

  _hoverTimeout: number | null = null;

  _wrapperElement: HTMLElement | null = null;

  state = {
    opened: false
  };

  componentDidMount() {
    /**
     * _wrapperElement is absent on initial mount
     * Rendering again to show popup
     */
    if (this.props.trigger === 'opened') {
      this.forceUpdate();
    }
  }

  render() {
    const { wrapperProps, popupProps, layerProps } = this._getProps();

    return (
      <RenderLayer {...layerProps}>
        <span ref={this._refWrapper} {...wrapperProps}>
          {this.props.children}
          {this._wrapperElement && (
            <Popup
              anchorElement={this._wrapperElement}
              backgroundColor={'white'}
              hasPin
              hasShadow
              margin={15}
              opened={this.state.opened}
              pinOffset={17}
              pinSize={8}
              popupOffset={0}
              hasAnimations={this.props.allowedAnimations}
              positions={this._getPositions()}
              {...popupProps}
            >
              {this._renderContent}
            </Popup>
          )}
        </span>
      </RenderLayer>
    );
  }

  _renderContent = () => {
    const content = this.props.render();
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

  _renderCross() {
    const hasCross =
      this.props.closeButton === undefined
        ? this.props.trigger !== 'hover' && this.props.trigger !== 'focus'
        : this.props.closeButton;

    if (!hasCross) {
      return null;
    }

    return (
      <span className={styles.cross} onClick={this._handleCrossClick}>
        {CROSS}
      </span>
    );
  }

  private _refWrapper = (node: HTMLElement | null) => {
    this._wrapperElement = node;
  };

  private _getPositions() {
    // FIXME: allowedPositions in defaultProps, remove ! when default props
    // would work in TypeScript
    const allowedPositions = this.props.allowedPositions!;

    // FIXME: pos in defaultProps, remove ! when default props
    // would work in TypeScript
    const index = allowedPositions.indexOf(this.props.pos!);
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
    switch (this.props.trigger) {
      case 'opened':
        return {
          layerProps: {
            active: true,
            onClickOutside: this._handleClickOutside
          },
          wrapperProps: {},
          popupProps: {
            opened: true
          }
        };

      case 'closed':
        return {
          layerProps: {},
          wrapperProps: {},
          popupProps: {
            opened: false
          }
        };

      case 'hover':
        return {
          layerProps: {},
          wrapperProps: {
            onMouseEnter: this._handleMouseEnter,
            onMouseLeave: this._handleMouseLeave
          },
          popupProps: supportsPortal
            ? {}
            : {
                onMouseEnter: this._handleMouseEnter,
                onMouseLeave: this._handleMouseLeave
              }
        };

      case 'click':
        return {
          layerProps: {
            active: this.state.opened,
            onClickOutside: this._handleClickOutside
          },
          wrapperProps: {
            onClick: this._handleClick
          },
          popupProps: {}
        };

      case 'focus':
        return {
          layerProps: {},
          wrapperProps: {
            onFocus: this._handleFocus,
            onBlur: this._handleBlur
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

  private _handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }
    this._open();
  };

  private _handleMouseLeave = () => {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
    this._hoverTimeout = window.setTimeout(() => {
      this._close();
    }, 100);
  };

  private _handleClick = () => {
    this._open();
  };

  private _handleClickOutside = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
    this._close();
  };

  private _handleFocus = () => {
    this._open();
  };

  private _handleBlur = () => {
    this._close();
  };

  private _handleCrossClick = (event: React.MouseEvent<HTMLElement>) => {
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
