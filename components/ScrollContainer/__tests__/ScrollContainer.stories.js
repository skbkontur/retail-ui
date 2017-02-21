// @flow
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ScrollContainer from '../ScrollContainer';

function items(count) {
  var items = [];
  for (var i = 0; i < count; ++i) {
    items.push(i);
  }
  return items;
}

const wrapperStyle = {
  height: '200px',
  width: '100px',
  border: '1px solid #000'
};

storiesOf('ScrollContainer', module)
  .add('with large content height', () => {
    return (
      <div style={wrapperStyle}>
        <ScrollContainer>
          {items(1000).map(i => <div key={i}>{i}</div>)}
        </ScrollContainer>
      </div>
    );
  });
