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
  },

  getDefaultProps() {
    return {
      pos: 'top left',
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
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };

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
        <Box target={target} pos={this.props.pos}>{this.props.render()}</Box>,
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
});

module.exports = Tooltip;
