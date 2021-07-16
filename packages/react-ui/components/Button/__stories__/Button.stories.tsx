import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import ArchivePackIcon from '@skbkontur/react-icons/ArchivePack';
import SearchIcon from '@skbkontur/react-icons/Search';

import { Meta, Story, CreeveyTests } from '../../../typings/stories';
import { Button, ButtonProps } from '../Button';
import { Gapped } from '../../Gapped';
import { ComponentTable } from '../../../internal/ComponentTable';
import { ComponentCombinator } from '../../../internal/ComponentCombinator';

export default { title: 'Button' } as Meta;

const buttonTests: CreeveyTests = {
  async idle() {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  },
  async hover() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'button' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hover');
  },
  async pressed() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'button' }),
      })
      .press()
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('pressed');
    await this.browser
      .actions({
        bridge: true,
      })
      .release()
      .perform();
  },
  async clicked() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: 'button' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  },
  async tabPress() {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  },
};

const combinationTest: CreeveyTests = {
  async simple() {
    const nextPageButton = () => this.browser.findElement({ css: '#next-page' });
    const element = () => this.browser.findElement({ css: '[data-comp-name~="ComponentTable"]' });

    const page1 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page2 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page3 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page4 = await element().takeScreenshot();
    await this.browser.actions({ bridge: true }).click(nextPageButton()).perform();
    const page5 = await element().takeScreenshot();

    await this.expect({
      ['page - 1']: page1,
      ['page - 2']: page2,
      ['page - 3']: page3,
      ['page - 4']: page4,
      ['page - 5']: page5,
    }).to.matchImages();
  },
};

export const Playground: Story = () => <Button>Hello</Button>;
Playground.storyName = 'playground';

Playground.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hover' }],
    tests: buttonTests,
  },
};

export const DifferentContent = () => (
  <Gapped vertical>
    <Button icon={<OkIcon />}>text with icon</Button>
    <span>icon as children</span>
    <Button>{<OkIcon />}</Button>
    <span>icon as prop and without children</span>
    <Button icon={<OkIcon />} />
    <Button icon={<OkIcon />} use={'primary'}>
      icon with long text and color
    </Button>
    <Button icon={<OkIcon />} width="200px">
      with icon, fixed width and long-lon-long text
    </Button>
  </Gapped>
);
DifferentContent.storyName = 'different content';

export const UseLink: Story = () => <Button use="link">Use Link</Button>;
UseLink.storyName = 'use link';

UseLink.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hover' }],
    tests: buttonTests,
  },
};

export const UseLinkWithIcon: Story = () => (
  <Button use="link" icon={<ArchivePackIcon />}>
    With Icon
  </Button>
);
UseLinkWithIcon.storyName = 'use link with icon';

UseLinkWithIcon.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hover' }],
    tests: buttonTests,
  },
};

export const MultilineTextWithLinkButton: Story = () => (
  <div>
    &quot;You can&apos;t keep boogieing like this. <br />
    You&apos;ll come <Button use="link">down</Button> <br />
    with a fever of some sort.&quot;
    <br />
    <i>Leela</i>
  </div>
);
MultilineTextWithLinkButton.storyName = 'multiline text with link button';

MultilineTextWithLinkButton.parameters = {
  creevey: {
    skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hover' }],
    tests: buttonTests,
  },
};

export const WithError: Story = () => (
  <Gapped>
    <Button error>Error :(</Button>
    <Button error use="primary">
      Error :(
    </Button>
    <Button error use="link">
      Error :(
    </Button>
  </Gapped>
);
WithError.storyName = 'with error';

WithError.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hover' },
      { in: ['chrome', 'chrome8px'], tests: ['pressed', 'clicked'] },
    ],
    tests: buttonTests,
  },
};

export const ArrowWithError: Story = () => (
  <Button arrow error>
    Arrow
  </Button>
);
ArrowWithError.storyName = 'arrow with error';

ArrowWithError.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hover' },
      { in: ['chrome', 'chrome8px'], tests: ['pressed', 'clicked'] },
    ],
    tests: buttonTests,
  },
};

export const TextStylesReset = () => (
  <div
    style={{
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontVariant: 'small-caps slashed-zero',
      fontStretch: 'expanded',
      color: 'red',
      lineHeight: '50px',
      textAlign: 'right',
      textShadow: '3px 3px 3px #333',
      textTransform: 'uppercase',
      letterSpacing: '5px',
    }}
  >
    <Gapped>
      <span>Inherited Styles</span>
      <Button>
        <SearchIcon />
      </Button>
      <Button>Button</Button>
      <Button visuallyFocused>Focused</Button>
      <Button active>Active</Button>
      <Button checked>Checked</Button>
      <Button disabled>Disabled</Button>
      <Button use="link">Link</Button>
    </Gapped>
  </div>
);
TextStylesReset.storyName = 'text styles reset';

export const DifferentAligns = () => (
  <ComponentTable
    Component={Button}
    rows={alignStates.map((x) => ({ props: x }))}
    cols={layoutStates.map((x) => ({ props: x }))}
    presetProps={{ width: 200, children: 'Button' }}
  />
);
DifferentAligns.storyName = 'different aligns';

export const differentWidths: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'long-long-long text' }}
    combinations={[widthStates, [{ props: { use: 'link' } }, { props: { use: 'default' } }]]}
  />
);
differentWidths.storyName = 'different widths';

export const DefaultCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button' }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DefaultCombinations.storyName = 'default combinations';

DefaultCombinations.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const CombinationsWithWarning: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', warning: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithWarning.storyName = 'combinations with warning';

CombinationsWithWarning.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const CombinationsWithError: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', error: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithError.storyName = 'combinations with error';

CombinationsWithError.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const CombinationsWithFocus: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', visuallyFocused: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithFocus.storyName = 'combinations with focus';

CombinationsWithFocus.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const LoadingCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', loading: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
LoadingCombinations.storyName = 'loading combinations';

LoadingCombinations.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const DisabledCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', disabled: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DisabledCombinations.storyName = 'disabled combinations';

DisabledCombinations.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const ActiveCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', active: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
ActiveCombinations.storyName = 'active combinations';

ActiveCombinations.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const CheckedCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', checked: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CheckedCombinations.storyName = 'checked combinations';

CheckedCombinations.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

export const CheckedDisabledCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', checked: true, disabled: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CheckedDisabledCombinations.storyName = 'checked disabled combinations';

CheckedDisabledCombinations.parameters = {
  creevey: {
    tests: combinationTest,
  },
};

type ButtonState = Partial<ButtonProps>;

const alignStates: ButtonState[] = [
  { align: 'left' },
  { align: 'start' },
  { align: 'right' },
  { align: 'end' },
  { align: 'center' },
  { align: 'justify' },
];

const layoutStates: ButtonState[] = [{ use: 'default' }, { arrow: true }, { arrow: 'left' }, { use: 'link' }];

const sizeStates = getProps('size', ['small', 'medium', 'large']);

const arrowStates = getProps('arrow', [true, 'left']);

const useStates = getProps('use', ['default', 'primary', 'danger', 'pay', 'success']);

const widthStates = getProps('width', [100, 'auto']);

const visualStates = [{ narrow: true }, { borderless: true }, { use: 'link' as ButtonState['use'] }].map((x) => ({
  props: x,
}));

const contentStates = [{ icon: <SearchIcon /> }, { children: 'long-long-long text' }, { children: <SearchIcon /> }].map(
  (x) => ({ props: x }),
);

function getProps<TKey extends keyof ButtonProps>(
  key: TKey,
  values: Array<ButtonProps[TKey]>,
): Array<{ props: Pick<ButtonProps, TKey> }> {
  return values.map((x) => ({ props: { [key]: x } as Pick<ButtonProps, TKey> }));
}
