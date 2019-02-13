import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Sticky, { StickyProps } from '../Sticky';
import { findDOMNode } from 'react-dom';
import { createPropsGetter } from '../../internal/createPropsGetter';

const TEXT = (
  <div>
    On the other hand, we denounce with righteous indignation and dislike men
    who are so beguiled and demoralized by the charms of pleasure of the moment,
    so blinded by desire, that they cannot foresee the pain and trouble that are
    bound to ensue; and equal blame belongs to those who fail in their duty
    through weakness of will, which is the same as saying through shrinking from
    toil and pain. These cases are perfectly simple and easy to distinguish. In
    a free hour, when our power of choice is untrammelled and when nothing
    prevents our being able to do what we like best, every pleasure is to be
    welcomed and every pain avoided. But in certain circumstances and owing to
    the claims of duty or the obligations of business it will frequently occur
    that pleasures have to be repudiated and annoyances accepted. The wise man
    therefore always holds in these matters to this principle of selection: he
    rejects pleasures to secure other greater pleasures, or else he endures
    pains to avoid worse pains.
  </div>
);

class SampleTop extends React.Component {
  private stopElement: HTMLDivElement | null = null;

  public render() {
    return (
      <div>
        {TEXT}
        <Sticky side="top" getStop={this.getStickyStopElement}>
          {fixed => (
            <div
              style={{
                padding: 10,
                background: '#f99'
              }}
            >
              Small loan of a million dollars
              {fixed ? ' fixed' : <div>not fixed</div>}
            </div>
          )}
        </Sticky>
        {TEXT}
        <div
          style={{
            height: 2,
            background: '#999'
          }}
          ref={this.refStop}
        />
        {TEXT}
        {TEXT}
      </div>
    );
  }

  private refStop = (element: HTMLDivElement) => {
    this.stopElement = element;
  };

  private getStickyStopElement = () => this.stopElement;
}

class SampleBottom extends React.Component {
  private stopElement: HTMLDivElement | null = null;

  public render() {
    return (
      <div>
        {TEXT}
        {TEXT}
        <div
          style={{
            height: 2,
            background: '#999'
          }}
          ref={this.refStop}
        />
        {TEXT}
        <Sticky side="bottom" getStop={this.getStickyStopElement}>
          {fixed => (
            <div
              style={{
                padding: 10,
                background: '#f99'
              }}
            >
              Small loan of a million dollars
              {fixed ? ' fixed' : <div>not fixed</div>}
            </div>
          )}
        </Sticky>
        {TEXT}
      </div>
    );
  }

  private refStop = (element: HTMLDivElement) => {
    this.stopElement = element;
  };

  private getStickyStopElement = () => this.stopElement;
}

class PositionsAndMargins extends React.Component {
  public static Sticker = (
    props: StickyProps & {
      margins: boolean;
      reference: (el: Element | null) => void;
    }
  ) => {
    const { margins, reference, ...stickyProps } = props;
    const stickerStyles = {
      background: '#f99',
      padding: 15,
      margin: margins ? 20 : 0,
      border: '2px solid #f55'
    };
    return (
      <div ref={reference}>
        <Sticky {...stickyProps}>
          {fixed => (
            <div style={stickerStyles}>
              {`${stickyProps.side}, fixed: ${fixed}`}
            </div>
          )}
        </Sticky>
      </div>
    );
  };

  public static Gap = ({
    height
  }: {
    height: React.CSSProperties['height'];
  }) => (
    <div
      style={{
        height,
        background: `repeating-linear-gradient(
        60deg,
        #fafafa,
        #fafafa 20px,
        #dfdede 20px,
        #dfdede 40px
      )`
      }}
    />
  );

  private stopElement: HTMLElement | null = null;
  private bottomElement: HTMLElement | null = null;
  private topElement: HTMLElement | null = null;

  public state = {
    absolute: false,
    margins: false,
    frame: false
  };

  public render() {
    const { absolute, margins } = this.state;
    const stopStyles = {
      border: '2px dashed #888',
      padding: 10
    };
    return (
      <div
        style={{
          width: '100vw'
        }}
      >
        <div
          id="control-buttons"
          style={{
            width: 200,
            position: 'fixed',
            top: 10,
            right: 10,
            padding: 10,
            background: '#fff',
            border: '1px dashed #999',
            zIndex: 2000
          }}
        >
          <button
            id="scroll-to-the-top"
            onClick={() => this.scrollTo(this.topElement)}
          >
            Top Sticker
          </button>
          <button
            id="scroll-to-the-bottom"
            onClick={() => this.scrollTo(this.bottomElement)}
          >
            Bottom Sticker
          </button>
          <button id="toggle-margins" onClick={this.toggleMargins}>
            Turn {this.state.margins ? 'Off' : 'On'} Margins
          </button>
          <button id="toggle-absolute">Turn On Absolute Position</button>
          <button id="toggle-frame" onClick={this.toggleFrame}>
            Turn {this.state.frame ? 'Off' : 'On'} Capture Frame
          </button>
        </div>
        <PositionsAndMargins.Gap height="50vh" />
        <PositionsAndMargins.Sticker
          side="top"
          getStop={this.getStopElement}
          margins={margins}
          reference={this.topRef}
        />
        <PositionsAndMargins.Gap height="50vh" />
        <div style={stopStyles} ref={this.refStop}>
          vertical stopper
        </div>
        <PositionsAndMargins.Gap height="50vh" />
        <PositionsAndMargins.Sticker
          side="bottom"
          getStop={this.getStopElement}
          margins={margins}
          reference={this.bottomRef}
        />
        <PositionsAndMargins.Gap height="100vh" />
        <div
          id="capture-frame"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            display: this.state.frame ? 'block' : 'none'
          }}
        />
      </div>
    );
  }

  private refStop = (element: HTMLDivElement) => {
    this.stopElement = element;
  };

  private topRef = (ref: Element | null) => {
    this.topElement = ref instanceof HTMLElement ? ref : null;
  };

  private bottomRef = (ref: Element | null) => {
    this.bottomElement = ref instanceof HTMLElement ? ref : null;
  };

  private getStopElement = () => this.stopElement;

  private scrollTo = (element: HTMLElement | null) => {
    if (element) {
      window.scrollTo(0, element.offsetTop);
    }
  };

  private toggleMargins = () => {
    this.setState({ margins: !this.state.margins });
  };

  private toggleFrame = () => {
    this.setState({ frame: !this.state.frame });
  };
}

storiesOf('Sticky', module)
  .addDecorator(story => (
    <div style={{ width: 200, margin: '0 auto' }}>{story()}</div>
  ))
  .add('Top', () => <SampleTop />)
  .add('Bottom', () => <SampleBottom />)
  .add('Fixed', () => <PositionsAndMargins />);
