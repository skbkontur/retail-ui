import type { AriaAttributes } from 'react';
import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import type { GlobalObject } from '../../lib/globalObject.js';
import type { Override } from '../../typings/utility-types.js';
import { KeyListener } from '../../lib/events/keyListener.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { CommonProps, CommonWrapperRestProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { fixFirefoxModifiedClickOnLabel } from '../../lib/events/fixFirefoxModifiedClickOnLabel.js';
import type { SizeProp } from '../../lib/types/props.js';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper/index.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getStyles, globalClasses } from './Checkbox.styles.js';
import { CheckedIcon } from './CheckedIcon.js';
import { IndeterminateIcon } from './IndeterminateIcon.js';

export interface CheckboxProps
  extends
    CommonProps,
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

/**
 * `Checkbox` используется для управления параметром с двумя состояниями.
 *
 * Чекбокс не запускает действие немедленно. Как правило, для этого нужно нажать подтверждающую кнопку.
 * Для немедленного включения какого-то режима в интерфейсе лучше подходит Toggle.
 */
@withRenderEnvironment
@rootNode
@withSize
export class Checkbox extends React.PureComponent<CheckboxProps, CheckboxState> {
  public static __KONTUR_REACT_UI__ = 'Checkbox';
  public static displayName = 'Checkbox';

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

  private getBoxWrapperSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.boxWrapperLarge(this.theme);
      case 'medium':
        return this.styles.boxWrapperMedium(this.theme);
      case 'small':
      default:
        return this.styles.boxWrapperSmall(this.theme);
    }
  }

  private getCheckboxBoxSize() {
    switch (this.size) {
      case 'large':
        return this.theme.checkboxBoxSizeLarge;
      case 'medium':
        return this.theme.checkboxBoxSizeMedium;
      case 'small':
      default:
        return this.theme.checkboxBoxSizeSmall;
    }
  }

  public state = {
    focusedByTab: false,
    indeterminate: this.props.initialIndeterminate || false,
    isShiftPressed: false,
  };
  private size!: SizeProp;

  private globalObject!: GlobalObject;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private input = React.createRef<HTMLInputElement>();
  private getProps = createPropsGetter({});
  private keyListener!: KeyListener;

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
    this.keyListener = new KeyListener(this.globalObject);
    if (this.state.indeterminate && this.input.current) {
      this.input.current.indeterminate = true;
    }

    this.globalObject.document?.addEventListener('keydown', this.handleShiftPress);
    this.globalObject.document?.addEventListener('keyup', this.handleShiftRelease);
  };

  public componentWillUnmount = () => {
    this.globalObject.document?.removeEventListener('keydown', this.handleShiftPress);
    this.globalObject.document?.removeEventListener('keyup', this.handleShiftRelease);
  };

  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public componentDidUpdate(prevProps: CheckboxProps) {
    if (prevProps.checked !== this.props.checked) {
      this.resetIndeterminate();
    }
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

  /**
   * Программная установка фокуса чекбоксу.
   * @public
   */
  public focus(): void {
    this.keyListener.isTabPressed = true;
    this.input.current?.focus();
  }

  /**
   * Программное снятие фокуса с чекбокса.
   * @public
   */
  public blur(): void {
    this.input.current?.blur();
  }

  /**
   * Устанавливает чекбокс в HTML-состояние `indeterminate`.
   * @public
   */
  public setIndeterminate = (): void => {
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
  public resetIndeterminate = (): void => {
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
      onClick,
      type,
      initialIndeterminate,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
      ...rest
    } = props;
    const isIndeterminate = this.state.indeterminate;

    const iconClass = this.cx(
      this.styles.icon(),
      !this.props.checked && !isIndeterminate && this.styles.iconUnchecked(),
    );

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

    const rootClass = this.cx(this.getRootSizeClassName(), {
      [this.styles.root(this.theme)]: true,
      [this.styles.rootChecked(this.theme)]: props.checked || isIndeterminate,
      [this.styles.rootDisableTextSelect()]: this.state.isShiftPressed,
      [this.styles.disabled(this.theme)]: Boolean(this.props.disabled),
    });

    const inputProps = {
      ...rest,
      type: 'checkbox',
      className: this.styles.input(),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleInputClick,
      ref: this.input,
    };

    let caption = null;
    if (this.props.children) {
      const captionClass = this.cx({
        [this.styles.caption(this.theme)]: true,
        [this.styles.disabled(this.theme)]: Boolean(props.disabled),
      });
      caption = <span className={captionClass}>{this.props.children}</span>;
    }

    const box = (
      <div
        className={this.cx(this.getBoxWrapperSizeClassName(), {
          [this.styles.boxWrapper(this.theme)]: true,
        })}
      >
        <div
          className={this.cx(this.styles.box(this.theme), globalClasses.box, {
            [this.styles.boxChecked(this.theme)]: this.props.checked || isIndeterminate,
            [this.styles.boxFocus(this.theme)]: this.state.focusedByTab,
            [this.styles.boxError(this.theme)]: this.props.error,
            [this.styles.boxWarning(this.theme)]: this.props.warning,
            [this.styles.boxDisabled(this.theme)]: this.props.disabled,
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
        onClick={this.handleLabelClick}
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
      this.globalObject.requestAnimationFrame?.(() => {
        if (this.keyListener.isTabPressed) {
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

  private handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    const handleModifierClickInFirefox = fixFirefoxModifiedClickOnLabel(this.input);
    handleModifierClickInFirefox(e);
    if (this.props.onClick && e.target !== this.input.current) {
      e.stopPropagation();
    }
  };

  private handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    this.props.onClick?.(e);
  };
}
