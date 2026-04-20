import type { Emotion } from '@emotion/css/create-instance';
import type { AriaAttributes } from 'react';
import React from 'react';

import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel.js';
import { KeyListener } from '../../lib/events/keyListener.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import type { Override } from '../../typings/utility-types.js';
import { RadioGroupContext } from '../RadioGroup/RadioGroupContext.js';
import type { RadioGroupContextType } from '../RadioGroup/RadioGroupContext.js';
import { getStyles, globalClasses } from './Radio.styles.js';

export interface RadioProps<T>
  extends
    Pick<AriaAttributes, 'aria-label'>,
    CommonProps,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /** Меняет визуальное отображение поля на состояние «ошибка». Может быть полезен при разработке собственной валидации, если вы не используете пакет [React UI Validations](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-validations_displaying-getting-started--docs). */
        error?: boolean;

        /** Меняет визуальное отображение поля на состояние «предупреждение». Может быть полезен при разработке собственной валидации, если вы не используете пакет [React UI Validations](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui-validations_displaying-getting-started--docs). */
        warning?: boolean;

        /** Размер радиокнопки. */
        size?: SizeProp;

        /** Задаёт состояние фокуса. */
        focused?: boolean;

        /** Задаёт функцию, которая вызывается при изменении `value`. */
        onValueChange?: (value: T) => void;

        /** Задает HTML-событие `onmouseenter`.
         * @ignore */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает HTML-событие `onmouseleave`.
         * @ignore */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает HTML-событие `onmouseover`.
         * @ignore */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задаёт значение. */
        value: T;
      }
    > {}

export interface RadioState {
  focusedByKeyboard: boolean;
}

export const RadioDataTids = {
  root: 'Radio__root',
} as const;

type DefaultProps = Required<Pick<RadioProps<any>, 'focused'>>;

/** Радиокнопка позволяет выбрать одно значение из нескольких. Подходит при небольшом количестве вариантов — 2–5.
 *
 * Для создания группы радиокнопок используйте специальный контейнер — компонент [RadioGroup](https://tech.skbkontur.ru/kontur-ui/?path=/docs/react-ui_input-data-radiogroup--docs).
 */
@withRenderEnvironment
@rootNode
@withSize
export class Radio<T> extends React.Component<RadioProps<T>, RadioState> {
  public static __KONTUR_REACT_UI__ = 'Radio';
  public static displayName = 'Radio';

  public state = {
    focusedByKeyboard: false,
  };

  public static defaultProps: DefaultProps = {
    focused: false,
  };

  private getProps = createPropsGetter(Radio.defaultProps);

  public static contextType = RadioGroupContext;
  public context: RadioGroupContextType<T> = this.context;
  private size!: SizeProp;

  private inputEl = React.createRef<HTMLInputElement>();
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private keyListener!: KeyListener;

  private getRootSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.rootLarge(this.theme);
      case 'medium':
        return this.styles.rootMedium(this.theme);
      case 'small':
      default:
        return this.styles.rootSmall(this.theme);
    }
  }

  private getCircleSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.circleLarge(this.theme);
      case 'medium':
        return this.styles.circleMedium(this.theme);
      case 'small':
      default:
        return this.styles.circleSmall(this.theme);
    }
  }

  private getCheckedSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.checkedLarge(this.theme);
      case 'medium':
        return this.styles.checkedMedium(this.theme);
      case 'small':
      default:
        return this.styles.checkedSmall(this.theme);
    }
  }

  public componentDidMount() {
    this.keyListener = new KeyListener(this.globalObject);
  }

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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

  /** Программно устанавливает фокус на радиокнопку. Появляется фокусная обводка, элемент получает клавиатурные события и воспринимается как текущий элемент для чтения скринридерами.
   * @public
   */
  public focus(): void {
    this.keyListener.isTabPressed = true;
    this.inputEl.current?.focus();
  }

  /** Программно снимает фокус с радиокнопки.
   * @public
   */
  public blur(): void {
    this.inputEl.current?.blur();
  }

  public renderMain = (props: CommonWrapperRestProps<RadioProps<T>>): React.JSX.Element => {
    const {
      disabled = this.context.disabled,
      warning = this.context.warning,
      error = this.context.error,
      size,
      focused,
      onMouseOver,
      onMouseEnter,
      onMouseLeave,
      onValueChange,
      ...rest
    } = props;

    const radioProps = {
      className: this.cx({
        [this.styles.circle(this.theme)]: true,
        [this.getCircleSizeClassName()]: true,
        [this.styles.checked(this.theme)]: this.props.checked,
        [this.getCheckedSizeClassName()]: this.props.checked,
        [this.styles.focus(this.theme)]: this.getProps().focused || this.state.focusedByKeyboard,
        [this.styles.error(this.theme)]: error,
        [this.styles.warning(this.theme)]: warning,
        [this.styles.disabled(this.theme)]: disabled,
        [this.styles.checkedDisabled(this.theme)]: this.props.checked && disabled,
        [globalClasses.circle]: true,
      }),
    };

    let value: string | number | undefined;
    if (typeof this.props.value === 'string' || typeof this.props.value === 'number') {
      value = this.props.value;
    }

    const inputProps = {
      ...rest,
      type: 'radio',
      className: this.styles.input(),
      disabled,
      tabIndex: this.props.tabIndex,
      value,
      ref: this.inputEl,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };

    const labelProps = {
      className: this.cx(this.styles.root(this.theme), this.getRootSizeClassName(), {
        [this.styles.rootChecked(this.theme)]: this.props.checked,
      }),
      onMouseOver: this.handleMouseOver,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: fixFirefoxModifiedClickOnLabel(this.inputEl),
    };

    if (this._isInRadioGroup()) {
      const checked = this.props.value === this.context.activeItem;
      inputProps.checked = checked;
      inputProps.name = this.context.name;
      inputProps.suppressHydrationWarning = true;
      labelProps.className = this.cx(this.styles.root(this.theme), this.getRootSizeClassName(), {
        [this.styles.rootChecked(this.theme)]: checked,
      });
      radioProps.className = this.cx(radioProps.className, {
        [this.styles.checked(this.theme)]: checked,
        [this.getCheckedSizeClassName()]: checked,
        [this.styles.checkedDisabled(this.theme)]: checked && disabled,
      });
    }

    return (
      <label data-tid={RadioDataTids.root} {...labelProps}>
        <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
          <input {...inputProps} />
        </FocusControlWrapper>
        <span {...radioProps}>
          <span className={this.styles.placeholder()} />
        </span>
        {this.props.children && this.renderCaption()}
      </label>
    );
  };

  private _isInRadioGroup = () => Boolean(this.context.name);

  private renderCaption() {
    const captionClassNames = this.cx({
      [this.styles.caption(this.theme)]: true,
      [this.styles.captionDisabled(this.theme)]: !!(this.props.disabled || this.context.disabled),
    });

    return <div className={captionClassNames}>{this.props.children}</div>;
  }

  private handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.props.onValueChange?.(this.props.value);

    if (this._isInRadioGroup()) {
      this.context.onSelect(this.props.value);
    }

    this.props.onChange?.(e);
  };

  private handleMouseOver: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseOver?.(e);
  };

  private handleMouseEnter: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseEnter?.(e);
  };

  private handleMouseLeave: React.MouseEventHandler<HTMLLabelElement> = (e) => {
    this.props.onMouseLeave?.(e);
  };

  private handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.context.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      this.globalObject.requestAnimationFrame?.(() => {
        if (this.keyListener.isArrowPressed || this.keyListener.isTabPressed) {
          this.setState({ focusedByKeyboard: true });
        }
      });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  };

  private resetFocus = () => this.setState({ focusedByKeyboard: false });

  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.resetFocus();
    this.props.onBlur?.(e);
  };
}
