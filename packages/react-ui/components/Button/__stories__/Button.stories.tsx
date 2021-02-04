import React from 'react';
import { CSFStory, CreeveyStoryParams } from 'creevey';
import OkIcon from '@skbkontur/react-icons/Ok';
import ArchivePackIcon from '@skbkontur/react-icons/ArchivePack';
import SearchIcon from '@skbkontur/react-icons/Search';

import { Button, ButtonProps } from '../Button';
import { Gapped } from '../../Gapped';
import { ComponentTable } from '../../../internal/ComponentTable';
import { ComponentCombinator } from '../../../internal/ComponentCombinator';

export default { title: 'Button' };

const buttonTests: CreeveyStoryParams['tests'] = {
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

const combinationTest: CreeveyStoryParams['tests'] = {
  async simple() {
    const nextPageButton = () => this.browser.findElement({ css: '#next-page' });
    const element = () => this.browser.findElement({ css: '[data-comp-name~="ComponentTable"]' });

    const page1 = await element().takeScreenshot();
    await this.browser
      .actions({ bridge: true })
      .click(nextPageButton())
      .perform();
    const page2 = await element().takeScreenshot();
    await this.browser
      .actions({ bridge: true })
      .click(nextPageButton())
      .perform();
    const page3 = await element().takeScreenshot();
    await this.browser
      .actions({ bridge: true })
      .click(nextPageButton())
      .perform();
    const page4 = await element().takeScreenshot();
    await this.browser
      .actions({ bridge: true })
      .click(nextPageButton())
      .perform();
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

export const Playground: CSFStory<JSX.Element> = () => <Button>Hello</Button>;
Playground.story = {
  name: 'playground',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hover' }],
      tests: buttonTests,
    },
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
DifferentContent.story = { name: 'different content' };

export const UseLink: CSFStory<JSX.Element> = () => <Button use="link">Use Link</Button>;
UseLink.story = {
  name: 'use link',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hover' }],
      tests: buttonTests,
    },
  },
};

export const UseLinkWithIcon: CSFStory<JSX.Element> = () => (
  <Button use="link" icon={<ArchivePackIcon />}>
    With Icon
  </Button>
);
UseLinkWithIcon.story = {
  name: 'use link with icon',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hover' }],
      tests: buttonTests,
    },
  },
};

export const MultilineTextWithLinkButton: CSFStory<JSX.Element> = () => (
  <div>
    &quot;You can&apos;t keep boogieing like this. <br />
    You&apos;ll come <Button use="link">down</Button> <br />
    with a fever of some sort.&quot;
    <br />
    <i>Leela</i>
  </div>
);
MultilineTextWithLinkButton.story = {
  name: 'multiline text with link button',
  parameters: {
    creevey: {
      skip: [{ in: ['ie11', 'ie11Flat'], tests: 'hover' }],
      tests: buttonTests,
    },
  },
};

export const WithError: CSFStory<JSX.Element> = () => (
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
WithError.story = {
  name: 'with error',
  parameters: {
    creevey: {
      skip: [
        { in: ['ie11', 'ie11Flat'], tests: 'hover' },
        { in: 'chrome', tests: ['pressed', 'clicked'] },
      ],
      tests: buttonTests,
    },
  },
};

export const ArrowWithError: CSFStory<JSX.Element> = () => (
  <Button arrow error>
    Arrow
  </Button>
);
ArrowWithError.story = {
  name: 'arrow with error',
  parameters: {
    creevey: {
      skip: [
        { in: ['ie11', 'ie11Flat'], tests: 'hover' },
        { in: 'chrome', tests: ['pressed', 'clicked'] },
      ],
      tests: buttonTests,
    },
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
TextStylesReset.story = { name: 'text styles reset' };

export const DifferentAligns = () => (
  <ComponentTable
    Component={Button}
    rows={alignStates.map(x => ({ props: x }))}
    cols={layoutStates.map(x => ({ props: x }))}
    presetProps={{ width: 200, children: 'Button' }}
  />
);
DifferentAligns.story = { name: 'different aligns' };

export const DefaultCombinations: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button' }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DefaultCombinations.story = {
  name: 'default combinations',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const CombinationsWithWarning: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', warning: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithWarning.story = {
  name: 'combinations with warning',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const CombinationsWithError: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', error: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithError.story = {
  name: 'combinations with error',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const CombinationsWithFocus: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', visuallyFocused: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithFocus.story = {
  name: 'combinations with focus',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const LoadingCombinations: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', loading: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
LoadingCombinations.story = {
  name: 'loading combinations',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const DisabledCombinations: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', disabled: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DisabledCombinations.story = {
  name: 'disabled combinations',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const ActiveCombinations: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', active: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
ActiveCombinations.story = {
  name: 'active combinations',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const CheckedCombinations: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', checked: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CheckedCombinations.story = {
  name: 'checked combinations',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
  },
};

export const CheckedDisabledCombinations: CSFStory<JSX.Element> = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', checked: true, disabled: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CheckedDisabledCombinations.story = {
  name: 'checked disabled combinations',
  parameters: {
    creevey: {
      tests: combinationTest,
    },
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

const useStates = getProps('use', ['default', 'primary', 'danger', 'pay', 'success', 'link']);

const widthStates = getProps('width', [100, 'auto']);

const visualStates = [{ narrow: true }, { borderless: true }].map(x => ({ props: x }));

const contentStates = [
  { icon: <SearchIcon /> },
  { children: 'long-long-long text' },
  { children: <SearchIcon /> },
].map(x => ({ props: x }));

function getProps<TKey extends keyof ButtonProps>(
  key: TKey,
  values: Array<ButtonProps[TKey]>,
): Array<{ props: Pick<ButtonProps, TKey> }> {
  return values.map(x => ({ props: { [key]: x } as Pick<ButtonProps, TKey> }));
}
