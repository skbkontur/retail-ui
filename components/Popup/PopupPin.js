// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupHelper from './PopupHelper';

type Props = {
  backgroundColor: string,
  borderColor: string,
  borderWidth: number,
  offset: number,
  popupElement: ?HTMLElement,
  popupPosition: string,
  size: number
};

export default class PopupPin extends Component<Props> {
  render() {
    if (!this.props.popupElement) {
      return null;
    }

    let options = this._getPinOptions(
      PopupHelper.getElementAbsoluteRect(this.props.popupElement),
      PopupHelper.getPositionObject(this.props.popupPosition),
      this.props.size,
      this.props.offset,
      this.props.borderWidth
    );

    let styleOuter = this._getOuterStyle(
      options.activeBorder,
      options.outerSize,
      this.props.borderColor
    );

    let styleInner = this._getInnerStyle(
      options.activeBorder,
      this.props.size,
      this.props.backgroundColor
    );

    let styleWrapper = this._getWrapperStyle(
      options.outerLeft,
      options.outerSize,
    )

    return (
      <div style={styleWrapper}> 
        <div style={styleOuter}>
          <div style={styleInner} />
        </div>
      </div>
    );
  }

  _getPopupOppositeDirection() {
    let popupDirection = PopupHelper.getPositionObject(this.props.popupPosition).direction;
    switch(popupDirection) {
      case 'top':
        return 'bottom'
      case 'bottom':
        return 'top'
      default:
        throw new TypeError('Unknown direction ' + popupDirection)
    }
  }

  _getWrapperStyle(size, borderWitdth) {
    let direction = this._getPopupOppositeDirection();
    return {
      position: 'absolute',
      [direction]: -borderWitdth + 'px',
      left: size + 'px',
      width: borderWitdth * 2 + 'px',
      height: borderWitdth + 'px',
      overflow: 'hidden'
    }
  }

  _getOuterStyle(activeBorder, borderWitdth, borderColor) {
    let direction = this._getPopupOppositeDirection();
    return {
      position: 'absolute',
      [direction]: -borderWitdth + 'px',
      left: '0px',
      borderWidth: borderWitdth + 'px',
      borderStyle: 'solid',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      ['border' + activeBorder + 'Color']: borderColor
    }
  }

  _getInnerStyle(activeBorder, borderWitdth, borderColor) {
    let direction = this._getPopupOppositeDirection();
    return {
      position: 'absolute',
      [direction]: -borderWitdth + 2 + 'px',
      left: -borderWitdth + 'px',
      borderWidth: borderWitdth + 'px',
      borderStyle: 'solid',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      ['border' + activeBorder + 'Color']: borderColor
    }
  }

  _getPinOptions(popupRect, popupPosition, pinSize, pinOffset, borderWidth) {
    let bordersDelta = 2 * borderWidth;
    let outerSize = pinSize + bordersDelta;

    switch (popupPosition.direction) {
      case 'top':
        return {
          outerTop: popupRect.height,
          outerLeft:
            this._getPinLeftCoordinate(
              popupRect,
              popupPosition.align,
              pinSize,
              pinOffset
            ) - bordersDelta,
          innerTop: -outerSize,
          innerLeft: -outerSize + bordersDelta,
          activeBorder: 'Top',
          outerSize
        };
      case 'bottom':
        return {
          outerTop: -2 * outerSize,
          outerLeft:
            this._getPinLeftCoordinate(
              popupRect,
              popupPosition.align,
              pinSize,
              pinOffset
            ) - bordersDelta,
          innerTop: -outerSize + 2 * bordersDelta,
          innerLeft: -outerSize + bordersDelta,
          activeBorder: 'Bottom',
          outerSize
        };
      case 'left':
        return {
          outerTop:
            this._getPinTopCoordinate(
              popupRect,
              popupPosition.align,
              pinSize,
              pinOffset
            ) - bordersDelta,
          outerLeft: popupRect.width,
          innerTop: -outerSize + bordersDelta,
          innerLeft: -outerSize,
          activeBorder: 'Left',
          outerSize
        };
      case 'right':
        return {
          outerTop:
            this._getPinTopCoordinate(
              popupRect,
              popupPosition.align,
              pinSize,
              pinOffset
            ) - bordersDelta,
          outerLeft: -2 * outerSize,
          innerTop: -outerSize + bordersDelta,
          innerLeft: -outerSize + 2 * bordersDelta,
          activeBorder: 'Right',
          outerSize
        };
      default:
        throw new Error('Direction must be one of top, right, bottom, left');
    }
  }

  _getPinTopCoordinate(popupRect, align, pinHeight, pinOffset) {
    switch (align) {
      case 'top':
        return pinOffset;
      case 'middle':
        return popupRect.height / 2 - pinHeight;
      case 'bottom':
        return popupRect.height - pinOffset - 2 * pinHeight;
      default:
        throw new Error(`Unxpected align '${align}'`);
    }
  }

  _getPinLeftCoordinate(popupRect, align, pinHeight, pinOffset) {
    switch (align) {
      case 'left':
        return pinOffset;
      case 'center':
        return popupRect.width / 2 - pinHeight;
      case 'right':
        return popupRect.width - pinOffset - 2 * pinHeight;
      default:
        throw new Error(`Unxpected align '${align}'`);
    }
  }
}

PopupPin.propTypes = {
  /**
   * Цвет фон пина
   */
  backgroundColor: PropTypes.string,

  /**
   * Цвет границы пина
   */
  borderColor: PropTypes.string,

  /**
   * Ширина границы пина
   */
  borderWidth: PropTypes.number,

  /**
   * Смещение пина от края попапа. Край задаётся в пропе position вторым словом
   */
  offset: PropTypes.number,

  /**
   * Ссылка на попап
   */
  popupElement: PropTypes.any,

  /**
   * Позиция поапа, по которой будет вычеслено положение пина
   */
  popupPosition: PropTypes.string,

  /**
   * Сторона пина без учёта границы.
   * Пин представляет собой равносторонний треугольник, высота от попапа
   * до "носика" пина будет соответствовать формуле (size* √3)/2
   */
  size: PropTypes.number
};
