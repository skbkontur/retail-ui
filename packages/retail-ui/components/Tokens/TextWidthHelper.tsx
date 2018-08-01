import * as React from 'react';
import { RenderContainer } from '../all';

interface Props {
  text?: string;
}

const styles: React.CSSProperties = {
  position: 'absolute',
  left: -1000,
  top: -1000,
  fontSize: 14
};

export default class TextWidthHelper extends React.Component<Props> {
  private elementRef = React.createRef<HTMLDivElement>();

  render() {
    return (
      <RenderContainer>
        <div style={styles} ref={this.elementRef}>
          {this.props.text}
        </div>
      </RenderContainer>
    );
  }

  public getTextWidth(): number {
    return this.elementRef.current!.getBoundingClientRect().width;
  }
}
