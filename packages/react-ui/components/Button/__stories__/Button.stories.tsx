import React from 'react';
import ArchivePack from '@skbkontur/react-icons/ArchivePack';
import OkIcon from '@skbkontur/react-icons/Ok';
import SearchIcon from '@skbkontur/react-icons/Search';

import { CreeveyTests } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { ComponentTable } from '../../../internal/ComponentTable';
import { Button, ButtonProps } from '../Button';

export default {
  title: 'Button',
};

type ButtonState = Partial<ButtonProps>;

const useStates: ButtonState[] = [
  { use: 'default' },
  { use: 'primary' },
  { use: 'danger' },
  { use: 'pay' },
  { use: 'success' },
  { use: 'link' },
];
const testingButtonUseStates: ButtonState[] = [{ use: 'default' }, { use: 'primary' }, { use: 'link' }];
const testingLinkState: ButtonState[] = [{ use: 'link' }];

export const Use = () => (
  <ComponentTable
    Component={Button}
    rows={useStates.map((x) => ({ props: x }))}
    cols={useDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const useDifferentStates: ButtonState[] = [{}, { checked: true }, { active: true }, { active: true, checked: true }];

export const Warning = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', warning: true }}
  />
);

export const Error = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', error: true }}
  />
);

export const Focused = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', visuallyFocused: true }}
  />
);

export const Arrow = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: true }}
  />
);

export const ArrowLeft = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: 'left' }}
  />
);

const arrowDifferentStates: ButtonState[] = [
  { warning: true },
  { error: true },
  { checked: true },
  { visuallyFocused: true },
  { warning: true, error: true },
  { warning: true, checked: true },
  { warning: true, visuallyFocused: true },
  { error: true, checked: true },
  { error: true, visuallyFocused: true },
  { checked: true, visuallyFocused: true },
];

export const ArrowSize = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={arrowDifferentSizeStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const arrowDifferentSizeStates: ButtonState[] = [
  { arrow: true },
  { arrow: true, size: 'medium' },
  { arrow: true, size: 'large' },
  { arrow: 'left' },
  { arrow: 'left', size: 'medium' },
  { arrow: 'left', size: 'large' },
];

export const Borderless = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={borderlessDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', borderless: true }}
  />
);

const borderlessDifferentStates: ButtonState[] = [
  {},
  { disabled: true },
  { loading: true },
  { checked: true },
  { visuallyFocused: true },
  { error: true },
  { warning: true },
  { active: true },
];

export const Size = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const sizeDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Loading = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={loadingDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', loading: true }}
  />
);

const loadingDifferentStates: ButtonState[] = [
  { checked: true },
  { visuallyFocused: true },
  { active: true },
  { checked: true, visuallyFocused: true },
  { checked: true, active: true },
  { visuallyFocused: true, active: true },
];

export const Narrow = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={narrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', narrow: true }}
  />
);

const narrowDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Align = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={alignDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', width: '200px' }}
  />
);

const alignDifferentStates: ButtonState[] = [
  { align: 'center' },
  { align: 'end' },
  { align: 'justify' },
  { align: 'left' },
  { align: 'right' },
  { align: 'start' },
];

export const Link = () => (
  <ComponentTable
    Component={Button}
    cols={testingLinkState.map((x) => ({ props: x }))}
    rows={linkDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', use: 'link' }}
  />
);

const linkDifferentStates: ButtonState[] = [
  { children: 'Default width' },
  { width: 'auto' },
  { width: 200 },
  { warning: true },
  { warning: true, size: 'medium' },
  { warning: true, size: 'large' },
  { error: true },
  { error: true, size: 'medium' },
  { error: true, size: 'large' },
  { visuallyFocused: true },
  { visuallyFocused: true, size: 'medium' },
  { visuallyFocused: true, size: 'large' },
  { disabled: true },
  { disabled: true, size: 'medium' },
  { disabled: true, size: 'large' },
  { loading: true },
  { loading: true, size: 'medium' },
  { loading: true, size: 'large' },
];

export const Icon = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={iconDifferentStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);
const iconDifferentStates: ButtonState[] = [
  { icon: <ArchivePack /> },
  { icon: <ArchivePack />, children: 'Button' },
  { icon: <OkIcon /> },
  { icon: <OkIcon />, loading: true },
  { icon: <OkIcon />, children: 'Button' },
  { icon: <OkIcon />, children: 'Button', size: 'medium' },
  { icon: <OkIcon />, children: 'Button', size: 'large' },
  { icon: <OkIcon />, children: 'Button', loading: true },
];

export const Disabled = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={disabledDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', disabled: true }}
  />
);

export const MultilineTextWithLinkButton = () => (
  <div>
    &quot;You can&apos;t keep boogieing like this. <br />
    You&apos;ll come <Button use="link">down</Button> <br />
    with a fever of some sort.&quot;
    <br />
    <i>Leela</i>
  </div>
);

const disabledDifferentStates: ButtonState[] = [{}, { loading: true }, { loading: true, icon: <OkIcon /> }];

export const Checked = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={checkedDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', checked: true }}
  />
);

const checkedDifferentStates: ButtonState[] = [
  {},
  { disabled: true },
  { visuallyFocused: true },
  { disabled: true, visuallyFocused: true },
];

export const DifferentPrioritization = () => (
  <ComponentTable
    Component={Button}
    cols={testingButtonUseStates.map((x) => ({ props: x }))}
    rows={differentPriorityStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const differentPriorityStates: ButtonState[] = [
  { warning: true, error: true },
  { warning: true, visuallyFocused: true },
  { warning: true, disabled: true },
  { warning: true, checked: true },
  { warning: true, loading: true },
  { error: true, visuallyFocused: true },
  { error: true, disabled: true },
  { error: true, checked: true },
  { error: true, loading: true },
  { visuallyFocused: true, disabled: true },
  { visuallyFocused: true, checked: true },
  { visuallyFocused: true, loading: true },
  { disabled: true, checked: true },
  { disabled: true, loading: true },
  { warning: true, error: true, visuallyFocused: true },
  { warning: true, error: true, disabled: true },
  { warning: true, error: true, checked: true },
  { warning: true, error: true, loading: true },
  { warning: true, visuallyFocused: true, disabled: true },
  { warning: true, visuallyFocused: true, checked: true },
  { warning: true, visuallyFocused: true, loading: true },
  { warning: true, disabled: true, checked: true },
  { warning: true, disabled: true, loading: true },
  { warning: true, checked: true, loading: true },
  { error: true, visuallyFocused: true, disabled: true },
  { error: true, visuallyFocused: true, checked: true },
  { error: true, visuallyFocused: true, loading: true },
  { visuallyFocused: true, disabled: true, checked: true },
  { visuallyFocused: true, disabled: true, loading: true },
  { disabled: true, checked: true, loading: true },
];

export const IconDifferentContent = () => (
  <Gapped vertical>
    <span>Icon as children</span>
    <Button>{<OkIcon />}</Button>
    <Button icon={<OkIcon />} use={'primary'}>
      Icon with long text and color
    </Button>
    <Button icon={<OkIcon />} width="200px">
      With icon, fixed width and long-lon-long text
    </Button>
  </Gapped>
);

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
      .pause(500)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  },
};

export const PlaygroundDefault = () => <Button>Hello</Button>;

PlaygroundDefault.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },
      { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover', 'pressed', 'clicked'] },
    ],
    tests: buttonTests,
  },
};

export const PlaygroundDisabled = () => <Button disabled>Hello</Button>;

PlaygroundDisabled.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },
      { in: /firefox/, tests: 'tabPress', reason: 'focus goes out of page and breaks other tests' },
      { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover', 'pressed', 'clicked'] },
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
