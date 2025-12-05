import React from 'react';
import warning from 'warning';

import type { Nullable } from '../../typings/utility-types';
import { cx } from '../../lib/theming/Emotion';

import type { PositionObject, Rect } from './PopupHelper';
import { PopupHelper } from './PopupHelper';
import { styles } from './PopupPin.styles';
import { PopupDataTids } from './Popup';

interface PopupPinProps {
  /** Цвет фона пина */
  backgroundColor: string;

  /** Смещение пина от края попапа. Край задаётся в пропе position вторым словом */
  offset: number;

  /** Ссылка на попап */
  popupElement?: Nullable<Element>;

  /** Позиция попапа, по которой будет вычислено положение пина */
  popupPosition: string;

  /**
   * Сторона пина без учёта границы.
   * Пин представляет собой равносторонний треугольник, высота от попапа
   * до "носика" пина будет соответствовать формуле (size* √3)/2
   */
  size: number;
}

export class PopupPin extends React.Component<PopupPinProps> {
  public static __KONTUR_REACT_UI__ = 'PopupPin';
  public static displayName = 'PopupPin';

  private positionObject!: PositionObject;

  public render() {
    if (!this.props.popupElement) {
      return null;
    }

    this.positionObject = PopupHelper.getPositionObject(this.props.popupPosition);

    const coords = this.getPinCoordinates(this.props.popupElement);
    if (!coords || !coords.left || !coords.top) {
      return null;
    }

    const inlineStyle = this.getPinInlineStyle(coords.left, coords.top);
    const directionalStyle = this.getPinDirectionalStyle();
    if (!inlineStyle || !directionalStyle) {
      return null;
    }

    return (
      <div data-tid={PopupDataTids.popupPin} className={cx(styles.pin(), directionalStyle)} style={inlineStyle}></div>
    );
  }

  private getPopupOppositeDirection() {
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
          `Can't get opposite direction: invalid direction ${popupDirection}. Must be one of - 'top', 'bottom', 'left', 'right'.`,
        );
        return 'bottom';
    }
  }

  private getPinInlineStyle = (left: number, top: number) => {
    const direction = this.getPopupOppositeDirection();
    if (!direction) {
      return;
    }

    // Добавляем запас в 1px, чтобы пофиксить случайные отделения пинов
    const correctedLeft = left - 1;
    const correctedTop = top - 1;
    const correctedSize = this.props.size + 1;

    const defaultPinInlineStyle = {
      [direction]: -this.props.size + 'px',
      left: correctedLeft + 'px',
      width: correctedSize * 2 + 'px',
      height: correctedSize + 'px',
      backgroundColor: this.props.backgroundColor,
    };

    switch (direction) {
      case 'top':
      case 'bottom':
        return defaultPinInlineStyle;
      case 'left':
      case 'right':
        return {
          [direction]: -this.props.size + 'px',
          top: correctedTop + 'px',
          height: correctedSize * 2 + 'px',
          width: correctedSize + 'px',
          backgroundColor: this.props.backgroundColor,
        };
      default:
        warning(
          false,
          `Can't get inline style: invalid direction '${direction}'. Must be one of - 'top', 'right', 'bottom', 'left'.`,
        );
        return defaultPinInlineStyle;
    }
  };

  private getPinCoordinates = (popupElement: Element) => {
    const popupRect = PopupHelper.getElementAbsoluteRect(popupElement);
    const { direction, align } = this.positionObject;

    const defaultPinCoordinates = {
      top: popupRect.height,
      left: this.getPinLeftCoordinate(popupRect, align),
    };

    switch (direction) {
      case 'top':
        return defaultPinCoordinates;
      case 'bottom':
        return {
          top: -2 * this.props.size,
          left: this.getPinLeftCoordinate(popupRect, align),
        };
      case 'left':
        return {
          top: this.getPinTopCoordinate(popupRect, align),
          left: popupRect.width,
        };
      case 'right':
        return {
          top: this.getPinTopCoordinate(popupRect, align),
          left: -2 * this.props.size,
        };
      default:
        warning(
          false,
          `Can't get coordinates: invalid direction '${direction}'. Must be one of - 'top', 'right', 'bottom', 'left'.`,
        );
        return defaultPinCoordinates;
    }
  };

  private getPinTopCoordinate = (popupRect: Rect, align: string) => {
    const defaultTopCoordinate = this.props.offset;
    switch (align) {
      case 'top':
        return defaultTopCoordinate;
      case 'middle':
        return popupRect.height / 2 - this.props.size;
      case 'bottom':
        return popupRect.height - this.props.offset - 2 * this.props.size;
      default:
        warning(
          false,
          `Can't get top coordinate: invalid align '${align}'. Must be one of - 'top', 'middle', 'bottom'.`,
        );
        return defaultTopCoordinate;
    }
  };

  private getPinLeftCoordinate = (popupRect: Rect, align: string) => {
    const defaultLetfCoordinate = popupRect.width / 2 - this.props.size;
    switch (align) {
      case 'left':
        return this.props.offset;
      case 'center':
        return defaultLetfCoordinate;
      case 'right':
        return popupRect.width - this.props.offset - 2 * this.props.size;
      default:
        warning(
          false,
          `Can't get left coordinate: invalid align '${align}'. Must be one of - 'left', 'center', 'right'.`,
        );
        return defaultLetfCoordinate;
    }
  };

  private getPinDirectionalStyle = () => {
    switch (this.positionObject.direction) {
      case 'top':
        return styles.pinTop();
      case 'bottom':
        return styles.pinBottom();
      case 'left':
        return styles.pinLeft();
      case 'right':
        return styles.pinRight();
      default:
        warning(
          false,
          `Can't get directional style: invalid direction '${this.positionObject.direction}'. Must be one of - 'top', 'right', 'bottom', 'left'.`,
        );
        return styles.pinTop();
    }
  };
}
