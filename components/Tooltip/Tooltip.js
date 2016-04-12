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
  children: React.Element,

  render: () => ?React.Element,

  pos: Pos,

  trigger: 'hover' | 'click' | 'focus' | 'opened' | 'closed',
};

type State = {
  opened: bool,
};

class Tooltip extends React.Component {
  static propTypes = {
    /**
     * Функция, которая возвращает содержимое тултипа.
     *
     * Если эта функция вернула `null`, то тултип не показывается.
     */
    render: PropTypes.func,

    pos: PropTypes.oneOf([
      'top left', 'top center', 'top right',
      'bottom left', 'bottom center', 'bottom right',
      'left top', 'left middle', 'left bottom',
      'right top', 'right middle', 'right bottom',
    ]),

    trigger: PropTypes.oneOf(['hover', 'click', 'focus', 'opened', 'closed']),
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
  _lastRef: ((el: ?React.Element) => void) | string | null;
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

    return (
      <RenderContainer>
        <Box trigger={this.props.trigger} getTarget={this._getTarget}
          pos={this.props.pos} onClose={this._handleBoxClose}
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

  // $FlowIssue 850
  _refHotspot = (el) => {
    if (typeof this._lastRef === 'function') {
      // React calls refs without context.
      const ref = this._lastRef;
      ref(el);
    }
    this._hotspotDOM = el && ReactDOM.findDOMNode(el);
  };

  // $FlowIssue 850
  _getTarget = () => {
    return this._hotspotDOM;
  };

  // $FlowIssue 850
  _handleMouseOver = (event) => {
    if (this._hotspotDOM) {
      const opened = this._hotspotDOM.contains(event.target);
      if (this.state.opened !== opened) {
        this._setOpened(opened);
      }
    }
  };

  // $FlowIssue 850
  _handleMouseLeave = () => {
    this._setOpened(false);
  };

  // $FlowIssue 850
  _handleClick = event => {
    if (this._hotspotDOM) {
      if (!this.state.opened && this._hotspotDOM.contains(event.target)) {
        this._setOpened(true);
      }
    }
  };

  // $FlowIssue 850
  _handleBoxClose = () => {
    this._setOpened(false);
  };

  // $FlowIssue 850
  _handleFocus = event => {
    this._setOpened(true);

    const onFocus = this._lastOnFocus;
    if (onFocus) {
      onFocus(event);
    }
  };

  // $FlowIssue 850
  _handleBlur = event => {
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

export default Tooltip;
