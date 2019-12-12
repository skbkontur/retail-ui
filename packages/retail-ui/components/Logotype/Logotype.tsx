import * as React from 'react';
import * as PropTypes from 'prop-types';
import ArrowChevronDownIcon from '@skbkontur/react-icons/ArrowChevronDown';
import stopPropagation from '../../lib/events/stopPropagation';
import { locale } from '../LocaleProvider/decorators';
import { Nullable } from '../../typings/utility-types';
import { LogotypeLocale, LogotypeLocaleHelper } from './locale';
import ProductWidget from './ProductWidget';
import styles from './Logotype.module.less';
import { cx } from '../../lib/theming/Emotion';
import jsStyles from './Logotype.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';
import CloudIcon from '../internal/icons/CloudIcon';

const INITIAL_WIDTH = 23;
const INITIAL_HEIGHT = 17;
const INITIAL_VERTICAL_ALIGN = -1;
const INITIAL_FONT_SIZE = 22;

interface LogotypePropLocale {
  suffix: string;
  prefix: string;
}

export interface LogotypeProps {
  /**
   * Цвет логотипа в rgb, rgba, hex
   */
  color: string;
  component: React.ComponentType<any> | string;
  /**
   * Адрес ссылки
   */
  href: string;
  /**
   * Суффикс сервиса
   */
  suffix?: string;
  /**
   * Размер шрифта логотипа в пикселях.
   * @default 22
   */
  size: number;
  /**
   * Цвет логотипа Контура в rgb, rgba, hex
   */
  textColor: string;
  /**
   * Наличие виджета с продуктами
   */
  withWidget?: boolean;
  /**
   * нажатие по кнопке открытия виджета
   */
  onArrowClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Словарь текстовых констант
   * @default { prefix: 'к', suffix: 'нтур' }
   */
  locale?: LogotypePropLocale;
}

@locale('Logotype', LogotypeLocaleHelper)
class Logotype extends React.Component<LogotypeProps> {
  public static propTypes = {
    color: PropTypes.string,
    href: PropTypes.string,
    suffix: PropTypes.string,
    size: PropTypes.number,
    textColor: PropTypes.string,
    withWidget: PropTypes.bool,
    locale: PropTypes.shape({
      prefix: PropTypes.string,
      suffix: PropTypes.string,
    }),
  };

  public static defaultProps = {
    color: '#D92932',
    size: INITIAL_FONT_SIZE,
    textColor: '#000',
    component: 'a',
    href: '/',
  };

  private theme!: ITheme;
  private readonly locale!: LogotypeLocale;
  private logoWrapper: Nullable<HTMLElement> = null;
  private isWidgetInited: boolean = false;

  public componentDidMount() {
    if (this.props.withWidget) {
      this.initWidget();
    }
  }

  public componentDidUpdate() {
    if (this.props.withWidget) {
      this.initWidget();
    }
  }

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
    const {
      color,
      textColor,
      component: Component,
      suffix,
      size,
      href,
      withWidget,
      locale: propLocale = this.locale,
      onArrowClick,
    } = this.props;
    const dropdownClassName = cx(styles.dropdown, {
      [styles.inline]: !withWidget,
    });

    const cloudStyle = {
      color,
      width: size * (INITIAL_WIDTH / INITIAL_FONT_SIZE),
      height: size * (INITIAL_HEIGHT / INITIAL_FONT_SIZE),
      verticalAlign: size * (INITIAL_VERTICAL_ALIGN / INITIAL_FONT_SIZE),
    };

    return (
      <div id="spwDropdown" className={dropdownClassName}>
        <span ref={this.refLogoWrapper} className={styles.widgetWrapper}>
          <Component
            href={href}
            tabIndex="-1"
            className={cx(styles.root, jsStyles.root(this.theme))}
            style={{ fontSize: `${size}px` }}
          >
            <span style={{ color: textColor }}>{propLocale.prefix}</span>
            <span className={styles.cloud} style={cloudStyle}>
              <CloudIcon />
            </span>
            <span style={{ color: textColor }}>
              {propLocale.suffix}
              {suffix && '.'}
            </span>
            {suffix && <span style={{ color }}>{suffix}</span>}
          </Component>
          {withWidget && <span className={cx(styles.divider, jsStyles.divider(this.theme))} />}
        </span>
        {withWidget && (
          <button className={styles.button} onClick={onArrowClick}>
            <ArrowChevronDownIcon color="#aaa" size={20} />
          </button>
        )}
      </div>
    );
  }

  private refLogoWrapper = (el: Nullable<HTMLElement>) => {
    if (this.logoWrapper) {
      this.logoWrapper.removeEventListener('click', this.handleNativeLogoClick);
    }

    if (el) {
      el.addEventListener('click', this.handleNativeLogoClick);
    }

    this.logoWrapper = el;
  };

  private handleNativeLogoClick = (event: Event) => {
    stopPropagation(event);
  };

  private initWidget = () => {
    if (!this.isWidgetInited) {
      ProductWidget.init();
      this.isWidgetInited = true;
    }
  };
}

export default Logotype;
