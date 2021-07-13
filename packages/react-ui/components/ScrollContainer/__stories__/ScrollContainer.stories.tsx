import React, { CSSProperties } from 'react';
import { CSFStory } from 'creevey';

import { ScrollContainer, ScrollContainerScrollState } from '../ScrollContainer';
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
WithLargeContentHeight.story = { name: 'with large content height' };

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
WithScrollState.story = { name: 'with scroll state' };

export const WithDynamicContent: CSFStory<JSX.Element> = () => {
  const [items, setItems] = React.useState(4);
  const [state, setState] = React.useState<ScrollContainerScrollState>('top');
  const add = () => setItems(items + 1);
  const remove = () => setItems(items > 0 ? items - 1 : 0);
  const scroll = (percentage: number) => {
    const scrollContainer = window.document.querySelector('[data-tid~="ScrollContainer__inner"]');
    if (scrollContainer) {
      scrollContainer.scrollTop = (scrollContainer.scrollHeight - scrollContainer.clientHeight) * (percentage / 100);
    }
  };
  return (
    <Gapped verticalAlign="top">
      <div id="test-container" style={{ padding: 10 }}>
        <Gapped vertical>
          <div style={wrapperStyle}>
            <ScrollContainer onScrollStateChange={setState}>
              {getItems(items).map((i) => (
                <div key={i} style={{ padding: 12 }}>
                  {i}
                </div>
              ))}
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
      <button id="scroll50" onClick={() => scroll(50)}>
        Scroll 50%
      </button>
      <button id="scroll100" onClick={() => scroll(100)}>
        Scroll 100%
      </button>
    </Gapped>
  );
};
WithDynamicContent.story = {
  parameters: {
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
  },
};
