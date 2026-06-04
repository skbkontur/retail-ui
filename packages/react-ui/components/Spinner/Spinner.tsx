import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import type { CommonProps } from '../../internal/CommonWrapper/index.js';
import { CommonWrapper } from '../../internal/CommonWrapper/index.js';
import { SpinnerIcon } from '../../internal/SpinnerIcon/SpinnerIcon.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';
import type { TGetRootNode, TSetRootNode } from '../../lib/rootNode/index.js';
import { rootNode } from '../../lib/rootNode/index.js';
import { withSize } from '../../lib/size/SizeDecorator.js';
import type { Theme } from '../../lib/theming/Theme.js';
import { ThemeContext } from '../../lib/theming/ThemeContext.js';
import type { SizeProp } from '../../lib/types/props.js';
import { getStyles } from './Spinner.styles.js';

const types = ['big', 'mini', 'normal'] as const;

/**
 * @deprecated Начиная с версии `6.1`, тип и проп устарели в пользу `SizeContext`. Они будут удалены в `7.0`.
 * @see {@link SizeProp} */
export type SpinnerType = (typeof types)[number];

export interface SpinnerProps extends CommonProps {
  /** Подпись спиннера */
  caption?: React.ReactNode;

  /** Размер спиннера
   * @default small */
  size?: SizeProp;

  /** Размер спиннера
   * @deprecated Начиная с версии `6.1`, тип и проп устарели в пользу нового `SizeContext`. Они будут удалены в `7.0`.
   * @see {@link size} */
  type?: SpinnerType;

  /** Уменьшает размер индикатора для работы в строках. Если задан, то размер спиннера из `size` игнорируется
   * @default false */
  inline?: boolean;

  /** Толщина индикатора в пикселях.
   * @default 2 */
  width?: number;

  /** Цвет спиннера в одноцветном режиме. Альтернатива пропа `dimmed` */
  color?: React.CSSProperties['color'];

  /** Включает одноцветный режим, в котором цвет спиннера не переливается. Можно кастомизировать переменной `spinnerDimmedColor`
   * @default false */
  dimmed?: boolean;
}

export const SpinnerDataTids = {
  root: 'Spinner__root',
} as const;

/** Зацикленный индикатор, не отображающий прогресс выполнения задачи */
@withRenderEnvironment
@rootNode
@withSize
export class Spinner extends React.Component<SpinnerProps> {
  public static __KONTUR_REACT_UI__ = 'Spinner';
  public static displayName = 'Spinner';

  /** @deprecated Начиная с версии `6.1`, тип и проп устарели в пользу `SizeContext`. Они будут удалены в `7.0`. */
  public static Types: Record<SpinnerType, SpinnerType> = Object.assign({}, ...types.map((type) => ({ [type]: type })));
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;
  private theme!: Theme;
  private size!: SizeProp;
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
    const { caption = null, size, type, dimmed, inline } = this.props;
    const parsedSize = size || !type ? this.size : this.typeToSize(type);

    return (
      <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
        <div data-tid={SpinnerDataTids.root} className={this.styles.spinner()}>
          <span className={this.styles.inner()}>{this.renderSpinner(parsedSize, dimmed, inline)}</span>
          {caption && this.renderCaption(parsedSize, caption)}
        </div>
      </CommonWrapper>
    );
  }

  private renderSpinner = (size: SizeProp, dimmed?: boolean, inline?: boolean) => {
    return (
      <SpinnerIcon
        size={size}
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

  private renderCaption = (size: SizeProp, caption: React.ReactNode) => (
    <span className={this.cx(this.styles[size](this.theme), this.styles.captionColor(this.theme))}>{caption}</span>
  );

  private typeToSize = (type: SpinnerType) => {
    switch (type) {
      case 'mini':
        return 'small';
      case 'normal':
        return 'medium';
      case 'big':
        return 'large';
    }
  };
}
