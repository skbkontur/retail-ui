// TODO: Rewrite stories and enable rule (in process of functional refactoring).
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import SearchIcon from '@skbkontur/react-icons/Search';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Meta, Story } from '../../../typings/stories';
import { MaskedInput, MaskedInputProps } from '../MaskedInput';
import { Input } from '../../Input';
import { testPropsSets } from '../testPropsSets';

export default {
  title: 'MaskedInput',
} as Meta;

type InputState = Partial<MaskedInputProps>;

const sizeStates: InputState[] = [{ size: 'small' }, { size: 'medium' }, { size: 'large' }];

export const Mask: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={maskStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '(999) 999-99-99' }}
  />
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
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={inputPrefixOrSuffixStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '+7 (999) 999 99 99' }}
  />
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
  <ComponentTable
    Component={MaskedInput}
    cols={[{}]}
    rows={prefixesAndSuffixesStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '+7 (999) 999 99 99', width: '250px' }}
  />
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
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={validationsStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '99:99' }}
  />
);

const validationsStates: InputState[] = [
  { warning: true },
  { value: '12', warning: true },
  { alwaysShowMask: true, warning: true },
  { value: '12', alwaysShowMask: true, warning: true },
  { error: true },
  { value: '12', error: true },
  { alwaysShowMask: true, error: true },
  { value: '12', alwaysShowMask: true, error: true },
];

export const Positions: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={positionsStates.map((x) => ({ props: x }))}
    presetProps={{ alwaysShowMask: true, mask: '**** **** ****' }}
  />
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

export const Disabled: Story = () => (
  <ComponentTable
    Component={MaskedInput}
    cols={sizeStates.map((x) => ({ props: x }))}
    rows={disabledStates.map((x) => ({ props: x }))}
    presetProps={{ mask: '99:99', disabled: true }}
  />
);

const disabledStates: InputState[] = [
  {},
  { alwaysShowMask: true },
  { value: '12' },
  { value: '12', alwaysShowMask: true },
  { placeholder: 'Placeholder' },
];

export const AllLabGrotesqueStyles: Story = () => {
  const fontStyles = [
    {
      fontStyle: 'normal',
      fontWeight: 100,
    },
    {
      fontStyle: 'normal',
      fontWeight: 300,
    },
    {
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      fontStyle: 'normal',
      fontWeight: 500,
    },
    {
      fontStyle: 'normal',
      fontWeight: 600,
    },
    {
      fontStyle: 'normal',
      fontWeight: 700,
    },
    {
      fontStyle: 'normal',
      fontWeight: 900,
    },
    {
      fontStyle: 'italic',
      fontWeight: 100,
    },
    {
      fontStyle: 'italic',
      fontWeight: 300,
    },
    {
      fontStyle: 'italic',
      fontWeight: 400,
    },
    {
      fontStyle: 'italic',
      fontWeight: 500,
    },
    {
      fontStyle: 'italic',
      fontWeight: 600,
    },
    {
      fontStyle: 'italic',
      fontWeight: 700,
    },
    {
      fontStyle: 'italic',
      fontWeight: 900,
    },
  ];

  return (
    <ComponentTable
      Component={MaskedInput}
      cols={sizeStates.map((x) => ({ props: x }))}
      rows={fontStyles.map((x) => ({ props: { style: x } }))}
      presetProps={{ mask: '+7 999-999-99-99', value: '123', alwaysShowMask: true }}
    />
  );
};

AllLabGrotesqueStyles.parameters = {
  creevey: {
    skip: true,
  },
};

export const CompareWithInput: Story = () => {
  const Comp = ({ comp, ...props }: { comp: 'MaskedInput' | 'Input-mask' | 'Input' }) => {
    const mask = '99:99';
    if (comp === 'MaskedInput') {
      return <MaskedInput mask={mask} {...props} />;
    }
    if (comp === 'Input-mask') {
      return <Input mask={mask} {...props} />;
    }
    return <Input {...props} />;
  };

  return (
    <ComponentTable<any, any, any>
      Component={Comp}
      cols={[{ comp: 'MaskedInput' }, { comp: 'Input-mask' }, { comp: 'Input' }].map((x) => ({ props: x }))}
      rows={testPropsSets.map((x) => ({ props: x }))}
    />
  );
};

CompareWithInput.parameters = {
  creevey: {
    skip: true,
  },
};
