import { IconArrowARightLight20 } from '@skbkontur/icons/IconArrowARightLight20';
import { IconArrowARightRegular24 } from '@skbkontur/icons/IconArrowARightRegular24';
import { IconArrowUiCornerOutUpRightRegular16 } from '@skbkontur/icons/IconArrowUiCornerOutUpRightRegular16';
import { IconCheckALight16 } from '@skbkontur/icons/IconCheckALight16';
import { IconCheckARegular16 } from '@skbkontur/icons/IconCheckARegular16';
import { IconCopyRegular16 } from '@skbkontur/icons/IconCopyRegular16';
import { IconDocPlusLight16 } from '@skbkontur/icons/IconDocPlusLight16';
import { IconHandThumbDownRegular16 } from '@skbkontur/icons/IconHandThumbDownRegular16';
import { IconHandThumbUpRegular16 } from '@skbkontur/icons/IconHandThumbUpRegular16';
import { IconLightbulbRegular32 } from '@skbkontur/icons/IconLightbulbRegular32';
import { IconMathFunctionRegular16 } from '@skbkontur/icons/IconMathFunctionRegular16';
import { IconMinusCircleRegular16 } from '@skbkontur/icons/IconMinusCircleRegular16';
import { IconMoneyTypeCoinsRegular16 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular16';
import { IconNotificationBellAlarmRegular64 } from '@skbkontur/icons/IconNotificationBellAlarmRegular64';
import { IconNotificationBellAlarmSolid16 } from '@skbkontur/icons/IconNotificationBellAlarmSolid16';
import { IconPeople3Regular16 } from '@skbkontur/icons/IconPeople3Regular16';
import { IconPlusLight16 } from '@skbkontur/icons/IconPlusLight16';
import { IconPlusLight20 } from '@skbkontur/icons/IconPlusLight20';
import { IconQuestionCircleLight16 } from '@skbkontur/icons/IconQuestionCircleLight16';
import { IconQuestionCircleLight20 } from '@skbkontur/icons/IconQuestionCircleLight20';
import { IconQuestionCircleRegular16 } from '@skbkontur/icons/IconQuestionCircleRegular16';
import { IconSearchLoupeLight16 } from '@skbkontur/icons/IconSearchLoupeLight16';
import { IconSearchLoupeLight20 } from '@skbkontur/icons/IconSearchLoupeLight20';
import { IconSearchLoupeRegular16 } from '@skbkontur/icons/IconSearchLoupeRegular16';
import { IconSearchLoupeRegular24 } from '@skbkontur/icons/IconSearchLoupeRegular24';
import { IconSecurityLockClosedLight20 } from '@skbkontur/icons/IconSecurityLockClosedLight20';
import { IconSettingsGearRegular20 } from '@skbkontur/icons/IconSettingsGearRegular20';
import { IconTechPhoneSmartRegular16 } from '@skbkontur/icons/IconTechPhoneSmartRegular16';
import { IconTechScreenMonitorLight16 } from '@skbkontur/icons/IconTechScreenMonitorLight16';
import { IconToolPencilLineLight16 } from '@skbkontur/icons/IconToolPencilLineLight16';
import { IconToolPencilLineRegular16 } from '@skbkontur/icons/IconToolPencilLineRegular16';
import { IconToolPencilLineRegular24 } from '@skbkontur/icons/IconToolPencilLineRegular24';
import { IconTrashCanLight20 } from '@skbkontur/icons/IconTrashCanLight20';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { IconTrashCanRegular24 } from '@skbkontur/icons/IconTrashCanRegular24';
import { IconUiFilterFunnelRegular16 } from '@skbkontur/icons/IconUiFilterFunnelRegular16';
import { IconUiMenuBars3HRegular16 } from '@skbkontur/icons/IconUiMenuBars3HRegular16';
import { IconUiMenuBars3HRegular32 } from '@skbkontur/icons/IconUiMenuBars3HRegular32';
import { IconWeatherMoonLight16 } from '@skbkontur/icons/IconWeatherMoonLight16';
import { IconWeatherSunLight16 } from '@skbkontur/icons/IconWeatherSunLight16';
import { IconXRegular16 } from '@skbkontur/icons/IconXRegular16';
import * as ReactUiValidations from '@skbkontur/react-ui-validations';
import { ViewDateInputValidateChecks } from '@skbkontur/react-ui/components/DateInput/ViewDateInputValidateChecks';
import * as DatePickerHelpers from '@skbkontur/react-ui/components/DatePicker/DatePickerHelpers';
import {
  isBetween,
  isEqual,
  isGreater,
  isGreaterOrEqual,
  isLess,
  isLessOrEqual,
} from '@skbkontur/react-ui/lib/date/comparison';
import { LIVE_EXAMPLES_ADDON_ID } from '@skbkontur/storybook-addon-live-examples';
import type { Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addons } from '@storybook/manager-api';
import type { Preview } from '@storybook/react';
import React from 'react';

import { cities } from '../components/ComboBox/__mocks__/cities.js';
import { getCities } from '../components/ComboBox/__mocks__/getCities.js';
import { createFile } from '../components/FileUploader/fileUtils.js';
import { getStyles } from '../components/Tabs/Indicator.styles.js';
import * as ReactUi from '../index.js';
import { ShowcaseGroup } from '../internal/ThemePlayground/ShowcaseGroup.js';
import { ThemeContextPlayground } from '../internal/ThemePlayground/ThemeContextPlayground.js';
import { emit } from '../lib/LayoutEvents.js';
import { ThemeContext } from '../lib/theming/ThemeContext.js';
import { ThemeFactory } from '../lib/theming/ThemeFactory.js';
import * as ALL_DARK_THEMES from '../lib/theming/themes/DarkTheme.js';
import * as ALL_LIGHT_THEMES from '../lib/theming/themes/LightTheme.js';
import { parseVersionFromThemeName } from '../lib/theming/ThemeVersions.js';
import { isNullable } from '../lib/utils.js';
import FeatureFlagsDecorator from './decorators/Features/FeatureFlagsDecorator.js';
import { LocaleDecorator } from './decorators/Locale/LocaleDecorator.js';
import { ThemeDecorator } from './decorators/Theme/ThemeDecorator.js';
import { FeatureFlagToggle } from './FeatureFlagToggle.js';

const isDocsEnv = Boolean(process.env.STORYBOOK_REACT_UI_DOCS);

const customViewports = {
  iphone: {
    name: 'Iphone',
    styles: {
      width: '375px',
      height: '667px',
    },
    type: 'mobile',
  },
  iphonePlus: {
    name: 'Iphone Plus',
    styles: {
      width: '414px',
      height: '736px',
    },
    type: 'mobile',
  },
};

const preview: Preview = {
  parameters: {
    docs: {
      toc: {
        title: '',
        headingSelector: '.sbdocs > h2, .sbdocs > h3, .sbdocs > h4, h1#change-log ~ h1',
        ignoreSelector: 'h1#change-log ~ h3',
      },
      controls: {
        sort: 'alpha',
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Changelog',
          'Migration',
          'Information',
          [
            'Theme',
            'ThemePlayground',
            'Locale',
            'Responsive',
            'Feature flags',
            'Server Side Rendering',
            'StrictMode',
            'DataTids',
          ],
          'Button',
          'Input data',
          'Display data',
          'Menu',
          'Overlay',
          'Layout',
          '*',
        ],
      },
    },
    viewport: {
      viewports: { ...MINIMAL_VIEWPORTS, ...customViewports },
    },
  },
  decorators: [
    ThemeDecorator,
    (Story) => (
      <div id="test-element" style={{ display: 'inline-block', padding: 4 }}>
        <Story />
      </div>
    ),
    (Story) => {
      return (
        <ThemeContext.Consumer>
          {(theme) => {
            return (
              <ThemeContext.Provider
                value={ThemeFactory.create(
                  {
                    mobileMediaQuery: '(max-width: 576px)',
                  },
                  theme,
                )}
              >
                <Story />
              </ThemeContext.Provider>
            );
          }}
        </ThemeContext.Consumer>
      );
    },
  ],
};

export default preview;

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'React UI Theme',
    defaultValue: 'LIGHT_THEME',
  },
  locale: {
    name: 'Locale',
    description: 'React UI Locale',
    defaultValue: 'ru',
  },
  featureFlags: {
    name: 'React UI Feature flags',
    description: 'React UI Feature flags',
    defaultValue: [],
  },
  brand: {
    name: 'Brand',
    description: 'Brand color',
    defaultValue: 'red',
  },
  accent: {
    name: 'Accent',
    description: 'Accent',
    defaultValue: 'gray',
  },
};

addons.setConfig({
  [LIVE_EXAMPLES_ADDON_ID]: {
    scope: {
      ...ReactUi,
      ...ReactUiValidations,
      getStyles,
      createFile,
      DatePickerHelpers,
      cities,
      getCities,
      isBetween,
      isEqual,
      isGreater,
      isGreaterOrEqual,
      isLess,
      isLessOrEqual,
      isNullable,
      ViewDateInputValidateChecks,
      IconArrowUiCornerOutUpRightRegular16,
      IconUiMenuBars3HRegular16,
      IconPeople3Regular16,
      IconSearchLoupeRegular16,
      IconQuestionCircleLight16,
      IconQuestionCircleRegular16,
      IconQuestionCircleLight20,
      IconMathFunctionRegular16,
      IconCopyRegular16,
      IconTrashCanRegular16,
      IconMoneyTypeCoinsRegular16,
      IconNotificationBellAlarmSolid16,
      IconCheckALight16,
      IconArrowARightLight20,
      IconArrowARightRegular24,
      IconPlusLight16,
      IconPlusLight20,
      IconTrashCanLight20,
      IconXRegular16,
      IconMinusCircleRegular16,
      IconCheckARegular16,
      IconUiMenuBars3HRegular32,
      IconHandThumbDownRegular16,
      IconHandThumbUpRegular16,
      IconSearchLoupeLight16,
      IconSearchLoupeLight20,
      IconSearchLoupeRegular24,
      IconToolPencilLineRegular16,
      IconToolPencilLineLight16,
      IconToolPencilLineRegular24,
      IconTrashCanRegular24,
      IconTechPhoneSmartRegular16,
      IconLightbulbRegular32,
      IconNotificationBellAlarmRegular64,
      IconUiFilterFunnelRegular16,
      IconTechScreenMonitorLight16,
      IconWeatherMoonLight16,
      IconWeatherSunLight16,
      IconSecurityLockClosedLight20,
      IconSettingsGearRegular20,
      IconDocPlusLight16,
      ShowcaseGroup,
      ThemeContext,
      ThemeContextPlayground,
      ThemeFactory,
      ALL_LIGHT_THEMES,
      ALL_DARK_THEMES,
      parseVersionFromThemeName,
      emit,
      FeatureFlagToggle,
    },
    decorators: [ThemeDecorator, LocaleDecorator, FeatureFlagsDecorator],
  } as LiveConfig,
  showToolbar: !isDocsEnv,
});
