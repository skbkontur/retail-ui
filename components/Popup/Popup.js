// @flow
/* eslint-disable flowtype/no-weak-types */
import cn from 'classnames';
import * as React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import RenderContainer from '../RenderContainer';
import RenderLayer from '../RenderLayer';
import ZIndex from '../ZIndex';
import Transition from 'react-addons-css-transition-group';

import PopupHelper from './PopupHelper';
import PopupPin from './PopupPin';
import LayoutEvents from '../../lib/LayoutEvents';

import styles from './Popup.less';

import { isIE, ieVerison } from '../ensureOldIEClassName';

type Props = {
  anchorElement: ?HTMLElement,
  backgroundColor: string,
  children: React.Node,
  hasPin: boolean,
  hasShadow: boolean,
  margin: number,
  opened: boolean,
  pinOffset: number,
  pinSize: number,
  popupOffset: number,
  positions: string[],
  onCloseRequest?: () => void
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
    backgroundColor: '#fff'
  };

  state: State = {
    location: null
  };

  _layoutEventsToken;
  _popupElement: ?HTMLElement;

  componentDidMount() {
    this._updateLocation();
    this._layoutEventsToken = LayoutEvents.addListener(this._handleLayoutEvent);
  }

  componentDidUpdate() {
    this._updateLocation();
  }

  componentWillUnmount() {
    this._layoutEventsToken.remove();
  }

  _handleLayoutEvent = () => {
    if (this.state.location) {
      this._updateLocation();
    }
  };

  _updateLocation() {
    if (!this.props.opened) {
      if (this.state.location) {
        this.setState({ location: null });
      }
      return;
    }

    const popupElement = this._popupElement;
    if (!popupElement) {
      throw new Error('Popup node is not mounted');
    }

    const location = this._getLocation(popupElement);
    if (!this._locationEquals(this.state.location, location)) {
      this.setState({ location });
    }
  }

  render() {
    if (!this.props.opened) {
      return null;
    }

    if (!this.state.location) {
      return this._renderContent();
    }

    const { direction } = PopupHelper.getPositionObject(
      this.state.location.position
    );

    return (
      <RenderLayer
        onClickOutside={this._handleClickOutside}
        onFocusOutside={this._handleFocusOutside}
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
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {this._renderContent()}
          </Transition>
        </RenderContainer>
      </RenderLayer>
    );
  }

  _renderContent() {
    const location = this.state.location || this._getDummyLocation();

    const style = {
      top: location.coordinates.top,
      left: location.coordinates.left,
      backgroundColor: this.props.backgroundColor
    };

    return (
      <ZIndex
        delta={1000}
        ref={e => (this._popupElement = e && (findDOMNode(e): any))}
        className={cn(styles.popup, this.props.hasShadow && styles.shadow)}
        style={style}
      >
        {this.props.children}
        {this._renderPin(location.position)}
      </ZIndex>
    );
  }

  _renderPin(position) {
    const {
      hasPin,
      pinSize,
      pinOffset,
      backgroundColor,
      hasShadow
    } = this.props;

    // prettier-ignore
    const pinBorder
      = ieVerison === 8 ? '#e5e5e5'
      : isIE ? 'rgba(0, 0, 0, 0.09)'
        : 'transparent';

    return (
      hasPin && (
        <PopupPin
          popupElement={this._popupElement}
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

  _handleClickOutside = () => {
    this._requestClose();
  };

  _handleFocusOutside = () => {
    this._requestClose();
  };

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
    const { direction, align } = position;
    const { pinOffset, pinSize, hasPin } = this.props;

    const anchorSize = /top|bottom/.test(direction)
      ? anchorRect.width
      : anchorRect.height;

    const isAnchorLessThanPinOffset = anchorSize < (pinOffset + pinSize) * 2;

    if (!hasPin) {
      return 0;
    }

    if (!isAnchorLessThanPinOffset || /center|middle/.test(align)) {
      return 0;
    }

    return pinOffset + pinSize - anchorSize / 2;
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
  anchorElement: PropTypes.any,

  /**
   * Фон попапа и пина
   */
  backgroundColor: PropTypes.string,

  children: PropTypes.node,

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
