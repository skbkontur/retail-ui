import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { Group } from '../Group';
import { Input, InputProps, InputType } from '../Input';
import { CurrencyInput, CurrencyInputProps } from '../CurrencyInput';
import { Override } from '../../typings/utility-types';
import { FunctionIcon, UndoIcon } from '../../internal/icons/16px';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

type FxInputInterface = {
  /** Авто-режим */
  auto?: boolean;
  /** onRestore */
  onRestore?: () => void;
  /** onValueChange */
  onValueChange: CurrencyInputProps['onValueChange'] | InputProps['onValueChange'];
  /** ref Input'а */
  refInput?: (element: CurrencyInput | Input | null) => void;
  /** Убрать лишние нули после запятой */
  hideTrailingZeros?: boolean;
};

type PropsMergedWithCurrencyInputProps = Override<CurrencyInputProps, FxInputInterface>;

export type FxInputProps = Override<PropsMergedWithCurrencyInputProps, Partial<DefaultProps>> & CommonProps;

type DefaultProps = {
  width: number | string;
  /** Тип инпута */
  type: 'currency' | InputProps['type'];
  /** Значение */
  value: React.ReactText;
};

type FxInputComponentProps = Override<FxInputProps, DefaultProps>;

/** Принимает все свойства `Input`'a */
@rootNode
export class FxInput extends React.Component<FxInputComponentProps> {
  public static __KONTUR_REACT_UI__ = 'FxInput';

  public static propTypes = {
    auto: PropTypes.bool,
    type: PropTypes.string,
  };

  public static defaultProps: DefaultProps = {
    width: 250,
    type: 'text',
    value: '',
  };

  private input: Input | CurrencyInput | null = null;

  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {this.renderMain}
      </CommonWrapper>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<FxInputComponentProps>) => {
    const { type, onRestore, auto, refInput, ...rest } = props;
    const inputProps: Partial<CurrencyInputProps> = {
      align: 'right',
    };

    let button = null;

    if (auto) {
      inputProps.leftIcon = <FunctionIcon />;
    } else {
      button = (
        <Button
          size={this.props.size}
          narrow
          onClick={this.props.onRestore}
          borderless={this.props.borderless}
          disabled={this.props.disabled}
        >
          <UndoIcon />
        </Button>
      );
    }

    return (
      <Group width={this.props.width}>
        {button}
        {this.props.type === 'currency' ? (
          <CurrencyInput
            {...inputProps}
            {...rest}
            width={'100%'}
            ref={this.refInput}
            value={this.props.value as CurrencyInputProps['value']}
            onValueChange={this.props.onValueChange as CurrencyInputProps['onValueChange']}
          />
        ) : (
          <Input
            {...inputProps}
            {...rest}
            width={'100%'}
            ref={this.refInput}
            type={this.props.type as InputType}
            value={this.props.value as InputProps['value']}
            onValueChange={this.props.onValueChange as InputProps['onValueChange']}
          />
        )}
      </Group>
    );
  };

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
