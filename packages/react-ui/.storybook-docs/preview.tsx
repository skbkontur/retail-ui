import { ArrowARightIcon20Light } from '@skbkontur/icons/ArrowARightIcon20Light.js';
import { ArrowARightIcon24Regular } from '@skbkontur/icons/ArrowARightIcon24Regular.js';
import { ArrowUiCornerOutUpRightIcon } from '@skbkontur/icons/icons/ArrowUiCornerOutUpRightIcon/ArrowUiCornerOutUpRightIcon.js';
import { CheckAIcon } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon.js';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Light.js';
import { CopyIcon16Regular } from '@skbkontur/icons/icons/CopyIcon/CopyIcon16Regular.js';
import { DocPlusIcon16Light } from '@skbkontur/icons/icons/DocPlusIcon/DocPlusIcon16Light.js';
import { HandThumbDownIcon } from '@skbkontur/icons/icons/HandThumbDownIcon/HandThumbDownIcon.js';
import { HandThumbUpIcon } from '@skbkontur/icons/icons/HandThumbUpIcon/HandThumbUpIcon.js';
import { LightbulbIcon32Regular } from '@skbkontur/icons/icons/LightbulbIcon/index.js';
import { MathFunctionIcon } from '@skbkontur/icons/icons/MathFunctionIcon/MathFunctionIcon.js';
import { MathFunctionIcon16Regular } from '@skbkontur/icons/icons/MathFunctionIcon/MathFunctionIcon16Regular.js';
import { MinusCircleIcon16Light } from '@skbkontur/icons/icons/MinusCircleIcon/MinusCircleIcon16Light.js';
import { NotificationBellAlarmIcon64Regular } from '@skbkontur/icons/icons/NotificationBellAlarmIcon/NotificationBellAlarmIcon64Regular.js';
import { People3Icon } from '@skbkontur/icons/icons/People3Icon/People3Icon.js';
import {
  QuestionCircleIcon,
  QuestionCircleIcon16Light,
  QuestionCircleIcon16Regular,
  QuestionCircleIcon20Light,
} from '@skbkontur/icons/icons/QuestionCircleIcon/index.js';
import { SecurityLockClosedIcon20Light } from '@skbkontur/icons/icons/SecurityLockClosedIcon/index.js';
import { TechPhoneSmartIcon } from '@skbkontur/icons/icons/TechPhoneSmartIcon/TechPhoneSmartIcon.js';
import { TechScreenMonitorIcon16Light } from '@skbkontur/icons/icons/TechScreenMonitorIcon/index.js';
import { ToolPencilLineIcon, ToolPencilLineIcon24Regular } from '@skbkontur/icons/icons/ToolPencilLineIcon/index.js';
import { TrashCanIcon24Regular } from '@skbkontur/icons/icons/TrashCanIcon/index.js';
import { UiFilterFunnelIcon16Regular } from '@skbkontur/icons/icons/UiFilterFunnelIcon/UiFilterFunnelIcon16Regular.js';
import { UiMenuBars3HIcon, UiMenuBars3HIcon32Regular } from '@skbkontur/icons/icons/UiMenuBars3HIcon/index.js';
import { UiMenuBars3HIcon16Regular } from '@skbkontur/icons/icons/UiMenuBars3HIcon/UiMenuBars3HIcon16Regular.js';
import { WeatherMoonIcon16Light } from '@skbkontur/icons/icons/WeatherMoonIcon/index.js';
import { WeatherSunIcon16Light } from '@skbkontur/icons/icons/WeatherSunIcon/index.js';
import { XIcon16Regular } from '@skbkontur/icons/icons/XIcon/XIcon16Regular.js';
import { MoneyTypeCoinsIcon } from '@skbkontur/icons/MoneyTypeCoinsIcon.js';
import { NotificationBellAlarmIcon16Solid } from '@skbkontur/icons/NotificationBellAlarmIcon16Solid.js';
import { PlusIcon16Light } from '@skbkontur/icons/PlusIcon16Light.js';
import { PlusIcon20Light } from '@skbkontur/icons/PlusIcon20Light.js';
import { SearchLoupeIcon } from '@skbkontur/icons/SearchLoupeIcon.js';
import { SearchLoupeIcon16Light } from '@skbkontur/icons/SearchLoupeIcon16Light.js';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/SearchLoupeIcon16Regular.js';
import { SearchLoupeIcon20Light } from '@skbkontur/icons/SearchLoupeIcon20Light.js';
import { SearchLoupeIcon24Regular } from '@skbkontur/icons/SearchLoupeIcon24Regular.js';
import { SettingsGearIcon20Regular } from '@skbkontur/icons/SettingsGearIcon20Regular.js';
import { ToolPencilLineIcon16Light } from '@skbkontur/icons/ToolPencilLineIcon16Light.js';
import { TrashCanIcon } from '@skbkontur/icons/TrashCanIcon.js';
import { TrashCanIcon20Light } from '@skbkontur/icons/TrashCanIcon20Light.js';
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
      ArrowUiCornerOutUpRightIcon,
      UiMenuBars3HIcon16Regular,
      People3Icon,
      SearchLoupeIcon16Regular,
      QuestionCircleIcon16Light,
      QuestionCircleIcon16Regular,
      QuestionCircleIcon20Light,
      MathFunctionIcon16Regular,
      CopyIcon16Regular,
      TrashCanIcon,
      MoneyTypeCoinsIcon,
      NotificationBellAlarmIcon16Solid,
      CheckAIcon16Light,
      ArrowARightIcon20Light,
      ArrowARightIcon24Regular,
      PlusIcon16Light,
      PlusIcon20Light,
      TrashCanIcon20Light,
      XIcon16Regular,
      MinusCircleIcon16Light,
      CheckAIcon,
      UiMenuBars3HIcon32Regular,
      HandThumbDownIcon,
      HandThumbUpIcon,
      MathFunctionIcon,
      SearchLoupeIcon,
      SearchLoupeIcon16Light,
      SearchLoupeIcon20Light,
      SearchLoupeIcon24Regular,
      ToolPencilLineIcon,
      ToolPencilLineIcon16Light,
      ToolPencilLineIcon24Regular,
      TrashCanIcon24Regular,
      TechPhoneSmartIcon,
      UiMenuBars3HIcon,
      QuestionCircleIcon,
      LightbulbIcon32Regular,
      NotificationBellAlarmIcon64Regular,
      UiFilterFunnelIcon16Regular,
      TechScreenMonitorIcon16Light,
      WeatherMoonIcon16Light,
      WeatherSunIcon16Light,
      SecurityLockClosedIcon20Light,
      SettingsGearIcon20Regular,
      DocPlusIcon16Light,
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
