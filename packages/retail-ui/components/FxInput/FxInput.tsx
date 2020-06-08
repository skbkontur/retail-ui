import * as React from 'react';
import * as PropTypes from 'prop-types';
import FunctionIcon from '@skbkontur/react-icons/Function';
import UndoIcon from '@skbkontur/react-icons/Undo';

import Button from '../Button';
import Group from '../Group';
import Input, { InputProps } from '../Input';
import CurrencyInput, { CurrencyInputProps } from '../CurrencyInput';
import { createPropsGetter } from '../internal/createPropsGetter';
import { InputType } from '../Input/Input';
import { Override } from '../../typings/utility-types';

export type FxInputProps = Override<
  CurrencyInputProps,
  {
    /** Авто-режим */
    auto?: boolean;
    /** Тип инпута */
    type?: 'currency' | InputProps['type'];
    /** onRestore */
    onRestore?: () => void;
    /** onChange */
    onChange: CurrencyInputProps['onChange'] | InputProps['onChange'];
    /** Значение */
    value?: React.ReactText;
    /** ref Input'а */
    refInput?: (element: CurrencyInput | Input | null) => void;
    /** Убрать лишние нули после запятой */
    hideTrailingZeros?: boolean;
  }
>;

export interface FxInputDefaultProps {
  width: FxInputProps['width'];
  type: FxInputProps['type'];
}

/** Принимает все свойства `Input`'a */
class FxInput extends React.Component<FxInputProps> {
  public static __KONTUR_REACT_UI__ = 'FxInput';

  public static propTypes = {
    auto: PropTypes.bool,
    type: PropTypes.string,
  };

  public static defaultProps: FxInputDefaultProps = {
    width: 250,
    type: 'text',
  };

  private input: Input | CurrencyInput | null = null;

  private getProps = createPropsGetter(FxInput.defaultProps);

  public render(): JSX.Element {
    const { type, onRestore, auto, ...rest } = this.props;
    const inputProps: Partial<CurrencyInputProps> = {
      align: 'right',
      mainInGroup: true,
    };

    let button = null;

    if (auto) {
      inputProps.leftIcon = <FunctionIcon />;
    } else {
      button = (
        <Button narrow onClick={this.props.onRestore} borderless={this.props.borderless} disabled={this.props.disabled}>
          <UndoIcon />
        </Button>
      );
    }

    return (
      <Group width={this.props.width}>
        {button}
        {this.getProps().type === 'currency' ? (
          <CurrencyInput
            {...inputProps}
            {...rest}
            ref={this.refInput}
            value={this.props.value as CurrencyInputProps['value']}
            onChange={this.props.onChange as CurrencyInputProps['onChange']}
          />
        ) : (
          <Input
            {...inputProps}
            {...rest}
            ref={this.refInput}
            type={this.props.type as InputType}
            value={this.props.value as InputProps['value']}
            onChange={this.props.onChange as InputProps['onChange']}
          />
        )}
      </Group>
    );
  }

  /**
   * @public
   */
  public focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  /**
   * @public
   */
  public blur = () => {
    if (this.input) {
      this.input.blur();
    }
  };

  private refInput = (element: Input | CurrencyInput | null) => {
    this.input = element;

    if (this.props.refInput) {
      this.props.refInput(this.input);
    }
  };
}

export default FxInput;
