import React from 'react';
import { IMaskInput } from 'react-imask';
import { createMask } from 'imask';

import { isNonNullable } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { MaskCharLowLine } from '../MaskCharLowLine';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MaskedInputElement.styles';
import {
  DEFAULT_MASK_CHAR,
  getCurrentValue,
  getDefinitions,
  getFocusPrefix,
  getMaskChar,
} from './MaskedInputElement.helpers';

export interface MaskedInputElementProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  unmask?: boolean;
  maskChar?: string | null;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  onUnexpectedInput?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

interface IMaskInputState {
  value: string;

  // Users can unmask value themselves. In these cases we take origin value length
  originValue: string;

  emptyValue: string;
  focused: boolean;
}

type DefaultProps = Required<Pick<MaskedInputElementProps, 'maskChar'>>;

export const MaskedInputElementDataTids = {
  root: 'MaskedInput__root',
} as const;

export class MaskedInputElement extends React.PureComponent<MaskedInputElementProps, IMaskInputState> {
  public static __KONTUR_REACT_UI__ = 'MaskedInputElement';

  public static defaultProps: DefaultProps = {
    maskChar: DEFAULT_MASK_CHAR,
  };

  public input: HTMLInputElement | null = null;
  private theme!: Theme;
  private expectedChanges = false;

  public constructor(props: MaskedInputElementProps) {
    super(props);

    this.state = {
      value: this.getValue(props),
      originValue: this.getValue(props),
      emptyValue: '',
      focused: false,
    };
  }

  public componentDidMount() {
    this.setEmptyValue();
  }

  public componentDidUpdate(prevProps: MaskedInputElementProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value ? this.props.value.toString() : '',
      });
    }

    if (this.props.mask !== prevProps.mask) {
      this.setEmptyValue();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const {
      mask,
      maskChar,
      formatChars,
      alwaysShowMask,
      maxLength,
      onValueChange,
      onUnexpectedInput,
      defaultValue,
      style,
      ...inputProps
    } = this.props;
    const leftClass = style?.textAlign !== 'right' && styles.inputMaskLeft();

    const { focused, originValue, value, emptyValue } = this.state;
    const [currentValue, left, right] = getCurrentValue(
      { value, originValue, emptyValue, focused },
      this.props.maskChar,
    );

    /* В rightHelper не DEFAULT_MASK_CHAR, а специальная логика для обработки подчркивания('_').
     * Не менять на DEFAULT_MASK_CHAR
     */
    const rightHelper = right.split('').map((_char, i) => (_char === '_' ? <MaskCharLowLine key={i} /> : _char));
    const leftHelper = style?.textAlign !== 'right' && <span style={{ color: 'transparent' }}>{left}</span>;

    return (
      <span data-tid={MaskedInputElementDataTids.root} className={styles.container()} x-ms-format-detection="none">
        <IMaskInput
          {...inputProps}
          mask={mask}
          definitions={getDefinitions(formatChars)}
          eager
          overwrite={'shift'}
          onAccept={this.handleAccept}
          onInput={this.handleInput}
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={currentValue}
          inputRef={this.refInput}
          style={{ ...style }}
        />
        {this.isMaskVisible() && (
          <span className={cx(styles.inputMask(this.theme), leftClass)}>
            {leftHelper}
            {rightHelper}
          </span>
        )}
      </span>
    );
  }

  private getValue = (props: MaskedInputElementProps): string => {
    if (isNonNullable(props.value)) {
      return props.value.toString();
    }

    if (isNonNullable(props.defaultValue)) {
      return props.defaultValue.toString();
    }

    return '';
  };

  private refInput = (input: HTMLInputElement | null) => {
    this.input = input;
  };

  /** В imask вызывается только когда значение с маской меняется*/
  private handleAccept = (value: string) => {
    this.expectedChanges = true;
    this.setState({ value, originValue: value });

    setTimeout(() => {
      /** При вводе с клавиатуры срабатывает handleAccept, за ним handleInput
       * expectedChanges - нужен чтобы сообщить из handleAccept в handleInput, что значение с маской изменилось.
       * Если маска не изменилась и сработал handleInput, вызываем handleUnexpectedInput. Ввели значение не по маске.
       * setTimeout нужен чтобы сбросить expectedChanges, например, если изменилось значение в пропах.
       * Маска изменится, вызовется handleAccept, но не handleInput
       */
      this.expectedChanges = false;
    });
  };

  /** Отслеживаем неправильные нажатия,
   * handleAccept не вызывается когда значение с маской не меняется, а handleInput вызывается
   * Сначала вызывается handleAccept, затем handleInput
   * */
  private handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!this.expectedChanges && value === this.state.originValue) {
      this.handleUnexpectedInput();
    } else if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }

    this.expectedChanges = false;
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: true });

    this.expectedChanges = false;

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.state.value === getFocusPrefix(this.state, this.props.maskChar)) {
      this.setState({ focused: false, value: '', originValue: '' });
    } else {
      this.setState({ focused: false });
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private setEmptyValue = () => {
    const mask = createMask({
      mask: this.props.mask,
      definitions: getDefinitions(this.props.formatChars),
      lazy: false,
      placeholderChar: getMaskChar(this.props.maskChar),
    });
    const emptyValue = mask.appendTail('').inserted;
    this.setState({ emptyValue });
  };

  private isMaskVisible = () => this.props.alwaysShowMask || this.state.focused;

  private handleUnexpectedInput = () => {
    if (this.props.onUnexpectedInput) {
      this.props.onUnexpectedInput(this.state.value);
    }
  };
}
