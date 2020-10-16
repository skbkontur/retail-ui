import React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

import { locale } from '../../lib/locale/decorators';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { hasSvgAnimationSupport } from '../../lib/utils';
import { SpinnerOldIcon } from '../icons/SpinnerOldIcon';

import { jsStyles } from './SpinnerOld.styles';
import { types, SpinnerOldFallback } from './SpinnerOldFallback';
import { SpinnerLocale, SpinnerLocaleHelper } from './locale';

export type SpinnerOldType = 'mini' | 'normal' | 'big';

export interface SpinnerOldProps {
  caption?: React.ReactNode;
  dimmed?: boolean;
  /**
   * Тип спиннера
   * @default mini
   */
  type: SpinnerOldType;
}

export interface SpinnerOldState {
  isBrowser: boolean;
}

/**
 * @deprecated Контур-специфичный компонент, будет удален в 3.0.0, перенесен в `@skbkontur/react-ui-addons` смотри [миграцию](https://github.com/skbkontur/retail-ui/blob/master/packages/react-ui/MIGRATION.md)
 */
@locale('Spinner', SpinnerLocaleHelper)
export class SpinnerOld extends React.Component<SpinnerOldProps, SpinnerOldState> {
  public static __KONTUR_REACT_UI__ = 'SpinnerOld';

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
     * SpinnerOld.types - все доступные типы
     */
    type: PropTypes.oneOf(Object.keys(types)),
  };

  public static defaultProps: SpinnerOldProps = {
    type: 'normal',
  };

  public static Types: typeof types = types;
  public state: SpinnerOldState = {
    isBrowser: false,
  };
  private theme!: Theme;
  private readonly locale!: SpinnerLocale;

  public constructor(props: SpinnerOldProps) {
    super(props);
  }

  public componentDidMount() {
    this.setState({ isBrowser: true });
  }

  public render() {
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
    const { type, caption = this.locale.loading, dimmed } = this.props;

    const spinnerInner = this.state.isBrowser && (
      <>
        {hasSvgAnimationSupport && this.renderSpinnerOld(type)}
        {!hasSvgAnimationSupport && <SpinnerOldFallback type={type} dimmed={dimmed} />}
      </>
    );

    return (
      <div className={jsStyles.spinner()}>
        <span className={jsStyles.inner()}>{spinnerInner}</span>
        {caption && this.renderCaption(type, caption)}
      </div>
    );
  }

  private renderCloud = (type: Exclude<SpinnerOldType, 'mini'>) => {
    const cloudClassName = this.props.dimmed ? jsStyles.cloudDimmed(this.theme) : jsStyles.cloud(this.theme);

    return (
      <span className={jsStyles.cloudWrapper()}>
        <SpinnerOldIcon size={type} className={cloudClassName} strokeClassName={jsStyles.cloudStroke(this.theme)} />
      </span>
    );
  };

  private renderCircle = () => {
    const theme = this.theme;
    const circleClassName = this.props.dimmed ? jsStyles.circleDimmed(theme) : jsStyles.circle(theme);

    return <SpinnerOldIcon size="mini" className={circleClassName} />;
  };

  private renderSpinnerOld = (type: SpinnerOldType) => {
    return type === 'mini' ? this.renderCircle() : this.renderCloud(type);
  };

  private renderCaption = (type: SpinnerOldType, caption: React.ReactNode) => {
    return <span className={cn(jsStyles[type](this.theme), jsStyles.caption(this.theme))}>{caption}</span>;
  };
}
