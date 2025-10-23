import type { AriaAttributes } from 'react';
import React from 'react';

import { Group } from '../Group';
import type { InputProps } from '../Input';
import { Input } from '../Input';
import type { CurrencyInputProps } from '../CurrencyInput';
import { CurrencyInput } from '../CurrencyInput';
import type { DefaultizedProps } from '../../lib/createPropsGetter';
import { createPropsGetter } from '../../lib/createPropsGetter';
import type { Override } from '../../typings/utility-types';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { CommonWrapper } from '../../internal/CommonWrapper';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode';
import { rootNode } from '../../lib/rootNode';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import type { Theme } from '../../lib/theming/Theme';
import type { SizeProp } from '../../lib/types/props';
import { withSize } from '../../lib/size/SizeDecorator';

import { MathFunctionIcon } from './MathFunctionIcon';
import { FxInputRestoreBtn } from './FxInputRestoreBtn';

export interface FxInputProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Override<
      CurrencyInputProps,
      {
        /** Устанавливает авто-режим. */
        auto?: boolean;

        /** Задает тип инпута */
        type?: 'currency' | InputProps['type'];

        /** Задает функцию, которая вызывается при нажатии на кнопку Restore. */
        onRestore?: () => void;

        /** Задает функцию, вызывающуюся при изменении value. */
        onValueChange: CurrencyInputProps['onValueChange'] | InputProps['onValueChange'];

        /** Задает значение инпута. */
        value?: string | number;

        /** Задает ref инпута. */
        refInput?: (element: CurrencyInput | Input | null) => void;

        /** Убирает лишние нули после запятой. */
        hideTrailingZeros?: boolean;

        /** Задает атрибут aria-label кнопке восстановления (restore button). */
        buttonAriaLabel?: AriaAttributes['aria-label'];

        /** @ignore */
        corners?: React.CSSProperties;
      }
    > {}

export const FxInputDataTids = {
  root: 'FxInput__root',
} as const;

type DefaultProps = Required<Pick<FxInputProps, 'width' | 'type' | 'value'>>;
type DefaultizedFxInputProps = DefaultizedProps<FxInputProps, DefaultProps>;

/**
 * Автополе `FxInput`.
 *
 * Используйте `FxInput`, если поле вычисляемое и вы рассчитали значение.
 *
 * Принимает все свойства `Input`'a.
 */

@rootNode
@withSize
export class FxInput extends React.Component<FxInputProps> {
  public static __KONTUR_REACT_UI__ = 'FxInput';
  public static displayName = 'FxInput';

  public static defaultProps: DefaultProps = {
    width: 250,
    type: 'text',
    value: '',
  };

  private theme!: Theme;
  private size!: SizeProp;
  private input: Input | CurrencyInput | null = null;

  private getProps = createPropsGetter(FxInput.defaultProps);
  public getRootNode!: TGetRootNode;
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
    const inputCorners: InputProps['corners'] = auto
      ? { ...rest.corners }
      : { borderBottomLeftRadius: 0, borderTopLeftRadius: 0, ...rest.corners };
    const iconSizes: Record<SizeProp, number> = {
      small: parseInt(this.theme.inputIconSizeSmall),
      medium: parseInt(this.theme.inputIconSizeMedium),
      large: parseInt(this.theme.inputIconSizeLarge),
    };
    const size = this.size;
    const IconFunction = <MathFunctionIcon size={iconSizes[size]} />;

    if (auto) {
      inputProps.leftIcon = IconFunction;
    } else {
      button = (
        <FxInputRestoreBtn
          size={this.size}
          onRestore={onRestore}
          corners={rest.corners}
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
            size={this.size}
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
            size={this.size}
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
