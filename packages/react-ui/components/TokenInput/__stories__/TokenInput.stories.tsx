import React from 'react';
import { StoryFn } from '@storybook/addons';
import { CSFStory } from 'creevey';

import { Gapped } from '../../Gapped';
import { Input } from '../../Input';
import { TokenInput, TokenInputProps, TokenInputType } from '../TokenInput';
import { Token, TokenColors } from '../../Token';
import { delay } from '../../../lib/utils';
import { MenuItem } from '../../MenuItem';
import { isTestEnv } from '../../../lib/currentEnvironment';

interface TokenModel {
  id?: string;
  value: string;
}

const FixedWidthDecorator = (storyFn: StoryFn<JSX.Element>) => (
  <div className="tokens-test-container" style={{ margin: 40, height: 200, width: 400, padding: 4 }}>
    {storyFn()}
  </div>
);

async function getItems(query: string) {
  if (!isTestEnv) {
    await delay(400);
  }
  return ['aaa', 'bbb'].filter(s => s.includes(query));
}

const getGenericItems: () => TokenModel[] = () => [
  { id: '111', value: 'aaa' },
  { id: '222', value: 'bbb' },
  { id: '333', value: 'ccc' },
  { id: '444', value: 'ddd' },
];

async function getModelItems(query: string): Promise<TokenModel[]> {
  const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
  await sleep(400);
  return getGenericItems().filter(s => s.value.includes(query));
}

class Wrapper extends React.Component<Partial<TokenInputProps<any>>, any> {
  constructor(props: any) {
    super(props);
    const selectedItems = props.selectedItems
      ? props.selectedItems
      : props.numberItems
      ? new Array(props.numberItems).fill(null).map((_, i) => i.toString().repeat(3))
      : [];
    this.state = { selectedItems };
  }

  public render() {
    return (
      <TokenInput
        {...this.props}
        selectedItems={this.state.selectedItems}
        onValueChange={itemsNew => this.setState({ selectedItems: itemsNew })}
        renderToken={(item, { isActive, onClick, onRemove, disabled }) => (
          <Token key={item.toString()} isActive={isActive} onClick={onClick} onRemove={onRemove} disabled={disabled}>
            {item}
          </Token>
        )}
      />
    );
  }
}

class MyTokenInput extends TokenInput<TokenModel> {}

class WrapperCustomModel extends React.Component<any, { selectedItems: TokenModel[] }> {
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
        valueToItem={this.valueToItem}
        getItems={getModelItems}
        onValueChange={this.onChange}
        placeholder="placeholder"
        type={TokenInputType.Combined}
        renderToken={(item, { isActive, onClick, onRemove }) => (
          <Token
            key={item.id}
            colors={
              item.value.includes('aaa')
                ? {
                    idle: 'redIdle',
                    active: 'redActive',
                  }
                : undefined
            }
            isActive={isActive}
            onClick={onClick}
            onRemove={onRemove}
          >
            {item.value}
          </Token>
        )}
      />
    );
  }

  private renderItem = (item: TokenModel) => item.value;
  private renderValue = (value: TokenModel) => value.value;
  private valueToItem = (item: string): TokenModel => ({
    value: item,
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
      ? new Array(props.numberItems).fill(null).map((_, i) => i.toString().repeat(3))
      : [];
    this.state = { selectedItems };
  }

  public render() {
    return (
      <TokenInput
        {...this.props}
        selectedItems={this.state.selectedItems}
        renderToken={(value, { isActive, onClick, onRemove }) => {
          let colors: TokenColors = {
            idle: 'greenIdle',
            active: 'greenActive',
          };

          if (value && value.includes('aaa')) {
            colors = {
              idle: 'redIdle',
              active: 'redActive',
            };
          }
          return (
            <Token key={value} colors={colors} isActive={isActive} onClick={onClick} onRemove={onRemove}>
              {value}
            </Token>
          );
        }}
        onValueChange={itemsNew => this.setState({ selectedItems: itemsNew })}
      />
    );
  }
}

const FilledWrapper = (props: any) => <Wrapper {...{ ...props, numberItems: 7 }} />;

export default {
  title: 'TokenInput',
  decorators: [FixedWidthDecorator],
};

export const Validations = () => {
  return (
    <Gapped vertical gap={10}>
      <Wrapper getItems={getItems} placeholder="default" />
      <Wrapper getItems={getItems} placeholder="warning" warning />
      <Wrapper getItems={getItems} placeholder="error" error />
      <Wrapper getItems={getItems} placeholder="warning and error" warning error />
    </Gapped>
  );
};
Validations.story = { name: 'validations', parameters: { creevey: { skip: [true] } } };

export const EmptyWithReference: CSFStory<JSX.Element> = () => {
  return <Wrapper getItems={getItems} />;
};
EmptyWithReference.story = {
  name: 'empty with reference',
  parameters: {
    creevey: {
      captureElement: '.tokens-test-container',
      tests: {
        async idle() {
          await delay(100);
          await this.expect(await this.takeScreenshot()).to.matchImage('idle');
        },
        async clicked() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
        },
        async withMenu() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
            .sendKeys('a')
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage('withMenu');
        },
      },
    },
  },
};

export const ColoredEmptyWithReference = () => {
  return <ColoredWrapper getItems={getItems} />;
};
ColoredEmptyWithReference.story = { name: 'colored empty with reference', parameters: { creevey: { skip: [true] } } };

export const EmptyWithoutReference = () => {
  return <Wrapper type={TokenInputType.WithoutReference} />;
};
EmptyWithoutReference.story = { name: 'empty without reference', parameters: { creevey: { skip: [true] } } };

export const EmptyCombined: CSFStory = () => {
  return <Wrapper type={TokenInputType.Combined} getItems={getItems} />;
};
EmptyCombined.story = {
  name: 'empty combined',
  parameters: {
    creevey: {
      tests: {
        async selectFirst() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
            .sendKeys('a')
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage();
        },
      },
    },
  },
};

export const WithReferenceFilled = () => {
  return <FilledWrapper getItems={getItems} />;
};
WithReferenceFilled.story = { name: '[with reference] filled', parameters: { creevey: { skip: [true] } } };

export const WithoutReferenceFilled = () => {
  return <FilledWrapper type={TokenInputType.WithoutReference} getItems={getItems} />;
};
WithoutReferenceFilled.story = { name: '[without reference] filled', parameters: { creevey: { skip: [true] } } };

export const CombinedFilled: CSFStory = () => {
  return <FilledWrapper type={TokenInputType.Combined} getItems={getItems} />;
};
CombinedFilled.story = {
  name: '[combined] filled',
  parameters: {
    creevey: {
      tests: {
        async selectAndType() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
            .perform();
          const selected = await this.takeScreenshot();
          await this.browser
            .actions({
              bridge: true,
            })
            .sendKeys('a')
            .perform();
          const typed = await this.takeScreenshot();

          await this.expect({ selected, typed }).to.matchImages();
        },
      },
    },
  },
};

export const WithLongItem1 = () => {
  return (
    <Wrapper
      getItems={getItems}
      selectedItems={['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, obcaecati?']}
    />
  );
};
WithLongItem1.story = { name: 'with long item 1', parameters: { creevey: { skip: [true] } } };

export const WithLongItem2 = () => {
  return (
    <Wrapper getItems={getItems} selectedItems={['qewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiop']} />
  );
};
WithLongItem2.story = { name: 'with long item 2', parameters: { creevey: { skip: [true] } } };

export const MultipleTokens = () => {
  return (
    <Gapped vertical gap={10}>
      <FilledWrapper getItems={getItems} />
      <Wrapper getItems={getItems} type={TokenInputType.WithoutReference} />
    </Gapped>
  );
};
MultipleTokens.story = { name: 'multiple tokens', parameters: { creevey: { skip: [true] } } };

export const CombinedGenericToken = () => {
  return <WrapperCustomModel />;
};
CombinedGenericToken.story = { name: 'combined generic token', parameters: { creevey: { skip: [true] } } };

export const WidthToken = () => {
  return (
    <Gapped vertical gap={10}>
      <Wrapper getItems={getItems} width={'100%'} />
      <Wrapper getItems={getItems} width={300} />
      <Wrapper getItems={getItems} width={150} />
    </Gapped>
  );
};
WidthToken.story = { name: 'width token', parameters: { creevey: { skip: [true] } } };

export const WithAutofocus = () => {
  return (
    <Gapped vertical gap={10}>
      <Wrapper getItems={getItems} autoFocus={true} />
    </Gapped>
  );
};
WithAutofocus.story = { name: 'with autofocus', parameters: { creevey: { skip: [true] } } };

export const UseRenderToken = () => (
  <Gapped gap={10}>
    <Wrapper
      getItems={getItems}
      renderToken={(item, { isActive, onClick, onRemove }) => (
        <Token key={item.toString()} isActive={isActive} onClick={onClick} onRemove={onRemove}>
          {item}
        </Token>
      )}
    />
  </Gapped>
);
UseRenderToken.story = { name: 'use renderToken', parameters: { creevey: { skip: [true] } } };

export const IdenticalAlignmentWithOtherControls = () => (
  <Gapped gap={10} vertical>
    <Wrapper getItems={getItems} width={'100%'} />
    <Input value={'value'} width={'100%'} size={'medium'} />
  </Gapped>
);
IdenticalAlignmentWithOtherControls.story = {
  name: 'identical alignment with other controls',
  parameters: { creevey: { skip: [true] } },
};

export const Disabled = () => {
  return (
    <Gapped vertical gap={10}>
      <FilledWrapper getItems={getItems} disabled={true} />
      <Wrapper getItems={getItems} disabled={true} placeholder="Test text" />
    </Gapped>
  );
};
Disabled.story = { name: 'disabled' };

export const CustomAddButton: CSFStory<JSX.Element> = () => {
  return (
    <TokenInput
      type={TokenInputType.Combined}
      getItems={getItems}
      renderAddButton={value => <MenuItem key="addButton">Custom Add: {value}</MenuItem>}
    />
  );
};
CustomAddButton.story = {
  name: 'custom add button',
  parameters: {
    creevey: {
      tests: {
        async addButton() {
          await this.browser
            .actions({
              bridge: true,
            })
            .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
            .sendKeys('zzz')
            .perform();
          await this.expect(await this.takeScreenshot()).to.matchImage();
        },
      },
    },
  },
};
