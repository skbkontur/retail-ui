// TODO: Enable this rule in functional components.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { IMaskInput as ReactInputMask } from 'react-imask';
import { createMask } from 'imask';

import { isNonNullable } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { MaskCharLowLine } from '../MaskCharLowLine';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MaskedInput.styles';
import { getDefinitions } from "./MaskedInput.helpers";

export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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

type DefaultProps = Required<Pick<MaskedInputProps, 'maskChar'>>;

export const MaskedInputDataTids = {
  root: 'MaskedInput__root',
} as const;

export class MaskedInput extends React.PureComponent<MaskedInputProps, MaskedInputState> {
  public static __KONTUR_REACT_UI__ = 'MaskedInput';

  public static defaultProps: DefaultProps = {
    maskChar: '_',
  };

  public input: HTMLInputElement | null = null;
  private theme!: Theme;

  public constructor(props: MaskedInputProps) {
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

  public componentDidUpdate(prevProps: MaskedInputProps) {
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
    const leftClass = style?.textAlign !== 'right' && styles.inputMaskLeft();

    const rightHelper = emptyValue
      .slice(originValue.length)
      .split('')
      .map((_char, i) => (_char === '_' ? <MaskCharLowLine key={i} /> : _char));

    return (
      <span data-tid={MaskedInputDataTids.root} className={styles.container()} x-ms-format-detection="none">
        <ReactInputMask
          {...inputProps}
          mask={mask}
          definitions={getDefinitions(formatChars)}
          eager={"append"}
          onInput={this.handleAccept}
          onChange={this.props.onChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          value={value}
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

  private handleAccept = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === this.state.value) {
      this.handleUnexpectedInput();
    } else {
      this.setState({ value, originValue: value });
      if (this.props.onValueChange) {
        this.props.onValueChange(value);
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

  private setEmptyValue = () => {
    const mask = createMask({
      mask: this.props.mask,
      definitions: getDefinitions(this.props.formatChars),
      lazy: false,
      placeholderChar: this.props.maskChar ?? "",
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
