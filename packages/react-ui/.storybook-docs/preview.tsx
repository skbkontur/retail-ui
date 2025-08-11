import React from 'react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import { addons } from '@storybook/manager-api';
import { CopyIcon16Regular } from '@skbkontur/icons/icons/CopyIcon/CopyIcon16Regular';
import { SearchLoupeIcon16Regular } from '@skbkontur/icons/icons/SearchLoupeIcon/SearchLoupeIcon16Regular';
import { UiMenuBars3HIcon16Regular } from '@skbkontur/icons/icons/UiMenuBars3HIcon/UiMenuBars3HIcon16Regular';
import { QuestionCircleIcon16Regular } from '@skbkontur/icons/icons/QuestionCircleIcon/QuestionCircleIcon16Regular';
import { MathFunctionIcon16Regular } from '@skbkontur/icons/icons/MathFunctionIcon/MathFunctionIcon16Regular';
import { MoneyTypeCoinsIcon } from '@skbkontur/icons/MoneyTypeCoinsIcon';
import { TrashCanIcon } from '@skbkontur/icons/TrashCanIcon';
import { NotificationBellAlarmIcon16Solid } from '@skbkontur/icons/NotificationBellAlarmIcon16Solid';
import { CheckAIcon16Light } from '@skbkontur/icons/icons/CheckAIcon/CheckAIcon16Light';
import * as DatePickerHelpers from '@skbkontur/react-ui/components/DatePicker/DatePickerHelpers';
import { cities } from '@skbkontur/react-ui/components/ComboBox/__mocks__/cities';
import {
  isBetween,
  isEqual,
  isGreater,
  isGreaterOrEqual,
  isLess,
  isLessOrEqual,
} from '@skbkontur/react-ui/lib/date/comparison';
import { ViewDateInputValidateChecks } from '@skbkontur/react-ui/components/DateInput/ViewDateInputValidateChecks';
import type { Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { LIVE_EXAMPLES_ADDON_ID } from '@skbkontur/storybook-addon-live-examples';
import { CheckAIcon } from '@skbkontur/icons/icons/CheckAIcon';
import { UiMenuBars3HIcon, UiMenuBars3HIcon32Regular } from '@skbkontur/icons/icons/UiMenuBars3HIcon';
import { HandThumbDownIcon } from '@skbkontur/icons/icons/HandThumbDownIcon';
import { HandThumbUpIcon } from '@skbkontur/icons/icons/HandThumbUpIcon';
import { SearchLoupeIcon } from '@skbkontur/icons/icons/SearchLoupeIcon';
import { MathFunctionIcon } from '@skbkontur/icons/icons/MathFunctionIcon';
import { ToolPencilLineIcon, ToolPencilLineIcon24Regular } from '@skbkontur/icons/icons/ToolPencilLineIcon';
import { TrashCanIcon24Regular } from '@skbkontur/icons/icons/TrashCanIcon';
import { TechPhoneSmartIcon } from '@skbkontur/icons/icons/TechPhoneSmartIcon';
import { People3Icon } from '@skbkontur/icons/icons/People3Icon';
import { QuestionCircleIcon } from '@skbkontur/icons/icons/QuestionCircleIcon';
import { LightbulbIcon32Regular } from '@skbkontur/icons/icons/LightbulbIcon';
import { NotificationBellAlarmIcon64Regular } from '@skbkontur/icons/icons/NotificationBellAlarmIcon/NotificationBellAlarmIcon64Regular';
import { UiFilterFunnelIcon16Regular } from '@skbkontur/icons/icons/UiFilterFunnelIcon/UiFilterFunnelIcon16Regular';
import { ArrowUiCornerOutUpRightIcon } from '@skbkontur/icons/icons/ArrowUiCornerOutUpRightIcon/ArrowUiCornerOutUpRightIcon';

import { ThemeContext } from '../lib/theming/ThemeContext';
import { ThemeFactory } from '../lib/theming/ThemeFactory';
import * as ReactUi from '../index';
import { XIcon16Regular } from '../internal/icons2022/XIcon/XIcon16Regular';
import { MinusCircleIcon16Light } from '../internal/icons2022/MinusCircleIcon/MinusCircleIcon16Light';
import { ShowcaseGroup } from '../internal/ThemePlayground/ShowcaseGroup';
import * as ALL_LIGHT_THEMES from '../lib/theming/themes/LightTheme';
import * as ALL_DARK_THEMES from '../lib/theming/themes/DarkTheme';
import { parseVersionFromThemeName } from '../lib/theming/ThemeVersions';
import { emit } from '../lib/LayoutEvents';

import { LocaleDecorator } from './decorators/Locale/LocaleDecorator';
import FeatureFlagsDecorator from './decorators/Features/FeatureFlagsDecorator';
import { ThemeDecorator } from './decorators/Theme/ThemeDecorator';
import { FeatureFlagToggle } from './FeatureFlagToggle';

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
        title: 'Содержание',
        headingSelector: 'h2, h3, h4, h1#change-log ~ h1',
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
          'Information',
          ['Mobiles', 'Server Side Rendering', 'DataTids', 'Theme', 'Locale', 'Feature flags'],
          'Versioning',
          ['Migration', 'Changelog'],
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
};

addons.setConfig({
  [LIVE_EXAMPLES_ADDON_ID]: {
    scope: {
      ...ReactUi,
      DatePickerHelpers,
      cities,
      isBetween,
      isEqual,
      isGreater,
      isGreaterOrEqual,
      isLess,
      isLessOrEqual,
      ViewDateInputValidateChecks,
      ArrowUiCornerOutUpRightIcon,
      UiMenuBars3HIcon16Regular,
      People3Icon,
      SearchLoupeIcon16Regular,
      QuestionCircleIcon16Regular,
      MathFunctionIcon16Regular,
      CopyIcon16Regular,
      TrashCanIcon,
      MoneyTypeCoinsIcon,
      NotificationBellAlarmIcon16Solid,
      CheckAIcon16Light,
      XIcon16Regular,
      MinusCircleIcon16Light,
      CheckAIcon,
      UiMenuBars3HIcon32Regular,
      HandThumbDownIcon,
      HandThumbUpIcon,
      MathFunctionIcon,
      SearchLoupeIcon,
      ToolPencilLineIcon,
      ToolPencilLineIcon24Regular,
      TrashCanIcon24Regular,
      TechPhoneSmartIcon,
      UiMenuBars3HIcon,
      QuestionCircleIcon,
      LightbulbIcon32Regular,
      NotificationBellAlarmIcon64Regular,
      UiFilterFunnelIcon16Regular,
      ShowcaseGroup,
      ThemeContext,
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
