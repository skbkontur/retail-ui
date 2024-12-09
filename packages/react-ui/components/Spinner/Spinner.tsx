import React from 'react';
import PropTypes from 'prop-types';
import type { Emotion } from '@emotion/css/create-instance';

import { Theme } from '../../lib/theming/Theme';
import { SpinnerIcon } from '../../internal/SpinnerIcon/SpinnerIcon';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { EmotionConsumer } from '../../lib/theming/Emotion';
import { rootNode, TSetRootNode } from '../../lib/rootNode';
import { createPropsGetter } from '../../lib/createPropsGetter';
import { ThemeContext } from '../../lib/theming/ThemeContext';

import { getStyles } from './Spinner.styles';

const types = ['big', 'mini', 'normal'] as const;

export type SpinnerType = (typeof types)[number];

export interface SpinnerProps extends CommonProps {
  /**
   * Подпись под спиннером
   */
  caption?: React.ReactNode;
  /**
   * Переводит спиннер в "затемнённый режим"
   *
   * Цвет спиннера в "затемнённом режиме" определяется переменной `spinnerDimmedColor`
   */
  dimmed?: boolean;
  /**
   * Размер спиннера и текста
   *
   * @default normal
   */
  type?: SpinnerType;
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

export const SpinnerDataTids = {
  root: 'Spinner__root',
} as const;

type DefaultProps = Required<Pick<SpinnerProps, 'type'>>;

/**
 * Используйте компонент `Spinner`, если вам нужен спиннер, без дополнительного функционала, который предоставляет компонент [Loader](https://tech.skbkontur.ru/react-ui/#/Components/Loader)
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
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private setRootNode!: TSetRootNode;

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return (
            <ThemeContext.Consumer>
              {(theme) => {
                this.theme = theme;
                return this.renderMain();
              }}
            </ThemeContext.Consumer>
          );
        }}
      </EmotionConsumer>
    );
  }

  private renderMain() {
    const { caption = null, dimmed, inline } = this.props;
    const type = this.getProps().type;

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={SpinnerDataTids.root} className={this.styles.spinner()}>
          <span className={this.styles.inner()}>{this.renderSpinner(type, dimmed, inline)}</span>
          {caption && this.renderCaption(type, caption)}
        </div>
      </CommonWrapper>
    );
  }

  private renderSpinner = (type: SpinnerType, dimmed?: boolean, inline?: boolean) => {
    return (
      <SpinnerIcon
        size={type}
        className={this.emotion.cx({
          [this.styles.circle(this.theme)]: !dimmed && !this.props.color,
          [this.styles.circleDimmedColor(this.theme)]: dimmed,
          [this.styles.circleWithoutColorAnimation()]: dimmed || !!this.props.color,
        })}
        dimmed={dimmed}
        width={this.props.width}
        color={this.props.color}
        inline={inline}
      />
    );
  };

  private renderCaption = (type: SpinnerType, caption: React.ReactNode) => {
    return (
      <span className={this.emotion.cx(this.styles[type](this.theme), this.styles.captionColor(this.theme))}>
        {caption}
      </span>
    );
  };
}
