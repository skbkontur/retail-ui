import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import ArchivePackIcon from '@skbkontur/react-icons/ArchivePack';
import SearchIcon from '@skbkontur/react-icons/Search';

import { Button, ButtonProps } from '../Button';
import { Gapped } from '../../Gapped';
import { ComponentTable } from '../../internal/ComponentTable';
import { ComponentCombinator } from '../../internal/ComponentCombinator';

export default { title: 'Button' };

export const Playground = () => <Button>Hello</Button>;
Playground.story = { name: 'playground' };

export const DifferentContent = () => (
  <Gapped vertical>
    <Button icon={<OkIcon />}>text with icon</Button>
    <Button>{<OkIcon />}</Button>
    <Button icon={<OkIcon />} use={'primary'}>
      icon with long text and color
    </Button>
    <Button icon={<OkIcon />} width="200px">
      with icon, fixed width and long-lon-long text
    </Button>
  </Gapped>
);
DifferentContent.story = { name: 'different content' };

export const UseLink = () => <Button use="link">Use Link</Button>;
UseLink.story = { name: 'use link' };

export const UseLinkWithIcon = () => (
  <Button use="link" icon={<ArchivePackIcon />}>
    With Icon
  </Button>
);
UseLinkWithIcon.story = { name: 'use link with icon' };

export const MultilineTextWithLinkButton = () => (
  <div>
    &quot;You can&apos;t keep boogieing like this. <br />
    You&apos;ll come <Button use="link">down</Button> <br />
    with a fever of some sort.&quot;
    <br />
    <i>Leela</i>
  </div>
);
MultilineTextWithLinkButton.story = { name: 'multiline text with link button' };

export const WithError = () => (
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
WithError.story = { name: 'with error' };

export const ArrowWithError = () => (
  <Button arrow error>
    Arrow
  </Button>
);
ArrowWithError.story = { name: 'arrow with error' };

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

export const DefaultCombinations = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button' }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DefaultCombinations.story = { name: 'default combinations' };

export const CombinationsWithWarning = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', warning: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithWarning.story = { name: 'combinations with warning' };

export const CombinationsWithError = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', error: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithError.story = { name: 'combinations with error' };

export const CombinationsWithFocus = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', visuallyFocused: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CombinationsWithFocus.story = { name: 'combinations with focus' };

export const LoadingCombinations = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', loading: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
LoadingCombinations.story = { name: 'loading combinations' };

export const DisabledCombinations = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', disabled: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
DisabledCombinations.story = { name: 'disabled combinations' };

export const ActiveCombinations = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', active: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
ActiveCombinations.story = { name: 'active combinations' };

export const CheckedCombinations = () => (
  <ComponentCombinator
    Component={Button}
    presetProps={{ children: 'Button', checked: true }}
    combinations={[useStates, sizeStates, arrowStates, widthStates, contentStates, visualStates]}
  />
);
CheckedCombinations.story = { name: 'checked combinations' };

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

const useStates = getProps('use', ['default', 'primary', 'danger', 'pay', 'link']);

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
