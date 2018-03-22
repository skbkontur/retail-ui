import React from 'react';

import PropTypes from 'prop-types';

import Button from '../Button';
import Group from '../Group';
import Icon from '../Icon';
import Input from '../Input';
import CurrencyInput from '../CurrencyInput';

class FxInput extends React.Component {
  static propTypes = {
    auto: PropTypes.bool,
    type: PropTypes.string
  };

  static defaultProps = {
    width: 250,
    type: 'text'
  };

  _input = null;

  render() {
    const { width, type } = this.props;

    const inputProps = {
      align: 'right',
      mainInGroup: true,
      ref: this._refInput
    };
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
    const InputComponent = type === 'currency' ? CurrencyInput : Input;

    return (
      <Group width={width}>
        {button}
        <InputComponent {...inputProps} {...this.props}/>
      </Group>
    );
  }

  _refInput = input => {
    this._input = input;
  };
}

export default FxInput;
