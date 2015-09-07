import React, {PropTypes} from 'react';

import Button from '../Button';
import Group from '../Group';
import Icon from '../Icon';
import Input from '../Input';

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
        <Button narrow onClick={this.props.onRestore}>
          <Icon name="undo" />
        </Button>
      );
    }

    return (
      <Group width={width}>
        {button}
        <Input mainInGroup align="right" {...this.props} {...inputProps} />
      </Group>
    );
  },
});

module.exports = FxInput;
