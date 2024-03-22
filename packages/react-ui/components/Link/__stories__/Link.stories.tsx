import { XIcon16Regular } from '@skbkontur/icons/XIcon16Regular';
import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon';

import { ComponentTable } from '../../../internal/ComponentTable';
import { CreeveyTests, Story } from '../../../typings/stories';
import { Link, LinkProps } from '../Link';
import { Gapped } from '../../../components/Gapped';

const linkTests: CreeveyTests = {
  async idle() {
    await this.expect(await this.takeScreenshot()).to.matchImage('idle');
  },
  async hover() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hover');
  },
};

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

export const WithIcon: Story = () => {
  return (
    <Gapped vertical>
      <Gapped gap={20}>
        <Link icon={<CheckAIcon16Light />}>Left Icon Link</Link>
        <Link icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>
          Both Icons Link
        </Link>
        <Link rightIcon={<CheckAIcon16Light />}>Right Icon Link</Link>
      </Gapped>
      <Gapped gap={20}>
        <Link loading icon={<CheckAIcon16Light />}>
          Left Icon Link
        </Link>
        <Link loading icon={<CheckAIcon16Light />} rightIcon={<CheckAIcon16Light />}>
          Both Icons Link
        </Link>
        <Link loading rightIcon={<CheckAIcon16Light />}>
          Right Icon Link
        </Link>
      </Gapped>
    </Gapped>
  );
};
WithIcon.parameters = {
  creevey: {
    tests: linkTests,
    skip: {
      // TODO @Khlutkova fix after update browsers
      'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
    },
  },
};

export const Danger: Story = () => (
  <Link icon={<OkIcon />} use="danger">
    Simple Link
  </Link>
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
