import * as React from 'react';
import * as PropTypes from 'prop-types';
import { createPropsGetter } from '../internal/createPropsGetter';
import { Override } from '../../typings/utility-types';
import tabListener from '../../lib/events/tabListener';
import styles from './Link.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Link.styles';
import { ITheme } from '../../lib/theming/Theme';
import { ThemeConsumer } from '../internal/ThemeContext';

interface UseClasses {
  default: string;
  success: string;
  danger: string;
  grayed: string;
}

function getUseClasses(t: ITheme): UseClasses {
  return {
    default: cx(styles.useDefault, jsStyles.useDefault(t)),
    success: cx(styles.useSuccess),
    danger: cx(styles.useDanger),
    grayed: cx(styles.useGrayed, jsStyles.useGrayed(t)),
  };
}

export type LinkProps = Override<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  {
    /** Неактивное состояние */
    disabled?: boolean;
    /** href */
    href?: string;
    /** Иконка */
    icon?: React.ReactElement<any>;
    /** Тип */
    use?: 'default' | 'success' | 'danger' | 'grayed';
    _button?: boolean;
    _buttonOpened?: boolean;
    tabIndex?: number;
    /** onClick */
    onClick?: (event?: React.MouseEvent<HTMLAnchorElement>) => void;
  }
>;

export interface LinkState {
  focusedByTab: boolean;
}

/**
 * Стандартная ссылка.
 * Интерфес пропсов наследуется от `React.AnchorHTMLAttributes<HTMLAnchorElement>`.
 * Все свойства передаются в элемент `<a>`.
 * `className` и `style` не поддерживаются
 */
class Link extends React.Component<LinkProps, LinkState> {
  public static __ADAPTER__: any;

  public static propTypes = {
    disabled: PropTypes.bool,

    href: PropTypes.string,

    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

    use: PropTypes.oneOf(['default', 'success', 'danger', 'grayed']),
  };

  public static defaultProps = {
    href: 'javascript:',
    use: 'default',
  };

  public state = {
    focusedByTab: false,
  };

  private theme!: ITheme;
  private getProps = createPropsGetter(Link.defaultProps);

  public render(): JSX.Element {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { disabled, href, icon, use, _button, _buttonOpened, className, style, ...rest } = this.getProps<
      LinkProps,
      Link
    >();

    let iconElement = null;
    if (icon) {
      iconElement = <span className={styles.icon}>{icon}</span>;
    }

    let arrow = null;
    if (_button) {
      arrow = <span className={styles.arrow} />;
    }

    const props = {
      className: cx({
        [styles.disabled]: !!disabled,
        [jsStyles.disabled(this.theme)]: !!disabled,
        [styles.button]: !!_button,
        [styles.buttonOpened]: !!_buttonOpened,
        [jsStyles.focus(this.theme)]: !disabled && this.state.focusedByTab,
        [getUseClasses(this.theme)[use as keyof UseClasses]]: !!use,
      }),
      href,
      onClick: this._handleClick,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
      tabIndex: this.props.tabIndex,
    };
    if (disabled) {
      props.tabIndex = -1;
    }

    return (
      <a {...rest} {...props}>
        {iconElement}
        {this.props.children}
        {arrow}
      </a>
    );
  }

  private _handleFocus = (event: React.FocusEvent<HTMLAnchorElement>) => {
    if (!this.props.disabled) {
      // focus event fires before keyDown eventlistener
      // so we should check tabPressed in async way
      process.nextTick(() => {
        if (tabListener.isTabPressed) {
          this.setState({ focusedByTab: true });
        }
      });
    }
  };

  private _handleBlur = () => {
    this.setState({ focusedByTab: false });
  };

  private _handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };
}

export default Link;
