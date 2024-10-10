import React from 'react';
import PropTypes from 'prop-types';

import { Theme } from '../../lib/theming/Theme';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { SpinnerIcon } from '../../internal/SpinnerIcon/SpinnerIcon';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';

import { styles } from './Spinner.styles';

const types = ['big', 'mini', 'normal'] as const;

export type SpinnerType = (typeof types)[number];

export interface SpinnerProps extends CommonProps {
  /** Задает подпись под спиннером.
   * @default "Загрузка" */
  caption?: React.ReactNode;

  /** Переводит спиннер в "затемнённый режим".
   * Цвет спиннера в "затемнённом режиме" определяется переменной `spinnerDimmedColor`. */
  dimmed?: boolean;

  /** Задает размер спиннера и текста.
   * @default normal. */
  type?: SpinnerType;

  /** Уменьшает спиннер для вставки в инлайн элемент. При type = "big"|"normal" размер спиннера уменьшается. */
  inline?: boolean;

  /** Задает толщину спиннера. */
  width?: number;

  /** Задает цвет спиннера. Не работает с пропом dimmed. */
  color?: React.CSSProperties['color'];
}

export const SpinnerDataTids = {
  root: 'Spinner__root',
} as const;

type DefaultProps = Required<Pick<SpinnerProps, 'type'>>;

/**
 * `Spinner` — это зацикленный индикатор, не отображающий прогресс выполнения задачи.
 *
 * Используйте `Spinner`, чтобы показать, что система выполняет команду, которую дал пользователь.
 * Не применяйте `Spinner` для заполнения паузы при загрузке контента, для этого предназначен [GlobalLoader](?path=/docs/display-data-globalloader--docs).
 *
 * Используйте компонент `Spinner`, если вам нужен спиннер, без дополнительного функционала, который предоставляет компонент [Loader](?path=/docs/display-data-loader--docs).
 */
@rootNode
export class Spinner extends React.Component<SpinnerProps> {
  public static __KONTUR_REACT_UI__ = 'Spinner';
  public static displayName = 'Spinner';

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
    type: PropTypes.oneOf(types),
  };

  public static defaultProps: DefaultProps = {
    type: 'normal',
  };

  private getProps = createPropsGetter(Spinner.defaultProps);

  public static Types: Record<SpinnerType, SpinnerType> = Object.assign({}, ...types.map((type) => ({ [type]: type })));
  private theme!: Theme;
  private setRootNode!: TSetRootNode;

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
    const { caption = null, dimmed, inline } = this.props;
    const type = this.getProps().type;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={SpinnerDataTids.root} className={styles.spinner()}>
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
