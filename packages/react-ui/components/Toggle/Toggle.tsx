import React, { AriaAttributes } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isTestEnv } from '../../lib/currentEnvironment';
import { isTheme2022 } from '../../lib/theming/ThemeHelpers';
import { SizeProp } from '../../lib/types/props';

import { styles, globalClasses } from './Toggle.styles';

/**
 * @deprecated use SizeProp
 */
export type ToggleSize = SizeProp;

let colorWarningShown = false;

export interface ToggleProps extends Pick<AriaAttributes, 'aria-label' | 'aria-describedby'>, CommonProps {
  children?: React.ReactNode;
  /**
   * Положение `children` относительно переключателя.
   * @default 'right'
   */
  captionPosition?: 'left' | 'right';
  /**
   * Состояние `тогла`, если `true` - `тогл` будет включён, иначе выключен.
   * @default false
   */
  checked?: boolean;
  /**
   * Делает `тогл` включенным по умолчанию.
   */
  defaultChecked?: boolean;
  /**
   * Отключает `тогл`.
   */
  disabled?: boolean;
  /**
   * Событие вызывающееся, когда значение `тогла` меняется, передаёт текущее значение тогла в переданную функцию.
   */
  onValueChange?: (value: boolean) => void;
  /**
   * Событие вызывающееся при клике на `тогл`.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Состояние валидации при предупреждении.
   * @default false
   */
  warning?: boolean;
  /**
   * Состояние валидации при ошибке.
   * @default false
   */
  error?: boolean;
  /**
   * Добавляет стили для состояния `loading` и отключает `тогл`.
   */
  loading?: boolean;
  /**
   * Если true, выставляет фокус на `тогле` после загрузки страницы.
   */
  autoFocus?: boolean;
  /** Размер */
  size?: SizeProp;
  /**
   * Событие вызывающееся, когда `тогл` получает фокус.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * Событие вызывающееся, когда `тогл` теряет фокус.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /**
   * @deprecated используйте переменную темы `toggleBgChecked` вместо этого пропа.
   */
  color?: React.CSSProperties['color'];
  /**
   * HTML-атрибут `id` для передачи во внутренний `<input />`.
   */
  id?: string;
  /**
   * Не показывать анимацию
   */
  disableAnimations?: boolean;
}

export interface ToggleState {
  checked?: boolean;
  focusByTab?: boolean;
}

export const ToggleDataTids = {
  root: 'Toggle__root',
} as const;

type DefaultProps = Required<
  Pick<ToggleProps, 'disabled' | 'loading' | 'captionPosition' | 'disableAnimations' | 'size'>
>;

/**
 * _Примечание:_ под тоглом понимается полный компонент т.е. надпись + переключатель, а не просто переключатель.
 */
@rootNode
export class Toggle extends React.Component<ToggleProps, ToggleState> {
  public static __KONTUR_REACT_UI__ = 'Toggle';

  public static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    warning: PropTypes.bool,
    onValueChange: PropTypes.func,
    color: (props: ToggleProps) => {
      if (props.color && !colorWarningShown) {
        warning(false, `[Toggle]: prop 'color' is deprecated. Please, use theme variable 'toggleBgChecked' instead. `);
        colorWarningShown = true;
      }
    },
  };

  public static defaultProps: DefaultProps = {
    disabled: false,
    loading: false,
    captionPosition: 'right',
    disableAnimations: isTestEnv,
    size: 'small',
  };

  private getProps = createPropsGetter(Toggle.defaultProps);

  private theme!: Theme;
  private input: HTMLInputElement | null = null;
  private setRootNode!: TSetRootNode;

  constructor(props: ToggleProps) {
    super(props);

    this.state = {
      focusByTab: false,
      checked: props.defaultChecked,
    };
  }

  public componentDidMount() {
    if (this.props.autoFocus) {
      keyListener.isTabPressed = true;
      this.focus();
    }
  }

  /**
   * @public
   */
  public focus = () => {
    if (this.input) {
      keyListener.isTabPressed = true;
      this.input.focus();
    }
  };

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

  private getContainerSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.containerLarge(this.theme);
      case 'medium':
        return styles.containerMedium(this.theme);
      case 'small':
      default:
        return styles.containerSmall(this.theme);
    }
  }

  private getHandleSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.handleLarge(this.theme);
      case 'medium':
        return styles.handleMedium(this.theme);
      case 'small':
      default:
        return styles.handleSmall(this.theme);
    }
  }

  private getButtonSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.buttonLarge(this.theme);
      case 'medium':
        return styles.buttonMedium(this.theme);
      case 'small':
      default:
        return styles.buttonSmall(this.theme);
    }
  }

  private getRootSizeClassName() {
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

  private getInputSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.inputLarge(this.theme);
      case 'medium':
        return styles.inputMedium(this.theme);
      case 'small':
      default:
        return styles.inputSmall(this.theme);
    }
  }

  private getActiveHandleSizeClassName() {
    if (isTheme2022(this.theme)) {
      return '';
    }
    switch (this.getProps().size) {
      case 'large':
        return styles.activeHandleLarge(this.theme);
      case 'medium':
        return styles.activeHandleMedium(this.theme);
      case 'small':
      default:
        return styles.activeHandleSmall(this.theme);
    }
  }

  private getCaptionSizeClassName() {
    switch (this.getProps().size) {
      case 'large':
        return styles.captionLarge(this.theme);
      case 'medium':
        return styles.captionMedium(this.theme);
      case 'small':
      default:
        return styles.captionSmall(this.theme);
    }
  }

  private renderMain() {
    const {
      children,
      warning,
      error,
      color,
      id,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
    } = this.props;
    const { loading, captionPosition, disableAnimations } = this.getProps();
    const disabled = this.getProps().disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;

    const containerClassNames = cx(this.getContainerSizeClassName(), {
      [styles.container(this.theme)]: true,
      [styles.containerDisabled(this.theme)]: !!disabled,
      [globalClasses.container]: true,
      [globalClasses.containerDisabled]: !!disabled,
      [globalClasses.containerLoading]: loading,
    });

    const labelClassNames = cx(this.getRootSizeClassName(), this.getActiveHandleSizeClassName(), {
      [styles.root(this.theme)]: true,
      [styles.rootLeft()]: captionPosition === 'left',
      [styles.disabled()]: !!disabled,
      [globalClasses.disabled]: !!disabled,
      [styles.disableAnimation()]: disableAnimations,
    });

    let caption = null;
    if (children) {
      const captionClass = cx(this.getCaptionSizeClassName(), {
        [styles.caption(this.theme)]: true,
        [styles.captionLeft(this.theme)]: captionPosition === 'left',
        [styles.disabledCaption(this.theme)]: !!disabled,
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    return (
      <CommonWrapper
        rootNodeRef={this.setRootNode}
        dataAttributes={{ error: this.props.error, warning: this.props.warning }}
        {...this.props}
      >
        <label data-tid={ToggleDataTids.root} className={labelClassNames}>
          <div
            className={cx(this.getButtonSizeClassName(), {
              [styles.button(this.theme)]: true,
              [styles.buttonRight()]: captionPosition === 'left',
              [styles.isWarning(this.theme)]: !!warning,
              [styles.isError(this.theme)]: !!error,
              [styles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
            })}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={this.handleChange}
              className={cx(this.getInputSizeClassName(), isTheme2022(this.theme) && styles.input2022(this.theme), {
                [styles.input(this.theme)]: true,
              })}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              ref={this.inputRef}
              disabled={disabled}
              id={id}
              role="switch"
              aria-label={ariaLabel}
              aria-describedby={ariaDescribedby}
            />
            <div
              className={containerClassNames}
              style={
                checked && color && !disabled
                  ? {
                      backgroundColor: color,
                      boxShadow: `inset 0 0 0 1px ${color}`,
                    }
                  : undefined
              }
            >
              {!isTheme2022(this.theme) && (
                <div
                  className={cx(styles.activeBackground(), globalClasses.background, {
                    [styles.activeBackgroundLoading(this.theme)]: loading,
                    [styles.disabledBackground(this.theme)]: disabled,
                  })}
                  style={
                    checked && color && !disabled
                      ? {
                          backgroundColor: color,
                          boxShadow: `inset 0 0 0 1px ${color}`,
                        }
                      : undefined
                  }
                />
              )}
            </div>
            <div
              className={cx(this.getHandleSizeClassName(), globalClasses.handle, {
                [styles.handle(this.theme)]: true,
                [styles.handleDisabled(this.theme)]: disabled,
              })}
            />
          </div>
          {caption}
        </label>
      </CommonWrapper>
    );
  }

  private inputRef = (element: HTMLInputElement) => {
    this.input = element;
  };

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(event.target.checked);
    }

    if (this.isUncontrolled()) {
      this.setState({
        checked: event.target.checked,
      });
    }

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  };

  private handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    if (keyListener.isTabPressed) {
      this.setState({ focusByTab: true });
    }
  };

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({
      focusByTab: false,
    });
  };

  private isUncontrolled() {
    return this.props.checked === undefined;
  }
}
