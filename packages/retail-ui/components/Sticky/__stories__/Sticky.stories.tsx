import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Sticky from '../Sticky';

const TEXT = (
  <div>
    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the
    charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound
    to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as
    saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free
    hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best,
    every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of
    duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances
    accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures
    to secure other greater pleasures, or else he endures pains to avoid worse pains.
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
              data-tid="stickyContent"
              style={{
                padding: 10,
                background: '#f99',
              }}
            >
              Small loan of a million dollars
              {fixed ? ' fixed' : <div>not fixed</div>}
            </div>
          )}
        </Sticky>
        {TEXT}
        <div
          data-tid="stickyStop"
          style={{
            height: 2,
            background: '#999',
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
          data-tid="stickyStop"
          style={{
            height: 2,
            background: '#999',
          }}
          ref={this.refStop}
        />
        {TEXT}
        <Sticky side="bottom" getStop={this.getStickyStopElement}>
          {fixed => (
            <div
              data-tid="stickyContent"
              style={{
                padding: 10,
                background: '#f99',
                margin: 20,
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

function SampleFlex() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>top text</div>
      <div style={{ minHeight: '100vh', display: 'flex' }}>
        Content
        <Sticky side="bottom">
          <div style={{ boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.2)', background: '#ccc' }}>Sticky Sticky Sticky</div>
        </Sticky>
      </div>
    </div>
  );
}

storiesOf('Sticky', module)
  .addDecorator(story => <div style={{ width: 200 }}>{story()}</div>)
  .add('Top', () => <SampleTop />)
  .add('Bottom', () => <SampleBottom />)
  .add('Flex container', () => <SampleFlex />);
