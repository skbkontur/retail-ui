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
  <ComponentTable rows={getUseStates()} cols={useDifferentStates.map((x) => ({ props: x }))}>
    <Clickable>Button</Clickable>
  </ComponentTable>
);

const useDifferentStates: ButtonState[] = [{}, { active: true }];

export const Warning: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={sizeDifferentStates.map((x) => ({ props: x }))}>
    <Clickable warning>Button</Clickable>
  </ComponentTable>
);

export const Error: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={sizeDifferentStates.map((x) => ({ props: x }))}>
    <Clickable error>Button</Clickable>
  </ComponentTable>
);

export const Arrow: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={arrowDifferentStates.map((x) => ({ props: x }))}>
    <Clickable arrow="right">Button</Clickable>
  </ComponentTable>
);

export const ArrowLeft: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={arrowDifferentStates.map((x) => ({ props: x }))}>
    <Clickable arrow="left">Button</Clickable>
  </ComponentTable>
);

const arrowDifferentStates: ButtonState[] = [{ warning: true }, { error: true }, { warning: true, error: true }];

export const ArrowSize: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={arrowDifferentSizeStates.map((x) => ({ props: x }))}>
    <Clickable>Button</Clickable>
  </ComponentTable>
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
  <ComponentTable cols={getButtonUseStates()} rows={borderlessDifferentStates.map((x) => ({ props: x }))}>
    <Clickable borderless>Button</Clickable>
  </ComponentTable>
);

const borderlessDifferentStates: ButtonState[] = [
  {},
  { disabled: true },
  { loading: true },
  { error: true },
  { warning: true },
  { active: true },
];

export const Size: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={sizeDifferentStates.map((x) => ({ props: x }))}>
    <Clickable>Button</Clickable>
  </ComponentTable>
);

const sizeDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Loading: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={loadingDifferentStates.map((x) => ({ props: x }))}>
    <Clickable loading>Button</Clickable>
  </ComponentTable>
);

const loadingDifferentStates: ButtonState[] = [{ active: true }];

export const Narrow: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={narrowDifferentStates.map((x) => ({ props: x }))}>
    <Clickable narrow>Button</Clickable>
  </ComponentTable>
);

const narrowDifferentStates: ButtonState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Align: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={alignDifferentStates.map((x) => ({ props: x }))}>
    <Clickable width="200px">Button</Clickable>
  </ComponentTable>
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
  <ComponentTable cols={getButtonUseStates()} rows={iconDifferentStates.map((x) => ({ props: x }))}>
    <Clickable />
  </ComponentTable>
);
const iconDifferentStates: ButtonState[] = [
  { leftIcon: <XIcon16Regular /> },
  { rightIcon: <XIcon16Regular /> },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
  { leftIcon: <XIcon16Regular />, children: 'Button' },
  { rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon16Regular />, loading: true },
  { rightIcon: <XIcon16Regular />, loading: true },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, loading: true },
  { leftIcon: <XIcon16Regular />, children: 'Button' },
  { rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, children: 'Button' },
  { leftIcon: <XIcon20Regular />, children: 'Button', size: 'medium' },
  { rightIcon: <XIcon16Regular />, children: 'Button', size: 'medium' },
  { leftIcon: <XIcon20Regular />, rightIcon: <XIcon16Regular />, children: 'Button', size: 'medium' },
  { leftIcon: <XIcon24Regular />, children: 'Button', size: 'large' },
  { rightIcon: <XIcon16Regular />, children: 'Button', size: 'large' },
  { leftIcon: <XIcon24Regular />, rightIcon: <XIcon16Regular />, children: 'Button', size: 'large' },
  { leftIcon: <XIcon16Regular />, children: 'Button', loading: true },
  { rightIcon: <XIcon16Regular />, children: 'Button', loading: true },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular />, children: 'Button', loading: true },
];

export const Disabled: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={disabledDifferentStates.map((x) => ({ props: x }))}>
    <Clickable disabled>Button</Clickable>
  </ComponentTable>
);

export const ArrowDisabled: Story = () => (
  <ComponentTable
    cols={getUseStates()}
    rows={disabledDifferentStates.filter((state) => !state.leftIcon).map((state) => ({ props: state }))}
  >
    <Clickable disabled arrow="right">
      Button
    </Clickable>
  </ComponentTable>
);

const disabledDifferentStates: ButtonState[] = [
  {},
  { loading: true },
  { loading: true, leftIcon: <XIcon16Regular /> },
  { loading: true, rightIcon: <XIcon16Regular /> },
  { loading: true, leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
];

export const DifferentPrioritization: Story = () => (
  <ComponentTable cols={getButtonUseStates()} rows={differentPriorityStates.map((x) => ({ props: x }))}>
    <Clickable>Button</Clickable>
  </ComponentTable>
);

const differentPriorityStates: ButtonState[] = [
  { warning: true, error: true },
  { warning: true, disabled: true },
  { warning: true, loading: true },
  { error: true, disabled: true },
  { error: true, loading: true },
  { disabled: true, loading: true },
  { warning: true, error: true, disabled: true },
  { warning: true, error: true, loading: true },
  { warning: true, disabled: true, loading: true },
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
  <Clickable leftIcon={<XIcon16Regular />} disabled data-tid="test-button">
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
  <ComponentTable cols={getButtonUseStates()} rows={unusedDifferentStates.map((x) => ({ props: x }))}>
    <Clickable>Button</Clickable>
  </ComponentTable>
);
const unusedDifferentStates: ButtonState[] = [
  { active: false },
  { autoFocus: false },
  { borderless: false },
  { className: '' },
  { 'data-tid': '' },
  { disabled: false },
  { error: false },
  { loading: false },
  { narrow: false },
  { style: {} },
  { theme: {} },
  { title: '' },
  { warning: false },
  { width: '' },
];
