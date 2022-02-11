import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';

import { keyListener } from '../../lib/events/keyListener';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { getDefaultProps } from '../../lib/getDefaultProps';

import { styles, globalClasses } from './Toggle.styles';

let colorWarningShown = false;

export interface ToggleProps extends CommonProps {
  children?: React.ReactNode;
  /**
   * Положение `children` относительно переключателя.
   * @default 'right'
   */
  captionPosition: 'left' | 'right';
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
   * Cостояние валидации при предупреждении.
   * @default false
   */
  warning?: boolean;
  /**
   * Cостояние валидации при ошибке.
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
}

export interface ToggleState {
  checked?: boolean;
  focusByTab?: boolean;
}

const defaultPropsInstance = {
  disabled: false,
  loading: false,
  captionPosition: 'right',
};
const defaultProps = getDefaultProps<ToggleProps>(defaultPropsInstance as ToggleProps);

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
    color(props: ToggleProps) {
      if (props.color && !colorWarningShown) {
        warning(false, `[Toggle]: prop 'color' is deprecated. Please, use theme variable 'toggleBgChecked' instead. `);
        colorWarningShown = true;
      }
    },
  };

  public static defaultProps = defaultProps;

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

  private renderMain() {
    const { children, captionPosition, warning, error, loading, color, id } = this.props;
    const disabled = this.props.disabled || loading;
    const checked = this.isUncontrolled() ? this.state.checked : this.props.checked;

    const containerClassNames = cx(styles.container(this.theme), {
      [styles.containerDisabled(this.theme)]: !!disabled,
      [globalClasses.container]: true,
      [globalClasses.containerDisabled]: !!disabled,
      [globalClasses.containerLoading]: loading,
    });

    const labelClassNames = cx(styles.root(this.theme), {
      [styles.rootLeft()]: captionPosition === 'left',
      [styles.disabled()]: !!disabled,
      [globalClasses.disabled]: !!disabled,
    });

    let caption = null;
    if (children) {
      const captionClass = cx(styles.caption(this.theme), {
        [styles.captionLeft(this.theme)]: captionPosition === 'left',
        [styles.disabledCaption(this.theme)]: !!disabled,
      });
      caption = <span className={captionClass}>{children}</span>;
    }

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <label className={labelClassNames}>
          <div
            className={cx(styles.outline(this.theme), {
              [styles.isWarning(this.theme)]: !!warning,
              [styles.isError(this.theme)]: !!error,
              [styles.focused(this.theme)]: !disabled && !!this.state.focusByTab,
            })}
          >
            <span className={cx(styles.wrapper(this.theme))}>
              <input
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
                className={styles.input(this.theme)}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                ref={this.inputRef}
                disabled={disabled}
                id={id}
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
              </div>
              <div
                className={cx(styles.handle(this.theme), globalClasses.handle, {
                  [styles.handleDisabled(this.theme)]: disabled,
                })}
              />
            </span>
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
