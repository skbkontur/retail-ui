import * as React from 'react';

import * as PropTypes from 'prop-types';

import Button from '../Button';
import Group from '../Group';
import Icon from '../Icon';
import Input, { InputProps } from '../Input';
import CurrencyInput, { CurrencyInputProps } from '../CurrencyInput';
import { createPropsGetter } from '../internal/createPropsGetter';
import { InputType } from '../Input/Input';
import { Omit } from '../../typings/utility-types';

export interface FxInputProps
  extends Omit<CurrencyInputProps & InputProps, 'type' | 'value' | 'onChange'> {
  auto?: boolean;
  type?: 'currency' | InputType;
  value?: React.ReactText | CurrencyInputProps['value'] | InputProps['value'];
  onRestore?: () => void;
  onChange?: CurrencyInputProps['onChange'] | InputProps['onChange'];
  refInput?: (element: CurrencyInput | Input) => void;
}

export interface FxInputDefaultProps {
  width: FxInputProps['width'];
  type: FxInputProps['type'];
}

class FxInput extends React.Component<FxInputProps> {
  public static propTypes = {
    auto: PropTypes.bool,
    type: PropTypes.string
  };

  public static defaultProps: FxInputDefaultProps = {
    width: 250,
    type: 'text' as 'currency' | InputType
  };

  private input: Input | CurrencyInput | null = null;

  private getProps = createPropsGetter(FxInput.defaultProps);

  public render(): JSX.Element {
    const inputProps: {
      align: InputProps['align'];
      mainInGroup: boolean;
      leftIcon?: React.ReactNode;
    } = {
      align: 'right',
      mainInGroup: true
    };

    let button = null;

    if (this.props.auto) {
      inputProps.leftIcon = <Icon name="Function" />;
    } else {
      button = (
        <Button
          narrow
          onClick={this.props.onRestore}
          borderless={this.props.borderless}
        >
          <Icon name="Undo" />
        </Button>
      );
    }

    return (
      <Group width={this.props.width}>
        {button}
        {this.getProps().type === 'currency' ? (
          <CurrencyInput
            {...inputProps}
            {...this.props}
            ref={this.refInput}
            value={this.props.value as CurrencyInputProps['value']}
            onChange={this.props.onChange as CurrencyInputProps['onChange']}
          />
        ) : (
          <Input
            {...inputProps}
            {...this.props}
            ref={this.refInput}
            type={this.props.type as InputType}
            value={this.props.value as InputProps['value']}
            onChange={this.props.onChange as InputProps['onChange']}
          />
        )}
      </Group>
    );
  }

  public focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  private refInput = (element: Input | CurrencyInput | null) => {
    this.input = element;

    if (this.props.refInput && this.input) {
      this.props.refInput(this.input);
    }
  };
}

export default FxInput;
