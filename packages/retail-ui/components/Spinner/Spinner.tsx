import * as React from 'react';
import * as PropTypes from 'prop-types';
import { locale } from '../LocaleProvider/decorators';
import { SpinnerLocale, SpinnerLocaleHelper } from './locale';
import { sizeMaps, svgAnimateSupport, types } from './settings';
import styles from './Spinner.module.less';
import SpinnerFallback from './SpinnerFallback';
import jsStyles from './Spinner.styles';
import { cx } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import { ThemeConsumer } from '../ThemeConsumer';

export const SpinnerConfig = {
  hasSvgAnimationSupport: svgAnimateSupport(),
};

export type SpinnerType = 'mini' | 'normal' | 'big';

export interface SpinnerProps {
  caption?: React.ReactNode;
  dimmed?: boolean;
  type?: SpinnerType;
}

const CLOUD_SVG_PATH = `M32.0297086,9.1495774 L31.5978628,8.5870774 C29.3570968,
      5.67148577 25.9305165,4 22.1999329,4 C17.3429265,
      4 12.9026663,7.04270463 11.154144,11.5717304 L10.901479,
      12.2253114 L10.2421341,12.4725311 C6.50853057,13.8727758 4,
      17.4719751 4,21.428492 C4,26.7061833 8.32047079,
      31 13.6314689,31 L32.0297086,31 C38.078569,31 43,26.1036477 43,
      20.0862989 C43,14.3602091 38.493302,9.5769573 32.7403918,
      9.19661922 L32.0297086,9.1495774 Z`;

/**
 * DRAFT - инлайн-лоадер
 */

@locale('Spinner', SpinnerLocaleHelper)
class Spinner extends React.Component<SpinnerProps> {
  public static propTypes = {
    /**
     * Текст рядом с мини-лоадером.
     *
     * 'Загрузка' - значение по-умолчанию
     */
    caption: PropTypes.node,

    dimmed: PropTypes.bool,

    /**
     * Тип спиннера: mini, normal, big
     *
     * Значение по-умолчанию - normal
     *
     * Spinner.types - все доступные типы
     */
    type: PropTypes.oneOf(Object.keys(types)),
  };

  public static defaultProps = {
    type: types.normal,
  };

  public static Types: typeof types;
  private theme!: ITheme;
  private readonly locale!: SpinnerLocale;

  public render() {
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
    const { type, caption = this.locale.loading, dimmed } = this.props;
    const verifiedType = sizeMaps[type!] ? type! : Spinner.defaultProps.type;

    return (
      <div className={styles.spinner}>
        <span className={styles.inner}>
          {SpinnerConfig.hasSvgAnimationSupport && this._renderSpinner(verifiedType)}
          {!SpinnerConfig.hasSvgAnimationSupport && <SpinnerFallback type={verifiedType} dimmed={dimmed} />}
        </span>
        {caption && this._renderCaption(verifiedType, caption)}
      </div>
    );
  }

  private _renderCloud = (type: SpinnerType) => {
    const params = sizeMaps[type];
    const bgClassName = jsStyles.cloudBg(this.theme);
    const strokeClassName = cx(
      styles.cloudStroke,
      this.props.dimmed ? jsStyles.cloudStrokeDimmed(this.theme) : jsStyles.cloudStroke(this.theme),
    );

    return (
      <svg className={styles.cloud} width={params.width} height={params.height} viewBox={params.viewBox}>
        <path d={CLOUD_SVG_PATH} strokeWidth={params.strokeWidth} className={bgClassName} />
        <path d={CLOUD_SVG_PATH} strokeWidth={params.strokeWidth} className={strokeClassName} />
      </svg>
    );
  };

  private _renderCircle = (type: SpinnerType) => {
    const params = sizeMaps[type];
    const theme = this.theme;
    const strokeClassName = this.props.dimmed ? jsStyles.circleStrokeDimmed(theme) : jsStyles.circleStroke(theme);

    return (
      <svg className={cx(styles.circle, jsStyles.circle(theme))} width={params.width} height={params.height}>
        <circle cx="8" cy="8" r="6" strokeWidth={params.strokeWidth} className={strokeClassName} />
      </svg>
    );
  };

  private _renderSpinner = (type: SpinnerType) => {
    if (type === types.mini) {
      return this._renderCircle(type);
    }

    return this._renderCloud(type);
  };

  private _renderCaption = (type: SpinnerType, caption: React.ReactNode) => {
    const captionClassName = cx(
      styles.caption,
      jsStyles.caption(this.theme),
      type === types.mini ? styles.captionRight : styles.captionBottom,
    );
    return <span className={captionClassName}>{caption}</span>;
  };
}

Spinner.Types = types;
export default Spinner;
