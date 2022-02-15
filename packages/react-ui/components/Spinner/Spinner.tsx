import React from 'react';
import PropTypes from 'prop-types';

import { locale } from '../../lib/locale/decorators';
import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { SpinnerIcon } from '../../internal/icons/SpinnerIcon';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { styles } from './Spinner.styles';
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
  inline?: boolean;
  /**
   * Толщина спиннера
   */
  width?: number;
  /**
   * Цвет спиннера
   */
  color?: React.CSSProperties['color'];
}

/**
 * DRAFT - инлайн-лоадер
 */

@rootNode
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
  private setRootNode!: TSetRootNode;

  constructor(props: SpinnerProps) {
    super(props);
  }

  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeContext.Consumer>
    );
  }

  private renderMain() {
    const { type, caption = this.locale.loading, dimmed, inline } = this.props;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div className={styles.spinner()}>
          <span className={styles.inner()}>{this.renderSpinner(type, dimmed, inline)}</span>
          {caption && this.renderCaption(type, caption)}
        </div>
      </CommonWrapper>
    );
  }

  private renderSpinner = (type: SpinnerType, dimmed?: boolean, inline?: boolean) => {
    return (
      <SpinnerIcon
        size={type}
        className={cx({
          [styles.circle(this.theme)]: !dimmed && !this.props.color,
          [styles.circleDimmedColor(this.theme)]: dimmed,
          [styles.circleWithoutColorAnimation()]: dimmed || !!this.props.color,
        })}
        dimmed={dimmed}
        width={this.props.width}
        color={this.props.color}
        inline={inline}
      />
    );
  };

  private renderCaption = (type: SpinnerType, caption: React.ReactNode) => (
    <span className={cx(styles[type](this.theme), styles.captionColor(this.theme))}>{caption}</span>
  );
}
