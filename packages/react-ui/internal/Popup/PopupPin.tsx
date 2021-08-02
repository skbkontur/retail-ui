import React from 'react';
import PropTypes from 'prop-types';

import { Nullable } from '../../typings/utility-types';

import { PopupHelper, PositionObject, Rect } from './PopupHelper';
import { styles } from './PopupPin.styles';

const borderStyles = {
  position: 'absolute',
  borderStyle: 'solid',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
};

interface Props {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  offset: number;
  popupElement: Nullable<HTMLElement>;
  popupPosition: string;
  size: number;
}

export class PopupPin extends React.Component<Props> {
  public static __KONTUR_REACT_UI__ = 'PopupPin';

  public static propTypes = {
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
    size: PropTypes.number,
  };

  public render() {
    if (!this.props.popupElement) {
      return null;
    }

    const options = this.getPinOptions(
      PopupHelper.getElementAbsoluteRect(this.props.popupElement),
      PopupHelper.getPositionObject(this.props.popupPosition),
      this.props.size,
      this.props.offset,
      this.props.borderWidth,
    );

    const styleOuter: React.CSSProperties = this.getOuterStyle(
      options.activeBorder,
      options.outerSize,
      this.props.borderColor,
    );

    const styleInner: React.CSSProperties = this.getInnerStyle(
      options.activeBorder,
      this.props.size,
      this.props.backgroundColor,
    );

    const styleWrapper = this.getWrapperStyle(options.outerLeft, options.outerTop, options.outerSize);

    return (
      <div className={styles.wrapper()} style={styleWrapper}>
        <div style={styleOuter}>
          <div style={styleInner} />
        </div>
      </div>
    );
  }

  private getPopupOppositeDirection(): 'bottom' | 'top' | 'left' | 'right' {
    const popupDirection = PopupHelper.getPositionObject(this.props.popupPosition).direction;
    switch (popupDirection) {
      case 'top':
        return 'bottom';
      case 'bottom':
        return 'top';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        throw new TypeError('Unknown direction ' + popupDirection);
    }
  }

  private getWrapperStyle(left: number, top: number, borderWidth: number) {
    const direction = this.getPopupOppositeDirection();
    switch (direction) {
      case 'top':
      case 'bottom':
        return {
          [direction]: -borderWidth + 'px',
          left: left + 'px',
          width: borderWidth * 2 + 'px',
          height: borderWidth + 'px',
        };
      case 'left':
      case 'right':
        return {
          [direction]: -borderWidth + 'px',
          top: top + 'px',
          height: borderWidth * 2 + 'px',
          width: borderWidth + 'px',
        };
      default:
        throw new TypeError('Unknown direction ' + direction);
    }
  }

  private getOuterStyle(activeBorder: string, borderWitdth: number, borderColor: string): React.CSSProperties {
    const direction = this.getPopupOppositeDirection();
    switch (direction) {
      case 'top':
      case 'bottom':
        return {
          ...borderStyles,
          [direction]: -borderWitdth + 'px',
          left: '0px',
          borderWidth: borderWitdth + 'px',
          ['border' + activeBorder + 'Color']: borderColor,
        } as React.CSSProperties;
      case 'left':
      case 'right':
        return {
          ...borderStyles,
          [direction]: -borderWitdth + 'px',
          top: '0px',
          borderWidth: borderWitdth + 'px',
          ['border' + activeBorder + 'Color']: borderColor,
        } as React.CSSProperties;
      default:
        throw new TypeError('Unknown direction ' + direction);
    }
  }

  private getInnerStyle(activeBorder: string, borderWitdth: number, borderColor: string): React.CSSProperties {
    const direction = this.getPopupOppositeDirection();
    switch (direction) {
      case 'top':
      case 'bottom':
        return {
          ...borderStyles,
          [direction]: -borderWitdth + 2 + 'px',
          left: -borderWitdth + 'px',
          borderWidth: borderWitdth + 'px',
          ['border' + activeBorder + 'Color']: borderColor,
        } as React.CSSProperties;
      case 'left':
      case 'right':
        return {
          ...borderStyles,
          [direction]: -borderWitdth + 2 + 'px',
          top: -borderWitdth + 'px',
          borderWidth: borderWitdth + 'px',
          ['border' + activeBorder + 'Color']: borderColor,
        } as React.CSSProperties;
      default:
        throw new TypeError('Unknown direction ' + direction);
    }
  }

  private getPinOptions(
    popupRect: Rect,
    popupPosition: PositionObject,
    pinSize: number,
    pinOffset: number,
    borderWidth: number,
  ) {
    const bordersDelta = 2 * borderWidth;
    const outerSize = pinSize + bordersDelta;

    switch (popupPosition.direction) {
      case 'top':
        return {
          outerTop: popupRect.height,
          outerLeft: this.getPinLeftCoordinate(popupRect, popupPosition.align, pinSize, pinOffset) - bordersDelta,
          innerTop: -outerSize,
          innerLeft: -outerSize + bordersDelta,
          activeBorder: 'Top',
          outerSize,
        };
      case 'bottom':
        return {
          outerTop: -2 * outerSize,
          outerLeft: this.getPinLeftCoordinate(popupRect, popupPosition.align, pinSize, pinOffset) - bordersDelta,
          innerTop: -outerSize + 2 * bordersDelta,
          innerLeft: -outerSize + bordersDelta,
          activeBorder: 'Bottom',
          outerSize,
        };
      case 'left':
        return {
          outerTop: this.getPinTopCoordinate(popupRect, popupPosition.align, pinSize, pinOffset) - bordersDelta,
          outerLeft: popupRect.width,
          innerTop: -outerSize + bordersDelta,
          innerLeft: -outerSize,
          activeBorder: 'Left',
          outerSize,
        };
      case 'right':
        return {
          outerTop: this.getPinTopCoordinate(popupRect, popupPosition.align, pinSize, pinOffset) - bordersDelta,
          outerLeft: -2 * outerSize,
          innerTop: -outerSize + bordersDelta,
          innerLeft: -outerSize + 2 * bordersDelta,
          activeBorder: 'Right',
          outerSize,
        };
      default:
        throw new Error('Direction must be one of top, right, bottom, left');
    }
  }

  private getPinTopCoordinate(popupRect: Rect, align: string, pinHeight: number, pinOffset: number) {
    switch (align) {
      case 'top':
        return pinOffset;
      case 'middle':
        return popupRect.height / 2 - pinHeight;
      case 'bottom':
        return popupRect.height - pinOffset - 2 * pinHeight;
      default:
        throw new Error(`Unexpected align '${align}'`);
    }
  }

  private getPinLeftCoordinate(popupRect: Rect, align: string, pinHeight: number, pinOffset: number) {
    switch (align) {
      case 'left':
        return pinOffset;
      case 'center':
        return popupRect.width / 2 - pinHeight;
      case 'right':
        return popupRect.width - pinOffset - 2 * pinHeight;
      default:
        throw new Error(`Unexpected align '${align}'`);
    }
  }
}
