import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import Box from './Box.jsx';

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

  constructor(props, context) {
    super(props, context);

    this.state = {
      opened: false,
    };
  }

  render() {
    const props = {};
    if (this.props.trigger === 'hover') {
      props.onMouseOver = this.handleMouseOver;
      props.onMouseLeave = this.handleMouseLeave;
    } else if (this.props.trigger === 'click') {
      props.onClick = this.handleClick;
    }

    let child = this.props.children;
    if (typeof child === 'string') {
      child = <span ref={this.refChild}>{child}</span>;
    } else {
      child = React.cloneElement(React.Children.only(child), {
        ref: this.refChild,
      });
    }

    return <span {...props}>{child}</span>;
  }

  componentDidMount() {
    this.boxDom = document.createElement('div');
    document.body.appendChild(this.boxDom);
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    this.boxDom.parentNode.removeChild(this.boxDom);
    this.boxDom = null;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.trigger !== this.props.trigger) {
      if (newProps.trigger === 'opened') {
        this.setState({opened: true});
      } else if (newProps.trigger === 'closed') {
        this.setState({opened: false});
      }
    }
  }

  componentDidUpdate() {
    if (this.state.opened) {
      ReactDOM.render(
        <Box trigger={this.props.trigger} target={this.targetDOM}
          pos={this.props.pos} onClose={this.handleBoxClose}
        >
          {this.props.render()}
        </Box>,
        this.boxDom
      );
    } else {
      ReactDOM.render(<div />, this.boxDom);
    }
  }

  refChild = el => {
    this.targetDOM = el && ReactDOM.findDOMNode(el);
  };

  handleMouseOver = event => {
    const opened = this.targetDOM.contains(event.target);
    if (this.state.opened !== opened) {
      this.setState({opened});
    }
  };

  handleMouseLeave = () => {
    this.setState({opened: false});
  };

  handleClick = event => {
    if (this.targetDOM.contains(event.target)) {
      this.setState({opened: true});
    }
  };

  handleBoxClose = () => {
    this.setState({opened: false});
  };
}

module.exports = Tooltip;
