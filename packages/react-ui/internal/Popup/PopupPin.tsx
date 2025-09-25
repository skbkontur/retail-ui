import React from 'react';
import warning from 'warning';

import type { Nullable } from '../../typings/utility-types';

import type { PositionObject, Rect } from './PopupHelper';
import { PopupHelper } from './PopupHelper';
import { styles } from './PopupPin.styles';
import { PopupDataTids } from './Popup';

const borderStyles = {
  position: 'absolute',
  borderStyle: 'solid',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
};

interface Props {
  /**
   * Цвет фон пина
   */
  backgroundColor: string;
  /**
   * Цвет границы пина
   */
  borderColor: string;
  /**
   * Ширина границы пина
   */
  borderWidth: number;
  /**
   * Смещение пина от края попапа. Край задаётся в пропе position вторым словом
   */
  offset: number;
  /**
   * Ссылка на попап
   */
  popupElement: Nullable<Element>;
  /**
   * Позиция попапа, по которой будет вычислено положение пина
   */
  popupPosition: string;
  /**
   * Сторона пина без учёта границы.
   * Пин представляет собой равносторонний треугольник, высота от попапа
   * до "носика" пина будет соответствовать формуле (size* √3)/2
   */
  size: number;
}

export class PopupPin extends React.Component<Props> {
  public static __KONTUR_REACT_UI__ = 'PopupPin';
  public static displayName = 'PopupPin';

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
      <div data-tid={PopupDataTids.popupPin} className={styles.wrapper()} style={styleWrapper}>
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
        warning(
          false,
          `Unknown direction ${popupDirection}. Must be one of - 'top', 'bottom', 'left', 'right'. Returning default value.`,
        );
        return 'bottom';
    }
  }

  private getWrapperStyle(left: number, top: number, borderWidth: number) {
    const direction = this.getPopupOppositeDirection();

    const defaultWrapperStyle = {
      [direction]: -borderWidth + 'px',
      left: left + 'px',
      width: borderWidth * 2 + 'px',
      height: borderWidth + 'px',
    };

    switch (direction) {
      case 'top':
      case 'bottom':
        return defaultWrapperStyle;
      case 'left':
      case 'right':
        return {
          [direction]: -borderWidth + 'px',
          top: top + 'px',
          height: borderWidth * 2 + 'px',
          width: borderWidth + 'px',
        };
      default:
        warning(
          false,
          `Unexpected direction '${direction}'. Must be one of - 'top', 'right', 'bottom', 'left'. Returning default value.`,
        );
        return defaultWrapperStyle;
    }
  }

  private getOuterStyle(activeBorder: string, borderWitdth: number, borderColor: string): React.CSSProperties {
    const direction = this.getPopupOppositeDirection();

    const defaultOuterStyle = {
      ...borderStyles,
      [direction]: -borderWitdth + 'px',
      left: '0px',
      borderWidth: borderWitdth + 'px',
      ['border' + activeBorder + 'Color']: borderColor,
    } as React.CSSProperties;

    switch (direction) {
      case 'top':
      case 'bottom':
        return defaultOuterStyle;
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
        warning(
          false,
          `Unexpected direction '${direction}'. Must be one of - 'top', 'right', 'bottom', 'left'. Returning default value.`,
        );
        return defaultOuterStyle;
    }
  }

  private getInnerStyle(activeBorder: string, borderWitdth: number, borderColor: string): React.CSSProperties {
    const direction = this.getPopupOppositeDirection();

    const defaultInnerStyle = {
      ...borderStyles,
      [direction]: -borderWitdth + 2 + 'px',
      left: -borderWitdth + 'px',
      borderWidth: borderWitdth + 'px',
      ['border' + activeBorder + 'Color']: borderColor,
    } as React.CSSProperties;

    switch (direction) {
      case 'top':
      case 'bottom':
        return defaultInnerStyle;
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
        warning(
          false,
          `Unexpected direction '${direction}'. Must be one of - 'top', 'right', 'bottom', 'left'. Returning default value.`,
        );
        return defaultInnerStyle;
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

    const defaultOptions = {
      outerTop: popupRect.height,
      outerLeft: this.getPinLeftCoordinate(popupRect, popupPosition.align, pinSize, pinOffset) - bordersDelta,
      innerTop: -outerSize,
      innerLeft: -outerSize + bordersDelta,
      activeBorder: 'Top',
      outerSize,
    };

    switch (popupPosition.direction) {
      case 'top':
        return defaultOptions;
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
        warning(
          false,
          `Unexpected align '${popupPosition.direction}'. Must be one of - 'top', 'right', 'bottom', 'left'. Returning default value.`,
        );
        return defaultOptions;
    }
  }

  private getPinTopCoordinate(popupRect: Rect, align: string, pinHeight: number, pinOffset: number) {
    const defaultTopCoordinate = pinOffset;
    switch (align) {
      case 'top':
        return defaultTopCoordinate;
      case 'middle':
        return popupRect.height / 2 - pinHeight;
      case 'bottom':
        return popupRect.height - pinOffset - 2 * pinHeight;
      default:
        warning(
          false,
          `Unexpected align '${align}'. Must be one of - 'top', 'middle', 'bottom'. Returning default value.`,
        );
        return defaultTopCoordinate;
    }
  }

  private getPinLeftCoordinate(popupRect: Rect, align: string, pinHeight: number, pinOffset: number) {
    const defaultLetfCoordinate = popupRect.width / 2 - pinHeight;
    switch (align) {
      case 'left':
        return pinOffset;
      case 'center':
        return defaultLetfCoordinate;
      case 'right':
        return popupRect.width - pinOffset - 2 * pinHeight;
      default:
        warning(
          false,
          `Unexpected align '${align}'. Must be one of - 'left', 'center', 'right'. Returning default value.`,
        );
        return defaultLetfCoordinate;
    }
  }
}
