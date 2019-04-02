import cn from 'classnames';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import RenderContainer from '../RenderContainer';
import ZIndex from '../ZIndex';
import { Transition } from 'react-transition-group';
import raf from 'raf';
import PopupHelper, { Offset, PositionObject, Rect } from './PopupHelper';
import PopupPin from './PopupPin';
import LayoutEvents from '../../lib/LayoutEvents';
import styles from './Popup.less';
import { isIE } from '../ensureOldIEClassName';
import { Nullable } from '../../typings/utility-types';
import warning from 'warning';
import { FocusEventType, MouseEventType } from '../../typings/event-types';
import { isFunction } from '../../lib/utils';
import LifeCycleProxy from '../internal/LifeCycleProxy';

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
  positions: PopupPosition[];
  useWrapper: boolean;
  ignoreHover?: boolean;
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

export default class Popup extends React.Component<PopupProps, PopupState> {
  public static propTypes = {
    /**
     * Ссылка (ref) на элемент или React компонент, для которого рисуется попап
     */
    anchorElement: PropTypes.oneOfType([PropTypes.instanceOf(HTMLElement), PropTypes.node]).isRequired,

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
    margin: 10,
    popupOffset: 0,
    pinSize: 8,
    pinOffset: 16,
    hasPin: false,
    hasShadow: false,
    disableAnimations: false,
    maxWidth: 500,
    useWrapper: false,
  };

  public state: PopupState = { location: null };

  private layoutEventsToken: Nullable<ReturnType<typeof LayoutEvents.addListener>>;
  private locationUpdateId: Nullable<number> = null;
  private lastPopupElement: Nullable<HTMLElement>;
  private anchorElement: Nullable<HTMLElement> = null;
  private anchorInstance: Nullable<React.ReactInstance>;

  public componentDidMount() {
    this.updateLocation();
    this.layoutEventsToken = LayoutEvents.addListener(this.handleLayoutEvent);
  }

  public componentWillReceiveProps(nextProps: Readonly<PopupProps>) {
    const isGoingToOpen = !this.props.opened && nextProps.opened;
    const isGoingToUpdate = this.props.opened && nextProps.opened;
    const isGoingToClose = this.props.opened && !nextProps.opened;

    /**
     * For react < 16 version ReactDOM.unstable_renderSubtreeIntoContainer is
     * used. It causes refs callbacks to call after componentDidUpdate.
     *
     * Delaying updateLocation to ensure that ref is set
     */
    if (isGoingToOpen || isGoingToUpdate) {
      this.delayUpdateLocation();
    }
    if (isGoingToClose) {
      this.resetLocation();
    }
  }

  public componentWillUnmount() {
    this.cancelDelayedUpdateLocation();
    this.removeEventListeners(this.anchorElement);
    if (this.layoutEventsToken) {
      this.layoutEventsToken.remove();
      this.layoutEventsToken = null;
    }
  }

  public render() {
    const { anchorElement, useWrapper } = this.props;

    let child: Nullable<React.ReactNode> = null;
    if (anchorElement instanceof HTMLElement) {
      this.updateAnchorElement(anchorElement);
    } else if (React.isValidElement(anchorElement)) {
      child = useWrapper ? <span>{anchorElement}</span> : anchorElement;
    } else {
      child = <span>{anchorElement}</span>;
    }

    return (
      <RenderContainer anchor={child} ref={child ? this.refAnchorElement : undefined}>
        {this.renderContent()}
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
    return element instanceof HTMLElement ? element : null;
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
    if (element && element instanceof HTMLElement) {
      element.addEventListener('mouseenter', this.handleMouseEnter);
      element.addEventListener('mouseleave', this.handleMouseLeave);
      element.addEventListener('click', this.handleClick);
      element.addEventListener('focusin', this.handleFocus as EventListener);
      element.addEventListener('focusout', this.handleBlur as EventListener);
    }
  }

  private removeEventListeners(element: Nullable<HTMLElement>) {
    if (element && element instanceof HTMLElement) {
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

  private renderContent() {
    const props = this.props;
    const children = this.renderChildren();

    if (!props.opened || !children) {
      return null;
    }

    const location = this.state.location || DUMMY_LOCATION;
    const { direction } = PopupHelper.getPositionObject(location.position);
    const { backgroundColor, disableAnimations } = props;
    const rootStyle: React.CSSProperties = {
      top: location.coordinates.top,
      left: location.coordinates.left,
      maxWidth: props.maxWidth,
    };

    // This need to correct handle order of lifecycle hooks with portal and react@15
    // For more details see issue #1257
    return (
      <LifeCycleProxy onDidUpdate={this.handleDidUpdate} props={this.state}>
        <Transition
          timeout={TRANSITION_TIMEOUT}
          appear={!disableAnimations}
          in
          mountOnEnter
          unmountOnExit
          enter={!disableAnimations}
          exit={!disableAnimations}
        >
          {(state: string) => (
            <ZIndex
              key={this.state.location ? 'real' : 'dummy'}
              delta={1000}
              ref={this.refPopupElement}
              className={cn({
                [styles.popup]: true,
                [styles['popup-ignore-hover']]: props.ignoreHover,
                [styles.shadow]: props.hasShadow,
                [styles['transition-enter']]: state === 'entering',
                [styles['transition-enter-active']]: state === 'entered',
                [styles['transition-exit']]: state === 'exiting',
                [styles[('transition-enter-' + direction) as keyof typeof styles]]: true,
              })}
              style={rootStyle}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <div className={styles.content}>
                <div className={styles.contentInner} style={{ backgroundColor }}>
                  {children}
                </div>
              </div>
              {this.renderPin(location.position)}
            </ZIndex>
          )}
        </Transition>
      </LifeCycleProxy>
    );
  }

  private renderChildren() {
    return isFunction(this.props.children) ? this.props.children() : this.props.children;
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
      styles.popupBorderColor === POPUP_BORDER_DEFAULT_COLOR && isIE ? 'rgba(0, 0, 0, 0.09)' : styles.popupBorderColor;

    const { pinSize, pinOffset, hasShadow, backgroundColor, borderColor } = this.props;

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

  private handleLayoutEvent = () => {
    if (this.anchorInstance) {
      this.updateAnchorElement(this.extractElement(this.anchorInstance));
    }
    if (this.state.location) {
      this.updateLocation();
    }
  };

  private handleDidUpdate = (prevProps: PopupState, props: PopupState) => {
    const hadNoLocation = prevProps.location === null;
    const hasLocation = props.location !== null;
    if (hadNoLocation && hasLocation && this.props.onOpen) {
      this.props.onOpen();
    }
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

  private resetLocation = () => {
    this.cancelDelayedUpdateLocation();
    this.setState({ location: null });
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
      anchorElement && anchorElement instanceof HTMLElement,
      'Anchor element is not defined or not instance of HTMLElement',
    );

    if (!(anchorElement && anchorElement instanceof HTMLElement)) {
      return location;
    }

    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);

    let position: PopupPosition;
    let coordinates: Offset;

    if (location && location.position) {
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

    const { pinOffset, pinSize } = this.props;
    return Math.max(0, pinOffset + pinSize - anchorSize / 2);
  }

  private getCoordinates(anchorRect: Rect, popupRect: Rect, positionName: string) {
    const margin = this.props.margin;
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
        throw new Error(`Unxpected direction '${position.direction}'`);
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
        throw new Error(`Unxpected align '${align}'`);
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
        throw new Error(`Unxpected align '${align}'`);
    }
  }
}
