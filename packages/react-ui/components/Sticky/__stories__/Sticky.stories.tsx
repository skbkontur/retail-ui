import React from 'react';
import { DecoratorFn } from '@storybook/react';
import { CSFStory } from 'creevey';

import { Sticky } from '../Sticky';

const stickyContent = (fixed: boolean) => (
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
);

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
          {stickyContent}
        </Sticky>
        {TEXT}
        <div data-tid="stickyStop" style={{ height: 2, background: '#999' }} ref={this.refStop} />
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
        <div data-tid="stickyStop" style={{ height: 2, background: '#999' }} ref={this.refStop} />
        {TEXT}
        <Sticky side="bottom" getStop={this.getStickyStopElement}>
          {stickyContent}
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

function StickyWithWideContainer() {
  return (
    <div style={{ width: '110vw' }}>
      <Sticky side="top">{stickyContent}</Sticky>
      <div data-tid="nonStickyText" style={{ width: 200 }}>
        {TEXT}
      </div>
    </div>
  );
}

const withThinContainer: DecoratorFn = (story) => <div style={{ width: 200 }}>{story()}</div>;

export default { title: 'Sticky' };

export const WideContainer: CSFStory<JSX.Element> = () => <StickyWithWideContainer />;
WideContainer.story = {
  parameters: {
    creevey: {
      tests: {
        async fixed() {
          await this.browser.executeScript(function () {
            const stickyContent = window.document.querySelector('[data-tid="stickyContent"]');
            const nonStickyText = window.document.querySelector('[data-tid="nonStickyText"]');
            // @ts-ignore
            const scrollXOffset = nonStickyText.getBoundingClientRect().width / 2;
            // @ts-ignore
            const scrollYOffset = stickyContent.getBoundingClientRect().height / 2;

            window.scrollTo(scrollXOffset, scrollYOffset);
          });
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
        },
      },
    },
  },
};

export const Top: CSFStory<JSX.Element> = () => <SampleTop />;
Top.story = {
  decorators: [withThinContainer],
  parameters: {
    creevey: {
      skip: [{ in: ['firefox', 'firefox8px'], tests: 'stoped', reason: 'flacky stopped position' }],
      tests: {
        async top() {
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('top');
        },
        async fixed() {
          await this.browser.executeScript(function () {
            const stickyStop = window.document.querySelector('[data-tid="stickyStop"]');
            // @ts-ignore
            const scrollOffset = stickyStop.getBoundingClientRect().top - window.innerHeight / 2;

            window.scrollTo(0, scrollOffset);
          });
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
        },
        async stoped() {
          await this.browser.executeScript(function () {
            const stickyStop = window.document.querySelector('[data-tid="stickyStop"]');
            // @ts-ignore
            stickyStop.scrollIntoView();
          });
          await this.browser.executeScript(function () {
            const stickyContent = window.document.querySelector('[data-tid="stickyContent"]');
            // @ts-ignore
            const scrollOffset = pageYOffset - stickyContent.getBoundingClientRect().height / 2;

            window.scrollTo(0, scrollOffset);
          });
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('stoped');
        },
      },
    },
  },
};

export const Bottom: CSFStory<JSX.Element> = () => <SampleBottom />;
Bottom.story = {
  decorators: [withThinContainer],
  parameters: {
    creevey: {
      skip: [{ in: ['firefox', 'firefox8px'], tests: 'stoped', reason: 'flacky stopped position' }],
      tests: {
        async bottom() {
          await this.browser.executeScript(function () {
            window.scrollTo(0, 9999);
          });
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('bottom');
        },
        async fixed() {
          await this.browser.executeScript(function () {
            const sticky = window.document.querySelector('[data-comp-name~="Sticky"]');
            // @ts-ignore
            const scrollOffset = sticky.getBoundingClientRect().top - window.innerHeight;

            window.scrollTo(0, scrollOffset);
          });
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
        },
        async stoped() {
          await this.browser.executeScript(function () {
            const stickyStop = window.document.querySelector('[data-tid="stickyStop"]');
            // @ts-ignore
            stickyStop.scrollIntoView(false);
          });
          await this.browser.executeScript(function () {
            const stickyContent = window.document.querySelector('[data-tid="stickyContent"]');
            // @ts-ignore
            const scrollOffset = pageYOffset + stickyContent.getBoundingClientRect().height / 2;

            window.scrollTo(0, scrollOffset);
          });
          await this.expect(await this.browser.takeScreenshot()).to.matchImage('fixed');
        },
      },
    },
  },
};

export const FlexContainer = () => <SampleFlex />;
FlexContainer.story = {
  name: 'Flex container',
  parameters: { creevey: { captureElement: null } },
  decorators: [withThinContainer],
};
