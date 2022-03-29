import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { Group } from '../Group';
import { Input, InputProps, InputType } from '../Input';
import { CurrencyInput, CurrencyInputProps } from '../CurrencyInput';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { Override } from '../../typings/utility-types';
import { FunctionIcon, UndoIcon } from '../../internal/icons/16px';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { shallowEqualMemo } from '../../lib/shallowEqualMemo';
import { mergeRefs } from '../../lib/utils';

export interface FxInputProps
  extends CommonProps,
    Override<
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
        /** ref Input'а */
        refInput?: (element: CurrencyInput | Input | null) => void;
        /** Убрать лишние нули после запятой */
        hideTrailingZeros?: boolean;
      }
    > {}

/** Принимает все свойства `Input`'a */
@rootNode
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

  private input = React.createRef<Input | CurrencyInput>();

  private getProps = createPropsGetter(FxInput.defaultProps);
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        {this.renderMain}
      </CommonWrapper>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<FxInputProps>) => {
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
        {this.getProps().type === 'currency' ? (
          <CurrencyInput
            {...inputProps}
            {...rest}
            width={'100%'}
            ref={this.shallowMergeRefs([this.input, this.props.refInput])}
            value={this.props.value as CurrencyInputProps['value']}
            onValueChange={this.props.onValueChange as CurrencyInputProps['onValueChange']}
          />
        ) : (
          <Input
            {...inputProps}
            {...rest}
            width={'100%'}
            ref={this.shallowMergeRefs([this.input, this.props.refInput])}
            type={this.props.type as InputType}
            value={this.props.value as InputProps['value']}
            onValueChange={this.props.onValueChange as InputProps['onValueChange']}
          />
        )}
      </Group>
    );
  };

  private shallowMergeRefs = shallowEqualMemo(mergeRefs);

  /**
   * @public
   */
  public focus = () => {
    this.input.current?.focus();
  };

  /**
   * @public
   */
  public blur = () => {
    this.input.current?.blur();
  };
}
