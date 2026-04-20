import type { Emotion } from '@emotion/css/create-instance';
import type { AriaAttributes, InputHTMLAttributes } from 'react';
import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { FocusControlWrapper } from '../../internal/FocusControlWrapper/index.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { isTestEnv } from '../../lib/currentEnvironment.js';
import { KeyListener } from '../../lib/events/keyListener.js';
import type { GlobalObject } from '../../lib/globalObject.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { getStyles, globalClasses } from './Toggle.styles.js';

export interface ToggleProps
  extends
    Pick<AriaAttributes, 'aria-label' | 'aria-describedby'>,
    Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>,
    CommonProps {
  /** @ignore */
  children?: React.ReactNode;

  /** Расположение названия относительно переключателя.
   * @default 'right' */
  captionPosition?: 'left' | 'right';

  /** Включает тогл.
   * @default false */
  checked?: boolean;

  /** Делает тогл включенным по умолчанию. Не работает, если задан проп `checked`. */
  defaultChecked?: boolean;

  /** Блокирует тогл. */
  disabled?: boolean;

  /** Событие изменения значения. */
  onValueChange?: (value: boolean) => void;

  /** Событие клика на тогл. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /** Переводит тогл в состояние предупреждения.
   * @default false */
  warning?: boolean;

  /** Переводит тогл в состояние ошибки.
   * @default false */
  error?: boolean;

  /** Переводит тогл в состояние загрузки: добавляет стили для состояния `loading` и отключает тогл.*/
  loading?: boolean;

  /** Устанавливает фокус на тогл после окончания загрузки страницы.
   * @default false */
  autoFocus?: boolean;

  /** Размер тогла. */
  size?: SizeProp;

  /** Событие получения тоглом фокуса.*/
  onFocus?: React.FocusEventHandler<HTMLInputElement>;

  /** Событие потери тоглом фокуса. */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /** Отключает анимацию. */
  disableAnimations?: boolean;
}

export interface ToggleState {
  checked?: boolean;
  focusByTab?: boolean;
}

export const ToggleDataTids = {
  root: 'Toggle__root',
} as const;

type DefaultProps = Required<Pick<ToggleProps, 'disabled' | 'loading' | 'captionPosition' | 'disableAnimations'>>;

/**
 * Тогл переключает состояния. Например, включает или отключает уведомления в настройках.
 * Состоит из надписи и переключателя.
 */
@withRenderEnvironment
@rootNode
@withSize
export class Toggle extends React.Component<ToggleProps, ToggleState> {
  public static __KONTUR_REACT_UI__ = 'Toggle';
  public static displayName = 'Toggle';

  public static defaultProps: DefaultProps = {
    disabled: false,
    loading: false,
    captionPosition: 'right',
    disableAnimations: isTestEnv,
  };
  private size!: SizeProp;

  private getProps = createPropsGetter(Toggle.defaultProps);

  private styles!: ReturnType<typeof getStyles>;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private globalObject!: GlobalObject;
  private theme!: Theme;
  private input: HTMLInputElement | null = null;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;
  private keyListener!: KeyListener;

  constructor(props: ToggleProps) {
    super(props);

    this.state = {
      focusByTab: false,
      checked: props.defaultChecked,
    };
  }

  public componentDidMount() {
    this.keyListener = new KeyListener(this.globalObject);
    if (this.props.autoFocus) {
      this.keyListener.isTabPressed = true;
      this.focus();
    }
  }

  /**
   * @public
   */
  public focus = (): void => {
    if (this.input) {
      this.keyListener.isTabPressed = true;
      this.input.focus();
    }
  };

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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
    switch (this.size) {
      case 'large':
        return this.styles.containerLarge(this.theme);
      case 'medium':
        return this.styles.containerMedium(this.theme);
      case 'small':
      default:
        return this.styles.containerSmall(this.theme);
    }
  }

  private getHandleSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.handleLarge(this.theme);
      case 'medium':
        return this.styles.handleMedium(this.theme);
      case 'small':
      default:
        return this.styles.handleSmall(this.theme);
    }
  }

  private getButtonSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.buttonLarge(this.theme);
      case 'medium':
        return this.styles.buttonMedium(this.theme);
      case 'small':
      default:
        return this.styles.buttonSmall(this.theme);
    }
  }

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

  private getInputSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.inputLarge(this.theme);
      case 'medium':
        return this.styles.inputMedium(this.theme);
      case 'small':
      default:
        return this.styles.inputSmall(this.theme);
    }
  }

  private getCaptionSizeClassName() {
    switch (this.size) {
      case 'large':
        return this.styles.captionLarge(this.theme);
      case 'medium':
        return this.styles.captionMedium(this.theme);
      case 'small':
      default:
        return this.styles.captionSmall(this.theme);
    }
  }

  private renderMain() {
    const {
      children,
      warning,
      error,
      id,
      name,
      'aria-describedby': ariaDescribedby,
      'aria-label': ariaLabel,
    } = this.props;
    const { loading, captionPosition, disableAnimations } = this.getProps();
    const disabled = this.getProps().disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;

    const containerClassNames = this.cx(this.getContainerSizeClassName(), {
      [this.styles.container(this.theme)]: true,
      [this.styles.containerDisabled(this.theme)]: !!disabled,
      [globalClasses.container]: true,
      [globalClasses.containerDisabled]: !!disabled,
      [globalClasses.containerLoading]: loading,
    });

    const labelClassNames = this.cx(this.getRootSizeClassName(), {
      [this.styles.root(this.theme)]: true,
      [this.styles.rootLeft()]: captionPosition === 'left',
      [this.styles.disabled()]: !!disabled,
      [globalClasses.disabled]: !!disabled,
      [this.styles.disableAnimation()]: disableAnimations,
    });

    let caption = null;
    if (children) {
      const captionClass = this.cx(this.getCaptionSizeClassName(), {
        [this.styles.caption(this.theme)]: true,
        [this.styles.captionLeft(this.theme)]: captionPosition === 'left',
        [this.styles.disabledCaption(this.theme)]: !!disabled,
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <label data-tid={ToggleDataTids.root} className={labelClassNames}>
          <div
            className={this.cx(this.getButtonSizeClassName(), {
              [this.styles.button(this.theme)]: true,
              [this.styles.buttonRight()]: captionPosition === 'left',
              [this.styles.isWarning(this.theme)]: !!warning,
              [this.styles.isError(this.theme)]: !!error,
              [this.styles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
            })}
          >
            <FocusControlWrapper onBlurWhenDisabled={this.resetFocus}>
              <input
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
                className={this.cx(this.getInputSizeClassName(), this.styles.input(this.theme))}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={this.inputRef}
                disabled={disabled}
                id={id}
                name={name}
                role="switch"
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedby}
              />
            </FocusControlWrapper>
            <div className={containerClassNames} />
            <div
              className={this.cx(this.getHandleSizeClassName(), globalClasses.handle, {
                [this.styles.handle(this.theme)]: true,
                [this.styles.handleDisabled(this.theme)]: disabled,
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

    if (this.keyListener.isTabPressed) {
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
