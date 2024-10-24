import React, { AriaAttributes } from 'react';
import PropTypes from 'prop-types';

import { Group } from '../Group';
import { Input, InputProps } from '../Input';
import { CurrencyInput, CurrencyInputProps } from '../CurrencyInput';
import { createPropsGetter, DefaultizedProps } from '../../lib/createPropsGetter';
import { Override } from '../../typings/utility-types';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { Theme } from '../../lib/theming/Theme';
import { SizeProp } from '../../lib/types/props';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { MathFunctionIcon } from './MathFunctionIcon';
import { FxInputRestoreBtn } from './FxInputRestoreBtn';

export interface FxInputProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
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
        /** Позвоялет задать атрибут aria-label кнопке восстановления (restore button) */
        buttonAriaLabel?: AriaAttributes['aria-label'];
      }
    > {}

export const FxInputDataTids = {
  root: 'FxInput__root',
} as const;

type DefaultProps = Required<Pick<FxInputProps, 'width' | 'type' | 'value'>>;
type DefaultizedFxInputProps = DefaultizedProps<FxInputProps, DefaultProps>;

/** Принимает все свойства `Input`'a */
@rootNode
export class FxInput extends React.Component<FxInputProps> {
  public static __KONTUR_REACT_UI__ = 'FxInput';
  public static displayName = 'FxInput';

  public static propTypes = {
    auto: PropTypes.bool,
    type: PropTypes.string,
  };

  public static defaultProps: DefaultProps = {
    width: 250,
    type: 'text',
    value: '',
  };

  private theme!: Theme;
  private input: Input | CurrencyInput | null = null;

  private getProps = createPropsGetter(FxInput.defaultProps);
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<DefaultizedFxInputProps>) => {
    const { type, onRestore, auto, refInput, value, width, ...rest } = props;
    const inputProps: Partial<CurrencyInputProps> = {
      align: 'right',
    };

    let button = null;
    const inputCorners: InputProps['corners'] = auto ? {} : { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 };
    const iconSizes: Record<SizeProp, number> = {
      small: parseInt(this.theme.inputIconSizeSmall),
      medium: parseInt(this.theme.inputIconSizeMedium),
      large: parseInt(this.theme.inputIconSizeLarge),
    };
    const size = this.props.size || Input.defaultProps.size;
    const IconFunction = <MathFunctionIcon size={iconSizes[size]} />;

    if (auto) {
      inputProps.leftIcon = IconFunction;
    } else {
      button = (
        <FxInputRestoreBtn
          size={rest.size}
          onRestore={onRestore}
          disabled={rest.disabled}
          borderless={rest.borderless}
          aria-label={props.buttonAriaLabel}
        />
      );
    }

    return (
      <Group data-tid={FxInputDataTids.root} width={width}>
        {button}
        {type === 'currency' ? (
          <CurrencyInput
            {...inputProps}
            {...rest}
            corners={inputCorners}
            size={this.props.size}
            width={'100%'}
            ref={this.refInput}
            value={value as CurrencyInputProps['value']}
            onValueChange={this.props.onValueChange as CurrencyInputProps['onValueChange']}
          />
        ) : (
          <Input
            {...inputProps}
            {...rest}
            corners={inputCorners}
            size={this.props.size}
            width={'100%'}
            ref={this.refInput}
            type={type}
            value={value as InputProps['value']}
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
