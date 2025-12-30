import React from 'react';
import type { Emotion } from '@emotion/css/types/create-instance';

import type { Theme } from '../../lib/theming/Theme';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { TokenView } from '../Token/TokenView';
import type { TokenSize } from '../Token';
import { getStyles } from '../Token/Token.styles';
import { withRenderEnvironment } from '../../lib/renderEnvironment';

// a thin character to preserve some space
// for the caret visibillity in the input
const THIN_SPACE = '\u2009';

export interface TextWidthHelperProps {
  /** Задает текст в поле ввода, еще не ставший токеном. */
  text?: string;

  /** Задает объект с переменными темы. Он будет объединён с темой из контекста. */
  theme: Theme;

  /** Задает размер контрола. */
  size: TokenSize;
}
/**
 * Херпер позволяет вычислить размеры блока с текстом
 * для последующего выставления размеров input
 */
@withRenderEnvironment
export class TextWidthHelper extends React.Component<TextWidthHelperProps> {
  private element: HTMLDivElement | null = null;
  private emotion!: Emotion;
  private cx!: Emotion['cx'];
  private styles!: ReturnType<typeof getStyles>;

  private getSizeClassName(size: TokenSize) {
    switch (size) {
      case 'large':
        return this.styles.helperContainerLarge(this.props.theme);
      case 'medium':
        return this.styles.helperContainerMedium(this.props.theme);
      case 'small':
      default:
        return this.styles.helperContainerSmall(this.props.theme);
    }
  }

  public render(): React.JSX.Element {
    this.styles = getStyles(this.emotion);

    return (
      <TokenView
        size={this.props.size}
        className={this.cx(this.styles.helperContainer(), this.getSizeClassName(this.props.size))}
      >
        <div className={this.styles.helperText()} ref={this.elementRef}>
          {this.props.text || THIN_SPACE}
        </div>
      </TokenView>
    );
  }

  public getTextWidth(): number {
    return getDOMRect(this.element).width;
  }

  public getTextHeight(): number {
    return getDOMRect(this.element).height;
  }

  private elementRef = (node: HTMLDivElement) => {
    this.element = node;
  };
}
