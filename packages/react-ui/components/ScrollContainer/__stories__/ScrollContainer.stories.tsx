import React, { CSSProperties } from 'react';

import { ScrollContainer, ScrollContainerScrollState } from '../ScrollContainer';

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
        {getItems(1000).map(i => (
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
        {getItems(100).map(i => (
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
              {getItems(20).map(i => (
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
