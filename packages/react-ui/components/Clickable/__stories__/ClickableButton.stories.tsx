import React from 'react';
import { XIcon16Regular } from '@skbkontur/icons/XIcon16Regular';
import { XIcon20Regular } from '@skbkontur/icons/XIcon20Regular';
import { XIcon24Regular } from '@skbkontur/icons/XIcon24Regular';

import { CreeveyTests, Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { ComponentTable } from '../../../internal/ComponentTable';
import { Clickable, ClickableProps } from '../Clickable';

export default {
  title: 'Clickable/ClickableButton',
  parameters: {
    creevey: {
      skip: { in: /^(?!\bchrome2022|chrome2022Dark|firefox2022|firefox2022Dark?\b)/ },
    },
  },
};

type ButtonState = Partial<ClickableProps>;

const testingButtonUseStates: ButtonState[] = [
  { use: 'default' },
  { use: 'primary' },
  { use: 'text' },
  { use: 'backless' },
];
const getButtonUseStates = () => {
  return testingButtonUseStates.map((x) => ({ props: x }));
};

const useStates: ButtonState[] = [
  { use: 'default' },
  { use: 'primary' },
  { use: 'danger' },
  { use: 'pay' },
  { use: 'success' },
  { use: 'text' },
  { use: 'backless' },
];
const getUseStates = () => {
  return useStates.map((x) => ({ props: x }));
};

export const Use: Story = () => (
  <ComponentTable
    Component={Clickable}
    rows={getUseStates()}
    cols={useDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const useDifferentStates: ButtonState[] = [{}, { isActive: true }];

export const Warning: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', isWarning: true }}
  />
);

export const Error: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', isError: true }}
  />
);

export const Arrow: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: 'right' }}
  />
);

export const ArrowLeft: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={arrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', arrow: 'left' }}
  />
);

const arrowDifferentStates: ButtonState[] = [
  { isWarning: true },
  { isError: true },
  { isWarning: true, isError: true },
];

export const ArrowSize: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={arrowDifferentSizeStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const arrowDifferentSizeStates: ButtonState[] = [
  { arrow: 'right' },
  { arrow: 'right', size: 'medium' },
  { arrow: 'right', size: 'large' },
  { arrow: 'left' },
  { arrow: 'left', size: 'medium' },
  { arrow: 'left', size: 'large' },
];

export const Borderless: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={borderlessDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', isBorderless: true }}
  />
);

const borderlessDifferentStates: ButtonState[] = [
  {},
  { isDisabled: true },
  { isLoading: true },
  { isError: true },
  { isWarning: true },
  { isActive: true },
];

export const Size: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={sizeDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const sizeDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Loading: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={loadingDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', isLoading: true }}
  />
);

const loadingDifferentStates: ButtonState[] = [{ isActive: true }];

export const Narrow: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={narrowDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', isNarrow: true }}
  />
);

const narrowDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Align: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
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

export const Icon: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={iconDifferentStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);
const iconDifferentStates: ButtonState[] = [
  { leftIcon: <XIcon16Regular /> },
  { rightIcon: <XIcon16Regular /> },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
  { leftIcon: <XIcon16Regular />, children: 'Button' },
  { rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon16Regular />, isLoading: true },
  { rightIcon: <XIcon16Regular />, isLoading: true },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, isLoading: true },
  { leftIcon: <XIcon16Regular />, children: 'Button' },
  { rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon20Regular />, children: 'Button', size: 'medium' },
  { rightIcon: <XIcon16Regular />, children: 'Button', size: 'medium' },
  { leftIcon: <XIcon20Regular />, rightIcon: <XIcon16Regular />, children: 'Button', size: 'medium' },
  { leftIcon: <XIcon24Regular />, children: 'Button', size: 'large' },
  { rightIcon: <XIcon16Regular />, children: 'Button', size: 'large' },
  { leftIcon: <XIcon24Regular />, rightIcon: <XIcon16Regular />, children: 'Button', size: 'large' },
  { leftIcon: <XIcon16Regular />, children: 'Button', isLoading: true },
  { rightIcon: <XIcon16Regular />, children: 'Button', isLoading: true },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, children: 'Button', isLoading: true },
];

export const Disabled: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={disabledDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button', isDisabled: true }}
  />
);

export const ArrowDisabled: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getUseStates()}
    rows={disabledDifferentStates.filter((state) => !state.leftIcon).map((state) => ({ props: state }))}
    presetProps={{ children: 'Button', isDisabled: true, arrow: 'right' }}
  />
);

const disabledDifferentStates: ButtonState[] = [
  {},
  { isLoading: true },
  { isLoading: true, leftIcon: <XIcon16Regular /> },
  { isLoading: true, rightIcon: <XIcon16Regular /> },
  { isLoading: true, leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
];

export const DifferentPrioritization: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={differentPriorityStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);

const differentPriorityStates: ButtonState[] = [
  { isWarning: true, isError: true },
  { isWarning: true, isDisabled: true },
  { isWarning: true, isLoading: true },
  { isError: true, isDisabled: true },
  { isError: true, isLoading: true },
  { isDisabled: true, isLoading: true },
  { isWarning: true, isError: true, isDisabled: true },
  { isWarning: true, isError: true, isLoading: true },
  { isWarning: true, isDisabled: true, isLoading: true },
];

export const IconDifferentContent = () => (
  <Gapped vertical>
    <span>Icon as children</span>
    <Clickable>{<XIcon16Regular />}</Clickable>
    <Clickable leftIcon={<XIcon16Regular />} rightIcon={<XIcon16Regular />} use="primary">
      Icon with long text and color
    </Clickable>
    <Clickable leftIcon={<XIcon16Regular />} rightIcon={<XIcon16Regular />} width="200px">
      With icon, fixed width and long-lon-long text
    </Clickable>
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
        origin: this.browser.findElement({ css: '[data-tid~="test-button"]' }),
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
        origin: this.browser.findElement({ css: '[data-tid~="test-button"]' }),
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
      .click(this.browser.findElement({ css: '[data-tid~="test-button"]' }))
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

export const PlaygroundDefault: Story = () => (
  <Clickable leftIcon={<XIcon16Regular />} data-tid="test-button">
    Hello
  </Clickable>
);

PlaygroundDefault.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome2022|chrome2022Dark?\b)/ },
    tests: buttonTests,
  },
};

export const PlaygroundDisabled: Story = () => (
  <Clickable leftIcon={<XIcon16Regular />} isDisabled data-tid="test-button">
    Hello
  </Clickable>
);

PlaygroundDisabled.parameters = {
  creevey: {
    skip: { in: /^(?!\bchrome2022|chrome2022Dark?\b)/ },
    tests: buttonTests,
  },
};

export const UnusedPropValues: Story = () => (
  <ComponentTable
    Component={Clickable}
    cols={getButtonUseStates()}
    rows={unusedDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ children: 'Button' }}
  />
);
const unusedDifferentStates: ButtonState[] = [
  { isActive: false },
  { autoFocus: false },
  { isBorderless: false },
  { className: '' },
  { 'data-tid': '' },
  { isDisabled: false },
  { isError: false },
  { isLoading: false },
  { isNarrow: false },
  { style: {} },
  { theme: {} },
  { title: '' },
  { isWarning: false },
  { width: '' },
];
