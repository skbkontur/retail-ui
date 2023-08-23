import React from 'react';
import {cx} from "@emotion/css";

import { Theme } from '../../lib/theming/Theme';
import { getDOMRect } from '../../lib/dom/getDOMRect';

import { styles } from './TokenInput.styles';
import {TokenInputSize} from "./TokenInput";


// a thin character to preserve some space
// for the caret visibillity in the input
const THIN_SPACE = '\u2009';

export interface TextWidthHelperProps {
  text?: string;
  classHelp: string;
  theme: Theme;
  size: TokenInputSize;
}
/**
 * Херпер позволяет вычислить размеры блока с текстом
 * для последующего выставления размеров input
 */
export class TextWidthHelper extends React.Component<TextWidthHelperProps> {
  private element: HTMLDivElement | null = null;

  private getHelperContainerSizeClassName() {
    switch (this.props.size) {
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
      <div className={cx(this.getHelperContainerSizeClassName(), styles.helperContainer())}>
        <div className={this.props.classHelp} ref={this.elementRef}>
          {this.props.text || THIN_SPACE}
        </div>
      </div>
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
