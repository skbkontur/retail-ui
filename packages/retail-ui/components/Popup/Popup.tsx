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

import styles = require('./Popup.less');

import { isIE, ieVerison } from '../ensureOldIEClassName';
import { Nullable } from '../../typings/utility-types';

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

export interface PopupProps {
  anchorElement: Nullable<HTMLElement>;
  backgroundColor?: React.CSSProperties['backgroundColor'];
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
  positions: string[];
  onCloseRequest?: () => void;
  onMouseEnter?: (x0: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (x0: React.MouseEvent<HTMLElement>) => void;
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

export default class Popup extends React.Component<PopupProps, PopupState> {
  public static propTypes = {
    /**
     * Ссылка (ref) на элемент, для которого рисуется попап
     */
    anchorElement: PropTypes.instanceOf(HTMLElement).isRequired,

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
    backgroundColor: '#fff',
    maxWidth: 500
  };

  public state: PopupState = {
    location: null
  };

  private _layoutEventsToken: Nullable<
    ReturnType<typeof LayoutEvents.addListener>
  >;
  private _lastPopupElement: Nullable<HTMLElement>;

  public componentDidMount() {
    this._updateLocation();
    this._layoutEventsToken = LayoutEvents.addListener(this._handleLayoutEvent);
  }

  public componentWillReceiveProps(nextProps: PopupProps) {
    /**
     * For react < 16 version ReactDOM.unstable_renderSubtreeIntoContainer is
     * used. It causes refs callbacks to call after componentDidUpdate.
     *
     * Delaying _updateLocation to ensure that ref is set
     */
    if (!this.props.opened && nextProps.opened) {
      this._delayUpdateLocation();
    }

    if (this.props.opened && !nextProps.opened) {
      this.resetLocation();
    }
  }

  public componentWillUnmount() {
    if (this._layoutEventsToken) {
      this._layoutEventsToken.remove();
    }
  }

  public render() {
    const location = this.state.location || this._getDummyLocation();

    return (
      <RenderLayer
        onClickOutside={this._handleClickOutside}
        onFocusOutside={this._handleFocusOutside}
        /**
         * If onCloseRequest is not specified _handleClickOutside and _handleFocusOutside
         * are doing nothing. So there is no need in RenderLayer at all.
         */
        active={this.props.onCloseRequest && this.props.opened}
      >
        <RenderContainer>{this._renderContent(location)}</RenderContainer>
      </RenderLayer>
    );
  }

  private _renderContent(location: PopupLocation) {
    const { direction } = PopupHelper.getPositionObject(location.position);

    return (
      <Transition
        timeout={{ enter: 0, exit: 200 }}
        appear
        in={this.props.opened}
        mountOnEnter
        unmountOnExit
      >
        {(state: string) => (
          <ZIndex
            key={this.state.location ? 'real' : 'dummy'}
            delta={1000}
            ref={this._refPopupElement}
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
            style={{
              top: location.coordinates.top,
              left: location.coordinates.left,
              backgroundColor:
                this.props.backgroundColor ||
                Popup.defaultProps.backgroundColor,
              maxWidth: this.props.maxWidth || Popup.defaultProps.maxWidth
            }}
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}
          >
            {this.renderChildren()}
            {this._renderPin(location.position)}
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

  private _refPopupElement = (zIndex: ZIndex | null) => {
    if (zIndex) {
      this._lastPopupElement = zIndex && (findDOMNode(zIndex) as HTMLElement);
    }
  };

  private _renderPin(position: string): React.ReactNode {
    /**
     * Box-shadow does not appear under the pin. Borders are used instead.
     * In non-ie browsers drop-shodow filter is used. It is applying
     * shadow to pin too.
     */
    // prettier-ignore
    const pinBorder
      = ieVerison === 8 ? '#e5e5e5'
      : isIE            ? 'rgba(0, 0, 0, 0.09)'
      :                   'transparent';

    const {
      pinSize = Popup.defaultProps.pinSize,
      pinOffset = Popup.defaultProps.pinOffset,
      hasShadow = Popup.defaultProps.hasShadow,
      backgroundColor = Popup.defaultProps.backgroundColor
    } = this.props;

    return (
      this.props.hasPin && (
        <PopupPin
          popupElement={this._lastPopupElement!}
          popupPosition={position}
          size={pinSize}
          offset={pinOffset}
          borderWidth={hasShadow ? 1 : 0}
          backgroundColor={backgroundColor}
          borderColor={pinBorder}
        />
      )
    );
  }

  private _handleClickOutside = () => {
    this._requestClose();
  };

  private _handleFocusOutside = () => {
    this._requestClose();
  };

  private _handleLayoutEvent = () => {
    if (this.state.location) {
      this._updateLocation();
    }
  };

  private _delayUpdateLocation() {
    raf(() => this._updateLocation());
  }

  private _updateLocation() {
    const popupElement = this._lastPopupElement;

    if (!popupElement) {
      return;
    }

    const location = this._getLocation(popupElement, this.state.location);
    if (!this._locationEquals(this.state.location, location)) {
      this.setState({ location });
    }
  }

  private resetLocation = () => {
    return this.setState({ location: null });
  };

  private _requestClose = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
  };

  private _locationEquals(
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

  private _getDummyLocation() {
    return {
      coordinates: {
        top: -9999,
        left: -9999
      },
      position: 'top left'
    };
  }

  private _getLocation(
    popupElement: HTMLElement,
    location?: PopupLocation | null
  ) {
    const {
      anchorElement,
      positions,
      margin = Popup.defaultProps.margin,
      popupOffset = Popup.defaultProps.popupOffset
    } = this.props;

    if (!anchorElement) {
      throw new Error('Anchor element is not defined');
    }

    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);

    if (location && location.position) {
      // tslint:disable-next-line:no-shadowed-variable
      const position = PopupHelper.getPositionObject(location.position);
      // tslint:disable-next-line:no-shadowed-variable
      const coordinates = this._getCoordinates(
        anchorRect,
        popupRect,
        position,
        margin,
        popupOffset + this._getPinnedPopupOffset(anchorRect, position)
      );
      return { coordinates, position: location.position };
    }

    // tslint:disable-next-line:no-shadowed-variable
    for (const position of positions) {
      const positionObj = PopupHelper.getPositionObject(position);
      // tslint:disable-next-line:no-shadowed-variable
      const coordinates = this._getCoordinates(
        anchorRect,
        popupRect,
        positionObj,
        margin,
        popupOffset + this._getPinnedPopupOffset(anchorRect, positionObj)
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
    const coordinates = this._getCoordinates(
      anchorRect,
      popupRect,
      position,
      margin,
      popupOffset + this._getPinnedPopupOffset(anchorRect, position)
    );
    return { coordinates, position: positions[0] };
  }

  private _getPinnedPopupOffset(anchorRect: Rect, position: PositionObject) {
    if (!this.props.hasPin || /center|middle/.test(position.align)) {
      return 0;
    }

    const anchorSize = /top|bottom/.test(position.direction)
      ? anchorRect.width
      : anchorRect.height;

    const {
      pinOffset = Popup.defaultProps.pinOffset,
      pinSize = Popup.defaultProps.pinSize
    } = this.props;
    return Math.max(0, pinOffset + pinSize - anchorSize / 2);
  }

  private _getCoordinates(
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
          left: this._getHorizontalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          )
        };
      case 'bottom':
        return {
          top: anchorRect.top + anchorRect.height + margin,
          left: this._getHorizontalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          )
        };
      case 'left':
        return {
          top: this._getVerticalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          ),
          left: anchorRect.left - popupRect.width - margin
        };
      case 'right':
        return {
          top: this._getVerticalPosition(
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

  private _getHorizontalPosition(
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

  private _getVerticalPosition(
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
