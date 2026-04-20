import type { AriaAttributes } from 'react';
import React from 'react';
import warning from 'warning';

import { Group } from '../Group/index.js';
import type { InputProps } from '../Input/Input.js';
import { Input } from '../Input/index.js';
import type { CurrencyInputProps } from '../CurrencyInput/index.js';
import { CurrencyInput } from '../CurrencyInput/index.js';
import type { DefaultizedProps } from '../../lib/createPropsGetter.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import type { Override } from '../../typings/utility-types.js';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper/types.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode//rootNodeDecorator.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { Theme } from '../../lib/theming/Theme.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { MaskedInputProps } from '../MaskedInput/index.js';
import { MaskedInput } from '../MaskedInput/index.js';
import { withSize } from '../../lib/size/SizeDecorator.js';

import { MathFunctionIcon } from './MathFunctionIcon.js';
import { FxInputRestoreBtn } from './FxInputRestoreBtn.js';

export interface FxInputProps
  extends
    Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Pick<Partial<MaskedInputProps>, 'alwaysShowMask' | 'mask' | 'maskChar' | 'formatChars'>,
    Override<
      Omit<CurrencyInputProps, 'alwaysShowMask' | 'mask' | 'maskChar' | 'formatChars'>,
      {
        /** Управляет видимостью кнопки Restore:
         * - true — кнопка Restore не отображается. Значение в поле является автоматически рассчитанным.
         * - false — кнопка Restore отображается в поле. Значение в поле считается отредактированным. */
        auto?: boolean;

        /** Тип поля. */
        type?: 'currency' | InputProps['type'];

        /** Событие нажатия на кнопку Restore. */
        onRestore?: () => void;

        /** Событие изменения value. */
        onValueChange: CurrencyInputProps['onValueChange'] | InputProps['onValueChange'];

        /** Значение поля. */
        value?: string | number;

        /** Задаёт ref поля. */
        refInput?: (element: CurrencyInput | Input | null) => void;

        /** Убирает лишние нули после запятой. */
        hideTrailingZeros?: boolean;

        /** Атрибут aria-label кнопке Restore. */
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

/** В автополе можно вывести автоматически рассчитанное цифровое значение. В него можно передавать итог любого вычисления, например, сумму других полей, процент или более сложную функцию.
 *
 * У поля есть иконка математической формулы и кнопка Restore — с её помощью пользователь может вернуть исходное значение, если редактировал поле. Видимость кнопки и поведение при нажатии нужно прописывать в компоненте самостоятельно.
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

  private validateProps(props: FxInputProps) {
    if (props.type === 'currency' && props.mask !== undefined) {
      warning(false, '[FxInput]: Prop "mask" is not supported when type="currency"');
    }
  }

  public componentDidMount() {
    this.validateProps(this.getProps());
  }

  public componentDidUpdate() {
    this.validateProps(this.getProps());
  }

  public render(): React.JSX.Element {
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

  public renderMain = (props: CommonWrapperRestProps<DefaultizedFxInputProps>): React.JSX.Element => {
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

  /** Программно устанавливает фокус на поле.
   * Появляется фокусная рамка, элемент получает клавиатурные события и воспринимается как текущий элемент для чтения скринридерами.
   * @public
   */
  public focus = (): void => {
    if (this.input) {
      this.input.focus();
    }
  };

  /** Программно снимает фокус с кнопки.
   * @public
   */
  public blur = (): void => {
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
    if (mask) {
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
        type={type}
        value={value as InputProps['value']}
        onValueChange={this.props.onValueChange as InputProps['onValueChange']}
      />
    );
  };
}
