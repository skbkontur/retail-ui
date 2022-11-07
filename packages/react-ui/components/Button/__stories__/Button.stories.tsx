import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import ArchivePackIcon from '@skbkontur/react-icons/ArchivePack';
import SearchIcon from '@skbkontur/react-icons/Search';

import { Meta, Story } from '../../../typings/stories';
import { Button, ButtonProps } from '../Button';
import { Gapped } from '../../Gapped';
import { ComponentTable } from '../../../internal/ComponentTable';
import { ComponentCombinator } from '../../../internal/ComponentCombinator';

export default { title: 'Button' } as Meta;

export const Playground: Story = () => <Button>Hello</Button>;
Playground.storyName = 'playground';

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

export const UseLinkWithIcon: Story = () => (
  <Button use="link" icon={<ArchivePackIcon />}>
    With Icon
  </Button>
);
UseLinkWithIcon.storyName = 'use link with icon';

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

export const ArrowWithError: Story = () => (
  <Button arrow error>
    Arrow
  </Button>
);
ArrowWithError.storyName = 'arrow with error';

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

export const DifferentWidths: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'long-long-long text' }}
    combinations={[widthStates, [{ props: { use: 'link' } }, { props: { use: 'default' } }]]}
  />
);
DifferentWidths.storyName = 'different widths';

export const DefaultCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button' }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DefaultCombinations.storyName = 'default combinations';

export const CombinationsWithWarning: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', warning: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithWarning.storyName = 'combinations with warning';

export const CombinationsWithError: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', error: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithError.storyName = 'combinations with error';

export const CombinationsWithFocus: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', visuallyFocused: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithFocus.storyName = 'combinations with focus';

export const LoadingCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', loading: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
LoadingCombinations.storyName = 'loading combinations';

export const DisabledCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', disabled: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DisabledCombinations.storyName = 'disabled combinations';

export const ActiveCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', active: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
ActiveCombinations.storyName = 'active combinations';

export const CheckedCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', checked: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CheckedCombinations.storyName = 'checked combinations';

export const CheckedDisabledCombinations: Story = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', checked: true, disabled: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CheckedDisabledCombinations.storyName = 'checked disabled combinations';

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
