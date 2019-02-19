import * as React from 'react';
import { storiesOf } from '@storybook/react';

import ScrollContainer, {ScrollContainerScrollState} from '../ScrollContainer';
import {CSSProperties} from "react";

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
  border: '1px solid #000'
};

storiesOf('ScrollContainer', module).add('with large content height', () => {
  return (
    <div style={wrapperStyle}>
      <ScrollContainer>
        {getItems(1000).map(i => <div key={i}>{i}</div>)}
      </ScrollContainer>
    </div>
  );
});

storiesOf('ScrollContainer', module).add('with scroll state', () => {
  class Wrapper extends React.Component<{}, {scrollState: ScrollContainerScrollState}> {
    state = {scrollState: 'top'};

    render(){
      const commonBlocksStyles: CSSProperties = {
        padding: '5px 10px',
        position: 'relative',
        transition: 'box-shadow 0.2s',
        zIndex: 1
      }

      const headerStyles: CSSProperties = {
        boxShadow: this.state.scrollState !== 'top' ? '0 5px 10px rgba(0, 0, 0, 0.2)' : 'none',
        ...commonBlocksStyles
      }

      const footerStyles: CSSProperties = {
        boxShadow: this.state.scrollState !== 'bottom' ? 'rgba(0, 0, 0, 0.2) 0px -5px 10px' : 'none',
        background: '#f1f1f1',
        ...commonBlocksStyles
      }

      const scrollContainerWrapperStyles: CSSProperties = {
        ...wrapperStyle,
        border: 'none',
        padding: '0px 5px',
        boxSizing: 'border-box'
      }

      return (
        <div style={{margin: 20, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px'}}>
          <div style={headerStyles}>header</div>
          <div style={scrollContainerWrapperStyles}>
            <ScrollContainer onScrollStateChange={scrollState => this.setState({scrollState})}>
              {getItems(20).map(i => <div key={i}>{i}</div>)}
            </ScrollContainer>
          </div>
          <div style={footerStyles}>footer</div>
        </div>
      );
    }
  }

  return <Wrapper/>;
});
