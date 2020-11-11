import React from 'react';

import { jsStyles } from './TokenInput.styles';

export interface TextWidthHelperProps {
  text?: string;
  classHelp: string;
}
/**
 * Херпер позволяет вычислить размеры блока с текстом
 * для последующего выставления размеров input
 */
export class TextWidthHelper extends React.Component<TextWidthHelperProps> {
  private element: HTMLDivElement | null = null;

  public render() {
    return (
      <div className={jsStyles.helperContainer()}>
        <div className={this.props.classHelp} ref={this.elementRef}>
          {this.props.text}
        </div>
      </div>
    );
  }

  public getTextWidth(): number {
    return this.element!.getBoundingClientRect().width;
  }

  public getTextHeight(): number {
    return this.element!.getBoundingClientRect().height;
  }

  private elementRef = (node: HTMLDivElement) => (this.element = node);
}
