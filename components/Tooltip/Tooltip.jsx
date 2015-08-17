const React = require('react');

const PropTypes = React.PropTypes;

const Box = require('./Box');

const Tooltip = React.createClass({
  propTypes: {
    render: PropTypes.func,

    pos: PropTypes.oneOf([
      'top left', 'top center', 'top right',
      'bottom left', 'bottom center', 'bottom right',
      'left top', 'left middle', 'left bottom',
      'right top', 'right middle', 'right bottom',
    ]),

    trigger: PropTypes.oneOf(['hover', 'click']),
  },

  getDefaultProps() {
    return {
      pos: 'top left',
      trigger: 'hover',
    };
  },

  getInitialState() {
    return {
      opened: false,
    };
  },

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
  },

  componentDidMount() {
    this.boxDom = document.createElement('div');
    document.body.appendChild(this.boxDom);
    this.componentDidUpdate();
  },

  componentWillUnmount() {
    this.boxDom.parentNode.removeChild(this.boxDom);
    this.boxDom = null;
  },

  componentDidUpdate() {
    if (this.state.opened) {
      React.render(
        <Box trigger={this.props.trigger} target={this.targetDOM}
            pos={this.props.pos} onClose={this.handleBoxClose}>
          {this.props.render()}
        </Box>,
        this.boxDom
      );
    } else {
      React.render(<div />, this.boxDom);
    }
  },

  refChild(el) {
    this.targetDOM = el && React.findDOMNode(el);
  },

  handleMouseOver(event) {
    const opened = this.targetDOM.contains(event.target);
    if (this.state.opened !== opened) {
      this.setState({opened});
    }
  },

  handleMouseLeave() {
    this.setState({opened: false});
  },

  handleClick(event) {
    if (this.targetDOM.contains(event.target)) {
      this.setState({opened: true});
    }
  },

  handleBoxClose() {
    this.setState({opened: false});
  },
});

module.exports = Tooltip;
