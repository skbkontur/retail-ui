import * as React from 'react';

import polyfillPlaceholder from '../../lib/polyfillPlaceholder';
import { Override } from '../../lib/types';

import { InputLeftIcon, InputRightIcon, InputStyledView, InputWrapper } from './StyledInputView';

type InputSize = 'small' | 'medium' | 'large';

type InputAlign = 'left' | 'center' | 'right';

type InputType = 'password' | 'text';

export type StyledInputProps = Override<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    align?: InputAlign;
    borderless?: boolean;
    /**
     * Иконка слева инпута.
     */
    leftIcon?: React.ReactNode;
    /**
     * Иконка справа инпута.
     */
    rightIcon?: React.ReactNode;
    size?: InputSize;
    type?: InputType;
    width?: number | string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, v: string) => void;
    warning?: boolean;
    error?: boolean;
    innerRef?: (element: HTMLInputElement) => void;
  }
>;

export interface StyledInputState {
  polyfillPlaceholder: boolean;
  blinking: boolean;
}

class StyledInput extends React.Component<StyledInputProps, StyledInputState> {
  protected static defaultProps: {
    size: InputSize;
    width: number | string;
  } = {
    size: 'small',
    width: 250,
  };

  public state: StyledInputState = {
    polyfillPlaceholder: false,
    blinking: false,
  };

  private blinkTimeout: number = 0;

  private input: HTMLInputElement | null = null;

  public componentDidMount() {
    if (polyfillPlaceholder) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  public componentWillUnmount() {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
    }
  }

  public componentWillReceiveProps(nextProps: StyledInputProps) {
    if (polyfillPlaceholder && !nextProps.value) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  public focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  public blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  public blink() {
    this.setState({ blinking: true }, () => {
      this.blinkTimeout = window.setTimeout(() => this.setState({ blinking: false }), 150);
    });
  }

  public setSelectionRange(start: number, end: number) {
    const { input } = this;
    if (!input) {
      throw new Error('Cannot call "setSelectionRange" on unmounted Input');
    }

    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);
      // tslint:disable-next-line:no-any
    } else if ((input as any).createTextRange) {
      // tslint:disable-next-line:no-any
      const range = (input as any).createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }

  public render() {
    const { width, leftIcon, rightIcon, align, onChange, innerRef, ...rest } = this.props;
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    return (
      <InputWrapper style={{ width: this.props.width }}>
        <InputStyledView
          {...rest}
          refInput={this.refInput}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          style={{
            textAlign: align,
          }}
          onChange={this.handleChange}
        />
        {this.renderPlaceholder()}
        {hasLeftIcon && <InputLeftIcon>{this.renderIcon(leftIcon)}</InputLeftIcon>}
        {hasRightIcon && <InputRightIcon>{this.renderIcon(rightIcon)}</InputRightIcon>}
      </InputWrapper>
    );
  }

  private renderIcon(icon: React.ReactNode) {
    return icon || null;
  }

  private renderPlaceholder() {
    let placeholder = null;

    if (this.state.polyfillPlaceholder && this.props.placeholder && !this.props.value) {
      placeholder = <div style={{ textAlign: this.props.align || 'inherit' }}>{this.props.placeholder}</div>;
    }

    return placeholder;
  }

  private refInput = (ref: HTMLInputElement) => {
    this.input = ref;
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (polyfillPlaceholder) {
      const fieldIsEmpty = event.target.value === '';
      if (this.state.polyfillPlaceholder !== fieldIsEmpty) {
        this.setState({ polyfillPlaceholder: fieldIsEmpty });
      }
    }

    if (this.props.onChange) {
      this.props.onChange(event, event.target.value);
    }
  };
}

export default StyledInput;
