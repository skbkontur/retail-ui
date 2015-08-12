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
    const props = {
      style: {display: 'inline-block'},
    };
    if (this.props.trigger === 'hover') {
      props.onMouseEnter = this.handleMouseEnter;
      props.onMouseLeave = this.handleMouseLeave;
    } else if (this.props.trigger === 'click') {
      props.onClick = this.handleClick;
    }

    return <span {...props}>{this.props.children}</span>;
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
      let target = React.findDOMNode(this);
      React.render(
        <Box trigger={this.props.trigger} target={target} pos={this.props.pos}
            onClose={this.handleBoxClose}>
          {this.props.render()}
        </Box>,
        this.boxDom
      );
    } else {
      React.render(<div />, this.boxDom);
    }
  },

  handleMouseEnter() {
    this.setState({opened: true});
  },

  handleMouseLeave() {
    this.setState({opened: false});
  },

  handleClick() {
    this.setState({opened: true});
  },

  handleBoxClose() {
    this.setState({opened: false});
  },
});

module.exports = Tooltip;
