// @flow
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import RenderLayer from '../RenderLayer';

import Box from './Box';
import RenderContainer from '../RenderContainer';

type Pos =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left top'
  | 'left middle'
  | 'left bottom'
  | 'right top'
  | 'right middle'
  | 'right bottom';

type Props = {
  children?: React.Element<*> | string,

  className?: string,

  closeButton?: boolean,

  render: () => ?React.Node,

  pos: Pos,

  trigger: 'hover' | 'click' | 'focus' | 'opened' | 'closed',

  onCloseClick?: () => void
};

type State = {
  opened: boolean
};

/**
 * **Оптимизация перерисовки**

 * По-умолчанию, DOM-элемент тултипа добавляется в конец документа и имеет
 * `position: absolute`. Однако, если тултип показывается на элементе с
 * `position: fixed`, то тултип будет дергаться при прокрутке страницы. Но если
 * в реактовском контексте задать `insideFixedContainer: true`, то у тултипа
 * будет `fixed`-позиционирование, и он не будет дергаться. Пример:
 *
 * ```
 * class Container extends React.Component {
 *   static childContextTypes = {
 *     insideFixedContainer: React.PropTypes.bool,
 *   };
 *
 *   getChildContext() { return {insideFixedContainer: true}; }
 *
 *   render() {
 *     return (
 *       <div style={{position: 'fixed'}}>
 *         tooltips here or down the tree
 *       </div>
 *     );
 *   }
 * }
 * ```
 */
export default class Tooltip extends React.Component<Props, State> {
  static propTypes = {
    /**
     * Показывать крестик для закрытия тултипа. По-умолчанию крестик
     * показывается если проп *trigger* не `hover` и не `focus`.
     */
    closeButton: PropTypes.bool,

    pos: PropTypes.oneOf([
      'top left',
      'top center',
      'top right',
      'bottom left',
      'bottom center',
      'bottom right',
      'left top',
      'left middle',
      'left bottom',
      'right top',
      'right middle',
      'right bottom'
    ]),

    /**
     * Функция, которая возвращает содержимое тултипа.
     *
     * Если эта функция вернула `null`, то тултип не показывается.
     */
    render: PropTypes.func.isRequired,

    trigger: PropTypes.oneOf(['hover', 'click', 'focus', 'opened', 'closed']),

    onCloseClick: PropTypes.func
  };

  static defaultProps = {
    pos: 'top left',
    trigger: 'hover'
  };

  _hotspotDOM: ?HTMLElement;
  _boxDOM: ?HTMLElement;
  _lastOnFocus: ((event: SyntheticFocusEvent<>) => void) | null;
  _lastOnBlur: ((event: SyntheticEvent<>) => void) | null;

  _childRef: ((el: ?React.Element<any>) => void) | string | null = null;
  _cachedRef: ?(el: any, childRef: any) => void;

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      opened: props.trigger === 'opened'
    };

    this._hotspotDOM = null;
    this._boxDOM = null;
    this._lastOnFocus = null;
    this._lastOnBlur = null;
  }

  render() {
    const props = {};
    const { className } = this.props;

    if (this.props.trigger === 'hover') {
      props.onMouseOver = this._handleMouseOver;
      props.onMouseLeave = this._handleMouseLeave;
    } else if (this.props.trigger === 'click') {
      props.onClick = this._handleClick;
    }

    const childProps: Object = {};
    if (this.props.trigger === 'focus') {
      childProps.onFocus = this._handleFocus;
      childProps.onBlur = this._handleBlur;
    }

    let child = this.props.children;
    this._lastOnFocus = null;
    this._lastOnBlur = null;
    if (typeof child === 'string') {
      child = (
        <span ref={this._getHotspotRef(null)} {...childProps}>
          {child}
        </span>
      );
    } else {
      const onlyChild = React.Children.only(child);
      childProps.ref = this._getHotspotRef(onlyChild.ref);
      if (onlyChild.props) {
        this._lastOnFocus = onlyChild.props.onFocus;
        this._lastOnBlur = onlyChild.props.onBlur;
      }
      child = React.cloneElement(onlyChild, childProps);
    }

    return (
      <RenderLayer
        onClickOutside={this._handleBoxClose}
        onFocusOutside={this._handleBoxClose}
      >
        <span {...props} className={className}>
          {child}
          {this._renderBox()}
        </span>
      </RenderLayer>
    );
  }

  _renderBox() {
    if (!this.state.opened) {
      return null;
    }

    const content = this.props.render();

    if (content == null) {
      return null;
    }

    return (
      <RenderContainer>
        <Box
          trigger={this.props.trigger}
          getTarget={this._getTarget}
          pos={this.props.pos}
          close={this._isClosed()}
          onClose={this._handleBoxClose}
        >
          {content}
        </Box>
      </RenderContainer>
    );
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.trigger !== this.props.trigger) {
      if (newProps.trigger === 'opened') {
        this.setState({ opened: true });
      } else if (newProps.trigger === 'closed') {
        this.setState({ opened: false });
      }
    }
  }

  _refHotspot(childRef: any, el: any) {
    if (typeof childRef === 'function') {
      childRef(el);
    }
    this._hotspotDOM = el && (ReactDOM.findDOMNode(el): any);
  }

  _getHotspotRef(childRef: any) {
    if (!this._cachedRef || this._childRef !== childRef) {
      this._childRef = childRef;
      this._cachedRef = this._refHotspot.bind(this, childRef);
    }
    return this._cachedRef;
  }

  _getTarget = () => {
    return this._hotspotDOM;
  };

  _handleMouseOver = (event: SyntheticMouseEvent<>) => {
    const target: HTMLElement = (event.target: any);
    if (this._hotspotDOM) {
      const opened = this._hotspotDOM.contains(target);
      if (this.state.opened !== opened) {
        this._setOpened(opened);
      }
    }
  };

  _handleMouseLeave = () => {
    this._setOpened(false);
  };

  _handleClick = (event: SyntheticMouseEvent<>) => {
    event.stopPropagation();
    const target: HTMLElement = (event.target: any);
    if (this._hotspotDOM) {
      if (!this.state.opened && this._hotspotDOM.contains(target)) {
        this._setOpened(true);
      }
    }
  };

  _handleBoxClose = () => {
    if (this.props.trigger !== 'opened') {
      this._setOpened(false);
    }

    if (this.props.onCloseClick) {
      this.props.onCloseClick.call(null);
    }
  };

  _handleFocus = (event: SyntheticFocusEvent<>) => {
    this._setOpened(true);

    const onFocus = this._lastOnFocus;
    if (onFocus) {
      onFocus(event);
    }
  };

  _handleBlur = (event: SyntheticFocusEvent<>) => {
    this._setOpened(false);

    const onBlur = this._lastOnBlur;
    if (onBlur) {
      onBlur(event);
    }
  };

  _setOpened(opened: boolean) {
    if (this.state.opened !== opened) {
      this.setState({ opened });
    }
  }

  _isClosed = () => {
    const trigger = this.props.trigger;
    if (this.props.closeButton !== undefined) {
      return this.props.closeButton;
    }

    return trigger !== 'hover' && trigger !== 'focus';
  };
}
