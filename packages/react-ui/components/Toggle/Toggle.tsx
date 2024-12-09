import React, { AriaAttributes } from 'react';
import PropTypes from 'prop-types';
import type { Emotion } from '@emotion/css/create-instance';

import { keyListener } from '../../lib/events/keyListener';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { isTestEnv } from '../../lib/currentEnvironment';
import { SizeProp } from '../../lib/types/props';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles, globalClasses } from './Toggle.styles';

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
  public static displayName = 'Toggle';

  public static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    warning: PropTypes.bool,
    onValueChange: PropTypes.func,
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
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
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
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private getContainerSizeClassName() {
    const styles = this.styles;
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
    const styles = this.styles;
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
    const styles = this.styles;
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

  private getInputSizeClassName() {
    const styles = this.styles;
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

  private getCaptionSizeClassName() {
    const styles = this.styles;
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
    const { children, warning, error, id, 'aria-describedby': ariaDescribedby, 'aria-label': ariaLabel } = this.props;
    const { loading, captionPosition, disableAnimations } = this.getProps();
    const disabled = this.getProps().disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;
    const styles = this.styles;
    const containerClassNames = this.emotion.cx(this.getContainerSizeClassName(), {
      [styles.container(this.theme)]: true,
      [styles.containerDisabled(this.theme)]: !!disabled,
      [globalClasses.container]: true,
      [globalClasses.containerDisabled]: !!disabled,
      [globalClasses.containerLoading]: loading,
    });

    const labelClassNames = this.emotion.cx(this.getRootSizeClassName(), {
      [styles.root(this.theme)]: true,
      [styles.rootLeft()]: captionPosition === 'left',
      [styles.disabled()]: !!disabled,
      [globalClasses.disabled]: !!disabled,
      [styles.disableAnimation()]: disableAnimations,
    });

    let caption = null;
    if (children) {
      const captionClass = this.emotion.cx(this.getCaptionSizeClassName(), {
        [styles.caption(this.theme)]: true,
        [styles.captionLeft(this.theme)]: captionPosition === 'left',
        [styles.disabledCaption(this.theme)]: !!disabled,
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <label data-tid={ToggleDataTids.root} className={labelClassNames}>
          <div
            className={this.emotion.cx(this.getButtonSizeClassName(), {
              [styles.button(this.theme)]: true,
              [styles.buttonRight()]: captionPosition === 'left',
              [styles.isWarning(this.theme)]: !!warning,
              [styles.isError(this.theme)]: !!error,
              [styles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
            })}
          >
            <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
              <input
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
                className={this.emotion.cx(this.getInputSizeClassName(), styles.input(this.theme))}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={this.inputRef}
                disabled={disabled}
                id={id}
                role="switch"
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
              />
            </FocusControlWrapper>
            <div className={containerClassNames} />
            <div
              className={this.emotion.cx(this.getHandleSizeClassName(), globalClasses.handle, {
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

  private resetFocus = () => this.setState({ focusByTab: false });

  private handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    this.resetFocus();
    this.props.onBlur?.(event);
  };

  private isUncontrolled() {
    return this.props.checked === undefined;
  }
}
