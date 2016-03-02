// @flow

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Box from './Box.jsx';
import RenderContainer from '../RenderContainer';

type Pos = 'top left' | 'top center' | 'top right'
  | 'bottom left' | 'bottom center' | 'bottom right'
  | 'left top' | 'left middle' | 'left bottom'
  | 'right top' | 'right middle' | 'right bottom';

type Props = {
  children: React.Element,

  render: () => React.Element,

  pos: Pos,

  trigger: 'hover' | 'click' | 'opened' | 'closed',
};

type State = {
  opened: bool,
};

class Tooltip extends React.Component {
  static propTypes = {
    render: PropTypes.func,

    pos: PropTypes.oneOf([
      'top left', 'top center', 'top right',
      'bottom left', 'bottom center', 'bottom right',
      'left top', 'left middle', 'left bottom',
      'right top', 'right middle', 'right bottom',
    ]),

    trigger: PropTypes.oneOf(['hover', 'click', 'opened', 'closed']),
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

  _targetDOM: ?HTMLElement;

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      opened: props.trigger === 'opened',
    };
  }

  render() {
    const props = {};
    if (this.props.trigger === 'hover') {
      props.onMouseOver = this._handleMouseOver;
      props.onMouseLeave = this._handleMouseLeave;
    } else if (this.props.trigger === 'click') {
      props.onClick = this._handleClick;
    }

    let child = this.props.children;
    if (typeof child === 'string') {
      child = <span ref={this._refTarget}>{child}</span>;
    } else {
      child = React.cloneElement(React.Children.only(child), {
        ref: this._refTarget,
      });
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

    return (
      <RenderContainer>
        <Box trigger={this.props.trigger} getTarget={this._getTarget}
          pos={this.props.pos} onClose={this._handleBoxClose}
        >
          {this.props.render()}
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
  _refTarget = (el) => {
    this._targetDOM = el && ReactDOM.findDOMNode(el);
  };

  // $FlowIssue 850
  _getTarget = () => this._targetDOM;

  // $FlowIssue 850
  _handleMouseOver = (event) => {
    if (this._targetDOM) {
      const opened = this._targetDOM.contains(event.target);
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
    if (this._targetDOM) {
      if (!this.state.opened && this._targetDOM.contains(event.target)) {
        this._setOpened(true);
      }
    }
  };

  // $FlowIssue 850
  _handleBoxClose = () => {
    this._setOpened(false);
  };

  _setOpened(opened: bool) {
    if (this.state.opened !== opened) {
      this.setState({opened});
    }
  }
}

module.exports = Tooltip;
