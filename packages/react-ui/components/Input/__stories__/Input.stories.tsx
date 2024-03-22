// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Meta, Story } from '../../../typings/stories';
import { Input, InputProps } from '../Input';
import { Gapped } from '../../Gapped';

export default {
  title: 'Input',
} as Meta;

type InputState = Partial<InputProps>;

const sizeStates: InputState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

const inputDefaultState: InputState[] = [{}, { defaultValue: 'Value' }];

const inputWidthStates: InputState[] = [{}, { width: '100px' }, { width: '350px' }];

export const Align: Story = () => (
  <ComponentTable cols={alignStates.map((x) => ({ props: x }))} rows={alignDifferentStates.map((x) => ({ props: x }))}>
    <Input value="Value" width="200px" />
  </ComponentTable>
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
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={alwaysShowMaskStates.map((x) => ({ props: x }))}>
    <Input mask="'(***) ***-**-**'" />
  </ComponentTable>
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
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={borderlessStates.map((x) => ({ props: x }))}>
    <Input borderless />
  </ComponentTable>
);

const borderlessStates: InputState[] = [{}];

export const Disabled: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={disabledStates.map((x) => ({ props: x }))}>
    <Input disabled />
  </ComponentTable>
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
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={errorStates.map((x) => ({ props: x }))}>
    <Input error />
  </ComponentTable>
);
const errorStates: InputState[] = [{}, { borderless: true }, { disabled: true }];

export const LeftIcon: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={iconsLeftStates.map((x) => ({ props: x }))}>
    <Input leftIcon={<SearchIcon />} />
  </ComponentTable>
);

export const RightIcon: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={iconsRightStates.map((x) => ({ props: x }))}>
    <Input rightIcon={<SearchIcon />} />
  </ComponentTable>
);

const iconFunc = () => <SearchIcon />;
iconFunc.toString = () => '() => <SearchIcon />';

const iconsStates: InputState[] = [{}, { defaultValue: 'Value' }, { disabled: true }];

const iconsLeftStates: InputState[] = [
  ...iconsStates,
  {
    leftIcon: iconFunc,
  },
  {
    leftIcon: '₽',
  },
];

const iconsRightStates: InputState[] = [
  ...iconsStates,
  {
    rightIcon: iconFunc,
  },
  {
    rightIcon: '₽',
  },
];

export const Mask: Story = () => (
  <ComponentTable cols={inputWidthStates.map((x) => ({ props: x }))} rows={maskStates.map((x) => ({ props: x }))}>
    <Input />
  </ComponentTable>
);

const maskStates: InputState[] = [
  { mask: '**** **********', alwaysShowMask: true },
  { mask: '**** **********', maskChar: '*', alwaysShowMask: true },
  { mask: '*** ***', maskChar: '_', defaultValue: 'Value' },
  { mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'email', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'tel', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'url', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'search', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'date', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'time', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { type: 'number', mask: '*** ***', maskChar: '_', defaultValue: 'Value', alwaysShowMask: true },
  { mask: '*** ***', placeholder: 'ooo-long-long-long-placeholder' },
];

export const Placeholder: Story = () => (
  <ComponentTable
    cols={inputDefaultState.map((x) => ({ props: x }))}
    rows={placeholderStates.map((x) => ({ props: x }))}
  >
    <Input placeholder="1234567890" />
  </ComponentTable>
);

const placeholderStates: InputState[] = [{}, { disabled: true }];

export const Prefix: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={inputPrefixStates.map((x) => ({ props: x }))}>
    <Input prefix="Prefix" />
  </ComponentTable>
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

const inputPrefixStates: InputState[] = [...inputPrefixOrSuffixStates, { prefix: 'ooo-long-long-long-johnson' }];

const inputSuffixStates: InputState[] = [...inputPrefixOrSuffixStates, { suffix: 'ooo-long-long-long-johnson' }];

export const Suffix: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={inputSuffixStates.map((x) => ({ props: x }))}>
    <Input suffix="Suffix" />
  </ComponentTable>
);

export const PrefixAndSuffixBoth: Story = () => (
  <ComponentTable
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
  >
    <Input prefix="Prefix" suffix="Suffix" />
  </ComponentTable>
);

export const Size: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={inputDefaultState.map((x) => ({ props: x }))}>
    <Input>Input</Input>
  </ComponentTable>
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
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={typeStates.map((x) => ({ props: x }))}>
    <Input />
  </ComponentTable>
);
Type.parameters = { creevey: { skip: { in: /^(?!\b(chrome|firefox)\b)/ } } };

const typeStates: InputState[] = [
  { type: 'text', defaultValue: 'Value' },
  { type: 'password', defaultValue: 'Value' },
  { type: 'password', defaultValue: 'Value', disabled: true },
  { mask: '***-***', type: 'password', alwaysShowMask: true },
  { mask: '***-***', type: 'password', alwaysShowMask: true, defaultValue: 'Value' },
  { mask: '***-***', type: 'password', alwaysShowMask: true, defaultValue: 'Value', disabled: true },
  { type: 'number', defaultValue: '15', min: 10, max: 20, step: 5 },
  { type: 'search' },
  { type: 'date' },
  { type: 'time' },
  { type: 'email', pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' },
  { type: 'url' },
  { type: 'tel' },
];

export const TypeApi: Story = () => (
  <>
    <ComponentTable cols={typeApiProps.map((x) => ({ props: x }))} rows={typeApiTypes.map((x) => ({ props: x }))}>
      <Input />
    </ComponentTable>
    <ComponentTable
      cols={typeApiPropsDate.map((x) => ({ props: x }))}
      rows={typeApiTypesDate.map((x) => ({ props: x }))}
    >
      <Input />
    </ComponentTable>
    <ComponentTable
      cols={typeApiPropsTime.map((x) => ({ props: x }))}
      rows={typeApiTypesTime.map((x) => ({ props: x }))}
    >
      <Input />
    </ComponentTable>
  </>
);
TypeApi.parameters = { creevey: { skip: { in: /^(?!\b(chrome|firefox)\b)/ } } };

const typeApiTypes: InputState[] = [
  { type: 'number' },
  { type: 'search' },
  { type: 'email' },
  { type: 'url' },
  { type: 'tel' },
];
const typeApiTypesDate: InputState[] = [{ type: 'date' }];
const typeApiTypesTime: InputState[] = [{ type: 'time' }];

const typeApiProps: InputState[] = [
  { leftIcon: <SearchIcon />, value: '123' },
  { rightIcon: <SearchIcon />, value: '123' },
  { rightIcon: <SearchIcon />, placeholder: 'placeholder' },
  { prefix: 'prefix: ' },
  { suffix: ' suffix' },
];
const typeApiPropsDate: InputState[] = [
  { rightIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon /> },
  { value: '2022-05-04' },
  { prefix: 'prefix: ' },
  { suffix: ' suffix' },
];
const typeApiPropsTime: InputState[] = [
  { rightIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon /> },
  { value: '18:00' },
  { prefix: 'prefix: ' },
  { suffix: ' suffix' },
];

export const Warning: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={warningStates.map((x) => ({ props: x }))}>
    <Input warning />
  </ComponentTable>
);

const warningStates: InputState[] = [{}, { borderless: true }, { disabled: true }];

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
