// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from '../Loader';

function getItems(count: number) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    items.push(i);
  }
  return items;
}

const wrapperStyle = {
  width: '800px',
  background: 'AliceBlue',
  margin: '0 60px'
};

class ContentComponent extends React.Component<{ itemsCount: number }> {
  public render() {
    return (
      <div style={wrapperStyle}>
        <Loader active type={'big'}>
          {getItems(this.props.itemsCount).map(i => <div key={i}>{i}</div>)}
        </Loader>
      </div>
    );
  }
}

storiesOf('Loader', module)
  .add('Simple', () => <Loader active />)
  .add('Type "big"', () => <ContentComponent itemsCount={10} />)
  .add('Scrollable content', () => <ContentComponent itemsCount={200} />)
  .add('Scrollable content with before & after', () => {
    return (
      <div>
        {getItems(20).map(i => <div key={i}>{i}</div>)}
        <ContentComponent itemsCount={200} />
        {getItems(20).map(i => <div key={i}>{i}</div>)}
      </div>
    );
  });
