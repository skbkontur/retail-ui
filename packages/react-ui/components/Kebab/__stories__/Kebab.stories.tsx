import React from 'react';
import { action } from '@storybook/addon-actions';
import OkIcon from '@skbkontur/react-icons/Ok';

import { Meta, Story, CreeveyTests } from '../../../typings/stories';
import { Kebab } from '../Kebab';
import { MenuItem } from '../../MenuItem';
import { KebabProps } from '..';

import { defaultItemsList, manyItemsList } from './Kebab.items';

interface KebabItem {
  text: string;
  action: string;
}

const kebabTests: CreeveyTests = {
  async plain() {
    await this.expect(await this.takeScreenshot()).to.matchImage('plain');
  },
  async hovered() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }),
      })
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
  },
  async clicked() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
  },
  async clickedOnButton2ndTime() {
    await this.browser
      .actions({
        bridge: true,
      })
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .click(this.browser.findElement({ css: '[data-comp-name~="Kebab"]' }))
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('clickedOnButton2ndTime');
  },
  async tabPress() {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
  },
  async enterPress() {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .sendKeys(this.keys.ENTER)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('enterPress');
  },
  async escapePress() {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .sendKeys(this.keys.ENTER)
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.ESCAPE)
      .perform();
    await this.expect(await this.takeScreenshot()).to.matchImage('escapePress');
  },
};

export default {
  title: 'Kebab',
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '120px 0',
          border: '1px solid #dfdede',
          overflow: 'hidden',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Small: Story = () => <SomethingWithKebab size="small" />;
Small.storyName = '14px';

Small.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },
      // TODO @Khlutkova fix after update browsers
      { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hovered', 'clickedOnButton2ndTime'] },
    ],
    tests: kebabTests,
  },
};

export const Medium: Story = () => <SomethingWithKebab size="medium" />;
Medium.storyName = '18px';

Medium.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },
      // TODO @Khlutkova fix after update browsers
      { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hovered', 'clickedOnButton2ndTime'] },
    ],
    tests: kebabTests,
  },
};

export const Large: Story = () => <SomethingWithKebab size="large" />;
Large.storyName = '20px';

Large.parameters = {
  creevey: {
    skip: [
      { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hovered' },
      // TODO @Khlutkova fix after update browsers
      { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hovered', 'clickedOnButton2ndTime'] },
    ],
    tests: kebabTests,
  },
};

export const KebabWithCustomIcon: Story = () => {
  return (
    <>
      <SomethingWithKebab size="small" icon={<OkIcon color="#757575" />} />
      <SomethingWithKebab size="medium" icon={<OkIcon color="#757575" />} />
      <SomethingWithKebab size="large" icon={<OkIcon color="#757575" />} />
    </>
  );
};

export const LargeDisabled = () => <SomethingWithKebab size="large" disabled />;
LargeDisabled.storyName = '20px-disabled';
LargeDisabled.parameters = { creevey: { skip: [true] } };

export const WithFixedMenuHeight = () => (
  <SomethingWithKebab size="large" menuMaxHeight={'200px'} items={manyItemsList} />
);
WithFixedMenuHeight.storyName = 'With fixed menu height';
WithFixedMenuHeight.parameters = { creevey: { skip: [true] } };

export const KebabWithoutAnimations = () => <SomethingWithKebab disableAnimations size="small" />;
KebabWithoutAnimations.storyName = 'Kebab without animations';
KebabWithoutAnimations.parameters = { creevey: { skip: [true] } };

interface SomethingWithKebabProps {
  items?: KebabItem[];
  disableAnimations?: boolean;
  size: KebabProps['size'];
  disabled?: boolean;
  menuMaxHeight?: number | string;
  icon?: React.ReactNode;
}
class SomethingWithKebab extends React.Component<SomethingWithKebabProps> {
  public render() {
    const itemsList = this.props.items || defaultItemsList;
    const menuItems = itemsList.map((item: KebabItem, index: number) => {
      return (
        <MenuItem key={index} onClick={action(item.action)}>
          {item.text}
        </MenuItem>
      );
    });

    return (
      <div style={{ width: 200, textAlign: 'center' }}>
        Pikachu{' '}
        <Kebab
          size={this.props.size}
          onOpen={action('open')}
          onClose={action('close')}
          disabled={this.props.disabled}
          menuMaxHeight={this.props.menuMaxHeight}
          disableAnimations={this.props.disableAnimations}
          icon={this.props.icon}
        >
          {menuItems}
        </Kebab>
      </div>
    );
  }
}
