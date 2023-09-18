import React from 'react';

import { getDOMRect } from '../../lib/dom/getDOMRect';

import { jsStyles } from './TextWidthHelper.styles';

const THIN_SPACE = '\u2009';

interface TextWidthHelperProps {
  text?: string;
}
/**
 * Херпер позволяет вычислить размеры блока с текстом
 */
export class TextWidthHelper extends React.Component<TextWidthHelperProps> {
  private element: HTMLDivElement | null = null;

  public render() {
    return (
      <div className={jsStyles.root()}>
        <div className={jsStyles.textContainer()} ref={this.elementRef}>
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
