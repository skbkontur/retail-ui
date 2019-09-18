import classNames from 'classnames';
import MaskedInput from 'react-input-mask';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import polyfillPlaceholder from '../polyfillPlaceholder';
import '../ensureOldIEClassName';
import Upgrades from '../../lib/Upgrades';

import CssStyles from './Input.less';
import { Override, Nullable } from '../../typings/utility-types';
import invariant from 'invariant';

const isFlatDesign = Upgrades.isFlatDesignEnabled();

const classes: typeof CssStyles = isFlatDesign
  ? require('./Input.flat.less')
  : require('./Input.less');

export type InputSize = 'small' | 'medium' | 'large';

export type InputAlign = 'left' | 'center' | 'right';

export type InputType = 'password' | 'text';

export type InputProps = Override<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    /** Иконка слева */
    leftIcon?: React.ReactNode;
    /** Иконка справа */
    rightIcon?: React.ReactNode;
    /** Состояние ошибки */
    error?: boolean;
    /** Состояние предупреждения */
    warning?: boolean;
    /** Режим прозрачной рамки */
    borderless?: boolean;
    /** Выравнивание текста */
    align?: InputAlign;
    /** Паттерн маски */
    mask?: Nullable<string>;
    /** Символ маски */
    maskChar?: Nullable<string>;
    /** Показывать символы маски */
    alwaysShowMask?: boolean;
    /** Размер */
    size?: InputSize;
    /** onChange */
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string
    ) => void;
    /** Вызывается на label */
    onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
    /** Вызывается на label */
    onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
    /** Вызывается на label */
    onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
    /** Тип */
    type?: InputType;
    /** Значение */
    value?: string;
    capture?: boolean;

    /**
     * @deprecated
     * 100% ширина в группе, лучше явно передать ширину в компонент
     */
    mainInGroup?: boolean;
    /** Выделять введенное значение при фокусе */
    selectAllOnFocus?: boolean;
  }
>;

export interface InputState {
  polyfillPlaceholder: boolean;
  blinking: boolean;
}

/**
 * Интерфес пропсов наследуется от `React.InputHTMLAttributes<HTMLInputElement>`.
 *  Все пропсы кроме перечисленных, `className` и `style` передаются в `<input>`
 */
class Input extends React.Component<InputProps, InputState> {
  public static defaultProps: {
    size: InputSize;
  } = {
    size: 'small'
  };

  public state: InputState = {
    polyfillPlaceholder: false,
    blinking: false
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

  public componentWillReceiveProps(nextProps: InputProps) {
    if (polyfillPlaceholder && !nextProps.value) {
      this.setState({ polyfillPlaceholder: true });
    }
  }

  /**
   * @public
   */
  public focus() {
    invariant(this.input, 'Cannot call "focus" because Input is not mounted');
    this.input!.focus();
  }

  /**
   * @public
   */
  public blur() {
    invariant(this.input, 'Cannot call "blur" because Input is not mounted');
    this.input!.blur();
  }

  /**
   * @public
   */
  public blink() {
    if (this.blinkTimeout) {
      this.cancelBlink(() => {
        // trigger reflow to restart animation
        // @see https://css-tricks.com/restart-css-animation/#article-header-id-0
        // tslint:disable-next-line:no-unused-expression
        void (this.input && this.input.offsetWidth);
        this.blink();
      });
      return;
    }
    this.setState({ blinking: true }, () => {
      this.blinkTimeout = window.setTimeout(this.cancelBlink, 150);
    });
  }

  /**
   * @public
   */
  public setSelectionRange(start: number, end: number) {
    if (!this.input) {
      throw new Error('Cannot call "setSelectionRange" on unmounted Input');
    }

    if (document.activeElement !== this.input) {
      this.focus();
    }

    this.input.setSelectionRange(start, end);
  }

  public render(): JSX.Element {
    const {
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      width,
      error,
      warning,
      leftIcon,
      rightIcon,
      borderless,
      value,
      align,
      type,
      mask,
      maskChar,
      alwaysShowMask,
      style,
      className,
      size,
      placeholder,
      mainInGroup,
      selectAllOnFocus,
      disabled,
      ...rest
    } = this.props;

    const { blinking } = this.state;

    const labelProps = {
      className: classNames({
        [classes.root]: true,
        [classes.disabled]: disabled,
        [classes.error]: error,
        [classes.warning]: warning,
        [classes.padLeft]: !!leftIcon,
        [classes.padRight]: !!rightIcon,
        [this.getSizeClassName()]: true
      }),
      style: { width },
      onMouseEnter,
      onMouseLeave,
      onMouseOver
    };

    const inputProps = {
      ...rest,
      className: classNames({
        [classes.input]: true,
        [classes.borderless]: borderless,
        [classes.blink]: blinking
      }),
      value,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      style: { textAlign: align },
      ref: this.refInput,
      type: 'text',
      placeholder: !polyfillPlaceholder ? placeholder : undefined,
      disabled
    };

    if (type === 'password') {
      inputProps.type = type;
    }

    const input = !!mask
      ? this.renderMaskedInput(inputProps, mask)
      : React.createElement('input', inputProps);

    return (
      <label {...labelProps}>
        {input}
        {this.renderPlaceholder()}
        {this.renderLeftIcon()}
        {this.renderRightIcon()}
      </label>
    );
  }

  /**
   * @public
   */
  public selectAll = () => {
    if (this.input) {
      this.setSelectionRange(0, this.input.value.length);
    }
  };

  private renderMaskedInput(
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & {
      capture?: boolean;
    },
    mask: string
  ) {
    return (
      <MaskedInput
        {...inputProps}
        mask={mask}
        maskChar={this.props.maskChar === undefined ? '_' : this.props.maskChar}
        alwaysShowMask={this.props.alwaysShowMask}
      />
    );
  }

  private renderLeftIcon() {
    return this.renderIcon(this.props.leftIcon, classes.leftIcon);
  }

  private renderRightIcon() {
    return this.renderIcon(this.props.rightIcon, classes.rightIcon);
  }

  private renderIcon(icon: React.ReactNode, className: string) {
    return icon ? (
      <div className={className}>
        <span className={classes.icon}>{icon}</span>
      </div>
    ) : null;
  }

  private renderPlaceholder() {
    let placeholder = null;

    if (
      this.state.polyfillPlaceholder &&
      this.props.placeholder &&
      !this.props.alwaysShowMask &&
      !this.props.value
    ) {
      placeholder = (
        <div
          className={classes.placeholder}
          style={{ textAlign: this.props.align || 'inherit' }}
        >
          {this.props.placeholder}
        </div>
      );
    }

    return placeholder;
  }

  private getSizeClassName() {
    const SIZE_CLASS_NAMES = {
      small: classes.sizeSmall,
      medium: Upgrades.isSizeMedium16pxEnabled()
        ? classes.sizeMedium
        : classes.DEPRECATED_sizeMedium,
      large: classes.sizeLarge
    };

    return SIZE_CLASS_NAMES[this.props.size!];
  }

  private refInput = (ref: HTMLInputElement | null) => {
    const elem = (ReactDOM.findDOMNode(this) as HTMLElement).querySelector(
      'input'
    );
    this.input = this.props.mask ? elem : ref;
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

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.selectAllOnFocus) {
      this.selectAll();
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private cancelBlink = (callback?: () => void): void => {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout);
      this.blinkTimeout = 0;
      if (this.state.blinking) {
        this.setState({ blinking: false }, callback);
        return;
      }
    }
    if (callback) {
      callback();
    }
  };
}

export default Input;
