import React, { CSSProperties } from 'react';

import {
  ScrollContainer,
  ScrollContainerScrollState,
  ScrollContainerScrollStateX,
  ScrollContainerScrollStateY,
} from '../ScrollContainer';
import { Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';

function getItems(count: number) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    items.push(i);
  }
  return items;
}

const wrapperStyle = {
  height: '200px',
  width: '100px',
  border: '1px solid #000',
};

const DynamicContent: React.FC<{
  state: ScrollContainerScrollStateY | ScrollContainerScrollStateX;
  scroll: (percentage: number) => void;
  add: () => void;
  remove: () => void;
  onChangeScrollYState?: (x: ScrollContainerScrollStateY) => void;
  onChangeScrollXState?: (x: ScrollContainerScrollStateX) => void;
}> = ({ children, state, scroll, add, remove, onChangeScrollXState, onChangeScrollYState }) => {
  return (
    <Gapped verticalAlign="top">
      <div id="test-container" style={{ padding: 10 }}>
        <Gapped vertical>
          <div style={wrapperStyle}>
            <ScrollContainer onScrollStateChangeX={onChangeScrollXState} onScrollStateChangeY={onChangeScrollYState}>
              {children}
            </ScrollContainer>
          </div>
          <div>scroll state: {state}</div>
        </Gapped>
      </div>
      <button id="add" onClick={add}>
        Add
      </button>
      <button id="remove" onClick={remove}>
        Remove
      </button>
      <button id="scroll0" onClick={() => scroll(0)}>
        Scroll 0%
      </button>
      <button id="scroll50" onClick={() => scroll(50)}>
        Scroll 50%
      </button>
      <button id="scroll100" onClick={() => scroll(100)}>
        Scroll 100%
      </button>
    </Gapped>
  );
};

export default { title: 'ScrollContainer' };

export const WithLargeContentHeight = () => {
  return (
    <div style={wrapperStyle}>
      <ScrollContainer>
        {getItems(1000).map((i) => (
          <div key={i}>{i}</div>
        ))}
      </ScrollContainer>
    </div>
  );
};
WithLargeContentHeight.storyName = 'with large content height';

export const WithHorizontalScroll = () => {
  return (
    <div style={wrapperStyle}>
      <ScrollContainer>
        {getItems(100).map((i) => (
          <div style={{ width: 200 }} key={i}>
            {i}
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
};

export const WithScrollState = () => {
  class Wrapper extends React.Component<{}, { scrollState: ScrollContainerScrollState }> {
    public state = { scrollState: 'top' as ScrollContainerScrollState };

    public render() {
      const commonBlocksStyles: CSSProperties = {
        padding: '5px 10px',
        position: 'relative',
        transition: 'box-shadow 0.2s',
        zIndex: 1,
      };

      const headerStyles: CSSProperties = {
        boxShadow: this.state.scrollState !== 'top' ? '0 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
        ...commonBlocksStyles,
      };

      const footerStyles: CSSProperties = {
        boxShadow: this.state.scrollState !== 'bottom' ? 'rgba(0, 0, 0, 0.2) 0px -5px 10px' : 'none',
        background: '#f1f1f1',
        ...commonBlocksStyles,
      };

      const scrollContainerWrapperStyles: CSSProperties = {
        ...wrapperStyle,
        border: 'none',
        padding: '0px 5px',
        boxSizing: 'border-box',
      };

      return (
        <div style={{ margin: 20, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px' }}>
          <div style={headerStyles}>header</div>
          <div style={scrollContainerWrapperStyles}>
            <ScrollContainer onScrollStateChange={this.handleScrollStateChange}>
              {getItems(20).map((i) => (
                <div key={i}>{i}</div>
              ))}
            </ScrollContainer>
          </div>
          <div style={footerStyles}>footer</div>
        </div>
      );
    }

    private handleScrollStateChange = (scrollState: ScrollContainerScrollState) => {
      this.setState({ scrollState });
    };
  }

  return <Wrapper />;
};
WithScrollState.storyName = 'with scroll state';

export const WithDynamicContent: Story = () => {
  const [items, setItems] = React.useState(4);
  const [state, setState] = React.useState<ScrollContainerScrollStateY>('top');
  const add = () => setItems(items + 1);
  const remove = () => setItems(items > 0 ? items - 1 : 0);
  const scroll = (percentage: number) => {
    const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
    if (scrollContainer) {
      scrollContainer.scrollTop = (scrollContainer.scrollHeight - scrollContainer.clientHeight) * (percentage / 100);
    }
  };
  return (
    <DynamicContent state={state} scroll={scroll} add={add} remove={remove} onChangeScrollYState={setState}>
      {getItems(items).map((i) => (
        <div key={i} style={{ padding: 12 }}>
          {i}
        </div>
      ))}
    </DynamicContent>
  );
};
WithDynamicContent.parameters = {
  creevey: {
    captureElement: '#test-container',
    tests: {
      async changeContent() {
        const idle = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#add' }))
          .perform();
        const addContent = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll50' }))
          .perform();
        const scroll50 = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll100' }))
          .perform();
        const scroll100 = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#remove' }))
          .perform();
        const removeContent = await this.takeScreenshot();

        await this.expect({ idle, addContent, scroll50, scroll100, removeContent }).to.matchImages();
      },
    },
  },
};

export const WithOnlyCustomHorizontalScroll: Story = () => {
  const [state, setState] = React.useState<ScrollContainerScrollStateX>('left');
  const [items, setItems] = React.useState(4);

  const add = () => setItems(items + 1);
  const remove = () => setItems(items > 0 ? items - 1 : 0);

  const scroll = (percentage: number) => {
    const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
    if (scrollContainer) {
      scrollContainer.scrollLeft = (scrollContainer.scrollWidth - scrollContainer.clientWidth) * (percentage / 100);
    }
  };

  return (
    <DynamicContent state={state} scroll={scroll} add={add} remove={remove} onChangeScrollXState={setState}>
      {getItems(items).map((i) => (
        <div key={i} style={{ padding: 12, width: 350 }}>
          {i}
        </div>
      ))}
    </DynamicContent>
  );
};

WithOnlyCustomHorizontalScroll.storyName = 'with only custom horizontal scroll';
WithOnlyCustomHorizontalScroll.parameters = {
  creevey: {
    captureElement: '#test-container',
    tests: {
      async moveScroll() {
        const idle = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll50' }))
          .perform();
        const scroll50 = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll100' }))
          .perform();
        const scroll100 = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll0' }))
          .perform();
        const scroll0 = await this.takeScreenshot();

        await this.expect({ idle, scroll50, scroll100, scroll0 }).to.matchImages();
      },

      async changeContent() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#add' }))
          .perform();
        const addContent = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll50' }))
          .perform();
        const scroll50 = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll100' }))
          .perform();
        const scroll100 = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scroll0' }))
          .perform();
        const scroll0 = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#remove' }))
          .perform();
        const removeContent = await this.takeScreenshot();

        await this.expect({ addContent, scroll50, scroll100, scroll0, removeContent }).to.matchImages();
      },
    },
  },
};

export const WithScrollTo: Story = () => {
  const refScrollContainer = React.useRef<ScrollContainer>(null);

  const countItems = 8;

  const scrollTo = () => refScrollContainer.current?.scrollTo(document.getElementById(`-${countItems - 1}`));
  const scrollToTop = () => refScrollContainer.current?.scrollToTop();
  const scrollToLeft = () => refScrollContainer.current?.scrollToLeft();
  const scrollToRight = () => refScrollContainer.current?.scrollToRight();
  const scrollToBottom = () => refScrollContainer.current?.scrollToBottom();

  return (
    <Gapped verticalAlign="top">
      <div id="test-container" style={wrapperStyle}>
        <ScrollContainer ref={refScrollContainer}>
          {getItems(countItems).map((i) => (
            <div key={i} style={{ display: 'flex', width: 300 }}>
              <div id={`${i}`} style={{ padding: 12, flexBasis: 150 }}>
                {-i}
              </div>
              <div id={`${-i}`} style={{ padding: 12, flexBasis: 150 }}>
                {i}
              </div>
            </div>
          ))}
        </ScrollContainer>
      </div>
      <Gapped>
        <button id="scrollTo" onClick={scrollTo}>
          scroll to
        </button>
        <button id="scrollToTop" onClick={scrollToTop}>
          scroll to top
        </button>
        <button id="scrollToBottom" onClick={scrollToBottom}>
          scroll to bottom
        </button>
        <button id="scrollToLeft" onClick={scrollToLeft}>
          scroll to left
        </button>
        <button id="scrollToRight" onClick={scrollToRight}>
          scroll to right
        </button>
      </Gapped>
    </Gapped>
  );
};

WithScrollTo.parameters = {
  creevey: {
    captureElement: '#test-container',
    tests: {
      async scrollTo() {
        const idle = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scrollTo' }))
          .perform();
        const scrollTo = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scrollToTop' }))
          .perform();
        const scrollToTop = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scrollToLeft' }))
          .perform();
        const scrollToLeft = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scrollToBottom' }))
          .perform();
        const scrollToBottom = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#scrollToRight' }))
          .perform();
        const scrollToRight = await this.takeScreenshot();

        await this.expect({
          idle,
          scrollTo,
          scrollToTop,
          scrollToBottom,
          scrollToLeft,
          scrollToRight,
        }).to.matchImages();
      },
    },
  },
};
