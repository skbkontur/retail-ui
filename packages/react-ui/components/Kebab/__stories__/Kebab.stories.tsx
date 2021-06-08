import React, { Component } from 'react';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { CreeveyStoryParams, CSFStory } from 'creevey';

import { Kebab } from '../Kebab';
import { MenuItem } from '../../MenuItem';

import { defaultItemsList, manyItemsList } from './Kebab.items';

import { OkIcon } from '../../../internal/icons/16px';
import { jsStyles } from '../Kebab.styles';
import { DEFAULT_THEME } from '../../../lib/theming/themes/DefaultTheme';

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

const kebabWithCustomIconTests: CreeveyStoryParams['tests'] = {
  async plain() {
    await this.expect(await this.takeScreenshot()).to.matchImage('plain');
  }
};

export const SmallWithCustomIcon: CSFStory<JSX.Element> = () => {
  return <SomethingWithKebab size="small" icon={<OkIcon size="14px" color="#757575"/>}/>;
}
SmallWithCustomIcon.story = {
  name: '14px with custom icon',
  parameters: {
    creevey: { skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'custom icon' }], tests: kebabWithCustomIconTests },
  }
}

export const MediumWithCustomIcon: CSFStory<JSX.Element> = () => {
  return <SomethingWithKebab size="medium" icon={<OkIcon size="18px" color="#757575"/>}/>;
}
MediumWithCustomIcon.story = {
  name: '18px with custom icon',
  parameters: {
    creevey: { skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'custom icon' }], tests: kebabWithCustomIconTests },
  }
}

export const LargeWithCustomIcon: CSFStory<JSX.Element> = () => {
  return <SomethingWithKebab size="large" icon={<OkIcon size="20px" color="#757575"/>}/>;
}
LargeWithCustomIcon.story = {
  name: '20px with custom icon',
  parameters: {
    creevey: { skip: [{ in: ['ie11', 'ie11Flat', 'ie118px', 'ie11Flat8px'], tests: 'custom icon' }], tests: kebabWithCustomIconTests },
  }
}

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
