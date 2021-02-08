import React from 'react';
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
    return this.element ? this.element.getBoundingClientRect().width : 0;
  }

  public getTextHeight(): number {
    return this.element!.getBoundingClientRect().height;
  }

  private elementRef = (node: HTMLDivElement) => (this.element = node);
}
