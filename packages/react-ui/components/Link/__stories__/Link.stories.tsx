import { XIcon16Regular } from '@skbkontur/icons/XIcon16Regular';
import React from 'react';

import { ComponentTable } from '../../../internal/ComponentTable';
import { Story } from '../../../typings/stories';
import { Link, LinkProps } from '../Link';

export default {
  title: 'Link',
  parameters: {
    creevey: {
      skip: { in: ['ie11', 'ie118px', 'ie11Flat8px'] },
    },
  },
};

type LinkState = Partial<LinkProps>;

const useStates: LinkState[] = [{ use: 'default' }, { use: 'success' }, { use: 'danger' }, { use: 'grayed' }];
const getUseStates = () => {
  return useStates.map((x) => ({ props: x }));
};

export const Use: Story = () => (
  <ComponentTable rows={getUseStates()} cols={useDifferentStates.map((x) => ({ props: x }))}>
    <Link>Link</Link>
  </ComponentTable>
);

const useDifferentStates: LinkState[] = [{}, { disabled: true }, { loading: true }];

export const Icon: Story = () => (
  <ComponentTable rows={getUseStates()} cols={iconDifferentStates.map((x) => ({ props: x }))}>
    <Link>Link</Link>
  </ComponentTable>
);

const iconDifferentStates: LinkState[] = [{ icon: <XIcon16Regular /> }];

export const Loading: Story = () => (
  <ComponentTable rows={getUseStates()} cols={loadingDifferentStates.map((x) => ({ props: x }))}>
    <Link>Link</Link>
  </ComponentTable>
);

const loadingDifferentStates: LinkState[] = [{ loading: true }, { loading: true, icon: <XIcon16Regular /> }];
