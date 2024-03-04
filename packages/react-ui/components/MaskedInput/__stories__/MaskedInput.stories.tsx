// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Meta, Story } from '../../../typings/stories';
import { MaskedInput, MaskedInputProps } from '../MaskedInput';

export default {
  title: 'MaskedInput',
} as Meta;

type InputState = Partial<MaskedInputProps>;

const sizeStates: InputState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Mask: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={maskStates.map((x) => ({ props: x }))}>
    <MaskedInput mask="(999) 999-99-99" />
  </ComponentTable>
);

const maskStates: InputState[] = [
  {},
  { defaultValue: '95678901' },
  { defaultValue: '956789010A' },
  { mask: '****', value: 'overflow' },
  { placeholder: 'mask with placeholder' },
  { alwaysShowMask: true },
  { alwaysShowMask: true, maskChar: null },
  { alwaysShowMask: true, maskChar: 'X' },
  { alwaysShowMask: true, defaultValue: '95678901' },
  { alwaysShowMask: true, defaultValue: '956789010A' },
  { alwaysShowMask: true, placeholder: 'mask with placeholder' },
  { alwaysShowMask: true, type: 'email', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'tel', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'url', mask: '*** ***', defaultValue: 'Value' },
  { alwaysShowMask: true, type: 'search', mask: '*** ***', defaultValue: 'Value' },
];

export const PrefixOrSuffix: Story = () => (
  <ComponentTable
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
  >
    <MaskedInput mask="+7 (999) 999 99 99" />
  </ComponentTable>
);
const inputPrefixOrSuffixStates: InputState[] = [
  {},
  { rightIcon: <SearchIcon /> },
  { rightIcon: <SearchIcon />, value: '+79876543210' },
  { leftIcon: <SearchIcon /> },
  { leftIcon: <SearchIcon />, value: '+79876543210' },
  { rightIcon: <SearchIcon />, placeholder: 'Placeholder' },
  { leftIcon: <SearchIcon />, placeholder: 'Placeholder' },
  { prefix: 'prefix:' },
  { prefix: 'prefix:', value: '+79876543210' },
  { suffix: '/suffix' },
  { suffix: '/suffix', value: '+79876543210' },
];

export const PrefixesAndSuffixes: Story = () => (
  <ComponentTable cols={[{}]} rows={prefixesAndSuffixesStates.map((x) => ({ props: x }))}>
    <MaskedInput mask="+7 (999) 999 99 99" width="250px" />
  </ComponentTable>
);
const prefixesAndSuffixesStates: InputState[] = [
  {
    rightIcon: <SearchIcon />,
    leftIcon: <SearchIcon />,
    prefix: 'prefix:',
    suffix: '/suffix',
    placeholder: 'Placeholder',
  },
  {
    rightIcon: <SearchIcon />,
    leftIcon: <SearchIcon />,
    prefix: 'prefix:',
    suffix: '/suffix',
    value: '+7987654321',
    alwaysShowMask: true,
  },
];

export const Validations: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={validationsStates.map((x) => ({ props: x }))}>
    <MaskedInput mask="99:99" />
  </ComponentTable>
);

const validationsStates: InputState[] = [
  {},
  { borderless: true },
  { disabled: true },
  { alwaysShowMask: true, disabled: true },
  { warning: true },
  { error: true },
];

export const Positions: Story = () => (
  <ComponentTable cols={sizeStates.map((x) => ({ props: x }))} rows={positionsStates.map((x) => ({ props: x }))}>
    <MaskedInput alwaysShowMask mask="**** **** ****" />
  </ComponentTable>
);

const positionsStates: InputState[] = [
  { value: '1' },
  { value: '1111 1' },
  { value: '1111 1111 111' },
  { value: 'W' },
  { value: 'WWWW W' },
  { value: 'WWWW WWWW WWW' },
  { value: 'W1W1 W1W1 W1' },
];
