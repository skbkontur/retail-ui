// @flow
import cn from 'classnames';
import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import RenderLayer from '../RenderLayer';
import RenderConatiner from '../RenderContainer';
import Transition from 'react-addons-css-transition-group';
import shallowEqual from 'fbjs/lib/shallowEqual';

import PopupHelper from './PopupHelper';
import PopupPin from './PopupPin';

import styles from './Popup.less';

import { isIE, ieVerison } from '../ensureOldIEClassName';

const noop = () => {};

let tempNode = null;
function getTempNode() {
  if (!tempNode) {
    tempNode = document.createElement('div');
    tempNode.style.opacity = '0';
    tempNode.style.position = 'absolute';
    document.body && document.body.appendChild(tempNode);
  }
  return tempNode;
}

type Props = {
  anchorElement: HTMLElement,
  backgroundColor: string,
  children: React.Element<*>,
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

export default class Popup extends Component {
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

  props: Props;

  state: State = {
    location: null
  };

  _popupElement: HTMLElement;
  _inQueue: boolean = false;
  _containerDidMount: boolean = false;
  _tempNode: ?HTMLElement;

  componentDidUpdate(prevProps: Props) {
    if (this.props.opened !== prevProps.opened) {
      this._preRender();
    }
  }

  _preRender() {
    const tempNode = getTempNode();
    render(this._renderContent(this._getDummyLocation()), tempNode, () => {
      this._calculateLocation(tempNode);
    });
  }

  _calculateLocation(node) {
    if (!this.props.opened && this.state.location) {
      this.setState({ location: null });
    }
    const location = this._getLocation(node);
    if (
      !this.state.location ||
      !location ||
      !location.position !== this.state.location.position ||
      !shallowEqual(location.coordinates, this.state.location.coordinates)
    ) {
      this.setState({ location });
    }
  }

  render() {
    const { onClickOutside, onFocusOutside, opened } = this.props;
    if (!opened && !this._containerDidMount) {
      return null;
    }
    const { location } = this.state;
    const directionClass = location
      ? location.position.split(' ')[0]
      : 'bottom';
    return (
      <RenderLayer
        onClickOutside={opened ? onClickOutside : noop}
        onFocusOutside={opened ? onFocusOutside : noop}
      >
        <RenderConatiner ref={this._refContainer}>
          <Transition
            transitionName={{
              enter: styles['transition-enter-' + directionClass],
              enterActive: styles['transition-enter-active'],
              leave: styles['transition-leave'],
              leaveActive: styles['transition-leave-active'],
              appear: styles['transition-appear-' + directionClass],
              appearActive: styles['transition-appear-active']
            }}
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnterTimeout={200}
            transitionLeaveTimeout={200}
          >
            {location ? this._renderContent(location) : null}
          </Transition>
        </RenderConatiner>
      </RenderLayer>
    );
  }

  _renderContent(location) {
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

    const pinBorder =
      ieVerison === 8
        ? '#e5e5e5'
        : isIE ? 'rgba(0, 0, 0, 0.09)' : 'transparent';

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

  _getLocation(node) {
    if (!this.props.opened) {
      return null;
    }

    const { anchorElement, positions, margin, popupOffset } = this.props;
    const anchorRect = PopupHelper.getElementRect(anchorElement);
    const popupRect = PopupHelper.getElementRect(this._popupElement);

    for (var i = 0; i < positions.length; ++i) {
      const position = PopupHelper.getPositionObject(positions[i]);
      const coordinates = this._getCoordinates(
        anchorRect,
        popupRect,
        position,
        margin,
        popupOffset
      );
      if (
        this._isRectAvaliable({
          top: coordinates.top,
          left: coordinates.left,
          height: popupRect.height,
          width: popupRect.width
        })
      ) {
        return { coordinates, position: positions[i] };
      }
    }
    const coordinates = this._getCoordinates(
      anchorRect,
      popupRect,
      PopupHelper.getPositionObject(positions[0]),
      margin,
      popupOffset
    );
    return { coordinates, position: positions[0] };
  }

  _isRectAvaliable(rect) {
    return (
      rect.top > 0 &&
      rect.top + rect.height < window.innerHeight &&
      rect.left > 0 &&
      rect.left + rect.width < window.innerWidth
    );
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
