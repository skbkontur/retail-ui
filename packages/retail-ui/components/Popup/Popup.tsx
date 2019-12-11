import * as React from 'react';
import { findDOMNode } from 'react-dom';
import * as PropTypes from 'prop-types';
import * as safePropTypes from '../../lib/SSRSafePropTypes';
import RenderContainer from '../RenderContainer';
import ZIndex from '../ZIndex';
import { Transition } from 'react-transition-group';
import raf from 'raf';
import PopupHelper, { Offset, PositionObject, Rect } from './PopupHelper';
import PopupPin from './PopupPin';
import LayoutEvents from '../../lib/LayoutEvents';
import styles from './Popup.module.less';
import { isIE } from '../ensureOldIEClassName';
import { Nullable } from '../../typings/utility-types';
import warning from 'warning';
import { FocusEventType, MouseEventType } from '../../typings/event-types';
import { isFunction } from '../../lib/utils';
import LifeCycleProxy from '../internal/LifeCycleProxy';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Popup.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';
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
  maxWidth?: number | string;
  opened: boolean;
  pinOffset: number;
  pinSize: number;
  popupOffset: number;
  positions: PopupPosition[];
  useWrapper: boolean;
  ignoreHover: boolean;
  disablePortal?: boolean;
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
    anchorElement: PropTypes.oneOfType([safePropTypes.instanceOf(() => HTMLElement), PropTypes.node]).isRequired,

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

    /**
     * Отключает использование портала
     */
    disablePortal: PropTypes.bool,
  };

  public static defaultProps = {
    margin: 10,
    popupOffset: 0,
    pinSize: 8,
    pinOffset: 16,
    hasPin: false,
    hasShadow: false,
    disableAnimations: Boolean(process.env.enableReactTesting),
    useWrapper: false,
    ignoreHover: false,
    disablePortal: false,
  };

  public state: PopupState = { location: this.props.opened ? DUMMY_LOCATION : null };
  private theme!: ITheme;
  private layoutEventsToken: Nullable<ReturnType<typeof LayoutEvents.addListener>>;
  private locationUpdateId: Nullable<number> = null;
  private lastPopupElement: Nullable<HTMLElement>;
  private anchorElement: Nullable<HTMLElement> = null;
  private wrapperElement: Nullable<HTMLDivElement> = null;
  private anchorInstance: Nullable<React.ReactInstance>;

  public componentDidMount() {
    this.updateLocation();
    this.layoutEventsToken = LayoutEvents.addListener(this.handleLayoutEvent);
  }

  public componentWillReceiveProps(nextProps: Readonly<PopupProps>) {
    /**
     * For react < 16 version ReactDOM.unstable_renderSubtreeIntoContainer is
     * used. It causes refs callbacks to call after componentDidUpdate.
     *
     * Delaying updateLocation to ensure that ref is set
     */
    if (nextProps.opened) {
      if (!this.state.location) {
        this.setState({ location: DUMMY_LOCATION });
      }
      this.delayUpdateLocation();
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
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { anchorElement, useWrapper } = this.props;

    let child: Nullable<React.ReactNode> = null;
    if (anchorElement instanceof HTMLElement) {
      this.updateAnchorElement(anchorElement);
    } else if (React.isValidElement(anchorElement)) {
      child = useWrapper ? <span>{anchorElement}</span> : anchorElement;
    } else {
      child = <span>{anchorElement}</span>;
    }

    return this.props.disablePortal ? this.renderWithoutPortal(child) : this.renderInPortal(child);
  }

  private renderInPortal = (child: React.ReactElement<any> | null | {}) => {
    const { location } = this.state;
    return (
      <RenderContainer anchor={child} ref={child ? this.refAnchorElement : undefined}>
        {location && this.renderContent(location)}
      </RenderContainer>
    );
  };

  private renderWithoutPortal = (child: React.ReactElement<any> | null | {}) => {
    const { location } = this.state;
    return (
      <EmptyWrapper ref={child ? this.refAnchorElement : undefined}>
        {child}
        {location && (
          <div ref={this.refWrapperElement} className={styles['popup-content-wrapper']}>
            {this.renderContent(location)}
          </div>
        )}
      </EmptyWrapper>
    );
  };

  private refAnchorElement = (instance: React.ReactInstance | null) => {
    this.anchorInstance = instance;
    const element = this.extractElement(instance);
    this.updateAnchorElement(element);
    this.anchorElement = element;
  };

  private refWrapperElement = (element: HTMLDivElement) => {
    this.wrapperElement = element;
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

  private renderContent(location: PopupLocation) {
    const { backgroundColor, disableAnimations, maxWidth, hasShadow, ignoreHover, opened } = this.props;
    const children = this.renderChildren();

    const { direction } = PopupHelper.getPositionObject(location.position);
    const rootStyle: React.CSSProperties = { ...location.coordinates, maxWidth };

    // This need to correct handle order of lifecycle hooks with portal and react@15
    // For more details see issue #1257
    return (
      <LifeCycleProxy onDidUpdate={this.handleDidUpdate} props={this.state}>
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
            <ZIndex
              ref={this.refPopupElement}
              priority={'Popup'}
              className={cx([styles.popup, jsStyles.popup(this.theme)], {
                [jsStyles.shadow(this.theme)]: hasShadow,
                [styles['popup-ignore-hover']]: ignoreHover,
                ...(disableAnimations
                  ? {}
                  : {
                      [styles['transition-enter']]: state === 'entering',
                      [styles['transition-enter-active']]: state === 'entered',
                      [styles['transition-exit']]: state === 'exiting',
                      [styles[`transition-enter-${direction}` as keyof typeof styles]]: true,
                    }),
              })}
              style={rootStyle}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              <div className={cx(styles.content, jsStyles.content(this.theme))} data-tid={'PopupContent'}>
                <div
                  className={jsStyles.contentInner(this.theme)}
                  style={{ backgroundColor }}
                  data-tid={'PopupContentInner'}
                >
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

  private renderPin(position: string): React.ReactNode {
    /**
     * Box-shadow does not appear under the pin. Borders are used instead.
     * In non-ie browsers drop-shadow filter is used. It is applying
     * shadow to the pin too.
     */
    const isDefaultBorderColor = this.theme.popupBorderColor === POPUP_BORDER_DEFAULT_COLOR;
    const pinBorder = isIE && isDefaultBorderColor ? 'rgba(0, 0, 0, 0.09)' : this.theme.popupBorderColor;

    const { pinSize, pinOffset, hasShadow, backgroundColor, borderColor } = this.props;

    return (
      this.props.hasPin && (
        <PopupPin
          popupElement={this.lastPopupElement!}
          popupPosition={position}
          size={pinSize}
          offset={pinOffset}
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

  private handleDidUpdate = (prevProps: PopupState, props: PopupState) => {
    const hadNoLocation = prevProps.location === DUMMY_LOCATION;
    const hasLocation = props.location !== DUMMY_LOCATION;
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

    if (location && location !== DUMMY_LOCATION && location.position) {
      position = location.position;
      coordinates = this.getAbsoluteCoordinates(anchorRect, popupRect, position);

      const isFullyVisible = PopupHelper.isFullyVisible(coordinates, popupRect);
      const canBecomeVisible = !isFullyVisible && PopupHelper.canBecomeFullyVisible(position, coordinates);
      if (isFullyVisible || canBecomeVisible) {
        this.patchCoordinates(coordinates);
        return { coordinates, position };
      }
    }

    for (position of positions) {
      coordinates = this.getAbsoluteCoordinates(anchorRect, popupRect, position);
      if (PopupHelper.isFullyVisible(coordinates, popupRect)) {
        this.patchCoordinates(coordinates);
        return { coordinates, position };
      }
    }

    position = positions[0];
    coordinates = this.getAbsoluteCoordinates(anchorRect, popupRect, position);
    this.patchCoordinates(coordinates);
    return { coordinates, position };
  }

  private patchCoordinates(coordinates: { top: number; left: number }) {
    if (!this.props.disablePortal || !this.wrapperElement) {
      return;
    }
    const wrapperRect = PopupHelper.getElementAbsoluteRect(this.wrapperElement);

    coordinates.left -= wrapperRect.left;
    coordinates.top -= wrapperRect.top;
  }

  private getPinnedPopupOffset(anchorRect: Rect, position: PositionObject) {
    if (!this.props.hasPin || /center|middle/.test(position.align)) {
      return 0;
    }

    const anchorSize = /top|bottom/.test(position.direction) ? anchorRect.width : anchorRect.height;

    const { pinOffset, pinSize } = this.props;
    return Math.max(0, pinOffset + pinSize - anchorSize / 2);
  }

  private getAbsoluteCoordinates(anchorRect: Rect, popupRect: Rect, positionName: string) {
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

// нужно чтобы получать по рефу dom-элемент, в который зарендерится anchor
// в задаче с MutationObserver хорошо бы выпилить этот хак
class EmptyWrapper extends React.Component {
  public render() {
    return this.props.children;
  }
}
