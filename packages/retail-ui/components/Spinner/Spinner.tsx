import React from 'react';
import PropTypes from 'prop-types';

import { locale } from '../LocaleProvider/decorators';
import { cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { ThemeConsumer } from '../ThemeConsumer';
import { hasSvgAnimationSupport } from '../../lib/utils';
import { SpinnerIcon } from '../internal/icons/SpinnerIcon';

import { jsStyles } from './Spinner.styles';
import { SpinnerFallback, types } from './SpinnerFallback';
import { SpinnerLocale, SpinnerLocaleHelper } from './locale';

export type SpinnerType = 'mini' | 'normal' | 'big';

export interface SpinnerProps {
  caption?: React.ReactNode;
  dimmed?: boolean;
  /**
   * Тип спиннера
   * @default normal
   */
  type: SpinnerType;
}

/**
 * DRAFT - инлайн-лоадер
 */

@locale('Spinner', SpinnerLocaleHelper)
export class Spinner extends React.Component<SpinnerProps> {
  public static __KONTUR_REACT_UI__ = 'Spinner';

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
  private theme!: Theme;
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
      <div className={jsStyles.spinner()}>
        <span className={jsStyles.inner()}>
          {hasSvgAnimationSupport && this.renderSpinner(type, dimmed)}
          {!hasSvgAnimationSupport && <SpinnerFallback type={type} dimmed={dimmed} />}
        </span>
        {caption && this.renderCaption(type, caption)}
      </div>
    );
  }

  private renderSpinner = (type: SpinnerType, dimmed?: boolean) => {
    const circleClassName = dimmed ? jsStyles.circleDimmed(this.theme) : jsStyles.circle(this.theme);

    return <SpinnerIcon size={type} className={circleClassName} />;
  };

  private renderCaption = (type: SpinnerType, caption: React.ReactNode) => {
    const captionClassName = cx(jsStyles.caption(type), jsStyles.captionColor(this.theme));
    return <span className={captionClassName}>{caption}</span>;
  };
}
