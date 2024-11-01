// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import type { CSSProperties } from 'react';
import React, { useState } from 'react';

import type {
  ScrollContainerScrollState,
  ScrollContainerScrollStateX,
  ScrollContainerScrollStateY,
} from '../ScrollContainer';
import { ScrollContainer } from '../ScrollContainer';
import type { Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { ThemeContext } from '../../../lib/theming/ThemeContext';

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

const DynamicContent: React.FC<
  React.PropsWithChildren<{
    state: ScrollContainerScrollStateY | ScrollContainerScrollStateX;
    scroll: (percentage: number) => void;
    add: () => void;
    remove: () => void;
    onChangeScrollYState?: (x: ScrollContainerScrollStateY) => void;
    onChangeScrollXState?: (x: ScrollContainerScrollStateX) => void;
  }>
> = ({ children, state, scroll, add, remove, onChangeScrollXState, onChangeScrollYState }) => {
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

export default {
  title: 'ScrollContainer',
  component: ScrollContainer,
};

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

interface WrapperState {
  scrollState: ScrollContainerScrollState;
}
export const WithScrollState = () => {
  class Wrapper extends React.Component {
    public state: WrapperState = { scrollState: 'top' as ScrollContainerScrollState };

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

      const footerDarkStyles: CSSProperties = {
        boxShadow: this.state.scrollState !== 'bottom' ? 'rgba(0, 0, 0, 0.2) 0px -5px 10px' : 'none',
        background: '#1f1f1f',
        ...commonBlocksStyles,
      };

      const scrollContainerWrapperStyles: CSSProperties = {
        ...wrapperStyle,
        border: 'none',
        padding: '0px 5px',
        boxSizing: 'border-box',
      };

      return (
        <ThemeContext.Consumer>
          {(theme) => {
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
                <div style={theme.prototype.constructor.name.includes('Dark') ? footerDarkStyles : footerStyles}>
                  footer
                </div>
              </div>
            );
          }}
        </ThemeContext.Consumer>
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

export const OffsetY: Story = () => (
  <div style={wrapperStyle}>
    <ScrollContainer
      offsetY={{
        top: 8,
        bottom: 8,
        right: 8,
      }}
    >
      {Array(30)
        .fill(null)
        .map((_, i) => (
          <div key={i}>{i}</div>
        ))}
    </ScrollContainer>
  </div>
);

export const OffsetX = () => (
  <div style={wrapperStyle}>
    <ScrollContainer
      offsetX={{
        left: 8,
        bottom: 8,
        right: 8,
      }}
    >
      <div style={{ width: 300 }}>
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <div style={{ width: 200 }} key={i}>
              {i}
            </div>
          ))}
      </div>
    </ScrollContainer>
  </div>
);
export const OffsetYAndX: Story = () => (
  <div style={wrapperStyle}>
    <ScrollContainer
      offsetY={{
        right: 4,
        bottom: 4,
      }}
      offsetX={{
        bottom: 4,
        right: 4,
      }}
    >
      <div style={{ width: 300 }}>
        {Array(30)
          .fill(null)
          .map((_, i) => (
            <div style={{ width: 200 }} key={i}>
              {i}
            </div>
          ))}
      </div>
    </ScrollContainer>
  </div>
);

export const ScrollBarVisibleAfterTogglingDisabled: Story = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div style={wrapperStyle}>
      <ScrollContainer disabled={isDisabled} disableAnimations>
        <div style={{ width: 300 }}>
          {Array(30)
            .fill(null)
            .map((_, i) => (
              <div style={{ width: 200 }} key={i}>
                {i}
              </div>
            ))}
        </div>
      </ScrollContainer>
      <button data-tid="disable-button" onClick={() => setIsDisabled(!isDisabled)}>
        disable
      </button>
    </div>
  );
};

ScrollBarVisibleAfterTogglingDisabled.storyName = 'scroll bar visible after toggling disabled';

export const ShowScrollBarOnScroll: Story = () => (
  <div style={wrapperStyle}>
    <ScrollContainer
      showScrollBar={'scroll'}
      // Magic delay to capture the scrollbar
      hideScrollBarDelay={2000}
      disableAnimations
    >
      <div style={{ width: 300 }}>
        {Array(30)
          .fill(null)
          .map((_, i) => (
            <div style={{ width: 200 }} key={i}>
              {i}
            </div>
          ))}
      </div>
    </ScrollContainer>
  </div>
);

export const ShowScrollBarOnHover: Story = () => (
  <div style={wrapperStyle}>
    <ScrollContainer
      showScrollBar={'hover'}
      // Magic delay to capture the scrollbar
      hideScrollBarDelay={2000}
      disableAnimations
    >
      <div style={{ width: 300 }}>
        {Array(30)
          .fill(null)
          .map((_, i) => (
            <div style={{ width: 200 }} key={i}>
              {i}
            </div>
          ))}
      </div>
    </ScrollContainer>
  </div>
);

export const NeverShowScrollBar: Story = () => (
  <div style={wrapperStyle}>
    <ScrollContainer showScrollBar={'never'} disableAnimations>
      <div style={{ width: 300 }}>
        {Array(30)
          .fill(null)
          .map((_, i) => (
            <div style={{ width: 200 }} key={i}>
              {i}
            </div>
          ))}
      </div>
    </ScrollContainer>
  </div>
);
