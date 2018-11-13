import * as React from 'react';
import * as ReactDOM from 'react-dom';
import shallow from 'fbjs/lib/shallowEqual';
import Popup from '../Popup';
import RenderLayer from '../RenderLayer';
import CROSS from '../internal/cross';
import { PopupPosition } from '../Popup';

import styles from './Tooltip.less';
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

export type TooltipTrigger =
  /** Наведение на children и на тултип */
  | 'hover'
  /** Клик на children */
  | 'click'
  /** Фокус на children */
  | 'focus'
  /** Просто открыт */
  | 'opened'
  /** Просто закрыт */
  | 'closed'
  /** Наведение ТОЛЬКО на children, а не на тултип */
  | 'hoverAnchor';

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

  trigger: TooltipTrigger;

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
   * Флаг отключения анимации.
   * @default false
   */
  disableAnimations: boolean;
}

export interface TooltipState {
  opened: boolean;
}

class Tooltip extends React.Component<TooltipProps, TooltipState> {
  public static defaultProps = {
    pos: 'top left',
    trigger: 'hover',
    allowedPositions: Positions,
    disableAnimations: false,
    closeOnChildrenMouseLeave: false
  };

  public static closeDelay = 100;

  private static triggersWithoutCloseButton: TooltipTrigger[] = [
    'hover',
    'hoverAnchor',
    'focus'
  ];

  public state = {
    opened: false
  };

  private hoverTimeout: number | null = null;

  private wrapperElement: HTMLElement | null = null;

  private contentElement: HTMLElement | null = null;

  public componentDidMount() {
    /**
     * wrapperElement is absent on initial mount
     * Rendering again to show popup
     */
    if (this.props.trigger === 'opened') {
      this.forceUpdate();
    }
  }

  public shouldComponentUpdate(
    nextProps: TooltipProps,
    nextState: TooltipState
  ) {
    return !shallow(nextProps, this.props) || !shallow(nextState, this.state);
  }

  public render(): JSX.Element | null {
    const { wrapperProps, popupProps, layerProps } = this.getProps();
    const anchorElement = this.props.children
      ? this.wrapperElement
      : this.props.anchorElement;
    const content = this.renderContent();

    return (
      <RenderLayer {...layerProps}>
        <span ref={this.refWrapper} {...wrapperProps}>
          {this.props.children}
          {anchorElement &&
            content && (
              <Popup
                anchorElement={anchorElement}
                hasPin
                hasShadow
                margin={15}
                maxWidth="none"
                opened={this.state.opened}
                pinOffset={17}
                pinSize={8}
                popupOffset={0}
                disableAnimations={this.props.disableAnimations}
                positions={this.getPositions()}
                {...popupProps}
              >
                {content}
              </Popup>
            )}
        </span>
      </RenderLayer>
    );
  }

  public renderContent = () => {
    const content = this.props.render ? this.props.render() : null;
    if (content == null) {
      return null;
    }
    return (
      <div
        ref={this.refContent}
        style={{ padding: '15px 20px', position: 'relative' }}
      >
        {content}
        {this.renderCloseButton()}
      </div>
    );
  };

  public renderCloseButton() {
    const hasCross =
      this.props.closeButton === undefined
        ? Tooltip.triggersWithoutCloseButton.indexOf(this.props.trigger) === -1
        : this.props.closeButton;

    if (!hasCross) {
      return null;
    }

    return (
      <span className={styles.cross} onClick={this.handleCloseButtonClick}>
        {CROSS}
      </span>
    );
  }

  private refContent = (node: HTMLElement | null) => {
    this.contentElement = node;
  };

  private refWrapper = (node: HTMLElement | null) => {
    this.wrapperElement = node;
  };

  private getPositions() {
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

  private getProps() {
    switch (this.props.trigger) {
      case 'opened':
        return {
          layerProps: {
            active: true,
            onClickOutside: this.handleClickOutside
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

      case 'hoverAnchor':
      case 'hover':
        return {
          layerProps: {},
          wrapperProps: {
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
            onClick: this.handleClick
          },
          popupProps: {}
        };

      case 'focus':
        return {
          layerProps: {},
          wrapperProps: {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur
          },
          popupProps: {}
        };

      default:
        throw new Error('Unknown trigger specified: ' + this.props.trigger);
    }
  }

  private open() {
    this.setState({ opened: true });
  }

  private close() {
    this.setState({ opened: false });
  }

  private handleMouseEnter = (
    event: React.MouseEvent<HTMLElement> | MouseEvent
  ) => {
    if (
      this.props.trigger === 'hoverAnchor' &&
      event.target === this.contentElement
    ) {
      return;
    }

    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.open();
  };

  private handleMouseLeave = () => {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    this.hoverTimeout = window.setTimeout(() => {
      this.close();
    }, Tooltip.closeDelay);
  };

  private handleClick = () => {
    this.open();
  };

  private handleClickOutside = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
    this.close();
  };

  private handleFocus = () => {
    this.open();
  };

  private handleBlur = () => {
    this.close();
  };

  private handleCloseButtonClick = (event: React.MouseEvent<HTMLElement>) => {
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

    this.close();
  };
}

export default Tooltip;
