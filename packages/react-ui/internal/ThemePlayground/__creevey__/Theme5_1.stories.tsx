import React from 'react';
import { action } from '@storybook/addon-actions';

import type { Story, Meta } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { DARK_THEME_5_1 } from '../../../lib/theming/themes/DarkTheme';
import { defaultItemsList } from '../../../components/Kebab/__stories__/Kebab.items';
import { MenuItem } from '../../../components/MenuItem';
import { Kebab, type KebabProps } from '../../../components/Kebab';

export default {
  title: 'ThemeVersions/5_1',
  decorators: [
    (Story) => (
      <ThemeContext.Provider value={DARK_THEME_5_1}>
        <Story />
      </ThemeContext.Provider>
    ),
  ],
  parameters: {
    creevey: {
      captureElement: '#test-element',
      skip: {
        'needs only dark': {
          in: ['chrome2022', 'firefox2022'],
        },
      },
    },
  },
} as Meta;

interface KebabItem {
  text: string;
  action: string;
}

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
      <div
        style={{
          padding: '120px 0',
          border: '1px solid #dfdede',
          overflow: 'hidden',
          width: 200,
          textAlign: 'center',
        }}
      >
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

export const Kebab_Small5_1: Story = () => <SomethingWithKebab size="small" />;
Kebab_Small5_1.storyName = 'Kebab_14px';

export const Kebab_Medium5_1: Story = () => <SomethingWithKebab size="medium" />;
Kebab_Medium5_1.storyName = 'Kebab_18px';

export const Kebab_Large5_1: Story = () => <SomethingWithKebab size="large" />;
Kebab_Large5_1.storyName = 'Kebab_20px';
