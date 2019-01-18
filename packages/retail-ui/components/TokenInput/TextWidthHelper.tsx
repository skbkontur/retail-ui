import * as React from 'react';
import { RenderContainer } from '../all';

export interface TextWidthHelperProps {
  text?: string;
}

const styles: React.CSSProperties = {
  position: 'absolute',
  left: -1000,
  top: -1000,
  fontSize: 14
};

export default class TextWidthHelper extends React.Component<
  TextWidthHelperProps
> {
  private element: HTMLDivElement | null = null;

  public render() {
    return (
      <RenderContainer>
        <div style={styles} ref={this.elementRef}>
          {this.props.text}
        </div>
      </RenderContainer>
    );
  }

  public getTextWidth(): number {
    return this.element!.getBoundingClientRect().width;
  }

  private elementRef = (node: HTMLDivElement) => (this.element = node);
}
