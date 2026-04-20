import type { HTMLAttributes, Ref } from 'react';
import React from 'react';
import { Transition } from 'react-transition-group';
import warning from 'warning';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject.js';
import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import type { Nullable } from '../../typings/utility-types.js';
import * as LayoutEvents from '../../lib/LayoutEvents.js';
import type { Priority } from '../ZIndex/index.js';
import { ZIndex } from '../ZIndex/index.js';
import { RenderContainer } from '../RenderContainer/index.js';
import type { FocusEventType, MouseEventType } from '../../typings/event-types.js';
import { getRandomID, isFunction, isNonNullable, isNullable, isRefableElement } from '../../lib/utils.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import type { CommonProps } from '../CommonWrapper/index.js';
import { CommonWrapper } from '../CommonWrapper/index.js';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator.js';
import { MobilePopup } from '../MobilePopup/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { getRootNode, rootNode } from '../../lib/rootNode/index.js';
import { isInstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isInstanceOf } from '../../lib/isInstanceOf.js';
import { mergeRefs } from '../../lib/mergeRefs.js';
import { getVisualStateDataAttributes } from '../CommonWrapper/utils/getVisualStateDataAttributes.js';
import { getElementRef } from '../../lib/getElementRef.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { PopupPin } from './PopupPin.js';
import type { Offset, PositionObject, Rect } from './PopupHelper.js';
import { PopupHelper } from './PopupHelper.js';
import { getStyles } from './Popup.styles.js';

const TRANSITION_TIMEOUT = { enter: 0, exit: 200 };

export const PopupNonPinnablePositions = ['middle center', 'middle left', 'middle right'];

export const PopupPinnablePositions = [
  'top center',
  'top left',
  'top right',
  'bottom center',
  'bottom left',
  'bottom right',
  'left middle',
  'left top',
  'left bottom',
  'right middle',
  'right top',
  'right bottom',
];

export const PopupPositions = [...PopupPinnablePositions, ...PopupNonPinnablePositions] as const;

export const DefaultPosition = PopupPositions[0];

export type PopupPositionsType = (typeof PopupPositions)[number];
export type PopupPinnablePositionsType = (typeof PopupPinnablePositions)[number];
export type ShortPopupPositionsType = 'top' | 'bottom' | 'left' | 'right';

export const DUMMY_LOCATION: PopupLocation = {
  position: DefaultPosition,
  coordinates: {
    top: -9999,
    left: -9999,
  },
  isFullyVisible: false,
};

export interface PopupHandlerProps {
  onMouseEnter?: (event: MouseEventType) => void;
  onMouseLeave?: (event: MouseEventType) => void;
  onClick?: (event: MouseEventType) => void;
  onFocus?: (event: FocusEventType) => void;
  onBlur?: (event: FocusEventType) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface PopupProps
  extends Omit<CommonProps, 'children'>, PopupHandlerProps, Pick<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Ссылка (ref) на элемент или React компонент, для которого рисуется попап
   */
  anchorElement: React.ReactNode | Element;
  /**
   * Фон попапа и пина
   */
  backgroundColor?: React.CSSProperties['backgroundColor'];
  borderColor?: React.CSSProperties['borderColor'];
  children: React.ReactNode | (() => React.ReactNode);
  /**
   * Показывать ли пин
   */
  hasPin?: boolean;
  /**
   * Применять ли box-shadow на попапе. При false отключает границу на пине
   */
  hasShadow?: boolean;
  disableAnimations?: boolean;
  /**
   * Отступ попапа от элемента
   */
  margin?: number;
  maxWidth?: number | string;
  /**
   * Показан или скрыт попап
   */
  opened: boolean;
  /**
   * Смещение пина от края попапа. Край задаётся в пропе position вторым словом
   */
  pinOffset?: number;
  /**
   * Сторона пина без учёта границы.
   * Пин представляет собой равносторонний треугольник, высота от попапа
   * до "носика" пина будет соответствовать формуле (size* √3)/2
   */
  pinSize?: number;
  /**
   * смещение попапа относительно родительского элемента
   */
  popupOffset?: number;
  priority?: Priority;
  /**
   * С какой стороны показывать попап и край попапа,
   * на котором будет отображаться пин
   */
  positions?: Readonly<PopupPositionsType[]>;
  /**
   * Приоритетная позиция попапа
   */
  pos?: PopupPositionsType | ShortPopupPositionsType;
  /**
   * Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`. <br/> Используется для корректного позиционирования тултипа при двух и более вложенных элементах.
   *
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически.
   */
  useWrapper?: boolean;
  /**
   * Игнорировать ли события hover/click
   */
  ignoreHover?: boolean;
  width?: React.CSSProperties['width'];
  minWidth?: React.CSSProperties['minWidth'];
  /**
   * При очередном рендере пытаться сохранить первоначальную позицию попапа
   * (в том числе, когда он выходит за пределы экрана, но может быть проскролен в него).
   *
   * Нужен только для Tooltip. В остальных случаях позиция перестраивается автоматически.
   * @see https://github.com/skbkontur/retail-ui/pull/1195
   */
  tryPreserveFirstRenderedPosition?: boolean;
  /**
   * Включает поиск наиболее подходящей позиции попапа, если ни одна заданная позиция попапа не влезает во вьюпорт.
   * Выбирается позиция с наибольшей видимой площадью.
   */
  tryBestFallbackPosition?: boolean;
  withoutMobile?: boolean;
  /** @ignore */
  disablePortal?: boolean;
  mobileOnCloseRequest?: () => void;
  /**
   * Возвращает текущую позицию попапа
   */
  onPositionChange?: (pos: PopupPositionsType, isFullyVisible: boolean) => void;
}

interface PopupLocation {
  coordinates: {
    left: number;
    top: number;
  };
  position: PopupPositionsType;
  isFullyVisible: boolean;
}

export interface PopupState {
  location: Nullable<PopupLocation>;
}

interface FallbackCandidateEvaluation {
  position: PopupPositionsType;
  coordinates: Offset;
  overflowCount: number;
  visibleArea: number;
  isFullyVisible: boolean;
  isAreaEligible: boolean;
}

export const PopupDataTids = {
  root: 'Popup__root',
  content: 'PopupContent',
  contentInner: 'PopupContentInner',
  popupPin: 'PopupPin__root',
} as const;

export const PopupIds = {
  root: PopupDataTids.root,
};

type DefaultProps = Required<
  Pick<
    PopupProps,
    | 'popupOffset'
    | 'hasPin'
    | 'hasShadow'
    | 'disablePortal'
    | 'disableAnimations'
    | 'useWrapper'
    | 'ignoreHover'
    | 'width'
    | 'priority'
  >
>;

@withRenderEnvironment
@responsiveLayout
@rootNode
export class Popup extends React.Component<PopupProps, PopupState> {
  public static __KONTUR_REACT_UI__ = 'Popup';
  public static displayName = 'Popup';

  public static defaultProps: DefaultProps = {
    popupOffset: 0,
    hasPin: false,
    hasShadow: false,
    disableAnimations: isTestEnv,
    useWrapper: false,
    ignoreHover: false,
    disablePortal: false,
    width: 'auto',
    priority: ZIndex.priorities.Popup,
  };

  private getProps = createPropsGetter(Popup.defaultProps);

  // see #2873 and #2895
  public static readonly defaultRootNode = null;

  public state: PopupState = { location: this.props.opened ? DUMMY_LOCATION : null };
  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;

  private theme!: Theme;
  private layoutEventsToken: Nullable<ReturnType<typeof LayoutEvents.addListener>>;
  private locationUpdateId: Nullable<number> = null;
  private lastPopupContentElement: Nullable<Element>;
  private isMobileLayout!: boolean;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private refForTransition = React.createRef<HTMLDivElement>();
  private hasAnchorElementListeners = false;
  private rootId = PopupIds.root + getRandomID();

  public anchorElement: Nullable<Element> = null;
  private absoluteParent: Nullable<HTMLDivElement> = null;

  public componentDidMount() {
    this.updateLocation();
    this.layoutEventsToken = LayoutEvents.addListener(this.handleLayoutEvent, this.globalObject);

    if (!this.hasAnchorElementListeners) {
      this.addEventListeners(this.anchorElement);
    }
  }

  public static getDerivedStateFromProps(props: Readonly<PopupProps>, state: PopupState) {
    /**
     * Delaying updateLocation to ensure it happens after props update
     */
    if (props.opened) {
      if (!state.location) {
        return { location: DUMMY_LOCATION };
      }
    } else if (state.location) {
      return { location: DUMMY_LOCATION };
    }
    return state;
  }

  public componentDidUpdate(prevProps: PopupProps, prevState: PopupState) {
    const hadNoLocation = prevState.location === DUMMY_LOCATION;
    const hasLocation = this.state.location !== DUMMY_LOCATION;
    const wasClosed = prevProps.opened && !this.props.opened;

    if (this.isMobileLayout && prevState.location === null && this.state.location === null) {
      this.setState({ location: DUMMY_LOCATION });
    }

    if (this.props.opened && hadNoLocation && hasLocation && this.props.onOpen) {
      this.props.onOpen();
    }
    if (wasClosed && !hasLocation && this.props.onClose) {
      this.props.onClose();
    }
    if (this.props.opened) {
      this.delayUpdateLocation();
    }
  }

  public componentWillUnmount() {
    this.cancelDelayedUpdateLocation();
    if (this.hasAnchorElementListeners) {
      this.removeEventListeners(this.anchorElement);
    }
    if (this.layoutEventsToken) {
      this.layoutEventsToken.remove();
      this.layoutEventsToken = null;
    }
    if (this.state.location && this.props.onClose) {
      this.props.onClose();
    }
  }

  public render() {
    this.styles = getStyles(this.emotion);

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMobile() {
    const { opened } = this.props;
    const children = this.renderChildren();

    return children ? (
      <CommonWrapper rootNodeRef={this.setRootNode}>
        <MobilePopup opened={opened} withoutRenderContainer onCloseRequest={this.props.mobileOnCloseRequest}>
          {this.content(children)}
        </MobilePopup>
      </CommonWrapper>
    ) : null;
  }

  private renderMain() {
    const { anchorElement } = this.props;
    const useWrapper = this.getProps().useWrapper;

    let anchor: Nullable<React.ReactNode> = null;
    if (isInstanceOf(anchorElement, this.globalObject.Element)) {
      this.updateAnchorElement(anchorElement);
    } else if (React.isValidElement(anchorElement)) {
      anchor = useWrapper ? <span>{anchorElement}</span> : anchorElement;
    } else {
      anchor = <span>{anchorElement}</span>;
    }

    const anchorWithRef =
      anchor && React.isValidElement(anchor) && isRefableElement(anchor)
        ? React.cloneElement(anchor, {
            ref: mergeRefs(getElementRef(anchor), this.updateAnchorElement),
          } as { ref: (instance: Nullable<React.ReactInstance>) => void })
        : null;
    // we need to get anchor's DOM node
    // so we either set our own ref on it via cloning
    // or relay on findDOMNode (inside getRootNode)
    // which should be called within updateAnchorElement
    // in the case when the anchor is not refable

    const canGetAnchorNode = !!anchorWithRef || isInstanceOf(anchorElement, this.globalObject.Element);
    const renderRef = canGetAnchorNode ? null : this.updateAnchorElement;
    const renderAnchor = anchorWithRef || anchor;

    return this.props.disablePortal
      ? this.renderWithoutPortal(renderAnchor, renderRef)
      : this.renderInPortal(renderAnchor, renderRef);
  }

  private renderInPortal = (anchor: React.ReactNode, ref: null | Ref<RenderContainer>) => {
    const { location } = this.state;

    return (
      <RenderContainer anchor={anchor} ref={ref}>
        {this.isMobileLayout && !this.props.withoutMobile
          ? this.renderMobile()
          : location && this.renderContent(location)}
      </RenderContainer>
    );
  };

  private renderWithoutPortal = (anchor: React.ReactNode, ref: null | Ref<EmptyWrapper>) => {
    const { location } = this.state;

    return (
      <EmptyWrapper ref={ref}>
        {anchor}
        {location && (
          <div ref={this.updateAbsoluteElement} className={this.styles.absoluteParent()}>
            {this.renderContent(location)}
          </div>
        )}
      </EmptyWrapper>
    );
  };

  private updateAnchorElement = (instance: Nullable<React.ReactInstance>) => {
    const childDomNode = isInstanceWithAnchorElement(instance) ? instance.getAnchorElement() : getRootNode(instance);
    const anchorElement = this.anchorElement;

    if (childDomNode !== anchorElement) {
      this.removeEventListeners(anchorElement);
      this.anchorElement = childDomNode;
      this.addEventListeners(childDomNode);
    }
  };

  private updateAbsoluteElement = (instance: HTMLDivElement) => {
    this.absoluteParent = instance;
  };

  private addEventListeners(element: Nullable<Element>) {
    if (element && isInstanceOf(element, this.globalObject.Element)) {
      // @ts-expect-error: Type ElementEventMap is missing events: https://github.com/skbkontur/retail-ui/pull/2946#discussion_r931072657
      element.addEventListener('mouseenter', this.handleMouseEnter);
      // @ts-expect-error: See the comment above
      element.addEventListener('mouseleave', this.handleMouseLeave);
      // @ts-expect-error: See the comment above
      element.addEventListener('click', this.handleClick);
      element.addEventListener('focusin', this.handleFocus as EventListener);
      element.addEventListener('focusout', this.handleBlur as EventListener);

      this.hasAnchorElementListeners = true;
    }
  }

  private removeEventListeners(element: Nullable<Element>) {
    if (element && isInstanceOf(element, this.globalObject.Element)) {
      // @ts-expect-error: Type ElementEventMap is missing events: https://github.com/skbkontur/retail-ui/pull/2946#discussion_r931072657
      element.removeEventListener('mouseenter', this.handleMouseEnter);
      // @ts-expect-error: See the comment above
      element.removeEventListener('mouseleave', this.handleMouseLeave);
      // @ts-expect-error: See the comment above
      element.removeEventListener('click', this.handleClick);
      element.removeEventListener('focusin', this.handleFocus as EventListener);
      element.removeEventListener('focusout', this.handleBlur as EventListener);

      this.hasAnchorElementListeners = false;
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
      const anchorWidth = getDOMRect(this.anchorElement).width;

      return width.replace(/(\d)+%/g, (percent: string) => `${(anchorWidth * parseFloat(percent)) / 100}px`);
    }
    return width;
  };

  private content = (children: React.ReactNode) => {
    const { backgroundColor } = this.props;
    const { width, minWidth } = this.getProps();

    return (
      <div
        className={this.styles.content(this.theme)}
        data-tid={PopupDataTids.content}
        ref={mergeRefs(this.refForTransition, this.refPopupContentElement)}
      >
        <div
          className={this.styles.contentInner(this.theme)}
          style={{ backgroundColor, width: this.calculateWidth(width), minWidth: this.calculateWidth(minWidth) }}
          data-tid={PopupDataTids.contentInner}
        >
          {children}
        </div>
      </div>
    );
  };

  private renderContent(location: PopupLocation) {
    const { maxWidth, opened } = this.props;
    const { hasShadow, disableAnimations, ignoreHover } = this.getProps();
    const children = this.renderChildren();

    const relativeShift = this.getRelativeShift();
    const { direction } = PopupHelper.getPositionObject(location.position);
    const rootStyle: React.CSSProperties = {
      maxWidth,
      top: location.coordinates.top + relativeShift.top,
      left: location.coordinates.left + relativeShift.left,
    };

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
        nodeRef={this.refForTransition}
      >
        {(state: string) => (
          <CommonWrapper {...this.props} rootNodeRef={this.setRootNode} {...this.prepareDataVisualState()}>
            <ZIndex
              id={this.props.id ?? this.rootId}
              data-tid={PopupDataTids.root}
              priority={this.props.priority}
              className={this.cx({
                [this.styles.popup(this.theme)]: true,
                [this.styles.shadow(this.theme)]: hasShadow,
                [this.styles.popupIgnoreHover()]: ignoreHover,
                ...(disableAnimations
                  ? {}
                  : {
                      [this.styles[`transition-enter-${direction}` as keyof typeof this.styles](this.theme)]: true,
                      [this.styles.transitionEnter()]: state === 'entering',
                      [this.styles.transitionEnterActive()]: state === 'entered',
                      [this.styles.transitionExit()]: state === 'exiting',
                    }),
              })}
              style={rootStyle}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
            >
              {this.content(children)}
              {(!this.isMobileLayout || this.props.withoutMobile) && this.renderPin(location.position)}
            </ZIndex>
          </CommonWrapper>
        )}
      </Transition>
    );
  }

  private prepareDataVisualState = () => {
    const position = this.state.location?.position;
    if (position) {
      const attrName = `position-` + position.replace(' ', '-');
      return getVisualStateDataAttributes({ [attrName]: true });
    }
    return {};
  };

  private resetLocation = () => {
    this.cancelDelayedUpdateLocation();
    this.state.location !== null && this.setState({ location: null });
  };

  private renderChildren() {
    return isFunction(this.props.children) ? this.props.children() : this.props.children;
  }

  private refPopupContentElement = (element: HTMLDivElement) => {
    this.lastPopupContentElement = element;
  };

  private renderPin(positionName: string): React.ReactNode {
    const { pinSize, backgroundColor } = this.props;
    const { hasPin } = this.getProps();
    const position = PopupHelper.getPositionObject(positionName);

    return (
      hasPin &&
      !PopupNonPinnablePositions.includes(positionName) && (
        <PopupPin
          popupElement={this.lastPopupContentElement}
          popupPosition={positionName}
          size={pinSize || parseInt(this.theme.popupPinSize)}
          offset={this.getPinOffset(position.align)}
          backgroundColor={backgroundColor || this.theme.popupBackground}
        />
      )
    );
  }

  private handleLayoutEvent = () => {
    if (!this.state.location) {
      return;
    }
    this.updateLocation();
  };

  private delayUpdateLocation() {
    this.cancelDelayedUpdateLocation();
    this.locationUpdateId = this.globalObject.requestAnimationFrame?.(this.updateLocation);
  }

  private cancelDelayedUpdateLocation() {
    if (this.locationUpdateId) {
      this.globalObject.cancelAnimationFrame?.(this.locationUpdateId);
      this.locationUpdateId = null;
    }
  }

  private updateLocation = () => {
    const popupContentElement = this.lastPopupContentElement;

    if (!popupContentElement) {
      return;
    }

    const location = this.getLocation(popupContentElement, this.state.location);
    if (location) {
      this.props.onPositionChange?.(location.position, location.isFullyVisible);
    }

    if (!this.locationEquals(this.state.location, location)) {
      this.setState({ location });
    }
  };

  private locationEquals(x: Nullable<PopupLocation>, y: Nullable<PopupLocation>) {
    if (x === y) {
      return true;
    }

    if (isNullable(x) || isNullable(y)) {
      return false;
    }

    return (
      x.coordinates.left === y.coordinates.left && x.coordinates.top === y.coordinates.top && x.position === y.position
    );
  }

  private getOrderedPositions() {
    const positions = this.props.positions ? this.props.positions : PopupPinnablePositions;
    let pos_ = '';
    if (this.props.pos) {
      pos_ = this.props.pos;
    } else {
      pos_ = positions[0];
    }
    const index = positions.findIndex((position) => position.startsWith(pos_));
    if (index === -1) {
      warning(false, 'Unexpected position ' + pos_ + ' passed to Popup. Expected one of: ' + positions.join(', '));
      return positions;
    }
    return [...positions.slice(index), ...positions.slice(0, index)];
  }

  private getLocation(popupElement: Element, location?: Nullable<PopupLocation>): Nullable<PopupLocation> {
    const { tryBestFallbackPosition } = this.getProps();
    const positions = this.getOrderedPositions();

    const anchorElement = this.anchorElement;

    warning(
      anchorElement && isInstanceOf(anchorElement, this.globalObject.Element),
      'Anchor element is not defined or not instance of Element',
    );

    if (!(anchorElement && isInstanceOf(anchorElement, this.globalObject.Element))) {
      return location;
    }

    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);

    const reusedLocation = this.tryReuseCurrentLocation(location, positions, anchorRect, popupRect);
    if (reusedLocation) {
      return reusedLocation;
    }

    const fullyVisibleLocation = this.tryGetFirstFullyVisibleLocation(positions, anchorRect, popupRect);
    if (fullyVisibleLocation) {
      return fullyVisibleLocation;
    }

    return this.getFallbackLocation(positions, anchorRect, popupRect, Boolean(tryBestFallbackPosition));
  }

  private tryReuseCurrentLocation(
    location: Nullable<PopupLocation> | undefined,
    positions: Readonly<PopupPositionsType[]>,
    anchorRect: Rect,
    popupRect: Rect,
  ): Nullable<PopupLocation> {
    const { tryPreserveFirstRenderedPosition } = this.getProps();

    if (!(location && location !== DUMMY_LOCATION && location.position)) {
      return null;
    }

    const position = location.position;
    const coordinates = this.getCoordinates(anchorRect, popupRect, position);
    const isFullyVisible = PopupHelper.isFullyVisible(coordinates, popupRect, this.globalObject);
    const canBecomeVisible =
      !isFullyVisible && PopupHelper.canBecomeFullyVisible(position, coordinates, this.globalObject);

    const shouldReuseCurrentLocation =
      // если нужно сохранить первоначальную позицию и Попап целиком
      // находится в пределах вьюпорта (или может быть проскроллен в него)
      (tryPreserveFirstRenderedPosition && (isFullyVisible || canBecomeVisible)) ||
      // если Попап целиком во вьюпорте и в самой приоритетной позиции
      // (иначе нужно попытаться позицию сменить)
      (isFullyVisible && position === positions[0]);

    if (!shouldReuseCurrentLocation) {
      return null;
    }

    return { coordinates, position, isFullyVisible: true };
  }

  private tryGetFirstFullyVisibleLocation(
    positions: Readonly<PopupPositionsType[]>,
    anchorRect: Rect,
    popupRect: Rect,
  ): Nullable<PopupLocation> {
    for (const position of positions) {
      const coordinates = this.getCoordinates(anchorRect, popupRect, position);
      if (PopupHelper.isFullyVisible(coordinates, popupRect, this.globalObject)) {
        return { coordinates, position, isFullyVisible: true };
      }
    }

    return null;
  }

  private getFallbackLocation(
    positions: Readonly<PopupPositionsType[]>,
    anchorRect: Rect,
    popupRect: Rect,
    tryBestFallbackPosition: boolean,
  ): PopupLocation {
    const position = tryBestFallbackPosition
      ? this.pickBestFallbackPosition(positions, anchorRect, popupRect)
      : positions[0];
    const coordinates = this.getCoordinates(anchorRect, popupRect, position);

    return {
      coordinates,
      position,
      isFullyVisible: PopupHelper.isFullyVisible(coordinates, popupRect, this.globalObject),
    };
  }

  private pickBestFallbackPosition(
    positions: Readonly<PopupPositionsType[]>,
    anchorRect: Rect,
    popupRect: Rect,
  ): PopupPositionsType {
    const defaultPosition = positions[0];
    const coords = this.getCoordinates(anchorRect, popupRect, defaultPosition);
    const overflow = PopupHelper.getOverflowEdges(coords, popupRect, this.globalObject);
    const preferredDirection = PopupHelper.getPreferredDirection(overflow, defaultPosition);
    const preferredAlignOrder =
      overflow.left || overflow.right ? ['right', 'center', 'left'] : ['center', 'left', 'right'];
    const candidates = PopupHelper.getOrderedFallbackCandidates(
      positions,
      overflow,
      preferredDirection,
      preferredAlignOrder,
      PopupPinnablePositions,
    );
    const positionsSet = new Set(positions);
    const viewport = PopupHelper.getViewportAbsoluteRect(this.globalObject);
    const evaluatedCandidates = candidates.map((position) =>
      this.evaluateFallbackCandidate(position, anchorRect, popupRect, viewport),
    );
    const bestAreaCandidate = this.pickBestAreaCandidate(evaluatedCandidates, positionsSet);
    const bestOverflowCandidate = this.pickBestOverflowCandidate(evaluatedCandidates, positionsSet);

    // Если есть хотя бы одна позиция с ненулевой видимой площадью,
    // выбираем её (с приоритетом полностью видимых вариантов).
    // Иначе — используем старую эвристику по количеству переполненных сторон.
    return bestAreaCandidate && bestAreaCandidate.visibleArea > 0
      ? bestAreaCandidate.position
      : bestOverflowCandidate.position;
  }

  private evaluateFallbackCandidate(
    position: PopupPositionsType,
    anchorRect: Rect,
    popupRect: Rect,
    viewport: Rect,
  ): FallbackCandidateEvaluation {
    const coordinates = this.getCoordinates(anchorRect, popupRect, position);
    const popupAbsolute = {
      top: coordinates.top,
      left: coordinates.left,
      width: popupRect.width,
      height: popupRect.height,
    };
    const overlapWidth =
      Math.min(popupAbsolute.left + popupAbsolute.width, viewport.left + viewport.width) -
      Math.max(popupAbsolute.left, viewport.left);
    const overlapHeight =
      Math.min(popupAbsolute.top + popupAbsolute.height, viewport.top + viewport.height) -
      Math.max(popupAbsolute.top, viewport.top);
    const visibleWidth = Math.max(0, overlapWidth);
    const visibleHeight = Math.max(0, overlapHeight);
    const overflow = PopupHelper.getOverflowEdges(coordinates, popupRect, this.globalObject);
    const isFullyVisible = visibleWidth === popupAbsolute.width && visibleHeight === popupAbsolute.height;
    const isAreaEligible = PopupHelper.getPositionObject(position).direction !== 'left' || isFullyVisible;

    return {
      position,
      coordinates,
      overflowCount: PopupHelper.getOverflowCount(overflow),
      visibleArea: visibleWidth * visibleHeight,
      isFullyVisible,
      isAreaEligible,
    };
  }

  private pickBestAreaCandidate(
    candidates: Readonly<FallbackCandidateEvaluation[]>,
    positionsSet: ReadonlySet<PopupPositionsType>,
  ): Nullable<FallbackCandidateEvaluation> {
    let bestCandidate: Nullable<FallbackCandidateEvaluation> = null;

    for (const candidate of candidates) {
      if (!candidate.isAreaEligible || candidate.visibleArea <= 0) {
        continue;
      }

      const isBetterArea =
        !bestCandidate ||
        // предпочитаем любые полностью видимые позиции
        (candidate.isFullyVisible && !bestCandidate.isFullyVisible) ||
        // среди одинаковых по полноте — большую видимую площадь
        (candidate.isFullyVisible === bestCandidate.isFullyVisible &&
          candidate.visibleArea > bestCandidate.visibleArea) ||
        // при равной площади — ту, что указана в props.positions
        (candidate.visibleArea === bestCandidate.visibleArea &&
          positionsSet.has(candidate.position) &&
          !positionsSet.has(bestCandidate.position));

      if (isBetterArea) {
        bestCandidate = candidate;
      }
    }

    return bestCandidate;
  }

  private pickBestOverflowCandidate(
    candidates: Readonly<FallbackCandidateEvaluation[]>,
    positionsSet: ReadonlySet<PopupPositionsType>,
  ): FallbackCandidateEvaluation {
    let bestCandidate = candidates[0];

    for (const candidate of candidates) {
      const isBetterOverflow =
        candidate.overflowCount < bestCandidate.overflowCount ||
        (candidate.overflowCount === bestCandidate.overflowCount &&
          positionsSet.has(candidate.position) &&
          !positionsSet.has(bestCandidate.position));

      if (isBetterOverflow) {
        bestCandidate = candidate;
      }
    }

    return bestCandidate;
  }

  private getPinnedPopupOffset(anchorRect: Rect, position: PositionObject) {
    if (!this.getProps().hasPin || /center|middle/.test(position.align)) {
      return 0;
    }

    const anchorSize = /top|bottom/.test(position.direction) ? anchorRect.width : anchorRect.height;

    const { pinSize } = this.props;

    return Math.max(
      0,
      this.getPinOffset(position.align) + (pinSize || parseInt(this.theme.popupPinSize)) - anchorSize / 2,
    );
  }

  private getRelativeShift = () => {
    const { absoluteParent } = this;

    if (!this.props.disablePortal || !absoluteParent) {
      return {
        top: 0,
        left: 0,
      };
    }

    const rect = PopupHelper.getElementAbsoluteRect(absoluteParent);

    return {
      top: -rect.top,
      left: -rect.left,
    };
  };

  private getCoordinates(anchorRect: Rect, popupRect: Rect, positionName: string) {
    const { margin: marginFromProps } = this.props;
    const margin =
      isNonNullable(marginFromProps) && !isNaN(marginFromProps)
        ? marginFromProps
        : parseInt(this.theme.popupMargin) || 0;
    const position = PopupHelper.getPositionObject(positionName);
    const popupOffset = this.getProps().popupOffset + this.getPinnedPopupOffset(anchorRect, position);

    const defaultCoordinates = {
      top: anchorRect.top - popupRect.height - margin,
      left: this.getHorizontalPosition(anchorRect, popupRect, position.align, popupOffset),
    };
    switch (position.direction) {
      case 'top':
        return defaultCoordinates;

      case 'middle':
        return {
          top: anchorRect.top + anchorRect.height / 2 - popupRect.height / 2,
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
        warning(
          false,
          `Unexpected align '${position.direction}'. Must be one of - 'top', 'bottom', 'left', 'right', 'center', 'middle'. Returning default value.`,
        );
        return defaultCoordinates;
    }
  }

  private getPinOffset(align: string) {
    const { pinOffset } = this.props;
    const defaultPinOffset = pinOffset || parseInt(this.theme.popupPinOffsetY);

    switch (align) {
      case 'top':
      case 'bottom':
        return defaultPinOffset;
      case 'left':
      case 'right':
        return pinOffset || parseInt(this.theme.popupPinOffsetX);
      case 'center':
      case 'middle':
        return 0;
      default:
        warning(
          false,
          `Unexpected align '${align}'. Must be one of - 'top', 'bottom', 'left', 'right', 'center', 'middle'. Returning default value.`,
        );
        return defaultPinOffset;
    }
  }

  private getHorizontalPosition(anchorRect: Rect, popupRect: Rect, align: string, popupOffset: number) {
    const defaultHorizontalPosition = anchorRect.left - (popupRect.width - anchorRect.width) / 2;

    switch (align) {
      case 'left':
        return anchorRect.left - popupOffset;
      case 'center':
        return defaultHorizontalPosition;
      case 'right':
        return anchorRect.left - (popupRect.width - anchorRect.width) + popupOffset;
      default:
        warning(
          false,
          `Unexpected align '${align}'. Must be one of - 'left', 'center', 'right'. Returning default value.`,
        );
        return defaultHorizontalPosition;
    }
  }

  private getVerticalPosition(anchorRect: Rect, popupRect: Rect, align: string, popupOffset: number) {
    const defaultVerticalPosition = anchorRect.top - popupOffset;

    switch (align) {
      case 'top':
        return defaultVerticalPosition;
      case 'middle':
        return anchorRect.top - (popupRect.height - anchorRect.height) / 2;
      case 'bottom':
        return anchorRect.top - (popupRect.height - anchorRect.height) + popupOffset;
      default:
        warning(
          false,
          `Unexpected align '${align}'. Must be one of - 'top', 'middle', 'bottom'. Returning default value.`,
        );
        return defaultVerticalPosition;
    }
  }
}

// Нужно, чтобы получать по рефу dom-элемент, в который зарендерится anchor
type EmptyWrapperProps = Readonly<{
  children: React.ReactNode;
}>;

class EmptyWrapper extends React.Component<EmptyWrapperProps> {
  public render() {
    return this.props.children;
  }
}
