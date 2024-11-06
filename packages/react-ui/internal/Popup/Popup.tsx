import React, { HTMLAttributes, LegacyRef } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import warning from 'warning';
import { globalObject } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { getDOMRect } from '../../lib/dom/getDOMRect';
import { Nullable } from '../../typings/utility-types';
import * as LayoutEvents from '../../lib/LayoutEvents';
import { Priority, ZIndex } from '../ZIndex';
import { RenderContainer } from '../RenderContainer';
import { FocusEventType, MouseEventType } from '../../typings/event-types';
import { getRandomID, isFunction, isNonNullable, isNullable, isRefableElement, mergeRefs } from '../../lib/utils';
import { isEdge, isIE11 } from '../../lib/client';
import { Theme } from '../../lib/theming/Theme';
import { safePropTypesInstanceOf } from '../../lib/SSRSafe';
import { isTestEnv } from '../../lib/currentEnvironment';
import { CommonProps, CommonWrapper } from '../CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { responsiveLayout } from '../../components/ResponsiveLayout/decorator';
import { MobilePopup } from '../MobilePopup';
import { getRootNode, rootNode, TSetRootNode } from '../../lib/rootNode';
import { callChildRef } from '../../lib/callChildRef/callChildRef';
import { isInstanceWithAnchorElement } from '../../lib/InstanceWithAnchorElement';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isInstanceOf } from '../../lib/isInstanceOf';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import {
  getFullReactUIFlagsContext,
  ReactUIFeatureFlags,
  ReactUIFeatureFlagsContext,
} from '../../lib/featureFlagsContext';

import { PopupPin } from './PopupPin';
import { Offset, PopupHelper, PositionObject, Rect } from './PopupHelper';
import { getStyles } from './Popup.styles';

const POPUP_BORDER_DEFAULT_COLOR = 'transparent';
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
  extends Omit<CommonProps, 'children'>,
    PopupHandlerProps,
    Pick<HTMLAttributes<HTMLDivElement>, 'id'> {
  anchorElement: React.ReactNode | Element;
  backgroundColor?: React.CSSProperties['backgroundColor'];
  borderColor?: React.CSSProperties['borderColor'];
  children: React.ReactNode | (() => React.ReactNode);
  hasPin?: boolean;
  hasShadow?: boolean;
  disableAnimations?: boolean;
  margin?: number;
  maxWidth?: number | string;
  opened: boolean;
  pinOffset?: number;
  pinSize?: number;
  popupOffset?: number;
  priority?: Priority;
  positions?: Readonly<PopupPositionsType[]>;
  pos?: PopupPositionsType | ShortPopupPositionsType;
  /**
   * Явно указывает, что вложенные элементы должны быть обёрнуты в `<span/>`. <br/> Используется для корректного позиционирования тултипа при двух и более вложенных элементах.
   *
   * _Примечание_: при **двух и более** вложенных элементах обёртка будет добавлена автоматически.
   */
  useWrapper?: boolean;
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
  withoutMobile?: boolean;
  /** @ignore */
  disablePortal?: boolean;
  mobileOnCloseRequest?: () => void;
  /**
   * Возвращает текущую позицию попапа
   */
  onPositionChange?: (pos: PopupPositionsType) => void;
}

interface PopupLocation {
  coordinates: {
    left: number;
    top: number;
  };
  position: PopupPositionsType;
}

export interface PopupState {
  location: Nullable<PopupLocation>;
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

@responsiveLayout
@rootNode
export class Popup extends React.Component<PopupProps, PopupState> {
  public static __KONTUR_REACT_UI__ = 'Popup';
  public static displayName = 'Popup';

  public static propTypes = {
    /**
     * Ссылка (ref) на элемент или React компонент, для которого рисуется попап
     */
    anchorElement: PropTypes.oneOfType([safePropTypesInstanceOf(globalObject.HTMLElement), PropTypes.node]).isRequired,

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
     * Приоритетная позиция попапа
     */
    pos: PropTypes.string,

    /**
     * Отключает использование портала
     */
    disablePortal: PropTypes.bool,

    /**
     * Игнорировать ли события hover/click
     */
    ignoreHover: PropTypes.bool,
  };

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
  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  public featureFlags!: ReactUIFeatureFlags;
  private layoutEventsToken: Nullable<ReturnType<typeof LayoutEvents.addListener>>;
  private locationUpdateId: Nullable<number> = null;
  private lastPopupContentElement: Nullable<Element>;
  private isMobileLayout!: boolean;
  private setRootNode!: TSetRootNode;
  private refForTransition = React.createRef<HTMLDivElement>();
  private hasAnchorElementListeners = false;
  private rootId = PopupIds.root + getRandomID();

  public anchorElement: Nullable<Element> = null;
  private absoluteParent: Nullable<HTMLDivElement> = null;

  public componentDidMount() {
    this.updateLocation();
    this.layoutEventsToken = LayoutEvents.addListener(this.handleLayoutEvent);

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
    return (
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullReactUIFlagsContext(flags);
          return (
            <EmotionConsumer>
              {(emotion) => {
                this.emotion = emotion;
                this.styles = getStyles(this.emotion);
                return (
                  <ThemeContext.Consumer>
                    {(theme) => {
                      this.theme = theme;
                      return this.renderMain();
                    }}
                  </ThemeContext.Consumer>
                );
              }}
            </EmotionConsumer>
          );
        }}
      </ReactUIFeatureFlagsContext.Consumer>
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
    if (isInstanceOf(anchorElement, globalObject.Element)) {
      this.updateAnchorElement(anchorElement);
    } else if (React.isValidElement(anchorElement)) {
      anchor = useWrapper ? <span>{anchorElement}</span> : anchorElement;
    } else {
      anchor = <span>{anchorElement}</span>;
    }

    const anchorWithRef =
      anchor && React.isValidElement(anchor) && isRefableElement(anchor)
        ? React.cloneElement(anchor, {
            ref: (instance: Nullable<React.ReactInstance>) => {
              this.updateAnchorElement(instance);
              const originalRef = (anchor as React.RefAttributes<any>)?.ref as React.RefCallback<any>;
              originalRef && callChildRef(originalRef, instance);
            },
          } as { ref: (instance: Nullable<React.ReactInstance>) => void })
        : null;

    // we need to get anchor's DOM node
    // so we either set our own ref on it via cloning
    // or relay on findDOMNode (inside getRootNode)
    // which should be called within updateAnchorElement
    // in the case when the anchor is not refable

    const canGetAnchorNode = !!anchorWithRef || isInstanceOf(anchorElement, globalObject.Element);
    const renderRef = canGetAnchorNode ? null : this.updateAnchorElement;
    const renderAnchor = anchorWithRef || anchor;

    return this.props.disablePortal
      ? this.renderWithoutPortal(renderAnchor, renderRef)
      : this.renderInPortal(renderAnchor, renderRef);
  }

  private renderInPortal = (anchor: React.ReactNode, ref: null | LegacyRef<RenderContainer>) => {
    const { location } = this.state;

    return (
      <RenderContainer anchor={anchor} ref={ref}>
        {this.isMobileLayout && !this.props.withoutMobile
          ? this.renderMobile()
          : location && this.renderContent(location)}
      </RenderContainer>
    );
  };

  private renderWithoutPortal = (anchor: React.ReactNode, ref: null | LegacyRef<EmptyWrapper>) => {
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
    if (element && isInstanceOf(element, globalObject.Element)) {
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
    if (element && isInstanceOf(element, globalObject.Element)) {
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
        ref={mergeRefs([this.refForTransition, this.refPopupContentElement])}
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
    const styles = this.styles;

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
          <CommonWrapper {...this.props} rootNodeRef={this.setRootNode}>
            <ZIndex
              id={this.props.id ?? this.rootId}
              data-tid={PopupDataTids.root}
              priority={this.props.priority}
              className={this.emotion.cx({
                [styles.popup(this.theme)]: true,
                [styles.shadow(this.theme)]: hasShadow,
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
              {this.content(children)}
              {(!this.isMobileLayout || this.props.withoutMobile) && this.renderPin(location.position)}
            </ZIndex>
          </CommonWrapper>
        )}
      </Transition>
    );
  }

  private resetLocation = () => {
    this.cancelDelayedUpdateLocation();
    this.state.location !== null && this.setState({ location: null });
  };

  private renderChildren() {
    return isFunction(this.props.children) ? this.props.children() : this.props.children;
  }

  private refPopupContentElement = (element: Nullable<Element>) => {
    this.lastPopupContentElement = element;
  };

  private renderPin(positionName: string): React.ReactNode {
    const isDefaultBorderColor = this.theme.popupBorderColor === POPUP_BORDER_DEFAULT_COLOR;
    const pinBorder = isIE11 && isDefaultBorderColor ? 'rgba(0, 0, 0, 0.09)' : this.theme.popupBorderColor;

    const { pinSize, backgroundColor, borderColor } = this.props;
    const { hasShadow, hasPin } = this.getProps();
    const position = PopupHelper.getPositionObject(positionName);

    return (
      hasPin &&
      !PopupNonPinnablePositions.includes(positionName) && (
        <PopupPin
          popupElement={this.lastPopupContentElement}
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
    this.updateLocation();
  };

  private delayUpdateLocation() {
    this.cancelDelayedUpdateLocation();
    this.locationUpdateId = globalObject.requestAnimationFrame?.(this.updateLocation);
  }

  private cancelDelayedUpdateLocation() {
    if (this.locationUpdateId) {
      globalObject.cancelAnimationFrame?.(this.locationUpdateId);
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
      this.props.onPositionChange?.(location?.position);
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

    if (!isIE11 && !isEdge) {
      return (
        x.coordinates.left === y.coordinates.left &&
        x.coordinates.top === y.coordinates.top &&
        x.position === y.position
      );
    }

    // Для ie/edge обновляем позицию только при разнице минимум в 1. Иначе есть вероятность
    // уйти в бесконечный ререндер

    return (
      x.position === y.position &&
      Math.abs(x.coordinates.top - y.coordinates.top) <= 1 &&
      Math.abs(x.coordinates.left - y.coordinates.left) <= 1
    );
  }

  private reorderPropsPositionsWithPriorityPos() {
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

  private getRelativePos(root: unknown): { top: number; left: number } {
    const isShadowRoot = Boolean((root as ShadowRoot)?.host?.shadowRoot);
    const relativePos: { top: number; left: number } = {
      top: 0,
      left: 0,
    };
    if (isShadowRoot && globalObject.document) {
      const childPos = PopupHelper.convertRectToAbsolute((root as ShadowRoot).host.getBoundingClientRect());
      relativePos.top = childPos.top;
      relativePos.left = childPos.left;
    }
    return relativePos;
  }

  private getLocation(popupElement: Element, location?: Nullable<PopupLocation>) {
    const { tryPreserveFirstRenderedPosition } = this.getProps();
    const positions = this.reorderPropsPositionsWithPriorityPos();

    const anchorElement = this.anchorElement;

    warning(
      anchorElement && isInstanceOf(anchorElement, globalObject.Element),
      'Anchor element is not defined or not instance of Element',
    );

    if (!(anchorElement && isInstanceOf(anchorElement, globalObject.Element))) {
      return location;
    }

    const deltaParentPosition = this.getRelativePos(this.emotion.sheet.container.getRootNode());
    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement, deltaParentPosition);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement, deltaParentPosition);

    let position: PopupPositionsType;
    let coordinates: Offset;

    if (location && location !== DUMMY_LOCATION && location.position) {
      position = location.position;
      coordinates = this.getCoordinates(anchorRect, popupRect, position);

      const isFullyVisible = PopupHelper.isFullyVisible(coordinates, popupRect);
      const canBecomeVisible = !isFullyVisible && PopupHelper.canBecomeFullyVisible(position, coordinates);

      if (
        // если нужно сохранить первоначальную позицию и Попап целиком
        // находится в пределах вьюпорта (или может быть проскроллен в него)
        (tryPreserveFirstRenderedPosition && (isFullyVisible || canBecomeVisible)) ||
        // если Попап целиком во вьюпорте и в самой приоритетной позиции
        // (иначе нужно попытаться позицию сменить)
        (isFullyVisible && position === positions[0])
      ) {
        // сохраняем текущую позицию
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
    const deltaParentPosition = this.getRelativePos(this.emotion.sheet.container.getRootNode());

    return {
      top: -(rect.top - deltaParentPosition.top),
      left: -(rect.left - deltaParentPosition.left),
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

    switch (position.direction) {
      case 'top':
        return {
          top: anchorRect.top - popupRect.height - margin,
          left: this.getHorizontalPosition(anchorRect, popupRect, position.align, popupOffset),
        };
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
        throw new Error(`Unexpected direction '${position.direction}'`);
    }
  }

  private getPinOffset(align: string) {
    const { pinOffset } = this.props;

    switch (align) {
      case 'top':
      case 'bottom':
        return pinOffset || parseInt(this.theme.popupPinOffsetY);
      case 'left':
      case 'right':
        return pinOffset || parseInt(this.theme.popupPinOffsetX);
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

// Нужно, чтобы получать по рефу dom-элемент, в который зарендерится anchor
type EmptyWrapperProps = Readonly<{
  children: React.ReactNode;
}>;

class EmptyWrapper extends React.Component<EmptyWrapperProps> {
  public render() {
    return this.props.children;
  }
}
