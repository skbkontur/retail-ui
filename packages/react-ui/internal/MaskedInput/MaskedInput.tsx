import React from 'react';
import ReactInputMask, { InputState, MaskOptions } from 'react-input-mask';

import { isNonNullable } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { MaskCharLowLine } from '../MaskCharLowLine';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MaskedInput.styles';

export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar: string | null;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  onUnexpectedInput?: (value: string) => void;
  onValueChange?: (value: string) => void;
}

interface MaskedInputState {
  value: string;
  emptyValue: string;
  focused: boolean;
}

export class MaskedInput extends React.PureComponent<MaskedInputProps, MaskedInputState> {
  public static __KONTUR_REACT_UI__ = 'MaskedInput';

  public static defaultProps: Partial<MaskedInputProps> = {
    maskChar: '_',
  };

  public input: HTMLInputElement | null = null;
  private theme!: Theme;
  private reactInputMask: ReactInputMask | null = null;

  public constructor(props: MaskedInputProps) {
    super(props);

    this.state = {
      value: this.getValue(props),
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

  public componentDidUpdate(prevProps: MaskedInputProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value ? this.props.value.toString() : '',
      });
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
    const { emptyValue, value } = this.state;

    const leftHelper = style?.textAlign !== 'right' && (
      <span style={{ color: 'transparent' }}>{emptyValue.slice(0, value.length)}</span>
    );
    const leftClass = style?.textAlign !== 'right' && styles.inputMaskLeft();

    const rightHelper = emptyValue
      .slice(value.length)
      .split('')
      .map((_char, i) => (_char === '_' ? <MaskCharLowLine key={i} /> : _char));

    return (
      <span className={styles.container()} x-ms-format-detection="none">
        <ReactInputMask
          {...inputProps}
          maskChar={null}
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
          <span className={cx(styles.inputMask(this.theme), leftClass)}>
            {leftHelper}
            {rightHelper}
          </span>
        )}
      </span>
    );
  }

  private getValue = (props: MaskedInputProps): string => {
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
      this.setState({ value: event.target.value });
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
    options: MaskOptions & Pick<MaskedInputProps, 'mask'>,
  ) => {
    const visibleMaskChars = new Array(options.mask.length).fill(this.props.maskChar);

    if (newState.value !== oldState.value && userInput === null) {
      this.setState({
        value: newState.value,
      });
    }

    options.mask.split('').forEach((char: string, index: number) => {
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
