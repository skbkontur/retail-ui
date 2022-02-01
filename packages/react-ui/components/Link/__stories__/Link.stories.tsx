import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import DeleteIcon from '@skbkontur/react-icons/Delete';
import { ComponentStory } from '@storybook/react';

import { Story, CreeveyTests, Meta } from '../../../typings/stories';
import { Link, LinkProps } from '../Link';
import { Toast } from '../../Toast';
import { Gapped } from '../../Gapped';

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
  title: 'components/Link',
  parameters: { creevey: { skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hover' }] } },
  argTypes: {
    use: { control: 'select', options: ['default', 'success', 'danger', 'grayed'] },
  },
} as Meta;

const commonArgs = {
  disabled: false,
  loading: false,
  href: 'https://tech.skbkontur.ru/react-ui',
  use: 'default' as LinkProps['use'],
};

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  ...commonArgs,
  children: 'Simple Link',
};
Simple.parameters = { creevey: { tests: linkTests } };

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...commonArgs,
  children: 'Simple Link',
  icon: <OkIcon />,
};
WithIcon.parameters = { creevey: { tests: linkTests } };

export const Danger = Template.bind({});
Danger.args = {
  ...commonArgs,
  use: 'danger',
  icon: <DeleteIcon />,
  children: 'Simple Link',
};
Danger.parameters = { creevey: { tests: linkTests } };

export const Grayed = Template.bind({});
Grayed.args = {
  ...commonArgs,
  use: 'grayed',
  children: 'Simple Link',
};
Grayed.parameters = { creevey: { tests: linkTests } };

export const Disabled = Template.bind({});
Disabled.args = {
  ...commonArgs,
  disabled: true,
  children: 'Simple Link',
};
Disabled.parameters = { creevey: { tests: linkTests } };

export const WithOnClick = Template.bind({});
WithOnClick.args = {
  ...commonArgs,
  onClick: () => Toast.push('Clicked!'),
  children: 'Link with onClick action',
};
WithOnClick.storyName = 'With onClick';
WithOnClick.parameters = { creevey: { skip: [true] } };

export const Loading: Story = () => (
  <Gapped vertical>
    <Link loading>Simple loading </Link>
    <div style={{ width: '300px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <div style={{ width: '150px', border: '1px solid lightgrey', padding: '5px' }}>
      {'Some long text '}
      <Link loading>loading link </Link>
      and end of line
    </div>
    <Link loading icon={<OkIcon />}>
      Loading link with icon
    </Link>
  </Gapped>
);
Loading.parameters = { creevey: { tests: linkTests } };
