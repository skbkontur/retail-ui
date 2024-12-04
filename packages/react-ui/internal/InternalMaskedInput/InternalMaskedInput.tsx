import React from 'react';
import ReactInputMask, { InputState } from 'react-input-mask';
import type { Emotion } from '@emotion/css/create-instance';

import { isNonNullable } from '../../lib/utils';
import { Theme } from '../../lib/theming/Theme';
import { MaskCharLowLine } from '../MaskCharLowLine';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './InternalMaskedInput.styles';

export interface InternalMaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string | null;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  onUnexpectedInput?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

interface MaskedInputState {
  value: string;

  // Users can unmask value themselves. In these cases we take origin value length
  originValue: string;

  emptyValue: string;
  focused: boolean;
}

type DefaultProps = Required<Pick<InternalMaskedInputProps, 'maskChar'>>;

export const MaskedInputDataTids = {
  root: 'MaskedInput__root',
} as const;

/** @deprecated Со следующей мажорной версии Input перестанет поддерживать маску.
 * todo: выпилить в 5 версии библиотеки.
 * */
export class InternalMaskedInput extends React.PureComponent<InternalMaskedInputProps, MaskedInputState> {
  public static __KONTUR_REACT_UI__ = 'InternalMaskedInput';
  public static displayName = 'InternalMaskedInput';

  public static defaultProps: DefaultProps = {
    maskChar: '_',
  };

  private getProps = createPropsGetter(InternalMaskedInput.defaultProps);

  public input: HTMLInputElement | null = null;
  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private reactInputMask: ReactInputMask | null = null;

  public constructor(props: InternalMaskedInputProps) {
    super(props);

    this.state = {
      value: this.getValue(props),
      originValue: this.getValue(props),
      emptyValue: '',
      focused: false,
    };
  }

  public componentDidMount() {
    if (this.reactInputMask) {
      // FIXME: принудительно вызываем beforeMaskedValueChange, чтобы получить emptyValue
      this.reactInputMask.forceUpdate();
    }
  }

  public componentDidUpdate(prevProps: InternalMaskedInputProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value ? this.props.value.toString() : '',
      });
    }
  }

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private renderMain() {
    const {
      maskChar,
      alwaysShowMask,
      hasLeftIcon,
      hasRightIcon,
      maxLength,
      onValueChange,
      onUnexpectedInput,
      defaultValue,
      style,
      ...inputProps
    } = this.props;
    const { emptyValue, value, originValue } = this.state;

    const leftHelper = style?.textAlign !== 'right' && (
      <span style={{ color: 'transparent' }}>{emptyValue.slice(0, originValue.length)}</span>
    );
    const styles = this.styles;
    const leftClass = style?.textAlign !== 'right' && styles.inputMaskLeft();

    const rightHelper = emptyValue
      .slice(originValue.length)
      .split('')
      .map((_char, i) => (_char === '_' ? <MaskCharLowLine key={i} /> : _char));

    return (
      <span data-tid={MaskedInputDataTids.root} className={styles.container()} x-ms-format-detection="none">
        <ReactInputMask
          {...inputProps}
          maskChar={null}
          // @ts-expect-error InternalMaskedInput will be deleted in 5.0
          beforeMaskedValueChange={this.preprocess}
          alwaysShowMask={false}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={value}
          inputRef={this.refInput}
          ref={this.refMaskedInput}
          style={{ ...style }}
        />
        {this.isMaskVisible() && (
          <span className={this.emotion.cx(styles.inputMask(this.theme), leftClass)}>
            {leftHelper}
            {rightHelper}
          </span>
        )}
      </span>
    );
  }

  private getValue = (props: InternalMaskedInputProps): string => {
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

  private refMaskedInput = (reactInputMask: ReactInputMask) => {
    this.reactInputMask = reactInputMask;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === this.state.value) {
      this.handleUnexpectedInput();
    } else {
      this.setState({ value: event.target.value, originValue: event.target.value });
      if (this.props.onValueChange) {
        this.props.onValueChange(event.target.value);
      }
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ focused: false });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private preprocess = (
    newState: InputState,
    oldState: InputState,
    userInput: string,
    options: Pick<InternalMaskedInputProps, 'mask'>,
  ) => {
    const visibleMaskChars = new Array(options.mask.length).fill(this.getProps().maskChar);

    if (newState.value !== oldState.value && userInput === null) {
      this.setState({
        value: newState.value,
        originValue: newState.value,
      });
    }

    options.mask.split('').forEach((char: string, index: number) => {
      // @ts-expect-error InternalMaskedInput will be deleted in 5.0
      if (options.permanents.includes(index)) {
        visibleMaskChars[index] = char;
      }

      if (newState.value[index]) {
        visibleMaskChars[index] = newState.value[index];
      }
    });

    const emptyValue = visibleMaskChars.join('');

    if (this.state.emptyValue !== emptyValue) {
      this.setState({
        emptyValue,
      });
    }

    return newState;
  };

  private isMaskVisible = () => this.props.alwaysShowMask || this.state.focused;

  private handleUnexpectedInput = () => {
    if (this.props.onUnexpectedInput) {
      this.props.onUnexpectedInput(this.state.value);
    }
  };
}
