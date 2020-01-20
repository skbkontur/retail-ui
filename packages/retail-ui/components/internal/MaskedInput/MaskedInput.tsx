import * as React from 'react';
import ReactInputMask, { InputState, MaskOptions } from 'react-input-mask';
import styles from './MaskedInput.module.less';

export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string | null;
  formatChars?: { [key: string]: string };
  alwaysShowMask?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  onUnexpectedInput?: () => void;
}

interface MaskedInputState {
  value: string;
  emptyValue: string;
  focused: boolean;
}

export default class MaskedInput extends React.Component<MaskedInputProps, MaskedInputState> {
  public static __KONTUR_REACT_UI__ = 'MaskedInput';

  public input: HTMLInputElement | null = null;
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

  public componentWillReceiveProps(nextProps: MaskedInputProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value ? nextProps.value.toString() : '',
      });
    }
  }

  public render() {
    const {
      maskChar,
      alwaysShowMask,
      hasLeftIcon,
      hasRightIcon,
      maxLength,
      onUnexpectedInput,
      defaultValue,
      ...inputProps
    } = this.props;

    return (
      <span className={styles.container}>
        <ReactInputMask
          {...inputProps}
          maskChar={null}
          beforeMaskedValueChange={this.preprocess}
          alwaysShowMask={false}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={this.state.value}
          inputRef={this.refInput}
          ref={this.refMaskedInput}
        />
        {this.isMaskVisible() && (
          <span className={styles.inputMask}>
            <span style={{ color: 'transparent' }}>{this.state.emptyValue.slice(0, this.state.value.length)}</span>
            {this.state.emptyValue.slice(this.state.value.length)}
          </span>
        )}
      </span>
    );
  }

  private getValue = (props: MaskedInputProps): string => {
    const { value, defaultValue } = props;

    return value !== undefined ? value.toString() : defaultValue !== undefined ? defaultValue.toString() : '';
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
    }

    if (this.props.onChange) {
      this.props.onChange(event);
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

  private preprocess = (newState: InputState, oldState: InputState, userInput: string, options: MaskOptions) => {
    const visibleMaskChars = new Array(options.mask.length).fill(this.props.maskChar);

    if (newState.value !== oldState.value && userInput === null) {
      this.setState({
        value: newState.value,
      });
    }

    options.mask.split('').forEach((char, index) => {
      if (options.permanents.indexOf(index) > -1) {
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
      this.props.onUnexpectedInput();
    }
  };
}
