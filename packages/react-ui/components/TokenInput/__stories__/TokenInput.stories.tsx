import React, { useState } from 'react';

import { Meta, Story } from '../../../typings/stories';
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

async function getItems(query: string) {
  if (!isTestEnv) {
    await delay(400);
  }
  return ['aaa', 'bbb'].filter((s) => s.includes(query));
}

async function getExtendedItems(query: string) {
  if (!isTestEnv) {
    await delay(400);
  }
  return ['aaa', 'bbb', 'aaaccc', 'bbbttt'].filter((s) => s.includes(query));
}

const getGenericItems: () => TokenModel[] = () => [
  { id: '111', value: 'aaa' },
  { id: '222', value: 'bbb' },
  { id: '333', value: 'ccc' },
  { id: '444', value: 'ddd' },
];

async function getModelItems(query: string): Promise<TokenModel[]> {
  const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  await sleep(400);
  return getGenericItems().filter((s) => s.value.includes(query));
}

function getSelectedItems<T>(props: TokenInputProps<T> & { numberItems: any }) {
  if (props.selectedItems) {
    return props.selectedItems;
  } else if (props.numberItems) {
    return new Array(props.numberItems).fill(null).map((_, i) => i.toString().repeat(3));
  }

  return [];
}

class Wrapper extends React.Component<Partial<TokenInputProps<any>>, any> {
  constructor(props: any) {
    super(props);

    this.state = { selectedItems: getSelectedItems(props) };
  }

  public render() {
    return (
      <TokenInput
        {...this.props}
        selectedItems={this.state.selectedItems}
        onValueChange={(itemsNew) => this.setState({ selectedItems: itemsNew })}
        renderToken={(item, tokenProps) => (
          <Token key={item.toString()} {...tokenProps}>
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
        renderToken={(item, tokenProps) => (
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
            {...tokenProps}
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
    this.state = { selectedItems: getSelectedItems(props) };
  }

  public render() {
    return (
      <TokenInput
        {...this.props}
        selectedItems={this.state.selectedItems}
        renderToken={(value, tokenProps) => {
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
            <Token key={value} colors={colors} {...tokenProps}>
              {value}
            </Token>
          );
        }}
        onValueChange={(itemsNew) => this.setState({ selectedItems: itemsNew })}
      />
    );
  }
}

const FilledWrapper = (props: any) => <Wrapper {...{ ...props, numberItems: 7 }} />;

export default {
  title: 'TokenInput',
  decorators: [
    (Story) => (
      <div className="tokens-test-container" style={{ margin: 40, height: 200, width: 400, padding: 4 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Validations = () => {
  return (
    <Gapped vertical gap={10}>
      <Wrapper getItems={getItems} placeholder="default" />
      <Wrapper getItems={getItems} placeholder="warning" warning />
      <Wrapper getItems={getItems} placeholder="error" error />
      <Wrapper getItems={getItems} placeholder="warning and error" warning error />
      <Wrapper getItems={getItems} placeholder="error and disabled" disabled error />
    </Gapped>
  );
};
Validations.storyName = 'validations';
Validations.parameters = { creevey: { skip: [true] } };

export const EmptyWithReference: Story = () => {
  return <Wrapper getItems={getItems} />;
};
EmptyWithReference.storyName = 'empty with reference';

EmptyWithReference.parameters = {
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
};

export const ColoredEmptyWithReference = () => {
  return <ColoredWrapper getItems={getItems} />;
};
ColoredEmptyWithReference.storyName = 'colored empty with reference';
ColoredEmptyWithReference.parameters = { creevey: { skip: [true] } };

export const EmptyWithoutReference = () => {
  return <Wrapper type={TokenInputType.WithoutReference} />;
};
EmptyWithoutReference.storyName = 'empty without reference';
EmptyWithoutReference.parameters = { creevey: { skip: [true] } };

export const EmptyCombined: Story = () => {
  return <Wrapper type={TokenInputType.Combined} getItems={getItems} />;
};
EmptyCombined.storyName = 'empty combined';

EmptyCombined.parameters = {
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
};

export const WithReferenceFilled = () => {
  return <FilledWrapper getItems={getItems} />;
};
WithReferenceFilled.storyName = '[with reference] filled';
WithReferenceFilled.parameters = { creevey: { skip: [true] } };

export const WithoutReferenceFilled = () => {
  return <FilledWrapper type={TokenInputType.WithoutReference} getItems={getItems} />;
};
WithoutReferenceFilled.storyName = '[without reference] filled';
WithoutReferenceFilled.parameters = { creevey: { skip: [true] } };

export const CombinedFilled: Story = () => {
  return <FilledWrapper type={TokenInputType.Combined} getItems={getItems} />;
};
CombinedFilled.storyName = '[combined] filled';

CombinedFilled.parameters = {
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
      async editToken() {
        await this.browser
          .actions({
            bridge: true,
          })
          .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
          .perform();
        const doubleClickOnToken = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
          .perform();
        const clickOnMenuItem = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ENTER)
          .perform();
        const enterOnActiveToken = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys('EDITED')
          .perform();
        const editToken = await this.takeScreenshot();
        await this.browser
          .actions({
            bridge: true,
          })
          .sendKeys(this.keys.ENTER)
          .perform();
        const enterAfterEdit = await this.takeScreenshot();

        await this.expect({
          doubleClickOnToken,
          clickOnMenuItem,
          enterOnActiveToken,
          editToken,
          enterAfterEdit,
        }).to.matchImages();
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
WithLongItem1.storyName = 'with long item 1';
WithLongItem1.parameters = { creevey: { skip: [true] } };

export const WithLongItem2 = () => {
  return (
    <Wrapper getItems={getItems} selectedItems={['qewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiopqewrtyuiop']} />
  );
};
WithLongItem2.storyName = 'with long item 2';
WithLongItem2.parameters = { creevey: { skip: [true] } };

export const MultipleTokens = () => {
  return (
    <Gapped vertical gap={10}>
      <FilledWrapper getItems={getItems} />
      <Wrapper getItems={getItems} type={TokenInputType.WithoutReference} />
    </Gapped>
  );
};
MultipleTokens.storyName = 'multiple tokens';
MultipleTokens.parameters = { creevey: { skip: [true] } };

export const CombinedGenericToken = () => {
  return <WrapperCustomModel />;
};
CombinedGenericToken.storyName = 'combined generic token';
CombinedGenericToken.parameters = { creevey: { skip: [true] } };

export const WidthToken = () => {
  return (
    <Gapped vertical gap={10}>
      <Wrapper getItems={getItems} width={'100%'} />
      <Wrapper getItems={getItems} width={300} />
      <Wrapper getItems={getItems} width={150} />
    </Gapped>
  );
};
WidthToken.storyName = 'width token';
WidthToken.parameters = { creevey: { skip: [true] } };

export const WithAutofocus = () => {
  return (
    <Gapped vertical gap={10}>
      <Wrapper getItems={getItems} autoFocus />
    </Gapped>
  );
};
WithAutofocus.storyName = 'with autofocus';
WithAutofocus.parameters = { creevey: { skip: [true] } };

export const UseRenderToken = () => (
  <Gapped gap={10}>
    <Wrapper
      getItems={getItems}
      renderToken={(item, tokenProps) => (
        <Token key={item.toString()} {...tokenProps}>
          {item}
        </Token>
      )}
    />
  </Gapped>
);
UseRenderToken.storyName = 'use renderToken';
UseRenderToken.parameters = { creevey: { skip: [true] } };

export const IdenticalAlignmentWithOtherControls = () => (
  <Gapped gap={10} vertical>
    <Wrapper getItems={getItems} width={'100%'} />
    <Input value={'value'} width={'100%'} size={'medium'} />
  </Gapped>
);
IdenticalAlignmentWithOtherControls.storyName = 'identical alignment with other controls';
IdenticalAlignmentWithOtherControls.parameters = { creevey: { skip: [true] } };

export const Disabled = () => {
  return (
    <Gapped vertical gap={10}>
      <FilledWrapper getItems={getItems} disabled />
      <Wrapper getItems={getItems} disabled placeholder="Test text" />
    </Gapped>
  );
};
Disabled.storyName = 'disabled';

export const CustomAddButton: Story = () => {
  return (
    <TokenInput
      type={TokenInputType.Combined}
      getItems={getItems}
      renderAddButton={(value) => <MenuItem key="addButton">Custom Add: {value}</MenuItem>}
    />
  );
};
CustomAddButton.storyName = 'custom add button';

CustomAddButton.parameters = {
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
};

export const OnUnexpectedInputValidation: Story = () => {
  const [isValid, setIsValid] = useState(true);
  const [selectedItems, setSelectedItems] = useState([] as string[]);
  const [alertItemMessage, setAlertItemMessage] = useState('');

  const resetValidation = () => {
    setAlertItemMessage('');
    setIsValid(true);
  };

  const handleUnexpectedInput = (value: string) => {
    if (value !== '' && selectedItems.length === 0) {
      setAlertItemMessage(`Выберите хотя бы один токен`);
      setIsValid(false);
      return undefined;
    }
    if (value === 'clear' || value === 'clearzzz') {
      setAlertItemMessage('Значение "clear" возвращает null и инпут был очищен');
      return null;
    }
    if (value !== '') {
      setAlertItemMessage(`Значение '${value}' является невалидным`);
      setIsValid(false);
    }
    return undefined;
  };

  return (
    <>
      <TokenInput
        type={TokenInputType.Combined}
        getItems={getExtendedItems}
        onValueChange={(items) => {
          setSelectedItems(items);
        }}
        onFocus={() => {
          resetValidation();
        }}
        onInputValueChange={(value) => {
          if (value === '') {
            resetValidation();
          }
        }}
        selectedItems={selectedItems}
        onUnexpectedInput={handleUnexpectedInput}
        error={!isValid}
      />
      {alertItemMessage && <div>{alertItemMessage}</div>}
    </>
  );
};

OnUnexpectedInputValidation.storyName = 'validate with onUnexpectedInput';
OnUnexpectedInputValidation.parameters = {
  creevey: {
    skip: [
      {
        in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark'],
        tests: ['token select', 'token edit'],
        reason: 'flacky',
      },
    ],
    tests: {
      async 'token select'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
          .pause(1000)
          .sendKeys('aaa')
          .pause(1000)
          .move({ x: 0, y: 0 })
          .click()
          .pause(1000)
          .perform();

        const withNotSelectedToken = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys('aaaccc')
          .move({ x: 0, y: 0 })
          .click()
          .perform();

        const withAutoSelectedTokens = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
          .pause(1000)
          .sendKeys('clear')
          .move({ x: 0, y: 0 })
          .click()
          .perform();

        await delay(1000);

        const clearedOnNullReturn = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .clear();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys('aaa')
          .sendKeys(this.keys.ENTER)
          .pause(1000)
          .sendKeys('bbb')
          .sendKeys(this.keys.ENTER)
          .move({ x: 0, y: 0 })
          .click()
          .perform();

        const withSelectedTokens = await this.takeScreenshot();

        await this.expect({
          withNotSelectedToken,
          withAutoSelectedTokens,
          clearedOnNullReturn,
          withSelectedTokens,
        }).to.matchImages();
      },
      async 'token edit'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
          .pause(300)
          .sendKeys('aaa')
          .pause(300)
          .sendKeys(this.keys.ENTER)
          .pause(300)
          .sendKeys('bbb')
          .pause(300)
          .sendKeys(this.keys.ENTER)
          .pause(300)
          .perform();

        await this.browser
          .actions({
            bridge: true,
          })
          .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
          .pause(1000)
          .sendKeys('aaa')
          .pause(300)
          .move({ x: 0, y: 0 })
          .click()
          .pause(300)
          .perform();

        const withSameValue = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
          .pause(1000)
          .sendKeys('zzz')
          .pause(300)
          .move({ x: 0, y: 0 })
          .click()
          .pause(300)
          .perform();

        const withNotEditedToken = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
          .pause(1000)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys(this.keys.BACK_SPACE)
          .sendKeys('clear')
          .pause(300)
          .move({ x: 0, y: 0 })
          .click()
          .pause(300)
          .perform();

        const withRemovedToken = await this.takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .doubleClick(this.browser.findElement({ css: '[data-comp-name~="Token"]' }))
          .pause(1000)
          .sendKeys('EDITED')
          .pause(300)
          .sendKeys(this.keys.ARROW_DOWN)
          .sendKeys(this.keys.ENTER)
          .pause(300)
          .move({ x: 0, y: 0 })
          .click()
          .pause(300)
          .perform();

        const withEditedToken = await this.takeScreenshot();

        await this.expect({ withSameValue, withNotEditedToken, withRemovedToken, withEditedToken }).to.matchImages();
      },
    },
  },
};

export const FullWidthMenu: Story = () => {
  return <Wrapper menuAlign={'left'} menuWidth={'100%'} getItems={getItems} />;
};
FullWidthMenu.storyName = 'full width menu';
FullWidthMenu.parameters = {
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
};

export const CustomRenderTotalCount: Story = () => {
  return (
    <TokenInput
      type={TokenInputType.Combined}
      getItems={getItems}
      renderTotalCount={(found, total) => `Показано ${found} из ${total}`}
      totalCount={100}
    />
  );
};

CustomRenderTotalCount.storyName = 'custom render total count';

CustomRenderTotalCount.parameters = {
  creevey: {
    tests: {
      async renderTotalCount() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="TokenInput"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage();
      },
    },
  },
};
