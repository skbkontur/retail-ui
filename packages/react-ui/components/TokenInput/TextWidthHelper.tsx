import React from 'react';

import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './TokenInput.styles';

// a thin character to preserve some space
// for the caret visibillity in the input
const THIN_SPACE = '\u2009';

export interface TextWidthHelperProps {
  text?: string;
  classHelp: string;
  theme: Theme;
}
/**
 * Херпер позволяет вычислить размеры блока с текстом
 * для последующего выставления размеров input
 */
export class TextWidthHelper extends React.Component<TextWidthHelperProps> {
  private element: HTMLDivElement | null = null;

  public render() {
    return (
      <div className={jsStyles.helperContainer(this.props.theme)}>
        <div className={this.props.classHelp} ref={this.elementRef}>
          {this.props.text || THIN_SPACE}
        </div>
      </div>
    );
  }

  public getTextWidth(): number {
    return this.element ? this.element.getBoundingClientRect().width : 0;
  }

  public getTextHeight(): number {
    return this.element!.getBoundingClientRect().height;
  }

  private elementRef = (node: HTMLDivElement) => (this.element = node);
}
