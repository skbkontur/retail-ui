import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Tokens, TokensInputType } from '../Tokens';
import Gapped from '../../Gapped';

const FixedWidthDecorator = (storyFn: any) => (
  <div
    className="tokens-test-container"
    style={{ margin: 40, height: 200, width: 400, padding: 4 }}
  >
    {storyFn()}
  </div>
);

async function getItems(query: string) {
  const sleep = (milliseconds: number) =>
    new Promise(resolve => setTimeout(resolve, milliseconds));
  await sleep(400);
  return ['aaa', 'bbb'].filter(s => s.includes(query));
}

class Wrapper extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    const selectedItems = props.selectedItems
      ? props.selectedItems
      : props.numberItems
        ? new Array(props.numberItems)
            .fill(null)
            .map((_, i) => i.toString().repeat(3))
        : [];
    this.state = { selectedItems };
  }

  render() {
    return (
      <Tokens
        {...this.props}
        selectedItems={this.state.selectedItems}
        onChange={itemsNew => this.setState({ selectedItems: itemsNew })}
      />
    );
  }
}

const FilledWrapper = (props: any) => (
  <Wrapper {...{ ...props, numberItems: 7 }} />
);

// tslint:disable jsx-no-lambda
storiesOf('Tokens', module)
  .addDecorator(FixedWidthDecorator)
  .add('validations', () => {
    return (
      <Gapped vertical gap={10}>
        <Wrapper getItems={getItems} placeholder="default" />
        <Wrapper getItems={getItems} placeholder="warning" warning />
        <Wrapper getItems={getItems} placeholder="error" error />
        <Wrapper
          getItems={getItems}
          placeholder="warning and error"
          warning
          error
        />
      </Gapped>
    );
  })
  .add('empty with reference', () => {
    return <Wrapper getItems={getItems} />;
  })
  .add('empty without reference', () => {
    return <Wrapper type={TokensInputType.WithoutReference} />;
  })
  .add('empty combined', () => {
    return <Wrapper type={TokensInputType.Combined} getItems={getItems} />;
  })
  .add('[with reference] filled', () => {
    return <FilledWrapper getItems={getItems} />;
  })
  .add('[without reference] filled', () => {
    return (
      <FilledWrapper
        type={TokensInputType.WithoutReference}
        getItems={getItems}
      />
    );
  })
  .add('[combined] filled', () => {
    return (
      <FilledWrapper type={TokensInputType.Combined} getItems={getItems} />
    );
  })
  .add('with long item 1', () => {
    return (
      <Wrapper
        getItems={getItems}
        selectedItems={[
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, obcaecati?'
        ]}
      />
    );
  })
  .add('with long item 2', () => {
    return (
      <Wrapper
        getItems={getItems}
        selectedItems={[
          'qewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiop'
        ]}
      />
    );
  })
  .add('multiple tokens', () => {
    return (
      <Gapped vertical gap={10}>
        <FilledWrapper getItems={getItems} />
        <Wrapper getItems={getItems} type={TokensInputType.WithoutReference} />
      </Gapped>
    );
  });
