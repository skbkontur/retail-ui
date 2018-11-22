// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Gapped from '../../Gapped';
import TokenInput, { TokenInputType } from '../TokenInput';
import { TokenColors } from '../../Token/Token';

const FixedWidthDecorator = (storyFn: any) => (
  <div
    className="tokens-test-container"
    style={{ margin: 40, height: 200, width: 400, padding: 4 }}>
    {storyFn()}
  </div>
);

async function getItems(query: string) {
  const sleep = (milliseconds: number) =>
    new Promise(resolve => setTimeout(resolve, milliseconds));
  await sleep(400);
  return ['aaa', 'bbb'].filter(s => s.includes(query));
}

const items: TokenModel[] = [
  { id: '111', value: 'aaa' },
  { id: '222', value: 'bbb' },
  { id: '333', value: 'ccc' },
  { id: '444', value: 'ddd' }
];

async function getModelItems(query: string): Promise<TokenModel[]> {
  const sleep = (milliseconds: number) =>
    new Promise(resolve => setTimeout(resolve, milliseconds));
  await sleep(400);
  return items.filter(s => s.value.includes(query));
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

  public render() {
    return (
      <TokenInput
        {...this.props}
        selectedItems={this.state.selectedItems}
        onChange={itemsNew => this.setState({ selectedItems: itemsNew })}
      />
    );
  }
}

class MyTokenInput extends TokenInput<TokenModel> {}
class WrapperCustomModel extends React.Component<
  any,
  { selectedItems: TokenModel[] }
> {
  constructor(props: any) {
    super(props);
    this.state = { selectedItems: [] };
  }

  public render() {
    return (
      <MyTokenInput
        selectedItems={this.state.selectedItems}
        renderItem={this.renderItem}
        renderValue={this.renderValue}
        itemToValue={this.itemToValue}
        getItems={getModelItems}
        onChange={this.onChange}
        placeholder="placeholder"
        type={TokenInputType.Combined}
        renderTokenComponent={(token, value) => {
          let style: TokenColors | undefined;
          if (value && value.value.includes('aaa')) {
            style = {
              idle: 'l-red',
              active: 'd-red'
            };
          }
          return token(style);
        }}
      />
    );
  }

  private renderItem = (item: TokenModel) => item.value;
  private renderValue = (value: TokenModel) => value.value;
  private itemToValue = (item: string): TokenModel => ({
    value: item
  });

  private onChange = (selectedItems: TokenModel[]) => {
    this.setState({ selectedItems });
  };
}

class ColoredWrapper extends React.Component<any, any> {
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

  public render() {
    return (
      <TokenInput
        {...this.props}
        selectedItems={this.state.selectedItems}
        renderTokenComponent={(token, value) => {
          let style: TokenColors = {
            idle: 'l-green',
            active: 'd-green'
          };

          if (value && value.includes('aaa')) {
            style = {
              idle: 'l-red',
              active: 'd-red'
            };
          }
          return token(style);
        }}
        onChange={itemsNew => this.setState({ selectedItems: itemsNew })}
      />
    );
  }
}

const FilledWrapper = (props: any) => (
  <Wrapper {...{ ...props, numberItems: 7 }} />
);

interface TokenModel {
  id?: string;
  value: string;
}

// tslint:disable jsx-no-lambda
storiesOf('TokenInput', module)
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
  .add('colored empty with reference', () => {
    return <ColoredWrapper getItems={getItems} />;
  })
  .add('empty without reference', () => {
    return <Wrapper type={TokenInputType.WithoutReference} />;
  })
  .add('empty combined', () => {
    return <Wrapper type={TokenInputType.Combined} getItems={getItems} />;
  })
  .add('[with reference] filled', () => {
    return <FilledWrapper getItems={getItems} />;
  })
  .add('[without reference] filled', () => {
    return (
      <FilledWrapper
        type={TokenInputType.WithoutReference}
        getItems={getItems}
      />
    );
  })
  .add('[combined] filled', () => {
    return <FilledWrapper type={TokenInputType.Combined} getItems={getItems} />;
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
        <Wrapper getItems={getItems} type={TokenInputType.WithoutReference} />
      </Gapped>
    );
  })
  .add('combined generic token', () => {
    return <WrapperCustomModel />;
  })
  .add('width token', () => {
    return (
      <Gapped vertical gap={10}>
        <Wrapper getItems={getItems} width={'100%'} />
        <Wrapper getItems={getItems} width={300} />
        <Wrapper getItems={getItems} width={150} />
      </Gapped>
    );
  });
