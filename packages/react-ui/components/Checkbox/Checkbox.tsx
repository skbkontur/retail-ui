import React from 'react';
import PropTypes from 'prop-types';

import { Override } from '../../typings/utility-types';
import { keyListener } from '../../lib/events/keyListener';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { OkIcon, SquareIcon } from '../../internal/icons/16px';
import { isEdge, isIE11 } from '../../lib/client';
import { CommonWrapper, CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel';

import { styles, globalClasses } from './Checkbox.styles';

export interface CheckboxProps
  extends CommonProps,
    Override<
      React.InputHTMLAttributes<HTMLInputElement>,
      {
        /**
         * Контент `label`
         */
        children?: React.ReactNode;
        /**
         * Состояние валидации при ошибке.
         */
        error?: boolean;
        /**
         * Состояние валидации при предупреждении.
         */
        warning?: boolean;
        /**
         * HTML-событие `mouseenter`.
         */
        onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
        /**
         * HTML-событие `mouseleave`.
         */
        onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
        /**
         * HTML-событие `mouseover`.
         */
        onMouseOver?: React.MouseEventHandler<HTMLLabelElement>;
        /**
         * Функция, вызываемая при изменении `value`.
         */
        onValueChange?: (value: boolean) => void;
        /**
         * HTML-событие `onblur`.
         */
        onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
        /**
         * [Неопределённое состояние](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate) чекбокса из HTML.
         */
        initialIndeterminate?: boolean;
      }
    > {}

export interface CheckboxState {
  focusedByTab: boolean;
  indeterminate: boolean;
  isShiftPressed: boolean;
}
@rootNode
export class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {
  public static __KONTUR_REACT_UI__ = 'Checkbox';

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
  private input = React.createRef<HTMLInputElement>();

  private handleShiftPress = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      this.setState(() => ({
        isShiftPressed: true,
      }));
    }
  };

  private handleShiftRelease = () => {
    this.setState({
      isShiftPressed: false,
    });
  };

  public componentDidMount = () => {
    if (this.state.indeterminate && this.input.current) {
      this.input.current.indeterminate = true;
    }

    document.addEventListener('keydown', this.handleShiftPress);
    document.addEventListener('keyup', this.handleShiftRelease);
  };

  public componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleShiftPress);
    document.removeEventListener('keyup', this.handleShiftRelease);
  };

  private setRootNode!: TSetRootNode;

  public componentDidUpdate(prevProps: CheckboxProps) {
    if (prevProps.checked !== this.props.checked) {
      this.resetIndeterminate();
    }
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              {this.renderMain}
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
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
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      onValueChange,
      type,
      initialIndeterminate,
      ...rest
    } = props;
    const isIndeterminate = this.state.indeterminate;

    const rootClass = cx({
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
      const captionClass = cx({
        [styles.caption(this.theme)]: true,
        [styles.captionIE11()]: isIE11 || isEdge,
        [styles.disabled(this.theme)]: Boolean(props.disabled),
      });
      caption = <span className={captionClass}>{this.props.children}</span>;
    }

    const iconClass = cx({
      [styles.icon(this.theme)]: true,
      [styles.iconUnchecked()]: !props.checked && !isIndeterminate,
    });

    const box = (
      <div className={cx(styles.boxWrapper(this.theme))}>
        <div
          className={cx(styles.box(this.theme), globalClasses.box, {
            [styles.boxChecked(this.theme)]: props.checked || isIndeterminate,
            [styles.boxFocus(this.theme)]: this.state.focusedByTab,
            [styles.boxError(this.theme)]: props.error,
            [styles.boxWarning(this.theme)]: props.warning,
            [styles.boxDisabled(this.theme)]: props.disabled,
          })}
        >
          {(isIndeterminate && <SquareIcon className={iconClass} />) || <OkIcon className={iconClass} />}
        </div>
      </div>
    );

    return (
      <label
        className={rootClass}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        onClick={fixFirefoxModifiedClickOnLabel(this.input)}
      >
        <input {...inputProps} />
        {box}
        {caption}
      </label>
    );
  };

  private handleFocus = (e: React.FocusEvent<any>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      requestAnimationFrame(() => {
        if (keyListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });

      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  };

  private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.props.onBlur?.(e);
    this.setState({ focusedByTab: false });
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
