import { XIcon16Regular } from '@skbkontur/icons/XIcon16Regular';
import React from 'react';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Story } from '../../../typings/stories';
import { Clickable, ClickableProps } from '../Clickable';

export default {
  title: 'Clickable/ClickableLink',
  parameters: {
    creevey: {
      skip: { in: /^(?!\bchrome2022|chrome2022Dark|firefox2022|firefox2022Dark?\b)/ },
    },
  },
};

type LinkState = Partial<ClickableProps>;

const useStates: LinkState[] = [{ use: 'default' }, { use: 'success' }, { use: 'danger' }, { use: 'grayed' }];
const getUseStates = () => {
  return useStates.map((x) => ({ props: x }));
};

export const Use: Story = () => (
  <ComponentTable rows={getUseStates()} cols={useDifferentStates.map((x) => ({ props: x }))}>
    <Clickable as="a">Link</Clickable>
  </ComponentTable>
);

const useDifferentStates: LinkState[] = [{}, { isDisabled: true }, { isLoading: true }, { isError: true }];

export const Icon: Story = () => (
  <ComponentTable rows={getUseStates()} cols={iconDifferentStates.map((x) => ({ props: x }))}>
    <Clickable as="a">Link</Clickable>
  </ComponentTable>
);

const iconDifferentStates: LinkState[] = [
  { leftIcon: <XIcon16Regular /> },
  { rightIcon: <XIcon16Regular /> },
  { leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
  { isError: true, leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
];

export const Loading: Story = () => (
  <ComponentTable rows={getUseStates()} cols={loadingDifferentStates.map((x) => ({ props: x }))}>
    <Clickable as="a">Link</Clickable>
  </ComponentTable>
);

const loadingDifferentStates: LinkState[] = [
  { isLoading: true },
  { isLoading: true, leftIcon: <XIcon16Regular /> },
  { isLoading: true, rightIcon: <XIcon16Regular /> },
  { isLoading: true, leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
  { isLoading: true, isError: true, leftIcon: <XIcon16Regular />, rightIcon: <XIcon16Regular /> },
];
