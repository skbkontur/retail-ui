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
  const messageStyles: CSSProperties = {
    position: 'absolute',
    width: 75,
    top: 0,
    right: 0,
    padding: 5,
    paddingRight: 20,
    textAlign: 'right',
    background: '#f1f1f1',
    boxSizing: 'border-box'
  }

  return (
    <div style={wrapperStyle}>
      <ScrollContainer>
        {(scrollState: ScrollContainerScrollState) => {
          return (
            <div>
              {getItems(20).map(i => <div key={i}>{i}</div>)}
              <div style={messageStyles}>state:<br />'{scrollState}'</div>
            </div>
          )
        }}
      </ScrollContainer>
    </div>
  );
});
