import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { Group } from '../Group';
import { Input, InputProps } from '../Input';
import { CurrencyInput, CurrencyInputProps } from '../CurrencyInput';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Override } from '../../typings/utility-types';
import { FunctionIcon, UndoIcon } from '../../internal/icons/16px';

export type FxInputProps = Override<
  CurrencyInputProps,
  {
    /** Авто-режим */
    auto?: boolean;
    /** Тип инпута */
    type?: 'currency' | InputProps['type'];
    /** onRestore */
    onRestore?: () => void;
    /** onValueChange */
    onValueChange: CurrencyInputProps['onValueChange'] | InputProps['onValueChange'];
    /** Значение */
    value?: React.ReactText;
    defaultValue?: React.ReactText;
    /** ref Input'а */
    refInput?: (element: CurrencyInput | Input | null) => void;
    /** Убрать лишние нули после запятой */
    hideTrailingZeros?: boolean;
  }
>;

/** Принимает все свойства `Input`'a */
export class FxInput extends React.Component<FxInputProps> {
  public static __KONTUR_REACT_UI__ = 'FxInput';

  public static propTypes = {
    auto: PropTypes.bool,
    type: PropTypes.string,
  };

  public static defaultProps = {
    width: 250,
    type: 'text',
    value: '',
  };

  private input: Input | CurrencyInput | null = null;

  private getProps = createPropsGetter(FxInput.defaultProps);

  public render(): JSX.Element {
    const {
      // business props
      onValueChange,
      value,
      defaultValue,
      refInput,
      type,
      onRestore,
      auto,

      // CurrencyInput props
      hideTrailingZeros,
      fractionDigits,
      signed,
      integerDigits,
      onSubmit,

      // wrapper props
      width,
      ...rest
    } = this.props;

    const [extractedInputProps, restProps] = Input.extractProps(rest);

    const inputProps: Partial<CurrencyInputProps> = {
      ...extractedInputProps,
      align: 'right',
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
      <Group width={this.props.width} {...restProps}>
        {button}
        {this.getProps().type === 'currency' ? (
          <CurrencyInput
            {...inputProps}
            hideTrailingZeros={hideTrailingZeros}
            fractionDigits={fractionDigits}
            signed={signed}
            integerDigits={integerDigits}
            onSubmit={onSubmit}
            width={'100%'}
            ref={this.refInput}
            value={this.props.value as CurrencyInputProps['value']}
            defaultValue={defaultValue as CurrencyInputProps['value']}
            onValueChange={this.props.onValueChange as CurrencyInputProps['onValueChange']}
          />
        ) : (
          <Input
            {...inputProps}
            width={'100%'}
            ref={this.refInput}
            type={this.props.type}
            value={this.props.value as InputProps['value']}
            defaultValue={defaultValue as InputProps['value']}
            onValueChange={this.props.onValueChange as InputProps['onValueChange']}
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
