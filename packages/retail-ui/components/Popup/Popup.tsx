import cn from 'classnames';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import RenderContainer from '../RenderContainer';
import RenderLayer from '../RenderLayer';
import ZIndex from '../ZIndex';
import { Transition } from 'react-transition-group';
import raf from 'raf';

import PopupHelper, { Rect, PositionObject } from './PopupHelper';
import PopupPin from './PopupPin';
import LayoutEvents from '../../lib/LayoutEvents';

import styles from './Popup.less';

import { isIE } from '../ensureOldIEClassName';
import { Nullable } from '../../typings/utility-types';
import warning from 'warning';

const POPUP_BORDER_DEFAULT_COLOR = 'transparent';

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
  'bottom left',
  'bottom center',
  'bottom right',
  'left top',
  'left middle',
  'left bottom'
];

export interface PopupHandlerProps {
  onMouseEnter?: (event: React.MouseEvent<HTMLElement> | MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement> | MouseEvent) => void;
  onClick?: (event: React.MouseEvent<HTMLElement> | MouseEvent) => void;
  onFocus?: (event: React.FocusEvent<HTMLElement> | FocusEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement> | FocusEvent) => void;
}

export interface PopupProps extends PopupHandlerProps {
  anchorElement: React.ReactNode | HTMLElement;
  backgroundColor?: React.CSSProperties['backgroundColor'];
  borderColor?: React.CSSProperties['borderColor'];
  children: React.ReactNode | (() => React.ReactNode);
  hasPin: boolean;
  hasShadow: boolean;
  disableAnimations: boolean;
  margin: number;
  maxWidth: number | string;
  opened: boolean;
  pinOffset: number;
  pinSize: number;
  popupOffset: number;
  positions: string[];
  onCloseRequest?: () => void;
}

interface PopupLocation {
  coordinates: {
    left: number;
    top: number;
  };
  position: string;
}

export interface PopupState {
  location: Nullable<PopupLocation>;
}

class Id extends React.Component {
  public render() {
    return this.props.children;
  }
}

export default class Popup extends React.Component<PopupProps, PopupState> {
  public static propTypes = {
    /**
     * Ссылка (ref) на элемент или React компонент, для которого рисуется попап
     */
    anchorElement: PropTypes.oneOfType([
      PropTypes.instanceOf(HTMLElement),
      PropTypes.node
    ]).isRequired,

    /**
     * Фон попапа и пина
     */
    backgroundColor: PropTypes.string,

    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

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
    positions: PropTypes.array
  };

  public static defaultProps = {
    margin: 10,
    popupOffset: 0,
    pinSize: 8,
    pinOffset: 16,
    hasPin: false,
    hasShadow: false,
    disableAnimations: false,
    maxWidth: 500
  };

  public state: PopupState = {
    location: null
  };

  private layoutEventsToken: Nullable<
    ReturnType<typeof LayoutEvents.addListener>
  >;
  private lastPopupElement: Nullable<HTMLElement>;
  private anchorElement: Nullable<Element | Text>;
  private anchorInstance: Nullable<React.ReactInstance>;

  public componentDidMount() {
    this.updateLocation();
    this.layoutEventsToken = LayoutEvents.addListener(this.handleLayoutEvent);
  }

  public componentWillReceiveProps(nextProps: PopupProps) {
    /**
     * For react < 16 version ReactDOM.unstable_renderSubtreeIntoContainer is
     * used. It causes refs callbacks to call after componentDidUpdate.
     *
     * Delaying updateLocation to ensure that ref is set
     */
    if (!this.props.opened && nextProps.opened) {
      this.delayUpdateLocation();
    }

    if (this.props.opened && !nextProps.opened) {
      this.resetLocation();
    }
  }

  public componentWillUnmount() {
    if (this.layoutEventsToken) {
      this.layoutEventsToken.remove();
    }
  }

  public render() {
    const location = this.state.location || this.getDummyLocation();
    let child = null;

    if (this.props.anchorElement instanceof HTMLElement) {
      this.anchorElement = this.props.anchorElement;
    } else if (React.isValidElement(this.props.anchorElement)) {
      child = React.Children.only(this.props.anchorElement);
    } else {
      child = (
        <span
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
          {this.props.anchorElement}
        </span>
      );
    }

    const content = (
      <RenderContainer>{this.renderContent(location)}</RenderContainer>
    );

    return (
      <RenderLayer
        onClickOutside={this.handleClickOutside}
        onFocusOutside={this.handleFocusOutside}
        /**
         * If onCloseRequest is not specified handleClickOutside and handleFocusOutside
         * are doing nothing. So there is no need in RenderLayer at all.
         */
        active={this.props.onCloseRequest && this.props.opened}
      >
        {child ? (
          /**
           * NOTE: Simple hack as workaround for `React.Children.only`
           * Remember `findDOMNode` on this instance return first sibling HTMLElement
           */
          <Id ref={this.refAnchorElement}>
            {child}
            {content}
          </Id>
        ) : (
          content
        )}
      </RenderLayer>
    );
  }

  private updateAnchorElement(instance: React.ReactInstance) {
    const element = findDOMNode(instance);

    if (element === this.anchorElement) {
      return;
    }
    const { anchorElement } = this;
    if (anchorElement && anchorElement instanceof HTMLElement) {
      anchorElement.removeEventListener('mouseenter', this.handleMouseEnter);
      anchorElement.removeEventListener('mouseleave', this.handleMouseLeave);
      anchorElement.removeEventListener('click', this.handleClick);
      anchorElement.removeEventListener('focus', this.handleFocus);
      anchorElement.removeEventListener('blur', this.handleBlur);
    }

    this.anchorElement = element;

    if (element && element instanceof HTMLElement) {
      element.addEventListener('mouseenter', this.handleMouseEnter);
      element.addEventListener('mouseleave', this.handleMouseLeave);
      element.addEventListener('click', this.handleClick);
      element.addEventListener('focus', this.handleFocus);
      element.addEventListener('blur', this.handleBlur);
    }
  }

  private refAnchorElement = (instance: React.ReactInstance | null) => {
    this.anchorInstance = instance;
    if (this.anchorInstance) {
      this.updateAnchorElement(this.anchorInstance);
    } else {
      this.anchorElement = null;
    }
  };
  private handleMouseEnter = (
    event: React.MouseEvent<HTMLElement> | MouseEvent
  ) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };
  private handleMouseLeave = (
    event: React.MouseEvent<HTMLElement> | MouseEvent
  ) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };
  private handleClick = (event: React.MouseEvent<HTMLElement> | MouseEvent) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };
  private handleFocus = (event: React.FocusEvent<HTMLElement> | FocusEvent) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };
  private handleBlur = (event: React.FocusEvent<HTMLElement> | FocusEvent) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private renderContent(location: PopupLocation) {
    const { direction } = PopupHelper.getPositionObject(location.position);
    const rootStyle: React.CSSProperties = {
      top: location.coordinates.top,
      left: location.coordinates.left,
      maxWidth: this.props.maxWidth
    };

    if (this.props.backgroundColor) {
      rootStyle.backgroundColor = this.props.backgroundColor;
    }

    return (
      <Transition
        timeout={{ enter: 0, exit: 200 }}
        appear={!this.props.disableAnimations}
        in={this.props.opened}
        mountOnEnter
        unmountOnExit
        enter={!this.props.disableAnimations}
        exit={!this.props.disableAnimations}
      >
        {(state: string) => (
          <ZIndex
            key={this.state.location ? 'real' : 'dummy'}
            delta={1000}
            ref={this.refPopupElement}
            className={cn({
              [styles.popup]: true,
              [styles.shadow]: this.props.hasShadow,
              [styles['transition-enter']]: state === 'entering',
              [styles['transition-enter-active']]: state === 'entered',
              [styles['transition-exit']]: state === 'exiting',
              [styles[
                ('transition-enter-' + direction) as keyof typeof styles
              ]]: true
            })}
            style={rootStyle}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
          >
            {this.renderChildren()}
            {this.renderPin(location.position)}
          </ZIndex>
        )}
      </Transition>
    );
  }

  private renderChildren() {
    return typeof this.props.children === 'function'
      ? this.props.children()
      : this.props.children;
  }

  private refPopupElement = (zIndex: ZIndex | null) => {
    if (zIndex) {
      this.lastPopupElement = zIndex && (findDOMNode(zIndex) as HTMLElement);
    }
  };

  private renderPin(position: string): React.ReactNode {
    /**
     * Box-shadow does not appear under the pin. Borders are used instead.
     * In non-ie browsers drop-shodow filter is used. It is applying
     * shadow to pin too.
     */
    const pinBorder =
      styles.popupBorderColor === POPUP_BORDER_DEFAULT_COLOR && isIE
        ? 'rgba(0, 0, 0, 0.09)'
        : styles.popupBorderColor;

    const {
      pinSize,
      pinOffset,
      hasShadow,
      backgroundColor,
      borderColor
    } = this.props;

    return (
      this.props.hasPin && (
        <PopupPin
          popupElement={this.lastPopupElement!}
          popupPosition={position}
          size={pinSize}
          offset={pinOffset}
          borderWidth={hasShadow ? 1 : 0}
          backgroundColor={backgroundColor || styles.popupBackground}
          borderColor={borderColor || pinBorder}
        />
      )
    );
  }

  private handleClickOutside = () => {
    this.requestClose();
  };

  private handleFocusOutside = () => {
    this.requestClose();
  };

  private handleLayoutEvent = () => {
    if (this.anchorInstance) {
      this.updateAnchorElement(this.anchorInstance);
    }
    if (this.state.location) {
      this.updateLocation();
    }
  };

  private delayUpdateLocation() {
    raf(() => this.updateLocation());
  }

  private updateLocation() {
    const popupElement = this.lastPopupElement;

    if (!popupElement) {
      return;
    }

    const location = this.getLocation(popupElement, this.state.location);
    if (!this.locationEquals(this.state.location, location)) {
      this.setState({ location });
    }
  }

  private resetLocation = () => {
    return this.setState({ location: null });
  };

  private requestClose = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
  };

  private locationEquals(
    x: Nullable<PopupLocation>,
    y: Nullable<PopupLocation>
  ) {
    if (x === y) {
      return true;
    }

    if (x == null || y == null) {
      return false;
    }

    return (
      x.coordinates.left === y.coordinates.left &&
      x.coordinates.top === y.coordinates.top &&
      x.position === y.position
    );
  }

  private getDummyLocation() {
    return {
      coordinates: {
        top: -9999,
        left: -9999
      },
      position: 'top left'
    };
  }

  private getLocation(
    popupElement: HTMLElement,
    location?: PopupLocation | null
  ) {
    const { positions, margin, popupOffset } = this.props;
    const { anchorElement } = this;

    if (process.env.NODE_ENV !== 'production') {
      warning(
        anchorElement && anchorElement instanceof HTMLElement,
        'Anchor element is not defined or not instance of HTMLElement'
      );
    }
    if (!(anchorElement && anchorElement instanceof HTMLElement)) {
      return location;
    }

    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);

    if (location && location.position) {
      // tslint:disable-next-line:no-shadowed-variable
      const position = PopupHelper.getPositionObject(location.position);
      // tslint:disable-next-line:no-shadowed-variable
      const coordinates = this.getCoordinates(
        anchorRect,
        popupRect,
        position,
        margin,
        popupOffset + this.getPinnedPopupOffset(anchorRect, position)
      );
      return { coordinates, position: location.position };
    }

    // tslint:disable-next-line:no-shadowed-variable
    for (const position of positions) {
      const positionObj = PopupHelper.getPositionObject(position);
      // tslint:disable-next-line:no-shadowed-variable
      const coordinates = this.getCoordinates(
        anchorRect,
        popupRect,
        positionObj,
        margin,
        popupOffset + this.getPinnedPopupOffset(anchorRect, positionObj)
      );
      if (
        PopupHelper.isAbsoluteRectFullyVisible({
          top: coordinates.top,
          left: coordinates.left,
          height: popupRect.height,
          width: popupRect.width
        })
      ) {
        return { coordinates, position };
      }
    }
    const position = PopupHelper.getPositionObject(positions[0]);
    const coordinates = this.getCoordinates(
      anchorRect,
      popupRect,
      position,
      margin,
      popupOffset + this.getPinnedPopupOffset(anchorRect, position)
    );
    return { coordinates, position: positions[0] };
  }

  private getPinnedPopupOffset(anchorRect: Rect, position: PositionObject) {
    if (!this.props.hasPin || /center|middle/.test(position.align)) {
      return 0;
    }

    const anchorSize = /top|bottom/.test(position.direction)
      ? anchorRect.width
      : anchorRect.height;

    const { pinOffset, pinSize } = this.props;
    return Math.max(0, pinOffset + pinSize - anchorSize / 2);
  }

  private getCoordinates(
    anchorRect: Rect,
    popupRect: Rect,
    position: PositionObject,
    margin: number,
    popupOffset: number
  ) {
    switch (position.direction) {
      case 'top':
        return {
          top: anchorRect.top - popupRect.height - margin,
          left: this.getHorizontalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          )
        };
      case 'bottom':
        return {
          top: anchorRect.top + anchorRect.height + margin,
          left: this.getHorizontalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          )
        };
      case 'left':
        return {
          top: this.getVerticalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          ),
          left: anchorRect.left - popupRect.width - margin
        };
      case 'right':
        return {
          top: this.getVerticalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          ),
          left: anchorRect.left + anchorRect.width + margin
        };
      default:
        throw new Error(`Unxpected direction '${position.direction}'`);
    }
  }

  private getHorizontalPosition(
    anchorRect: Rect,
    popupRect: Rect,
    align: string,
    popupOffset: number
  ) {
    switch (align) {
      case 'left':
        return anchorRect.left - popupOffset;
      case 'center':
        return anchorRect.left - (popupRect.width - anchorRect.width) / 2;
      case 'right':
        return (
          anchorRect.left - (popupRect.width - anchorRect.width) + popupOffset
        );
      default:
        throw new Error(`Unxpected align '${align}'`);
    }
  }

  private getVerticalPosition(
    anchorRect: Rect,
    popupRect: Rect,
    align: string,
    popupOffset: number
  ) {
    switch (align) {
      case 'top':
        return anchorRect.top - popupOffset;
      case 'middle':
        return anchorRect.top - (popupRect.height - anchorRect.height) / 2;
      case 'bottom':
        return (
          anchorRect.top - (popupRect.height - anchorRect.height) + popupOffset
        );
      default:
        throw new Error(`Unxpected align '${align}'`);
    }
  }
}
