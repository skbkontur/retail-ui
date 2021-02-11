import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import warning from 'warning';

import { stopPropagation } from '../../lib/events/stopPropagation';
import { locale } from '../../lib/locale/decorators';
import { Nullable } from '../../typings/utility-types';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CloudIcon } from '../../internal/icons/CloudIcon';
import { ArrowChevronDownIcon } from '../../internal/icons/16px';
import { CommonWrapper, CommonProps } from '../../internal/CommonWrapper';

import { jsStyles } from './Logotype.styles';
import { ProductWidget } from './ProductWidget';
import { LogotypeLocale, LogotypeLocaleHelper } from './locale';

const INITIAL_WIDTH = 25;
const INITIAL_HEIGHT = 18;
const INITIAL_VERTICAL_ALIGN = -1;
const INITIAL_FONT_SIZE = 22;

interface LogotypePropLocale {
  suffix: string;
  prefix: string;
}

export interface LogotypeProps extends CommonProps {
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
   * @deprecated
   * @default { prefix: 'к', suffix: 'нтур' }
   */
  locale?: LogotypePropLocale;
}

/**
 * @deprecated Контур-специфичный компонент, будет удален в 3.0.0, перенесен в `@skbkontur/react-ui-addons` смотри [миграцию](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)
 */
@locale('Logotype', LogotypeLocaleHelper)
export class Logotype extends React.Component<LogotypeProps> {
  public static __KONTUR_REACT_UI__ = 'Logotype';

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
    textColor: '#333333',
    component: 'a',
    href: '/',
  };

  private theme!: Theme;
  private readonly locale!: LogotypeLocale;
  private logoWrapper: Nullable<HTMLElement> = null;
  private isWidgetInited = false;

  public constructor(props: LogotypeProps) {
    super(props);
    warning(
      false,
      `Logotype has been deprecated, use Logotype from @skbkontur/react-ui-addons instead, see [migration](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)`,
    );
  }

  public componentDidMount() {
    if (this.props.withWidget) {
      this.initWidget();
    }

    warning(!this.props.locale, 'locale props is deprecated, use LocaleProvider instead');
  }

  public componentDidUpdate() {
    if (this.props.withWidget) {
      this.initWidget();
    }
  }

  public render(): JSX.Element {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
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
    const dropdownClassName = cn({
      [jsStyles.dropdown()]: true,
      [jsStyles.inline()]: !withWidget,
    });

    const cloudStyle = {
      color,
      width: size * (INITIAL_WIDTH / INITIAL_FONT_SIZE),
      height: size * (INITIAL_HEIGHT / INITIAL_FONT_SIZE),
      verticalAlign: size * (INITIAL_VERTICAL_ALIGN / INITIAL_FONT_SIZE),
    };

    return (
      <CommonWrapper {...this.props}>
        <div id="spwDropdown" className={dropdownClassName}>
          <span ref={this.refLogoWrapper} className={jsStyles.widgetWrapper()}>
            <Component
              href={href}
              tabIndex="-1"
              className={jsStyles.root(this.theme)}
              style={{ fontSize: `${size}px` }}
            >
              <span style={{ color: textColor }}>{propLocale.prefix}</span>
              <span className={jsStyles.cloud()} style={cloudStyle}>
                <CloudIcon />
              </span>
              <span style={{ color: textColor }}>
                {propLocale.suffix}
                {suffix && '.'}
              </span>
              {suffix && <span style={{ color }}>{suffix}</span>}
            </Component>
            {withWidget && <span className={jsStyles.divider(this.theme)} />}
          </span>
          {withWidget && (
            <button className={jsStyles.button()} onClick={onArrowClick}>
              <ArrowChevronDownIcon color="#aaa" size={20} />
            </button>
          )}
        </div>
      </CommonWrapper>
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
