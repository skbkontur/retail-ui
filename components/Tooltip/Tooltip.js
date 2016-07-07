// @flow

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Box from './Box';
import RenderContainer from '../RenderContainer';

type Pos = 'top left' | 'top center' | 'top right'
  | 'bottom left' | 'bottom center' | 'bottom right'
  | 'left top' | 'left middle' | 'left bottom'
  | 'right top' | 'right middle' | 'right bottom';

type Props = {
  children: React.Element<any>,

  render: () => ?React.Element<any>,

  pos: Pos,

  trigger: 'hover' | 'click' | 'focus' | 'opened' | 'closed',

  onCloseClick?: () => void,
};

type State = {
  opened: bool,
};

export default class Tooltip extends React.Component {
  static propTypes = {
    pos: PropTypes.oneOf([
      'top left', 'top center', 'top right',
      'bottom left', 'bottom center', 'bottom right',
      'left top', 'left middle', 'left bottom',
      'right top', 'right middle', 'right bottom',
    ]),

    /**
     * Функция, которая возвращает содержимое тултипа.
     *
     * Если эта функция вернула `null`, то тултип не показывается.
     */
    render: PropTypes.func,

    trigger: PropTypes.oneOf(['hover', 'click', 'focus', 'opened', 'closed']),

    onCloseClick: PropTypes.func,
  };

  static defaultProps = {
    pos: 'top left',
    trigger: 'hover',
  };

  static contextTypes = {
    rt_inModal: PropTypes.bool,
  };

  props: Props;
  state: State;

  _hotspotDOM: ?HTMLElement;
  _boxDOM: ?HTMLElement;
  _lastRef: ((el: ?React.Element<any>) => void) | string | null;
  _lastOnFocus: ((event: any) => void) | null;
  _lastOnBlur: ((event: any) => void) | null;

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      opened: props.trigger === 'opened',
    };

    this._hotspotDOM = null;
    this._boxDOM = null;
    this._lastRef = null;
    this._lastOnFocus = null;
    this._lastOnBlur = null;
  }

  render() {
    const props = {};
    if (this.props.trigger === 'hover') {
      props.onMouseOver = this._handleMouseOver;
      props.onMouseLeave = this._handleMouseLeave;
    } else if (this.props.trigger === 'click') {
      props.onClick = this._handleClick;
    }

    const childProps: Object = {
      ref: this._refHotspot,
    };
    if (this.props.trigger === 'focus') {
      childProps.onFocus = this._handleFocus;
      childProps.onBlur = this._handleBlur;
    }

    let child = this.props.children;
    this._lastRef = null;
    this._lastOnFocus = null;
    this._lastOnBlur = null;
    if (typeof child === 'string') {
      child = <span {...childProps}>{child}</span>;
    } else {
      const onlyChild = React.Children.only(child);
      this._lastRef = onlyChild.ref;
      if (onlyChild.props) {
        this._lastOnFocus = onlyChild.props.onFocus;
        this._lastOnBlur = onlyChild.props.onBlur;
      }
      child = React.cloneElement(onlyChild, childProps);
    }

    return (
      <span {...props}>
        {child}
        {this._renderBox()}
      </span>
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

    const close = this.props.trigger !== 'hover';

    return (
      <RenderContainer>
        <Box trigger={this.props.trigger} getTarget={this._getTarget}
          pos={this.props.pos} close={close}
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
        this.setState({opened: true});
      } else if (newProps.trigger === 'closed') {
        this.setState({opened: false});
      }
    }
  }

  _refHotspot = (el: any) => {
    if (typeof this._lastRef === 'function') {
      // React calls refs without context.
      const ref = this._lastRef;
      ref(el);
    }
    this._hotspotDOM = el && ReactDOM.findDOMNode(el);
  };

  _getTarget = () => {
    return this._hotspotDOM;
  };

  _handleMouseOver = (event: SyntheticMouseEvent) => {
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

  _handleClick = (event: SyntheticMouseEvent) => {
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

  _handleFocus = (event: SyntheticFocusEvent) => {
    this._setOpened(true);

    const onFocus = this._lastOnFocus;
    if (onFocus) {
      onFocus(event);
    }
  };

  _handleBlur = (event: SyntheticFocusEvent) => {
    this._setOpened(false);

    const onBlur = this._lastOnBlur;
    if (onBlur) {
      onBlur(event);
    }
  };

  _setOpened(opened: bool) {
    if (this.state.opened !== opened) {
      this.setState({opened});
    }
  }
}
