// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Meta, Story } from '../../../typings/stories';
import { Input, InputProps } from '../Input';
import { Gapped } from '../../Gapped';

export default {
  title: 'Input/Static tests',
} as Meta;

type InputState = Partial<InputProps>;

const sizeStates: InputState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

const inputDefaultState: InputState[] = [{}, { defaultValue: 'Value' }];

const inputWidthStates: InputState[] = [{}, { width: '100px' }, { width: '350px' }];

export const Align: Story = () => (
  <ComponentTable
    Component={Input}
    cols={alignStates.map((x) => ({ props: x }))}
    rows={alignDifferentStates.map((x) => ({ props: x }))}
    presetProps={{ value: 'Value', width: '200px' }}
  />
);

const alignStates: InputState[] = [{ align: 'center' }, { align: 'left' }, { align: 'right' }];

const alignDifferentStates: InputState[] = [
  {},
  { leftIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon /> },
  { prefix: 'PR' },
  { suffix: 'SF' },
  { leftIcon: <SearchIcon />, prefix: 'PR' },
  { leftIcon: <SearchIcon />, suffix: 'SF' },
  { rightIcon: <SearchIcon />, prefix: 'PR' },
  { rightIcon: <SearchIcon />, suffix: 'SF' },
  { leftIcon: <SearchIcon />, prefix: 'PR', suffix: 'SF' },
  { rightIcon: <SearchIcon />, prefix: 'PR', suffix: 'SF' },
];

export const AlwaysShowMask: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={alwaysShowMaskStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '(***) ***-**-**' }}
  />
);

const alwaysShowMaskStates: InputState[] = [
  {},
  { defaultValue: '95678901' },
  { defaultValue: '956789010A' },
  { alwaysShowMask: true },
  { alwaysShowMask: true, defaultValue: '95678901' },
  { alwaysShowMask: true, defaultValue: '956789010A' },
];

export const Borderless: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={borderlessStates.map((x) => ({ props: x }))}
    presetProps={{ borderless: true }}
  />
);

const borderlessStates: InputState[] = [{}];

export const Disabled: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={disabledStates.map((x) => ({ props: x }))}
    presetProps={{ disabled: true }}
  />
);

const disabledStates: InputState[] = [
  {},
  { value: 'Some text' },
  { placeholder: 'Placeholder' },
  { type: 'password', value: 'Value' },
  { leftIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon /> },
  { prefix: 'PR' },
  { suffix: 'SF' },
];

export const Error: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={errorStates.map((x) => ({ props: x }))}
    presetProps={{ error: true }}
  />
);
const errorStates: InputState[] = [{}, { borderless: true }, { disabled: true }];

export const LeftIcon: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsStates.map((x) => ({ props: x }))}
    presetProps={{ leftIcon: <SearchIcon /> }}
  />
);

export const RightIcon: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={iconsStates.map((x) => ({ props: x }))}
    presetProps={{ rightIcon: <SearchIcon /> }}
  />
);

const iconsStates: InputState[] = [{}, { defaultValue: 'Value' }, { disabled: true }];

export const Mask: Story = () => (
  <ComponentTable
    Component={Input}
    cols={inputWidthStates.map((x) => ({ props: x }))}
    rows={maskStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);

const maskStates: InputState[] = [
  { mask: '**** **********', alwaysShowMask: true },
  { mask: '**** **********', maskChar: '*', alwaysShowMask: true },
  { mask: '*** ***', maskChar: '_', defaultValue: 'Value' },
  { mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
];

export const Placeholder: Story = () => (
  <ComponentTable
    Component={Input}
    cols={inputDefaultState.map((x) => ({ props: x }))}
    rows={placeholderStates.map((x) => ({ props: x }))}
    presetProps={{ placeholder: '1234567890' }}
  />
);

const placeholderStates: InputState[] = [{}, { disabled: true }];

export const Prefix: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ prefix: 'Prefix' }}
  />
);
const inputPrefixOrSuffixStates: InputState[] = [
  {},
  { value: 'Value' },
  { placeholder: 'Placeholder' },
  { rightIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon />, value: 'Value' },
  { rightIcon: <SearchIcon />, placeholder: 'Placeholder' },
  { leftIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon />, value: 'Value' },
  { leftIcon: <SearchIcon />, placeholder: 'Placeholder' },
];

export const Suffix: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ suffix: 'Suffix' }}
  />
);

export const PrefixAndSuffixBoth: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ prefix: 'Prefix', suffix: 'Suffix' }}
  />
);

export const Size: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputDefaultState.map((x) => ({ props: x }))}
    presetProps={{ children: 'Input' }}
  />
);

export const TextStylesReset: Story = () => (
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
    <Gapped vertical>
      <span>Inherited Styles</span>
      <Input placeholder="Placeholder" />
      <Input defaultValue="Value" />
      <Input defaultValue="Disabled" disabled />
      <Input mask="a9*MASK" alwaysShowMask />
      <Input leftIcon={<SearchIcon />} prefix="Prefix" suffix="suffix" defaultValue="Value" />
    </Gapped>
  </div>
);

export const Type: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={typeStates.map((x) => ({ props: x }))}
    presetProps={{}}
  />
);

const typeStates: InputState[] = [
  { type: 'text', defaultValue: 'Value' },
  { type: 'password', defaultValue: 'Value' },
  { type: 'password', defaultValue: 'Value', disabled: true },
  { mask: '***-***', type: 'password', alwaysShowMask: true },
  { mask: '***-***', type: 'password', alwaysShowMask: true, defaultValue: 'Value' },
  { mask: '***-***', type: 'password', alwaysShowMask: true, defaultValue: 'Value', disabled: true },
];

export const Warning: Story = () => (
  <ComponentTable
    Component={Input}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={warningStates.map((x) => ({ props: x }))}
    presetProps={{ warning: true }}
  />
);

const warningStates: InputState[] = [{}, { borderless: true }, { disabled: true }];

export const SelectAllByProp: Story = () => <Input defaultValue="Some value" selectAllOnFocus />;

SelectAllByProp.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
    },
  },
};

export const BlinkingByButton: Story = () => {
  class Sample extends React.Component {
    private input: Input | null = null;

    public render() {
      return (
        <Gapped>
          <Input ref={this.refInput} />
          <button onClick={this.handleClick}>Blink!</button>
        </Gapped>
      );
    }

    private handleClick = () => {
      if (this.input) {
        this.input.blink();
      }
    };

    private refInput = (element: Input | null) => {
      this.input = element;
    };
  }

  return <Sample />;
};
BlinkingByButton.parameters = { creevey: { skip: true } };
