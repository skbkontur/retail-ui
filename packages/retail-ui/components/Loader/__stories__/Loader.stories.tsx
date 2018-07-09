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
  background: 'AliceBlue'
};

class ContentComponent extends React.Component<{
  itemsCount: number;
  additionalStyle?: object;
}> {
  public render() {
    return (
      <div style={{ ...wrapperStyle, ...this.props.additionalStyle }}>
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
  .add('Vertical scroll', () => <ContentComponent itemsCount={200} />)
  .add('Horizontal scroll', () => (
    <ContentComponent itemsCount={10} additionalStyle={{ width: '2500px' }} />
  ))
  .add('Both dimensions scrollable content with spaces around', () => (
    <ContentComponent
      itemsCount={200}
      additionalStyle={{ width: '2500px', margin: '600px 200px' }}
    />
  ));
