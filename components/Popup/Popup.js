// @flow
import cn from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import RenderLayer from '../RenderLayer';
import RenderConatiner from '../RenderContainer';
import Transition from 'react-addons-css-transition-group';

import PopupHelper from './PopupHelper';
import PopupPin from './PopupPin';

import styles from './Popup.less';

import { isIE, ieVerison } from '../ensureOldIEClassName';

const noop = () => {};

type Props = {
  anchorElement: HTMLElement,
  backgroundColor: string,
  children: React.Node,
  hasPin: boolean,
  hasShadow: boolean,
  margin: number,
  onClickOutside: () => void,
  onFocusOutside: () => void,
  opened: boolean,
  pinOffset: number,
  pinSize: number,
  popupOffset: number,
  positions: string[]
};

type State = {
  location: ?{
    coordinates: {
      left: number,
      top: number
    },
    position: string
  }
};

export default class Popup extends React.Component<Props, State> {
  static defaultProps = {
    margin: 10,
    popupOffset: 0,
    pinSize: 8,
    pinOffset: 16,
    hasPin: false,
    hasShadow: false,
    backgroundColor: '#fff',
    onClickOutside: () => {},
    onFocusOutside: () => {}
  };

  state: State = {
    location: null
  };

  _popupElement: ?HTMLElement;
  _inQueue: boolean = false;
  _containerDidMount: boolean = false;

  render() {
    const { onClickOutside, onFocusOutside, opened } = this.props;
    if (!opened && !this._containerDidMount) {
      return null;
    }
    return (
      <RenderLayer
        onClickOutside={opened ? onClickOutside : noop}
        onFocusOutside={opened ? onFocusOutside : noop}
      >
        <RenderConatiner ref={this._refContainer}>
          <Transition
            transitionName="shift-fade-in-out"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {this._renderContent()}
          </Transition>
        </RenderConatiner>
      </RenderLayer>
    );
  }

  _renderContent() {
    if (!this.props.opened) {
      return null;
    }

    let location = this._getLocation() || this._getDummyLocation();

    let {
      hasPin,
      children,
      pinSize,
      pinOffset,
      backgroundColor,
      hasShadow
    } = this.props;

    const style = {
      top: location.coordinates.top,
      left: location.coordinates.left,
      backgroundColor
    };

    // prettier-ignore
    const pinBorder
      = ieVerison === 8 ? '#e5e5e5'
        : isIE ? 'rgba(0, 0, 0, 0.09)'
          : 'transparent';

    return (
      <div
        ref={e => (this._popupElement = e)}
        className={cn(styles.popup, hasShadow && styles.shadow)}
        style={style}
      >
        {children}
        {hasPin &&
          <PopupPin
            popupElement={this._popupElement}
            popupPosition={location.position}
            size={pinSize}
            offset={pinOffset}
            borderWidth={hasShadow ? 1 : 0}
            backgroundColor={backgroundColor}
            borderColor={pinBorder}
          />}
      </div>
    );
  }

  _refContainer = () => {
    this._containerDidMount = true;
  };

  _getDummyLocation() {
    return {
      coordinates: {
        top: -999,
        left: -999
      },
      position: 'top left'
    };
  }

  _batchUpdate = () => {
    if (this._inQueue) {
      return;
    }
    this._inQueue = true;
    setTimeout(() => {
      this.forceUpdate(() => {
        this._inQueue = false;
      });
    }, 0);
  };

  _getLocation() {
    const { _popupElement } = this;
    if (!_popupElement) {
      this._batchUpdate();
      return null;
    }

    const { anchorElement, positions, margin, popupOffset } = this.props;
    let anchorRect = PopupHelper.getElementAbsoluteRect(anchorElement);
    let popupRect = PopupHelper.getElementAbsoluteRect(_popupElement);

    for (var i = 0; i < positions.length; ++i) {
      let position = PopupHelper.getPositionObject(positions[i]);
      let coordinates = this._getCoordinates(
        anchorRect,
        popupRect,
        position,
        margin,
        popupOffset
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
    let coordinates = this._getCoordinates(
      anchorRect,
      popupRect,
      PopupHelper.getPositionObject(positions[0]),
      margin,
      popupOffset
    );
    return { coordinates, position: positions[0] };
  }

  _getCoordinates(anchorRect, popupRect, position, margin, popupOffset) {
    switch (position.direction) {
      case 'top':
        return {
          top: anchorRect.top - popupRect.height - margin,
          left: this._getHorisontalPosition(
            anchorRect,
            popupRect,
            position.align,
            popupOffset
          )
        };
      case 'bottom':
        return {
          top: anchorRect.top + anchorRect.height + margin,
          left: this._getHorisontalPosition(
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

  _getHorisontalPosition(anchorRect, popupRect, align, popupOffset) {
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
  positions: PropTypes.array,

  /**
   * Колбек для закрытия попапа при клике вне его области
   */
  onClickOutside: PropTypes.func,

  /**
   * Колбек для закрытия попапа при потери им фокуса
   */
  onFocusOutside: PropTypes.func
};
