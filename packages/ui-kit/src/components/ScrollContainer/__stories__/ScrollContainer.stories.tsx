import { storiesOf } from '@storybook/react';
import * as React from 'react';

import ScrollContainer from '../ScrollContainer';

function getItems(count: number) {
  const items = [];
  for (let i = 0; i < count; ++i) {
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
      <ScrollContainer>{getItems(1000).map(i => <div key={i}>{i}</div>)}</ScrollContainer>
    </div>
  );
});
