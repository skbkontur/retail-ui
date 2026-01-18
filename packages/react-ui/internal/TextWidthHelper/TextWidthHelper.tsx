import React from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { getDOMRect } from '../../lib/dom/getDOMRect.js';
import { withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

import { getJsStyles } from './TextWidthHelper.styles.js';

const THIN_SPACE = '\u2009';

interface TextWidthHelperProps {
  text?: string;
}
/**
 * Херпер позволяет вычислить размеры блока с текстом
 */
@withRenderEnvironment
export class TextWidthHelper extends React.Component<TextWidthHelperProps> {
  private element: HTMLDivElement | null = null;
  private emotion!: Emotion;
  private jsStyles!: ReturnType<typeof getJsStyles>;

  public render() {
    this.jsStyles = getJsStyles(this.emotion);

    return (
      <div className={this.jsStyles.root()}>
        <div className={this.jsStyles.textContainer()} ref={this.elementRef}>
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

  private elementRef = (node: HTMLDivElement) => {
    this.element = node;
  };
}
