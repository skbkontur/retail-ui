import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { EmotionConsumer } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { TokenView } from '../Token/TokenView';
import { TokenSize } from '../Token';
import { getStyles } from '../Token/Token.styles';

// a thin character to preserve some space
// for the caret visibillity in the input
const THIN_SPACE = '\u2009';

export interface TextWidthHelperProps {
  text?: string;
  theme: Theme;
  size: TokenSize;
}
/**
 * Херпер позволяет вычислить размеры блока с текстом
 * для последующего выставления размеров input
 */
export class TextWidthHelper extends React.Component<TextWidthHelperProps> {
  private emotion!: Emotion;
  private styles!: ReturnType<typeof getStyles>;
  private element: HTMLDivElement | null = null;

  private getSizeClassName(size: TokenSize) {
    const styles = this.styles;
    switch (size) {
      case 'large':
        return styles.helperContainerLarge(this.props.theme);
      case 'medium':
        return styles.helperContainerMedium(this.props.theme);
      case 'small':
      default:
        return styles.helperContainerSmall(this.props.theme);
    }
  }

  public render() {
    return (
      <EmotionConsumer>
        {(emotion) => {
          this.emotion = emotion;
          this.styles = getStyles(this.emotion);
          return this.renderMain();
        }}
      </EmotionConsumer>
    );
  }

  public renderMain() {
    return (
      <TokenView
        size={this.props.size}
        className={this.emotion.cx(this.styles.helperContainer(), this.getSizeClassName(this.props.size))}
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

  private elementRef = (node: HTMLDivElement) => (this.element = node);
}
