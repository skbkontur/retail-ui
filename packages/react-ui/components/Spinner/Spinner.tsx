import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import cn from 'classnames';

import { locale } from '../../lib/locale/decorators';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { SpinnerIcon } from '../../internal/icons/SpinnerIcon';
import { SpinnerOld } from '../../internal/SpinnerOld';
import { CommonProps } from '../../typings/common';
import { extractCommonProps } from '../../lib/filterProps';

import { jsStyles } from './Spinner.styles';
import { SpinnerLocale, SpinnerLocaleHelper } from './locale';

const types: Record<SpinnerType, SpinnerType> = {
  big: 'big',
  mini: 'mini',
  normal: 'normal',
};

export type SpinnerType = 'mini' | 'normal' | 'big';

export interface SpinnerProps extends CommonProps {
  caption?: React.ReactNode;
  dimmed?: boolean;
  /**
   * Тип спиннера
   * @default normal
   */
  type: SpinnerType;
  /**
   * @deprecated Старое поведение спиннера - облачко при среднем и большом размере - исчезнет в 3.0 поведение пересено в `@skbkontur/react-ui-addons` смотри [миграцию](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)
   *
   * @default false
   */
  cloud?: boolean;
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
    /**
     * @deprecated Старое поведение спиннера - облачко при среднем и большом размере
     *
     * @default false - исчезнет в 3.0
     */
    cloud: PropTypes.bool,
  };

  public static defaultProps: SpinnerProps = {
    type: 'normal',
  };

  public static Types: typeof types = types;
  private theme!: Theme;
  private readonly locale!: SpinnerLocale;

  constructor(props: SpinnerProps) {
    super(props);
    warning(!this.props.cloud, 'cloud is deprecated, will removed in 3.0. ');
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {theme => {
          this.theme = theme;
          return !this.props.cloud ? this.renderMain() : this.renderSpinnerOld();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderSpinnerOld() {
    return <SpinnerOld {...this.props} />;
  }

  private renderMain() {
    const { type, caption = this.locale.loading, dimmed } = this.props;
    const [{ className, ...commonProps }] = extractCommonProps(this.props);

    const wrapperProps = {
      ...commonProps,
      className: cn(className, jsStyles.spinner()),
    };

    return (
      <div {...wrapperProps}>
        <span className={jsStyles.inner()}>{this.renderSpinner(type, dimmed)}</span>
        {caption && this.renderCaption(type, caption)}
      </div>
    );
  }

  private renderSpinner = (type: SpinnerType, dimmed?: boolean) => {
    const circleClassName = dimmed ? jsStyles.circleDimmed(this.theme) : jsStyles.circle(this.theme);

    return <SpinnerIcon size={type} className={circleClassName} dimmed={dimmed} />;
  };

  private renderCaption = (type: SpinnerType, caption: React.ReactNode) => (
    <span className={cn(jsStyles[type](this.theme), jsStyles.captionColor(this.theme))}>{caption}</span>
  );
}
