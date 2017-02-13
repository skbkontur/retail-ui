import React, { PropTypes } from 'react';

import Button from '../Button';
import Group from '../Group';
import Icon from '../Icon';
import Input from '../Input';

class FxInput extends React.Component {
  static propTypes = {
    auto: PropTypes.bool
  };

  static defaultProps = {
    width: 250
  };

  _input = null;

  render() {
    const { width } = this.props;

    const inputProps = {};
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
        <Input
          ref={this._refInput}
          mainInGroup
          align="right"
          {...this.props}
          {...inputProps}
        />
      </Group>
    );
  }

  _refInput = input => {
    this._input = input;
  };
}

export default FxInput;
