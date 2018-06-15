
/* eslint-disable flowtype/no-weak-types */
import cn from 'classnames';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import RenderContainer from '../RenderContainer';
import RenderLayer from '../RenderLayer';
import ZIndex from '../ZIndex';
import Transition from 'react-addons-css-transition-group';
import raf from 'raf';

import PopupHelper from './PopupHelper';
import PopupPin from './PopupPin';
import LayoutEvents from '../../lib/LayoutEvents';

import styles from './Popup.less';

import { isIE, ieVerison } from '../ensureOldIEClassName';

type Props = {
  anchorElement: ?HTMLElement,
  backgroundColor: string,
  children: React.Node | (() => React.Node),
  hasPin: boolean,
  hasShadow: boolean,
  disableAnimations?: boolean,
  margin: number,
  maxWidth: number | string,
  opened: boolean,
  pinOffset: number,
  pinSize: number,
  popupOffset: number,
  positions: string[],
  onCloseRequest?: () => void,
  onMouseEnter?: (SyntheticMouseEvent<HTMLElement>) => void,
  onMouseLeave?: (SyntheticMouseEvent<HTMLElement>) => void
};

type Location = {
  coordinates: {
    left: number,
    top: number
  },
  position: string
};

type State = {
  location: ?Location
};

export default class Popup extends React.Component<Props, State> {
  static defaultProps = {
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

  state: State = {
    location: null
  };

  _layoutEventsToken;
  _lastPopupElement: ?HTMLElement;

  componentDidMount() {
    this._updateLocation();
    this._layoutEventsToken = LayoutEvents.addListener(this._handleLayoutEvent);
  }

  componentDidUpdate() {
    /**
     * For react < 16 version ReactDOM.unstable_renderSubtreeIntoContainer is
     * used. It causes refs callbacks to call after componentDidUpdate.
     *
     * Delaying _updateLocation to ensure that ref is set
     */
    this._delayUpdateLocation();
  }

  componentWillUnmount() {
    this._layoutEventsToken.remove();
  }

  render() {
    const location = this.state.location || this._getDummyLocation();

    const { direction } = PopupHelper.getPositionObject(location.position);
    const { disableAnimations } = this.props;

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
        <RenderContainer>
          <Transition
            transitionName={{
              enter: styles['transition-enter-' + direction],
              enterActive: styles['transition-enter-active'],
              leave: styles['transition-leave'],
              leaveActive: styles['transition-leave-active'],
              appear: styles['transition-appear-' + direction],
              appearActive: styles['transition-appear-active']
            }}
            transitionAppear={!disableAnimations}
            transitionEnter={!disableAnimations}
            transitionLeave={!disableAnimations}
            transitionAppearTimeout={200}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {this._renderContent(location)}
          </Transition>
        </RenderContainer>
      </RenderLayer>
    );
  }

  _renderContent(location: Location) {
    if (!this.props.opened) {
      return null;
    }

    const children =
      typeof this.props.children === 'function'
        ? this.props.children()
        : this.props.children;

    if (children == null) {
      return null;
    }

    return (
      <ZIndex
        key={this.state.location ? 'real' : 'dummy'}
        delta={1000}
        ref={this._refPopupElement}
        className={cn(styles.popup, this.props.hasShadow && styles.shadow)}
        style={{
          top: location.coordinates.top,
          left: location.coordinates.left,
          backgroundColor: this.props.backgroundColor,
          maxWidth: this.props.maxWidth
        }}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {children}
        {this._renderPin(location.position)}
      </ZIndex>
    );
  }

  _refPopupElement = zIndex => {
    if (zIndex) {
      this._lastPopupElement = zIndex && (findDOMNode(zIndex): any);
    }
  };

  _renderPin(position) {
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

    return (
      this.props.hasPin && (
        <PopupPin
          popupElement={this._lastPopupElement}
          popupPosition={position}
          size={this.props.pinSize}
          offset={this.props.pinOffset}
          borderWidth={this.props.hasShadow ? 1 : 0}
          backgroundColor={this.props.backgroundColor}
          borderColor={pinBorder}
        />
      )
    );
  }

  _handleClickOutside = () => {
    this._requestClose();
  };

  _handleFocusOutside = () => {
    this._requestClose();
  };

  _handleLayoutEvent = () => {
    if (this.state.location) {
      this._updateLocation();
    }
  };

  _delayUpdateLocation() {
    raf(() => this._updateLocation());
  }

  _updateLocation() {
    if (!this.props.opened) {
      if (this.state.location) {
        this.setState({ location: null });
      }
      return;
    }

    const popupElement = this._lastPopupElement;
    if (!popupElement) {
      return;
    }

    const location = this._getLocation(popupElement);
    if (!this._locationEquals(this.state.location, location)) {
      this.setState({ location });
    }
  }

  _requestClose = () => {
    if (this.props.onCloseRequest) {
      this.props.onCloseRequest();
    }
  };

  _locationEquals(x: ?Location, y: ?Location) {
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

  _getDummyLocation() {
    return {
      coordinates: {
        top: -9999,
        left: -9999
      },
      position: 'top left'
    };
  }

  _getLocation(popupElement: HTMLElement) {
    const { anchorElement, positions, margin, popupOffset } = this.props;

    if (!anchorElement) {
      throw new Error('Anchor element is not defined');
    }

    const anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);

    for (let i = 0; i < positions.length; ++i) {
      const position = PopupHelper.getPositionObject(positions[i]);
      const coordinates = this._getCoordinates(
        anchorRect,
        popupRect,
        position,
        margin,
        popupOffset + this._getPinnedPopupOffset(anchorRect, position)
      );
      if (
        PopupHelper.isAbsoluteRectFullyVisible({
          top: coordinates.top,
          left: coordinates.left,
          height: popupRect.height,
          width: popupRect.width
        })
      ) {
        return { coordinates, position: positions[i] };
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

  _getPinnedPopupOffset(anchorRect, position) {
    if (!this.props.hasPin || /center|middle/.test(position.align)) {
      return 0;
    }

    const anchorSize = /top|bottom/.test(position.direction)
      ? anchorRect.width
      : anchorRect.height;

    const { pinOffset, pinSize } = this.props;
    return Math.max(0, pinOffset + pinSize - anchorSize / 2);
  }

  _getCoordinates(anchorRect, popupRect, position, margin, popupOffset) {
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

  _getHorizontalPosition(anchorRect, popupRect, align, popupOffset) {
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

  _getVerticalPosition(anchorRect, popupRect, align, popupOffset) {
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

Popup.propTypes = {
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
