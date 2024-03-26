import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon';

import { Story, CreeveyTests } from '../../../typings/stories';
import { Link } from '../Link';
import { Toast } from '../../Toast';
import { Gapped } from '../../Gapped';
import { delay } from '../../../lib/utils';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';

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
      skip: {
        'kind-skip-0': { in: ['ie11', 'ie118px', 'ie11Flat8px', 'ie11Dark'], tests: 'hover' },
      },
    },
  },
};

const focusedLinkTest: CreeveyTests = {
  async 'tab press'() {
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPress');
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPressHovered');
  },
};

export const Simple: Story = () => <Link>Simple Link</Link>;
Simple.parameters = {
  creevey: {
    tests: linkTests,
    skip: {
      // TODO @Khlutkova fix after update browsers
      'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
    },
  },
};

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
    tests: {
      idle: linkTests['idle'],
      hover: linkTests['hover'],
      'tab press': focusedLinkTest['tab press'],
    },
    skip: {
      // TODO @Khlutkova fix after update browsers
      'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
      'story-skip-1': { in: /^(?!\b(chrome|firefox)(2022)*(Dark)*\b)/, tests: ['tab press'] },
    },
  },
};

export const Danger: Story = () => (
  <Link icon={<OkIcon />} use="danger">
    Simple Link
  </Link>
);
Danger.parameters = {
  creevey: {
    tests: linkTests,
    skip: {
      // TODO @Khlutkova fix after update browsers
      'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
    },
  },
};

export const Grayed: Story = () => <Link use="grayed">Simple link</Link>;
Grayed.parameters = {
  creevey: {
    tests: linkTests,
    skip: {
      // TODO @Khlutkova fix after update browsers
      'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
    },
  },
};

export const Disabled: Story = () => <Link disabled>Simple link</Link>;
Disabled.parameters = {
  creevey: {
    tests: linkTests,
    skip: {
      // TODO @Khlutkova fix after update browsers
      'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
    },
  },
};

export const WithOnClick = () => <Link onClick={() => Toast.push('Clicked!')}>Simple Link</Link>;
WithOnClick.storyName = 'With onClick';
WithOnClick.parameters = { creevey: { skip: true } };

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
Loading.parameters = {
  creevey: {
    tests: linkTests,
    skip: {
      // TODO @Khlutkova fix after update browsers
      'story-skip-0': { in: ['chrome8px', 'chromeFlat8px', 'chrome', 'chromeDark'], tests: ['hover'] },
    },
  },
};

const focusedStyledLinkTest: CreeveyTests = {
  async 'tab press'() {
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('hovered');
    await this.browser
      .actions({
        bridge: true,
      })
      .sendKeys(this.keys.TAB)
      .perform();
    await this.browser
      .actions({
        bridge: true,
      })
      .move({
        origin: this.browser.findElement({ css: 'a' }),
      })
      .perform();
    await delay(1000);
    await this.expect(await this.takeScreenshot()).to.matchImage('tabPressHovered');
  },
};
export const FocusedStyledLink: Story = () => {
  return (
    <ThemeContext.Consumer>
      {(theme) => {
        return (
          <ThemeContext.Provider value={ThemeFactory.create({ linkLineHoverBorderBottomStyle: 'dotted' }, theme)}>
            <Link icon={<OkIcon />}>Simple Link</Link>
          </ThemeContext.Provider>
        );
      }}
    </ThemeContext.Consumer>
  );
};
FocusedStyledLink.parameters = {
  creevey: {
    tests: focusedStyledLinkTest,
    skip: { flacky: { in: /^(?!\b(firefox2022)\b)/ } },
  },
};

export const WithLinkFocusOutlineFeatureFlag = () => (
  <ReactUIFeatureFlagsContext.Provider value={{ linkFocusOutline: true }}>
    <Link>Link</Link>
  </ReactUIFeatureFlagsContext.Provider>
);

WithLinkFocusOutlineFeatureFlag.parameters = {
  creevey: {
    tests: focusedStyledLinkTest,
    skip: {
      'hover does not work': {
        in: /chrome/,
      },
    },
  },
};
