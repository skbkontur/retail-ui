import React from 'react';
import AddIcon from '@skbkontur/react-icons/Add';
import BabyIcon from '@skbkontur/react-icons/Baby';

import { Button } from '../../Button';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { Meta, Story } from '../../../typings/stories';
import { Dropdown } from '../Dropdown';
import { MenuItem } from '../../MenuItem';
import { delay } from '../../../lib/utils';

export default {
  title: 'Dropdown',
  decorators: [
    (Story) => (
      <div className="dropdown-test-container" style={{ height: 150, width: 400, padding: 4, overflow: 'auto' }}>
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

SimpleDropdown.parameters = {
  creevey: {
    skip: {
      'story-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'MenuItem hover' },

      // TODO @Khlutkova fix after update browsers
      'story-skip-1': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['MenuItem hover'] },
    },
    tests: {
      async idle() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await delay(1000);

        await this.expect(await element.takeScreenshot()).to.matchImage('idle');
      },
      async clicked() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await delay(1000);

        await this.expect(await element.takeScreenshot()).to.matchImage('clicked');
      },
      async 'MenuItem hover'() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .move({
            origin: this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }),
          })
          .perform();
        await delay(1000);

        await this.expect(await element.takeScreenshot()).to.matchImage('MenuItem hover');
      },
      async 'selected item'() {
        const element = await this.browser.findElement({ css: '.dropdown-test-container' });
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="MenuItem"]' }))
          .perform();
        await delay(1000);

        await this.expect(await element.takeScreenshot()).to.matchImage('selected item');
      },
    },
  },
};

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

WithMenuItemIcon.parameters = {
  creevey: {
    captureElement: '.dropdown-test-container',
    tests: {
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
    },
  },
};

export const WithIconAndOverflow = () => (
  <Dropdown icon={<AddIcon />} caption="Lorem ipsum dollar all mubarak ibn ahmed" width="100px">
    <MenuItem>Menu item</MenuItem>
  </Dropdown>
);
WithIconAndOverflow.storyName = 'With icon and overflow';
WithIconAndOverflow.parameters = { creevey: { captureElement: '.dropdown-test-container' } };

export const InsideScrollableContainer: Story = () => (
  <div style={{ height: '200%' }}>
    <Dropdown caption="Menu">
      <MenuItem>Menu item</MenuItem>
    </Dropdown>
  </div>
);
InsideScrollableContainer.parameters = {
  creevey: {
    captureElement: '.dropdown-test-container',
    tests: {
      async scrolled() {
        await this.browser
          .actions()
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        const opened = await this.takeScreenshot();
        await this.browser.executeScript(function () {
          const scrollContainer = window.document.querySelector('.dropdown-test-container') as HTMLElement;
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        });
        const scrolled = await this.takeScreenshot();
        await this.expect({ opened, scrolled }).to.matchImages();
      },
    },
  },
};

export const WithCustomSelectTheme: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider
            value={ThemeFactory.create({ selectBorderRadiusSmall: '12px', btnBorderRadiusSmall: '3px' }, theme)}
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

WithCustomSelectTheme.parameters = {
  creevey: {
    tests: {
      async clicked() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('clicked');
      },
    },
  },
};

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
WithManualPosition.parameters = {
  creevey: {
    skip: { in: /^(?!\b(chrome|firefox)\b)/ },
    tests: {
      async 'opened top with portal'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened top with portal');
      },
      async 'opened bottom with portal'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom with portal');
      },
      async 'opened top without portal'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="portal"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened top without portal');
      },
      async 'opened bottom without portal'() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="portal"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-tid~="pos"]' }))
          .pause(1000)
          .click(this.browser.findElement({ css: '[data-comp-name~="Dropdown"]' }))
          .perform();
        await delay(1000);

        await this.expect(await this.takeScreenshot()).to.matchImage('opened bottom without portal');
      },
    },
  },
};
