import * as React from 'react';
import * as PropTypes from 'prop-types';
import ArrowChevronDownIcon from '@skbkontur/react-icons/ArrowChevronDown';

import stopPropagation from '../../lib/events/stopPropagation';
import { locale } from '../LocaleProvider/decorators';
import { Nullable } from '../../typings/utility-types';
import { LogotypeLocale, LogotypeLocaleHelper } from './locale';
import ProductWidget from './ProductWidget';
import styles from './Logotype.less';
import classnames from 'classnames';

const createCloud = (color: string) => (
  <svg width="24" height="17" viewBox="0 0 24 17" className={styles.cloud}>
    <path
      fill={color}
      d="M10.7947842,0 C7.67880353,0 5.01508082,2.01193926 3.95917347,4.8416599 C1.64805866,5.73629303 0,8.0359337 0,10.7178625 C0,14.1880144 2.7403766,17 6.10931511,17 L16.1509748,17 C19.926179,17 23,13.8471079 23,9.9670801 C23,6.23681465 20.163806,3.18047989 16.5974838,2.93810131 C15.2464589,1.11730613 13.1365606,0 10.7947842,0 M10.8198444,2 C12.5405642,2 14.1189689,2.79038796 15.1502918,4.16792125 L15.5920233,4.75130284 L16.3109922,4.80399537 C18.9410506,4.97148234 21,7.20903301 21,9.89635206 C21,12.7059931 18.7525292,15 15.9857004,15 L6.30087549,15 C3.93142023,15 2,13.0315576 2,10.6133468 C2,8.80298205 3.12373541,7.16010423 4.78715953,6.51650261 L5.45807393,6.25868558 L5.71682879,5.57368269 C6.52081712,3.43587145 8.57052529,2 10.8198444,2"
    />
  </svg>
);

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
   * Цвет логотипа Контура в rgb, rgba, hex
   */
  textColor: string;
  /**
   * Наличие виджета с продуктами
   */
  withWidget?: boolean;
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
    textColor: PropTypes.string,
    withWidget: PropTypes.bool,
    locale: PropTypes.shape({
      prefix: PropTypes.string,
      suffix: PropTypes.string,
    }),
  };

  public static defaultProps = {
    color: '#D92932',
    textColor: '#000',
    component: 'a',
    href: '/',
  };

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
    const {
      color,
      textColor,
      component: Component,
      suffix,
      href,
      withWidget,
      locale: propLocale = this.locale,
    } = this.props;
    const dropdownClassName = classnames(styles.dropdown, {
      [styles.inline]: !withWidget,
    });

    return (
      <div id="spwDropdown" className={dropdownClassName}>
        <span ref={this.refLogoWrapper} className={styles.widgetWrapper}>
          <Component href={href} tabIndex="-1" className={styles.root}>
            <span style={{ color: textColor }}>{propLocale.prefix}</span>
            <span style={{ color }}>{createCloud(color)}</span>
            <span style={{ color: textColor }}>
              {propLocale.suffix}
              {suffix && '.'}
            </span>
            {suffix && <span style={{ color }}>{suffix}</span>}
          </Component>
          {withWidget && <span className={styles.divider} />}
        </span>
        {withWidget && (
          <button className={styles.button}>
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
