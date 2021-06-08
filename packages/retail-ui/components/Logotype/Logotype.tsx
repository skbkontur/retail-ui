import * as React from 'react';
import * as PropTypes from 'prop-types';
import ArrowChevronDownIcon from '@skbkontur/react-icons/ArrowChevronDown';
import stopPropagation from '../../lib/events/stopPropagation';
import { locale } from '../LocaleProvider/decorators';
import { Nullable } from '../../typings/utility-types';
import { LogotypeLocale, LogotypeLocaleHelper } from './locale';
import ProductWidget from './ProductWidget';
import styles from './Logotype.module.less';
import jsStyles from './Logotype.styles';
import { ThemeConsumer } from '../ThemeConsumer';
import { ITheme } from '../../lib/theming/Theme';
import cn from 'classnames';
import { isIE11 } from '../../lib/utils';

const LOGO_SIZE = 24;

const createCloud = (size: number, color: string) => {
  const INITIAL_WIDTH = 23;
  const INITIAL_HEIGHT = 17;
  const INITIAL_VERTICAL_ALIGN = -1;
  const INITIAL_FONT_SIZE = Logotype.defaultProps.size;

  return (
    <svg
      viewBox={`0 0 ${INITIAL_WIDTH} ${INITIAL_HEIGHT}`}
      className={styles.cloud}
      style={{
        width: size * (INITIAL_WIDTH / INITIAL_FONT_SIZE),
        height: size * (INITIAL_HEIGHT / INITIAL_FONT_SIZE),
        verticalAlign: size * (INITIAL_VERTICAL_ALIGN / INITIAL_FONT_SIZE),
      }}
    >
      <path
        fill={color}
        d="M10.7947842,0 C7.67880353,0 5.01508082,2.01193926 3.95917347,4.8416599 C1.64805866,5.73629303 0,8.0359337 0,10.7178625 C0,14.1880144 2.7403766,17 6.10931511,17 L16.1509748,17 C19.926179,17 23,13.8471079 23,9.9670801 C23,6.23681465 20.163806,3.18047989 16.5974838,2.93810131 C15.2464589,1.11730613 13.1365606,0 10.7947842,0 M10.8198444,2 C12.5405642,2 14.1189689,2.79038796 15.1502918,4.16792125 L15.5920233,4.75130284 L16.3109922,4.80399537 C18.9410506,4.97148234 21,7.20903301 21,9.89635206 C21,12.7059931 18.7525292,15 15.9857004,15 L6.30087549,15 C3.93142023,15 2,13.0315576 2,10.6133468 C2,8.80298205 3.12373541,7.16010423 4.78715953,6.51650261 L5.45807393,6.25868558 L5.71682879,5.57368269 C6.52081712,3.43587145 8.57052529,2 10.8198444,2"
      />
    </svg>
  );
}

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
  /**
   * Логотип Контура
   * @see [@skbkontur/logos](/#/logos)
   */
  konturLogo: React.ReactElement<any> | null;
  /**
   * Логотип продукта
   * @see [@skbkontur/logos](/#/logos)
   */
  productLogo: React.ReactElement<any> | null;
}

@locale('Logotype', LogotypeLocaleHelper)
class Logotype extends React.Component<LogotypeProps> {
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
    size: 22,
    textColor: '#000',
    component: 'a',
    href: '/',
    konturLogo: null,
    productLogo: null
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
      konturLogo,
      component: Component,
      size: sizeProp,
      href,
      withWidget,
      onArrowClick,
    } = this.props;

    const isOldBehavior = !konturLogo;
    const componentClassName = cn(jsStyles.root(), isOldBehavior && jsStyles.rootOld(this.theme));
    const dividerClassName = cn(
      !isOldBehavior && jsStyles.divider(this.theme),
      isOldBehavior && jsStyles.dividerOld(this.theme)
    );
    const buttonClassName = cn({
      [styles.button]: !isOldBehavior,
      [styles.buttonIE11Fallback]: !isOldBehavior && isIE11,
      [styles.buttonOld]: isOldBehavior
    });
    const styleComponent = isOldBehavior ? { fontSize: `${sizeProp}px` } : { height: this.getSize() };
    const logo = isOldBehavior ? this.renderLogoOld() : this.renderLogo();
    const arrowStyles = isOldBehavior ? {} : { height: 24 };

    const dropdownClassName = cn({
      [jsStyles.dropdown()]: !isOldBehavior,
      [jsStyles.dropdownOld()]: isOldBehavior
    });

    const component = (
      <Component
        href={href}
        tabIndex="-1"
        className={componentClassName}
        style={styleComponent}
        {...(isOldBehavior ? {} : { ['data-logotype-component']: '' })}
      >
        {logo}
      </Component>
    );

    return (
      <div id="spwDropdown" className={dropdownClassName}>
        <span ref={this.refLogoWrapper} className={styles.widgetWrapper}>
          {component}
          {withWidget && <span className={dividerClassName} />}
        </span>
        {withWidget && (
          <button className={buttonClassName} onClick={onArrowClick}>
            <ArrowChevronDownIcon color="#aaa" size={20} style={arrowStyles} />
          </button>
        )}
      </div>
    )
  }

  private getSize = (): number => (this.props.size === Logotype.defaultProps.size ? LOGO_SIZE : this.props.size);

  private renderLogo = () => {
    const { konturLogo, productLogo } = this.props;
    const size = this.getSize();

    return (
      <>
        <span className={jsStyles.konturLogo()}>{konturLogo && React.cloneElement(konturLogo, { size })}</span>
        {productLogo && <span className={jsStyles.productLogo()}>{React.cloneElement(productLogo, { size })}</span>}
      </>
    );
  };

  private renderLogoOld = () => {
    const { size, suffix, locale: propLocale = this.locale, color, textColor } = this.props;

    return (
      <>
        <span style={{ color: textColor }}>{propLocale.prefix}</span>
        <span style={{ color }}>{createCloud(size, color)}</span>
        <span style={{ color: textColor }}>
              {propLocale.suffix}
          {suffix && '.'}
            </span>
        {suffix && <span style={{ color }}>{suffix}</span>}
      </>
    );
  };

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
