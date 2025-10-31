import type { AriaAttributes } from 'react';
import React from 'react';
import warning from 'warning';

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
import type { MaskedInputProps } from '../MaskedInput';
import { MaskedInput } from '../MaskedInput';
import type { ReactUIFeatureFlags } from '../../lib/featureFlagsContext';
import { getFullReactUIFlagsContext } from '../../lib/featureFlagsContext';
import { ReactUIFeatureFlagsContext } from '../../lib/featureFlagsContext/ReactUIFeatureFlagsContext';
import { withSize } from '../../lib/size/SizeDecorator';

import { MathFunctionIcon } from './MathFunctionIcon';
import { FxInputRestoreBtn } from './FxInputRestoreBtn';

export interface FxInputProps
  extends Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Pick<Partial<MaskedInputProps>, 'alwaysShowMask' | 'mask' | 'maskChar' | 'formatChars'>,
    Override<
      Omit<CurrencyInputProps, 'alwaysShowMask' | 'mask' | 'maskChar' | 'formatChars'>,
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

type DefaultProps = Required<Pick<FxInputProps, 'width' | 'type' | 'value' | 'auto'>>;
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
    auto: false,
  };

  private theme!: Theme;
  private size!: SizeProp;
  private input: Input | CurrencyInput | null = null;

  private getProps = createPropsGetter(FxInput.defaultProps);
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private featureFlags!: ReactUIFeatureFlags;

  private validateProps(props: FxInputProps) {
    warning(
      props.type !== 'currency' && props.mask !== undefined,
      '[FxInput]: Prop "mask" is not supported when type="currency"',
    );
  }

  public componentDidMount() {
    this.validateProps(this.getProps());
  }

  public componentDidUpdate() {
    this.validateProps(this.getProps());
  }

  public render() {
    return (
      <ReactUIFeatureFlagsContext.Consumer>
        {(flags) => {
          this.featureFlags = getFullReactUIFlagsContext(flags);
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
        }}
      </ReactUIFeatureFlagsContext.Consumer>
    );
  }

  public renderMain = (props: CommonWrapperRestProps<DefaultizedFxInputProps>) => {
    const button = props.auto ? null : (
      <FxInputRestoreBtn
        size={props.size}
        onRestore={props.onRestore}
        corners={props.corners}
        disabled={props.disabled}
        borderless={props.borderless}
        aria-label={props.buttonAriaLabel}
      />
    );

    return (
      <Group data-tid={FxInputDataTids.root} width={props.width}>
        {button}
        {this.getInput(props)}
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

  private getLeftIcon = (props: FxInputProps) => {
    if (!props.auto) {
      return null;
    }

    const iconSizes: Record<SizeProp, number> = {
      small: parseInt(this.theme.inputIconSizeSmall),
      medium: parseInt(this.theme.inputIconSizeMedium),
      large: parseInt(this.theme.inputIconSizeLarge),
    };
    const size = this.size;

    return <MathFunctionIcon size={iconSizes[size]} />;
  };

  private getInput = (props: FxInputProps) => {
    const {
      type,
      onRestore,
      auto,
      refInput,
      value,
      width,
      size: _size,
      mask,
      maskChar,
      formatChars,
      alwaysShowMask,
      signed,
      integerDigits,
      fractionDigits,
      hideTrailingZeros,
      buttonAriaLabel,
      corners: originalCorners,
      ...rest
    } = props;
    const corners: InputProps['corners'] = auto
      ? originalCorners
      : { borderBottomLeftRadius: 0, borderTopLeftRadius: 0, ...originalCorners };
    const size = this.size;
    const commonInputProps = {
      corners,
      size,
      width: '100%',
      ref: this.refInput,
      ...rest,
    };

    if (type === 'currency') {
      return (
        <CurrencyInput
          {...commonInputProps}
          signed={signed}
          integerDigits={integerDigits}
          fractionDigits={fractionDigits}
          value={value as CurrencyInputProps['value']}
          onValueChange={this.props.onValueChange as CurrencyInputProps['onValueChange']}
        />
      );
    }
    if (this.featureFlags.fxInputUseMaskedInput && mask) {
      return (
        <MaskedInput
          {...commonInputProps}
          leftIcon={this.getLeftIcon(props)}
          align="right"
          mask={mask}
          maskChar={maskChar}
          formatChars={formatChars}
          alwaysShowMask={alwaysShowMask}
          value={value as MaskedInputProps['value']}
          onValueChange={this.props.onValueChange as MaskedInputProps['onValueChange']}
        />
      );
    }
    return (
      <Input
        {...commonInputProps}
        leftIcon={this.getLeftIcon(props)}
        align="right"
        mask={mask}
        maskChar={maskChar}
        formatChars={formatChars}
        alwaysShowMask={alwaysShowMask}
        type={type}
        value={value as InputProps['value']}
        onValueChange={this.props.onValueChange as InputProps['onValueChange']}
      />
    );
  };
}
