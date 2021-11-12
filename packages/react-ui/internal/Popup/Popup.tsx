import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import raf from 'raf';
import warning from 'warning';

import { Nullable } from '../../typings/utility-types';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { ZIndex } from '../ZIndex';
import { RenderContainer } from '../RenderContainer';
import { FocusEventType, MouseEventType } from '../../typings/event-types';
import { isFunction, isNonNullable } from '../../lib/utils';
import { isIE11, isEdge } from '../../lib/client';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { isHTMLElement, safePropTypesInstanceOf } from '../../lib/SSRSafe';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonProps, CommonWrapper } from '../CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { PopupPin } from './PopupPin';
import { Offset, PopupHelper, PositionObject, Rect } from './PopupHelper';
import { styles } from './Popup.styles';

const POPUP_BORDER_DEFAULT_COLOR = 'transparent';
const TRANSITION_TIMEOUT = { enter: 0, exit: 200 };

const DUMMY_LOCATION: PopupLocation = {
  position: 'top left',
  coordinates: {
    top: -9999,
    left: -9999,
  },
};

export type PopupPosition =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'right top'
  | 'right middle'
  | 'right bottom'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom';

export const PopupPositions: PopupPosition[] = [
  'top left',
  'top center',
  'top right',
  'right top',
  'right middle',
  'right bottom',
  'bottom right',
  'bottom center',
  'bottom left',
  'left bottom',
  'left middle',
  'left top',
];

export interface PopupHandlerProps {
  onMouseEnter?: (event: MouseEventType) => void;
  onMouseLeave?: (event: MouseEventType) => void;
  onClick?: (event: MouseEventType) => void;
  onFocus?: (event: FocusEventType) => void;
  onBlur?: (event: FocusEventType) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface PopupProps extends CommonProps, PopupHandlerProps {
  anchorElement: React.ReactNode | HTMLElement;
  backgroundColor?: React.CSSProperties['backgroundColor'];
  borderColor?: React.CSSProperties['borderColor'];
  children: React.ReactNode | (() => React.ReactNode);
  hasPin: boolean;
  hasShadow: boolean;
  disableAnimations: boolean;
  margin?: number;
  maxWidth?: number | string;
  opened: boolean;
  pinOffset?: number;
  pinSize?: number;
  popupOffset: number;
  positions: PopupPosition[];
  useWrapper: boolean;
  ignoreHover: boolean;
  width: React.CSSProperties['width'];
}

interface PopupLocation {
  coordinates: {
    left: number;
    top: number;
  };
  position: PopupPosition;
}

export interface PopupState {
  location: Nullable<PopupLocation>;
}

export class Popup extends React.Component<PopupProps, PopupState> {
  public static __KONTUR_REACT_UI__ = 'Popup';

  public static propTypes = {
    /**
     * Ссылка (ref) на элемент или React компонент, для которого рисуется попап
     */
    anchorElement: PropTypes.oneOfType([safePropTypesInstanceOf(() => HTMLElement), PropTypes.node]).isRequired,

    /**
     * Фон попапа и пина
     */
    backgroundColor: PropTypes.string,

    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    /**
     * Показывать ли пин
     */
    hasPin: PropTypes.bool,

    /**
     * Применять ли box-shadow на попапе. При false отключает границу на пине
     */
    hasShadow: PropTypes.bool,

    /**
     * Отступ попапа от элемента
     */
    margin: PropTypes.number,

    /**
     * Показан или скрыт попап
     */
    opened: PropTypes.bool,

    /**
     * Смещение пина от края попапа. Край задаётся в пропе position вторым словом
     */
    pinOffset: PropTypes.number,

    /**
     * Сторона пина без учёта границы.
     * Пин представляет собой равносторонний треугольник, высота от попапа
     * до "носика" пина будет соответствовать формуле (size* √3)/2
     */
    pinSize: PropTypes.number,

    /**
     * смещение попапа относительно родительского элемента
     */
    popupOffset: PropTypes.number,

    /**
     * С какой стороны показывать попап и край попапа,
     * на котором будет отображаться пин
     */
    positions: PropTypes.array,

    /**
     * Игнорировать ли события hover/click
     */
    ignoreHover: PropTypes.bool,
  };

  public static defaultProps = {
    popupOffset: 0,
    hasPin: false,
    hasShadow: false,
    disableAnimations: isTestEnv,
    useWrapper: false,
    ignoreHover: false,
    width: 'auto',
  };

  public state: PopupState = { location: this.props.opened ? DUMMY_LOCATION : null };
  private theme!: Theme;
  private layoutEventsToken: Nullable<ReturnType<typeof LayoutEvents.addListener>>;
  private locationUpdateId: Nullable<number> = null;
  private lastPopupElement: Nullable<HTMLElement>;
  private anchorElement: Nullable<HTMLElement> = null;
  private anchorInstance: Nullable<React.ReactInstance>;

  public componentDidMount() {
    this.updateLocation();
    this.layoutEventsToken = LayoutEvents.addListener(this.handleLayoutEvent);
  }

  public UNSAFE_componentWillReceiveProps(nextProps: Readonly<PopupProps>) {
    /**
     * Delaying updateLocation to ensure it happens after props update
     */
    if (nextProps.opened) {
      if (!this.state.location) {
        this.setState({ location: DUMMY_LOCATION });
      }
      this.delayUpdateLocation();
    }
  }

  public componentDidUpdate(prevProps: PopupProps, prevState: PopupState) {
    const hadNoLocation = prevState.location === DUMMY_LOCATION;
    const hasLocation = this.state.location !== DUMMY_LOCATION;
    if (hadNoLocation && hasLocation && this.props.onOpen) {
      this.props.onOpen();
    }
    if (!hadNoLocation && !this.state.location && this.props.onClose) {
      this.props.onClose();
    }
  }

  public componentWillUnmount() {
    this.cancelDelayedUpdateLocation();
    this.removeEventListeners(this.anchorElement);
    if (this.layoutEventsToken) {
      this.layoutEventsToken.remove();
      this.layoutEventsToken = null;
    }
    if (this.state.location && this.props.onClose) {
      this.props.onClose();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { location } = this.state;
    const { anchorElement, useWrapper } = this.props;

    let child: Nullable<React.ReactNode> = null;
    if (isHTMLElement(anchorElement)) {
      this.updateAnchorElement(anchorElement);
    } else if (React.isValidElement(anchorElement)) {
      child = useWrapper ? <span>{anchorElement}</span> : anchorElement;
    } else {
      child = <span>{anchorElement}</span>;
    }

    return (
      <RenderContainer anchor={child} ref={child ? this.refAnchorElement : undefined}>
        {location && this.renderContent(location)}
      </RenderContainer>
    );
  }

  private refAnchorElement = (instance: React.ReactInstance | null) => {
    this.anchorInstance = instance;
    const element = this.extractElement(instance);
    this.updateAnchorElement(element);
    this.anchorElement = element;
  };

  private extractElement(instance: React.ReactInstance | null) {
    if (!instance) {
      return null;
    }
    const element = findDOMNode(instance);
    return isHTMLElement(element) ? element : null;
  }

  private updateAnchorElement(element: HTMLElement | null) {
    const anchorElement = this.anchorElement;

    if (element !== anchorElement) {
      this.removeEventListeners(anchorElement);
      this.anchorElement = element;
      this.addEventListeners(element);
    }
  }

  private addEventListeners(element: Nullable<HTMLElement>) {
    if (element && isHTMLElement(element)) {
      element.addEventListener('mouseenter', this.handleMouseEnter);
      element.addEventListener('mouseleave', this.handleMouseLeave);
      element.addEventListener('click', this.handleClick);
      element.addEventListener('focusin', this.handleFocus as EventListener);
      element.addEventListener('focusout', this.handleBlur as EventListener);
    }
  }

  private removeEventListeners(element: Nullable<HTMLElement>) {
    if (element && isHTMLElement(element)) {
      element.removeEventListener('mouseenter', this.handleMouseEnter);
      element.removeEventListener('mouseleave', this.handleMouseLeave);
      element.removeEventListener('click', this.handleClick);
      element.removeEventListener('focusin', this.handleFocus as EventListener);
      element.removeEventListener('focusout', this.handleBlur as EventListener);
    }
  }

  private handleMouseEnter = (event: MouseEventType) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  private handleMouseLeave = (event: MouseEventType) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  private handleClick = (event: MouseEventType) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  private handleFocus = (event: FocusEventType) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlur = (event: FocusEventType) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private calculateWidth = (width: PopupProps['width']) => {
    if (typeof width === 'string' && width.includes('%')) {
      return this.anchorElement ? (this.anchorElement.offsetWidth * parseFloat(width)) / 100 : 0;
    }
    return width;
  };

  private renderContent(location: PopupLocation) {
    const { backgroundColor, disableAnimations, maxWidth, hasShadow, ignoreHover, opened, width } = this.props;
    const children = this.renderChildren();

    const { direction } = PopupHelper.getPositionObject(location.position);
    const rootStyle: React.CSSProperties = { ...location.coordinates, maxWidth };

    return (
      <Transition
        timeout={TRANSITION_TIMEOUT}
        appear={!disableAnimations}
        in={Boolean(opened && children)}
        mountOnEnter
        unmountOnExit
        enter={!disableAnimations}
        exit={!disableAnimations}
        onExited={this.resetLocation}
      >
        {(state: string) => (
          <CommonWrapper {...this.props}>
            <ZIndex
              ref={this.refPopupElement}
              priority={'Popup'}
              className={cx({
                [styles.popup(this.theme)]: true,
                [styles.shadow(this.theme)]: hasShadow,
                [styles.shadowFallback(this.theme)]: hasShadow && (isIE11 || isEdge),
                [styles.popupIgnoreHover()]: ignoreHover,
                ...(disableAnimations
                  ? {}
                  : {
                      [styles[`transition-enter-${direction}` as keyof typeof styles](this.theme)]: true,
                      [styles.transitionEnter()]: state === 'entering',
                      [styles.transitionEnterActive()]: state === 'entered',
                      [styles.transitionExit()]: state === 'exiting',
                    }),
              })}
              style={rootStyle}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <div className={styles.content(this.theme)} data-tid={'PopupContent'}>
                <div
                  className={styles.contentInner(this.theme)}
                  style={{ backgroundColor, width: this.calculateWidth(width) }}
                  data-tid={'PopupContentInner'}
                >
                  {children}
                </div>
              </div>
              {this.renderPin(location.position)}
            </ZIndex>
          </CommonWrapper>
        )}
      </Transition>
    );
  }

  private resetLocation = () => {
    this.cancelDelayedUpdateLocation();
    this.setState({ location: null });
  };

  private renderChildren() {
    return isFunction(this.props.children) ? this.props.children() : this.props.children;
  }

  private refPopupElement = (zIndex: ZIndex | null) => {
    if (zIndex) {
      this.lastPopupElement = zIndex && (findDOMNode(zIndex) as HTMLElement);
    }
  };

  private renderPin(positionName: string): React.ReactNode {
    /**
     * Box-shadow does not appear under the pin. Borders are used instead.
     * In non-ie browsers drop-shadow filter is used. It is applying
     * shadow to the pin too.
     */
    const isDefaultBorderColor = this.theme.popupBorderColor === POPUP_BORDER_DEFAULT_COLOR;
    const pinBorder = isIE11 && isDefaultBorderColor ? 'rgba(0, 0, 0, 0.09)' : this.theme.popupBorderColor;

    const { pinSize, hasShadow, backgroundColor, borderColor } = this.props;
    const position = PopupHelper.getPositionObject(positionName);

    return (
      this.props.hasPin && (
        <PopupPin
          popupElement={this.lastPopupElement}
          popupPosition={positionName}
          size={pinSize || parseInt(this.theme.popupPinSize)}
          offset={this.getPinOffset(position.align)}
          borderWidth={hasShadow ? 1 : 0}
          backgroundColor={backgroundColor || this.theme.popupBackground}
          borderColor={borderColor || pinBorder}
        />
      )
    );
  }

  private handleLayoutEvent = () => {
    if (!this.state.location) {
      return;
    }
    if (this.anchorInstance) {
      this.updateAnchorElement(this.extractElement(this.anchorInstance));
    }
    this.updateLocation();
  };

  private delayUpdateLocation() {
    this.cancelDelayedUpdateLocation();
    this.locationUpdateId = raf(this.updateLocation);
  }

  private cancelDelayedUpdateLocation() {
    if (this.locationUpdateId) {
      raf.cancel(this.locationUpdateId);
      this.locationUpdateId = null;
    }
  }

  private updateLocation = () => {
    const popupElement = this.lastPopupElement;

    if (!popupElement) {
      return;
    }

    const location = this.getLocation(popupElement, this.state.location);
    if (!this.locationEquals(this.state.location, location)) {
      this.setState({ location });
    }
  };

  private locationEquals(x: Nullable<PopupLocation>, y: Nullable<PopupLocation>) {
    if (x === y) {
      return true;
    }

    if (x == null || y == null) {
      return false;
    }

    return (
      x.coordinates.left === y.coordinates.left && x.coordinates.top === y.coordinates.top && x.position === y.position
    );
  }

  private getLocation(popupElement: HTMLElement, location?: Nullable<PopupLocation>) {
    const positions = this.props.positions;
    const anchorElement = this.anchorElement;

    warning(
      anchorElement && isHTMLElement(anchorElement),
      'Anchor element is not defined or not instance of HTMLElement',
    );

    if (!(anchorElement && isHTMLElement(anchorElement))) {
      return location;
    }

    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);

    let position: PopupPosition;
    let coordinates: Offset;

    if (location && location !== DUMMY_LOCATION && location.position) {
      position = location.position;
      coordinates = this.getCoordinates(anchorRect, popupRect, position);

      const isFullyVisible = PopupHelper.isFullyVisible(coordinates, popupRect);
      const canBecomeVisible = !isFullyVisible && PopupHelper.canBecomeFullyVisible(position, coordinates);
      if (isFullyVisible || canBecomeVisible) {
        return { coordinates, position };
      }
    }

    for (position of positions) {
      coordinates = this.getCoordinates(anchorRect, popupRect, position);
      if (PopupHelper.isFullyVisible(coordinates, popupRect)) {
        return { coordinates, position };
      }
    }

    position = positions[0];
    coordinates = this.getCoordinates(anchorRect, popupRect, position);
    return { coordinates, position };
  }

  private getPinnedPopupOffset(anchorRect: Rect, position: PositionObject) {
    if (!this.props.hasPin || /center|middle/.test(position.align)) {
      return 0;
    }

    const anchorSize = /top|bottom/.test(position.direction) ? anchorRect.width : anchorRect.height;

    const { pinSize } = this.props;

    return Math.max(
      0,
      this.getPinOffset(position.align) + (pinSize || parseInt(this.theme.popupPinSize)) - anchorSize / 2,
    );
  }

  private getCoordinates(anchorRect: Rect, popupRect: Rect, positionName: string) {
    const { margin: marginFromProps } = this.props;
    const margin =
      isNonNullable(marginFromProps) && !isNaN(marginFromProps)
        ? marginFromProps
        : parseInt(this.theme.popupMargin) || 0;
    const position = PopupHelper.getPositionObject(positionName);
    const popupOffset = this.props.popupOffset + this.getPinnedPopupOffset(anchorRect, position);

    switch (position.direction) {
      case 'top':
        return {
          top: anchorRect.top - popupRect.height - margin,
          left: this.getHorizontalPosition(anchorRect, popupRect, position.align, popupOffset),
        };
      case 'bottom':
        return {
          top: anchorRect.top + anchorRect.height + margin,
          left: this.getHorizontalPosition(anchorRect, popupRect, position.align, popupOffset),
        };
      case 'left':
        return {
          top: this.getVerticalPosition(anchorRect, popupRect, position.align, popupOffset),
          left: anchorRect.left - popupRect.width - margin,
        };
      case 'right':
        return {
          top: this.getVerticalPosition(anchorRect, popupRect, position.align, popupOffset),
          left: anchorRect.left + anchorRect.width + margin,
        };
      default:
        throw new Error(`Unexpected direction '${position.direction}'`);
    }
  }

  private getPinOffset(align: string) {
    const { pinOffset } = this.props;

    switch (align) {
      case 'top':
      case 'bottom':
        return pinOffset || parseInt(this.theme.popupPinOffset) || parseInt(this.theme.popupPinOffsetY);
      case 'left':
      case 'right':
        return pinOffset || parseInt(this.theme.popupPinOffset) || parseInt(this.theme.popupPinOffsetX);
      case 'center':
      case 'middle':
        return 0;
      default:
        throw new Error(`Unexpected align '${align}'`);
    }
  }

  private getHorizontalPosition(anchorRect: Rect, popupRect: Rect, align: string, popupOffset: number) {
    switch (align) {
      case 'left':
        return anchorRect.left - popupOffset;
      case 'center':
        return anchorRect.left - (popupRect.width - anchorRect.width) / 2;
      case 'right':
        return anchorRect.left - (popupRect.width - anchorRect.width) + popupOffset;
      default:
        throw new Error(`Unexpected align '${align}'`);
    }
  }

  private getVerticalPosition(anchorRect: Rect, popupRect: Rect, align: string, popupOffset: number) {
    switch (align) {
      case 'top':
        return anchorRect.top - popupOffset;
      case 'middle':
        return anchorRect.top - (popupRect.height - anchorRect.height) / 2;
      case 'bottom':
        return anchorRect.top - (popupRect.height - anchorRect.height) + popupOffset;
      default:
        throw new Error(`Unexpected align '${align}'`);
    }
  }
}
