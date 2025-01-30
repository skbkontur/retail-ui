import React, { AriaAttributes } from 'react';
import PropTypes from 'prop-types';
import { globalObject } from '@skbkontur/global-object';
import type { Emotion } from '@emotion/css/create-instance';

import { Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { Theme } from '../../lib/theming/Theme';
import { isEdge, isIE11 } from '../../lib/client';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles, globalClasses } from './Checkbox.styles';
import { CheckedIcon } from './CheckedIcon';
import { IndeterminateIcon } from './IndeterminateIcon';

export interface CheckboxProps
  extends CommonProps,
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label'>,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /** @ignore */
        children?: React.ReactNode;

        /** Переводит контрол в состояние валидации "ошибка". */
        error?: boolean;

        /** Переводит контрол в состояние валидации "предупреждение". */
        warning?: boolean;

        /** Задает размер. */
        size?: SizeProp;

        /** Задает HTML-событие `onmouseenter`.
         * @ignore */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает HTML-событие `onmouseleave`.
         * @ignore */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает HTML-событие `onmouseover`.
         * @ignore */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;

        /** Задает функцию, вызывающуюся при изменении value. */
        onValueChange?: (value: boolean) => void;

        /** Задает HTML-событие `onblur`.
         * @ignore */
        onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

        /** Устанавливает начальное [неопределенное состояние чекбокса](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate). */
        initialIndeterminate?: boolean;
      }
    > {}

export interface CheckboxState {
  focusedByTab: boolean;
  indeterminate: boolean;
  isShiftPressed: boolean;
}

export const CheckboxDataTids = {
  root: 'Checkbox__root',
} as const;

type DefaultProps = Required<Pick<CheckboxProps, 'size'>>;

/**
 * `Checkbox` используется для управления параметром с двумя состояниями.
 *
 * Чекбокс не запускает действие немедленно. Как правило, для этого нужно нажать подтверждающую кнопку.
 * Для немедленного включения какого-то режима в интерфейсе лучше подходит Toggle.
 */
@rootNode
export class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {
  public static __KONTUR_REACT_UI__ = 'Checkbox';
  public static displayName = 'Checkbox';

  public static defaultProps: DefaultProps = {
    size: 'small',
  };

  private getProps = createPropsGetter(Checkbox.defaultProps);

  private getRootSizeClassName() {
    const styles = this.styles;
    switch (this.getProps().size) {
      case 'large':
        return styles.rootLarge(this.theme);
      case 'medium':
        return styles.rootMedium(this.theme);
      case 'small':
      default:
        return styles.rootSmall(this.theme);
    }
  }

  private getBoxWrapperSizeClassName() {
    const styles = this.styles;
    switch (this.getProps().size) {
      case 'large':
        return styles.boxWrapperLarge(this.theme);
      case 'medium':
        return styles.boxWrapperMedium(this.theme);
      case 'small':
      default:
        return styles.boxWrapperSmall(this.theme);
    }
  }

  private getCheckboxBoxSize() {
    switch (this.getProps().size) {
      case 'large':
        return this.theme.checkboxBoxSizeLarge;
      case 'medium':
        return this.theme.checkboxBoxSizeMedium;
      case 'small':
      default:
        return this.theme.checkboxBoxSizeSmall;
    }
  }

  public static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    warning: PropTypes.bool,
    onValueChange: PropTypes.func,
    onBlur: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseOver: PropTypes.func,
  };

  public state = {
    focusedByTab: false,
    indeterminate: this.props.initialIndeterminate || false,
    isShiftPressed: false,
  };

  private theme!: Theme;
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private input = React.createRef<HTMLInputElement>();

  private handleShiftPress = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      this.setState(() => ({
        isShiftPressed: true,
      }));
    }
  };

  private handleShiftRelease = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      this.setState({
        isShiftPressed: false,
      });
    }
  };

  public componentDidMount = () => {
    if (this.state.indeterminate && this.input.current) {
      this.input.current.indeterminate = true;
    }

    globalObject.document?.addEventListener('keydown', this.handleShiftPress);
    globalObject.document?.addEventListener('keyup', this.handleShiftRelease);
  };

  public componentWillUnmount = () => {
    globalObject.document?.removeEventListener('keydown', this.handleShiftPress);
    globalObject.document?.removeEventListener('keyup', this.handleShiftRelease);
  };

  private setRootNode!: TSetRootNode;

  public componentDidUpdate(prevProps: CheckboxProps) {
    if (prevProps.checked !== this.props.checked) {
      this.resetIndeterminate();
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
                return (
                  <CommonWrapper rootNodeRef={this.setRootNode} {...this.getProps()}>
                    {this.renderMain}
                  </CommonWrapper>
                );
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  /**
   * Программная установка фокуса чекбоксу.
   * @public
   */
  public focus() {
    keyListener.isTabPressed = true;
    this.input.current?.focus();
  }

  /**
   * Программное снятие фокуса с чекбокса.
   * @public
   */
  public blur() {
    this.input.current?.blur();
  }

  /**
   * Устанавливает чекбокс в HTML-состояние `indeterminate`.
   * @public
   */
  public setIndeterminate = () => {
    this.setState({
      indeterminate: true,
    });
    if (this.input.current) {
      this.input.current.indeterminate = true;
    }
  };

  /**
   * Снимает с чекбокса HTML-состояние `indeterminate`.
   * @public
   */
  public resetIndeterminate = () => {
    this.setState({
      indeterminate: false,
    });
    if (this.input.current) {
      this.input.current.indeterminate = false;
    }
  };

  private renderMain = (props: CommonWrapperRestProps<CheckboxProps>) => {
    const {
      error,
      warning,
      size,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onValueChange,
      type,
      initialIndeterminate,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      ...rest
    } = props;
    const isIndeterminate = this.state.indeterminate;
    const styles = this.styles;
    const iconClass = this.emotion.cx(styles.icon(), !props.checked && !isIndeterminate && styles.iconUnchecked());

    const iconSize = parseInt(this.getCheckboxBoxSize());
    const IconCheck = (
      <span className={iconClass}>
        <CheckedIcon size={iconSize} />
      </span>
    );
    const IconSquare = (
      <span className={iconClass}>
        <IndeterminateIcon size={iconSize} />
      </span>
    );

    const rootClass = this.emotion.cx(this.getRootSizeClassName(), {
      [styles.root(this.theme)]: true,
      [styles.rootFallback()]: isIE11 || isEdge,
      [styles.rootChecked(this.theme)]: props.checked || isIndeterminate,
      [styles.rootDisableTextSelect()]: this.state.isShiftPressed,
      [styles.disabled(this.theme)]: Boolean(props.disabled),
    });

    const inputProps = {
      ...rest,
      type: 'checkbox',
      className: styles.input(),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      ref: this.input,
    };

    let caption = null;
    if (this.props.children) {
      const captionClass = this.emotion.cx({
        [styles.caption(this.theme)]: true,
        [styles.captionIE11()]: isIE11 || isEdge,
        [styles.disabled(this.theme)]: Boolean(props.disabled),
      });
      caption = <span className={captionClass}>{this.props.children}</span>;
    }

    const box = (
      <div
        className={this.emotion.cx(this.getBoxWrapperSizeClassName(), {
          [styles.boxWrapper(this.theme)]: true,
        })}
      >
        <div
          className={this.emotion.cx(styles.box(this.theme), globalClasses.box, {
            [styles.boxChecked(this.theme)]: props.checked || isIndeterminate,
            [styles.boxFocus(this.theme)]: this.state.focusedByTab,
            [styles.boxError(this.theme)]: props.error,
            [styles.boxWarning(this.theme)]: props.warning,
            [styles.boxDisabled(this.theme)]: props.disabled,
          })}
        >
          {(isIndeterminate && IconSquare) || IconCheck}
        </div>
      </div>
    );

    return (
      <label
        data-tid={CheckboxDataTids.root}
        className={rootClass}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onClick={fixFirefoxModifiedClickOnLabel(this.input)}
      >
        <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
          <input {...inputProps} aria-label={ariaLabel} aria-describedby={ariaDescribedby} />
        </FocusControlWrapper>
        {box}
        {caption}
      </label>
    );
  };

  private handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      globalObject.requestAnimationFrame?.(() => {
        if (keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  };

  private resetFocus = () => this.setState({ focusedByTab: false });

  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.resetFocus();
    this.props.onBlur?.(e);
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    this.props.onValueChange?.(checked);

    this.resetIndeterminate();

    this.props.onChange?.(event);
  };

  private handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    this.props.onClick?.(e);
    // support IE11's and old Edge's special behavior
    // https://github.com/jquery/jquery/issues/1698
    if (this.state.indeterminate && (isIE11 || isEdge)) {
      this.resetIndeterminate();
      // simulate correct behavior only if onValueChange is used
      // because we cant simulate real native onChange event
      if (this.props.onValueChange && this.input.current) {
        const checked = !this.input.current.checked;

        if (this.props.checked === undefined) {
          // in case of uncontrolled mode
          this.input.current.checked = checked;
        }

        this.props.onValueChange(checked);
      }
    }
  };
}
