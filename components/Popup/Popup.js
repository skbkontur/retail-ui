// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RenderLayer from '../RenderLayer';
import RenderConatiner from '../RenderContainer';

import PopupHelper from './PopupHelper';
import PopupPin from './PopupPin';

import styles from './Popup.less';

type Props = {
  anchorElement: HTMLElement;
  backgroundColor: string;
  children: React.Element<any>;
  popupOffset: number;
  pinOffset: number;
  onClickOutside: () => void;
  onFocusOutside: () => void;
  opened: boolean;
  hasPin: boolean;
  positions: string[];
  hasShadow: boolean;
  pinSize: number;
}

type State = {
  location: ?{
    coordinates: {
      top: number,
      left: number
    },
    position: string
  }
}

export default class Popup extends Component {
  props: Props;
  state: State = {
    location: null
  };
  _popupElement: HTMLElement;

  componentDidUpdate() {
    if (!this.props.opened && this.state.location) {
      this.setState({ location: null });
      return;
    }

    if (this._popupElement) {
      let location = this._getLocation(
        this.props.anchorElement,
        this._popupElement,
        this.props.positions,
        20,
        this.props.popupOffset);
      if (!this._locationEquals(location, this.state.location)) {
        this.setState({ location });
      }
    }
  }

  render() {
    if (!this.props.opened) {
      return null;
    }

    let location = this.state.location || this._getDummyLocation();

    let { hasPin, children, onClickOutside, onFocusOutside, pinSize,
      pinOffset, backgroundColor, hasShadow  } = this.props;
    
    let style = {
      top: location.coordinates.top + 'px',
      left: location.coordinates.left + 'px',
      backgroundColor
    };

    let shadowClass= hasShadow ? styles.shadow : '';

    return (
    <RenderLayer
      onClickOutside={onClickOutside}
      onFocusOutside={onFocusOutside}
    >
      <RenderConatiner>
        <div ref={e => this._popupElement = e} className={styles.popup + ' ' + shadowClass} style={style}>
          {children}
          {
            hasPin
             && <PopupPin
                  popupElement={this._popupElement}
                  popupPosition={location.position}
                  size={pinSize}
                  offset={pinOffset}
                  borderWidth={hasShadow ? 1 : 0}
                  backgroundColor={backgroundColor}
                  borderColor={'rgba(0, 0, 0, 0.09)'}
                />
          }
        </div>
      </RenderConatiner>
    </RenderLayer>
    );
  }

  _getDummyLocation() {
    return {
      coordinates : {
        top: -999,
        left: -999
      },
      position: 'top left'
    };
  }

  _locationEquals(location1, location2) {
    if (location1 === location2) {
      return true;
    }
    if (location1 == null || location2 == null){
      return false;
    }
    return location1.position === location2.position
      && location1.coordinates.top === location2.coordinates.top
      && location1.coordinates.left === location2.coordinates.left;
  }
  
  _getLocation(anchorElement, popupElement, positions, margin, popupOffset) {
    let anchorRect = PopupHelper.getElementRect(anchorElement);
    let popupRect = PopupHelper.getElementRect(popupElement);

    for (var i = 0; i < positions.length; ++i){
      let position = PopupHelper.getPositionObject(positions[i]);
      let coordinates = this._getCoordinates(anchorRect, popupRect, position, margin, popupOffset);
      if (this._isRectAvaliable({top: coordinates.top, left: coordinates.left, height: popupRect.height, width: popupRect.width})){
        return { coordinates, position: positions[i] };
      }
    }
    let coordinates = this._getCoordinates(anchorRect, popupRect, PopupHelper.getPositionObject(positions[0]), margin, popupOffset);
    return { coordinates, position: positions[0] };
  }

  _isRectAvaliable(rect){
    return rect.top > 0 && rect.top + rect.height < window.innerHeight
        && rect.left > 0 && rect.left + rect.width < window.innerWidth;
  }

  _getCoordinates(anchorRect, popupRect, position, margin, popupOffset) {
    switch (position.direction) {
      case 'top':
        return {
          top: anchorRect.top - popupRect.height - margin,
          left: this._getHorisontalPosition(anchorRect, popupRect, position.align, popupOffset)
        };
      case 'bottom':
        return {
          top: anchorRect.top + anchorRect.height + margin,
          left: this._getHorisontalPosition(anchorRect, popupRect, position.align, popupOffset)
        };
      case 'left':
        return {
          top: this._getVerticalPosition(anchorRect, popupRect, position.align, popupOffset),
          left: anchorRect.left - popupRect.width - margin
        };
      case 'right':
        return {
          top: this._getVerticalPosition(anchorRect, popupRect, position.align, popupOffset),
          left: anchorRect.left + anchorRect.width + margin
        };
      default:
        throw new Error(`Unxpected direction '${position.direction}'`);
    }
  }

  _getHorisontalPosition(anchorRect, popupRect, align, popupOffset) {
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

  _getVerticalPosition(anchorRect, popupRect, align, popupOffset) {
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
   * смещение попапа относительно родительского элемента
   */
  popupOffset: PropTypes.number,

  /**
   * Смещение пина от края попапа. Край задаётся в пропе position вторым словом
   */
  pinOffset: PropTypes.number,

  /**
   * Колбек для закрытия попапа при клике вне его области
   */
  onClickOutside: PropTypes.func,

  /**
   * Колбек для закрытия попапа при потери им фокуса
   */
  onFocusOutside: PropTypes.func,

  /**
   * Показан или скрыт попап
   */
  opened: PropTypes.bool,

  /**
   * Показывать ли пин
   */
  hasPin: PropTypes.bool,

  /**
   * С какой стороны показывать попап и край попапа, на котором будет отображаться пин
   */
  positions: PropTypes.array,

  /**
   * Применять ли box-shadow на попапе. При false отключает границу на пине
   */
  hasShadow: PropTypes.bool,

  /**
   * Сторона пина без учёта границы.
   * Пин представляет собой равносторонний треугольник, высота от попапа
   * до "носика" пина будет соответствовать формуле (size* √3)/2
   */
  pinSize: PropTypes.number
};
