import React from 'react';
import { addDecorator } from '@storybook/react';
import { withCreevey } from 'creevey';
import { ThemeContext } from '../lib/theming/ThemeContext';

import { FLAT_THEME } from '../lib/theming/themes/FlatTheme';
import { expect } from 'chai';
import * as Components from '../index';
import { Key } from '../lib/WebDriver';

Object.assign(global, { React, expect, Key }, Components, React);

// TODO This need to hack enableFastLoading option
import { delay } from '../lib/utils';
import Icons from '@skbkontur/react-icons';
delay(0);
Icons;
// TODO This need to hack enableFastLoading option

addDecorator(
  withCreevey({
    captureElement: '#test-element',
    skip: [
      {
        in: ['chromeFlat', 'firefoxFlat', 'ie11Flat'],
        kinds: /^(?!\bButton\b|\bCheckbox\b|\bInput\b|\bRadio\b|\bTextarea\b|\bToggle\b|\bSwitcher\b|\bTokenInput\b)/,
      },
    ],
  }),
);

addDecorator(story => (
  <div id="test-element" style={{ display: 'inline-block', padding: '0 200px 200px 0' }}>
    {story()}
  </div>
));

if (process.env.STORYBOOK_FLAT_UI) {
  addDecorator(story => <ThemeContext.Provider value={FLAT_THEME}>{story()}</ThemeContext.Provider>);
}
