import * as React from 'react';
import * as PropTypes from 'prop-types';
import { locale } from '../LocaleProvider/decorators';
import { SpinnerLocale, SpinnerLocaleHelper } from './locale';
import styles from './Spinner.module.less';
import { SpinnerFallback, types } from './SpinnerFallback';
import { jsStyles } from './Spinner.styles';
import { cx } from '../../lib/theming/Emotion';
import { ITheme } from '../../lib/theming/Theme';
import { ThemeConsumer } from '../ThemeConsumer';
import { hasSvgAnimationSupport } from '../../lib/utils';
import { SpinnerIcon } from '../internal/icons/SpinnerIcon';

export type SpinnerType = 'mini' | 'normal' | 'big';

export interface SpinnerProps {
  caption?: React.ReactNode;
  dimmed?: boolean;
  /**
   * Тип спиннера
   * @default mini
   */
  type: SpinnerType;
}

/**
 * DRAFT - инлайн-лоадер
 */

@locale('Spinner', SpinnerLocaleHelper)
export class Spinner extends React.Component<SpinnerProps> {
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

  public static defaultProps: SpinnerProps = {
    type: 'normal',
  };

  public static Types: typeof types = types;
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

    return (
      <div className={styles.spinner}>
        <span className={styles.inner}>
          {hasSvgAnimationSupport && this.renderSpinner(type)}
          {!hasSvgAnimationSupport && <SpinnerFallback type={type} dimmed={dimmed} />}
        </span>
        {caption && this.renderCaption(type, caption)}
      </div>
    );
  }

  private renderCloud = (type: Exclude<SpinnerType, 'mini'>) => {
    const cloudClassName = cx(
      styles.cloudStroke,
      this.props.dimmed ? jsStyles.cloudDimmed(this.theme) : jsStyles.cloud(this.theme),
    );

    return (
      <span className={styles.cloud}>
        <SpinnerIcon size={type} className={cloudClassName} strokeClassName={jsStyles.cloudStroke(this.theme)} />
      </span>
    );
  };

  private renderCircle = () => {
    const theme = this.theme;
    const circleClassName = this.props.dimmed ? jsStyles.circleDimmed(theme) : jsStyles.circle(theme);

    return <SpinnerIcon size="mini" className={circleClassName} />;
  };

  private renderSpinner = (type: SpinnerType) => {
    return type === 'mini' ? this.renderCircle() : this.renderCloud(type);
  };

  private renderCaption = (type: SpinnerType, caption: React.ReactNode) => {
    const captionClassName = cx(
      styles.caption,
      jsStyles.caption(this.theme),
      type === 'mini' ? styles.captionRight : styles.captionBottom,
    );
    return <span className={captionClassName}>{caption}</span>;
  };
}
