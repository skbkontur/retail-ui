var React = require('react');

var Button = require('../Button');
var Group = require('../Group');
var Icon = require('../Icon');
var Input = require('../Input');

var PropTypes = React.PropTypes;

var FxInput = React.createClass({
  propTypes: {
    auto: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      width: 250,
    };
  },

  render() {
    let { width } = this.props;

    let inputProps = {};
    let button = null;
    if (this.props.auto) {
      inputProps.leftIcon = <Icon name="fx" />;
    } else {
      button = (
        <Button onClick={this.props.onRestore}><Icon name="undo" /></Button>
      );
    }

    return (
      <Group width={width}>
        {button}
        <Input mainInGroup {...this.props} {...inputProps} />
      </Group>
    );
  },
});

module.exports = FxInput;
