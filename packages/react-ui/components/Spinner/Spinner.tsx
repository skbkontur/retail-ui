import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { SpinnerIcon } from '../../internal/SpinnerIcon/SpinnerIcon.js';
import { createPropsGetter } from '../../lib/createPropsGetter.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import { getStyles } from './Spinner.styles.js';

const types = ['big', 'mini', 'normal'] as const;

export type SpinnerType = (typeof types)[number];

export interface SpinnerProps extends CommonProps {
  /**
   * Подпись спиннера
   */
  caption?: React.ReactNode;

  /**
   * Размер индикатора и текста
   *
   * @default normal
   */
  type?: SpinnerType;

  /**
   * Одноцветный режим. Удобная альтернатива пропа `dimmed`
   */
  color?: React.CSSProperties['color'];

  /**
   * Уменьшает размер индикатора для работы в строках. Если задан, то размер индикитора из `type` игнорируется
   *
   * @default false
   */
  inline?: boolean;

  /**
   * Толщина индикатора в пикселях.
   *
   * @default 2
   */
  width?: number;

  /**
   * Одноцветный режим. Цвет спиннера не переливается. Можно кастомизировать переменной `spinnerDimmedColor`
   *
   * @default false
   */
  dimmed?: boolean;
}

export const SpinnerDataTids = {
  root: 'Spinner__root',
} as const;

type DefaultProps = Required<Pick<SpinnerProps, 'type'>>;

/**
 * `Spinner` — это зацикленный индикатор, не отображающий прогресс выполнения задачи.
 */
@withRenderEnvironment
@rootNode
export class Spinner extends React.Component<SpinnerProps> {
  public static __KONTUR_REACT_UI__ = 'Spinner';
  public static displayName = 'Spinner';

  public static defaultProps: DefaultProps = {
    type: 'normal',
  };

  private getProps = createPropsGetter(Spinner.defaultProps);

  public static Types: Record<SpinnerType, SpinnerType> = Object.assign({}, ...types.map((type) => ({ [type]: type })));
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  public getRootNode!: TGetRootNode;
  private setRootNode!: TSetRootNode;

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

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
        className={this.cx({
          [this.styles.circle(this.theme)]: !dimmed && !this.props.color,
          [this.styles.circleDimmedColor(this.theme)]: dimmed,
          [this.styles.circleWithoutColorAnimation()]: dimmed || !!this.props.color,
        })}
        width={this.props.width}
        color={this.props.color}
        inline={inline}
      />
    );
  };

  private renderCaption = (type: SpinnerType, caption: React.ReactNode) => (
    <span className={this.cx(this.styles[type](this.theme), this.styles.captionColor(this.theme))}>{caption}</span>
  );
}
