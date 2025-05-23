import React from 'react';
import AddIcon from '@skbkontur/react-icons/Add';
import BabyIcon from '@skbkontur/react-icons/Baby';

import { Button } from '../../Button';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Meta, Story } from '../../../typings/stories';
import { Dropdown } from '../Dropdown';
import { MenuItem } from '../../MenuItem';
import { Gapped } from '../../Gapped';
import { MenuHeader } from '../../MenuHeader';

export default {
  title: 'Dropdown',
  component: Dropdown,
  decorators: [
    (Story: () => JSX.Element) => (
      <div className="dropdown-test-container" style={{ minHeight: 150, minWidth: 400, padding: 4, overflow: 'auto' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const SimpleDropdown: Story = () => (
  <Dropdown caption="Items">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);

export const WithFixedWidth: Story = () => (
  <Dropdown caption="Items" width={300}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithFixedWidth.storyName = 'With fixed width';
WithFixedWidth.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithOverflow = () => (
  <Dropdown caption="Lorem ipsum dollar all mubarak ibn ahmed" width={100}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithOverflow.storyName = 'With overflow';
WithOverflow.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithIcon = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIcon.storyName = 'With icon';
WithIcon.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const WithMenuItemIcon: Story = () => (
  <Dropdown caption="Care" icon={<BabyIcon />}>
    <MenuItem icon={<AddIcon />}>Menu item</MenuItem>
    <MenuItem>Another item</MenuItem>
  </Dropdown>
);
WithMenuItemIcon.storyName = 'With MenuItem icon';

export const WithIconAndOverflow = () => (
  <Dropdown icon={<AddIcon />} caption="Lorem ipsum dollar all mubarak ibn ahmed" width="100px">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIconAndOverflow.storyName = 'With icon and overflow';
WithIconAndOverflow.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const InsideScrollableContainer: Story = () => (
  <div style={{ height: '150px' }}>
    <div style={{ height: 'calc(200% + 4px)' }}>
      <Dropdown caption="Menu">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>
    </div>
  </div>
);

export const WithCustomSelectTheme: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider
            value={ThemeFactory.create({ dropdownButtonBorderRadiusSmall: '12px', btnBorderRadiusSmall: '3px' }, theme)}
          >
            <Dropdown caption="Открыть">
              <Button>Кнопка</Button>
            </Dropdown>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
WithCustomSelectTheme.storyName = 'with custom select theme';

export const WithManualPosition: Story = () => {
  const [menuPos, setMenuPos] = React.useState<'top' | 'bottom'>('top');
  const [isPortalDisabled, setIsPortalDisabled] = React.useState(false);

  return (
    <div style={{ marginTop: '50px' }}>
      <Dropdown disablePortal={isPortalDisabled} menuPos={menuPos} caption="Открыть">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>
      <button data-tid="pos" onClick={() => setMenuPos(menuPos === 'top' ? 'bottom' : 'top')}>
        change pos to {menuPos === 'top' ? 'bottom' : 'top'}
      </button>
      <button data-tid="portal" onClick={() => setIsPortalDisabled(!isPortalDisabled)}>
        {isPortalDisabled ? 'enable' : 'disable'} portal
      </button>
    </div>
  );
};
WithManualPosition.storyName = 'with manual position';

export const Size: Story = () => {
  const items = [<MenuItem key={1}>one</MenuItem>, 'two', <MenuItem key={3}>three</MenuItem>];
  let small: Dropdown | null = null;
  let medium: Dropdown | null = null;
  let large: Dropdown | null = null;
  const handleClick = () => {
    if (small) {
      small.open();
    }
    if (medium) {
      medium.open();
    }
    if (large) {
      large.open();
    }
  };
  return (
    <div>
      <Button onClick={handleClick} data-tid="open-all">
        Open All
      </Button>
      <Gapped style={{ height: '250px' }}>
        <Dropdown
          size={'small'}
          caption="Items small"
          ref={(element) => {
            small = element;
          }}
        >
          <MenuHeader>This is header</MenuHeader>
          {items}
        </Dropdown>
        <Dropdown
          size={'medium'}
          caption="Items medium"
          ref={(element) => {
            medium = element;
          }}
        >
          <MenuHeader>This is header</MenuHeader>
          {items}
        </Dropdown>
        <Dropdown
          size={'large'}
          caption="Items large"
          ref={(element) => {
            large = element;
          }}
        >
          <MenuHeader>This is header</MenuHeader>
          {items}
        </Dropdown>
      </Gapped>
    </div>
  );
};
Size.storyName = 'size';
