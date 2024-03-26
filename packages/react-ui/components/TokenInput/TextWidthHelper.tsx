import React from 'react';

import { cx } from '../../lib/theming/Emotion';
import { Theme } from '../../lib/theming/Theme';
import { getDOMRect } from '../../lib/dom/getDOMRect';
import { TokenView } from '../Token/TokenView';
import { TokenSize } from '../Token';
import { styles } from '../Token/Token.styles';

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
  private element: HTMLDivElement | null = null;

  private getSizeClassName(size: TokenSize) {
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
      <TokenView
        size={this.props.size}
        className={cx(styles.helperContainer(), this.getSizeClassName(this.props.size))}
      >
        <div className={styles.helperText()} ref={this.elementRef}>
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
