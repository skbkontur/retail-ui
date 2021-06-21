import React, { Component } from 'react';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { CreeveyStoryParams, CSFStory } from 'creevey';
import OkIcon from "@skbkontur/react-icons/Ok";

import { Kebab } from '../Kebab';
import { MenuItem } from '../../MenuItem';

import { defaultItemsList, manyItemsList } from './Kebab.items';

interface KebabItem {
  text: string;
  action: string;
}

const kebabTests: CreeveyStoryParams['tests'] = {
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
    (story: StoryFn<JSX.Element>) => (
      <div
        style={{
          padding: '120px 0',
          border: '1px solid #dfdede',
          overflow: 'hidden',
        }}
      >
        {story()}
      </div>
    ),
  ],
};

export const Small: CSFStory<JSX.Element> = () => <SomethingWithKebab size="small" />;
Small.story = {
  name: '14px',
  parameters: {
    creevey: { skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hovered' }], tests: kebabTests },
  },
};

export const Medium: CSFStory<JSX.Element> = () => <SomethingWithKebab size="medium" />;
Medium.story = {
  name: '18px',
  parameters: {
    creevey: { skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hovered' }], tests: kebabTests },
  },
};

export const Large: CSFStory<JSX.Element> = () => <SomethingWithKebab size="large" />;
Large.story = {
  name: '20px',
  parameters: {
    creevey: { skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'hovered' }], tests: kebabTests },
  },
};

export const KebabWithCustomIcon: CSFStory<JSX.Element> = () => {
  return (
    <>
      <SomethingWithKebab size="small" icon={<OkIcon color="#757575"/>}/>
      <SomethingWithKebab size="medium" icon={<OkIcon color="#757575"/>}/>
      <SomethingWithKebab size="large" icon={<OkIcon color="#757575"/>}/>
    </>
  );
}
KebabWithCustomIcon.story = {}

export const LargeDisabled = () => <SomethingWithKebab size="large" disabled />;
LargeDisabled.story = { name: '20px-disabled', parameters: { creevey: { skip: [true] } } };

export const WithFixedMenuHeight = () => (
  <SomethingWithKebab size="large" menuMaxHeight={'200px'} items={manyItemsList} />
);
WithFixedMenuHeight.story = { name: 'With fixed menu height', parameters: { creevey: { skip: [true] } } };

export const KebabWithoutAnimations = () => <SomethingWithKebab disableAnimations size="small" />;
KebabWithoutAnimations.story = { name: 'Kebab without animations', parameters: { creevey: { skip: [true] } } };

class SomethingWithKebab extends Component<{
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  items?: KebabItem[];
  menuMaxHeight?: string | number;
  disableAnimations?: boolean;
  icon?: React.ReactNode;
}> {
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
