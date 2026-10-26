import { css } from '@emotion/css';
import { IconArrowALeftRegular24 } from '@skbkontur/icons/IconArrowALeftRegular24';
import { IconNaturePlantFlowerSolid20 } from '@skbkontur/icons/IconNaturePlantFlowerSolid20';
import { IconQuestionCircleLight20 } from '@skbkontur/icons/IconQuestionCircleLight20';
import { IconSearchLoupeRegular16 } from '@skbkontur/icons/IconSearchLoupeRegular16';
import { IconWarningTriangleSolid20 } from '@skbkontur/icons/IconWarningTriangleSolid20';
import { IconWeatherMoonRegular16 } from '@skbkontur/icons/IconWeatherMoonRegular16';
import { IconWeatherSunRegular16 } from '@skbkontur/icons/IconWeatherSunRegular16';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { DropdownMenu } from '@skbkontur/react-ui/components/DropdownMenu/DropdownMenu';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import { Hint } from '@skbkontur/react-ui/components/Hint/Hint';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { Link } from '@skbkontur/react-ui/components/Link/Link';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader/MenuHeader';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem/MenuItem';
import { Radio } from '@skbkontur/react-ui/components/Radio/Radio';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup/RadioGroup';
import { Select } from '@skbkontur/react-ui/components/Select/Select';
import { Tabs } from '@skbkontur/react-ui/components/Tabs/Tabs';
import { Toast } from '@skbkontur/react-ui/components/Toast/Toast';
import { Toggle } from '@skbkontur/react-ui/components/Toggle/Toggle';
import { Tooltip } from '@skbkontur/react-ui/components/Tooltip/Tooltip';
import { useStyles } from '@skbkontur/react-ui/lib/renderEnvironment/index';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { DARK_THEME } from '@skbkontur/react-ui/lib/theming/themes/DarkTheme';
import { LIGHT_THEME } from '@skbkontur/react-ui/lib/theming/themes/LightTheme';
import type { Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { LIVE_EXAMPLES_ADDON_ID } from '@skbkontur/storybook-addon-live-examples';
import { addons } from '@storybook/manager-api';
import type { Preview } from '@storybook/react';
import { differenceEuclidean, parse } from 'culori';

import { getColors } from '../get-colors.js';
import { brand as brandSwatch } from '../lib/consts/default-swatch.js';
import { getColorsBase } from '../lib/get-colors-base.js';
import { storybookTheme } from './theme';

addons.setConfig({
  [LIVE_EXAMPLES_ADDON_ID]: {
    scope: {
      getColorsBase,
      getColors,
      useStyles,
      css,
      differenceEuclidean,
      brandSwatch,
      Toast,
      parse,
      IconArrowALeftRegular24,
      IconNaturePlantFlowerSolid20,
      IconQuestionCircleLight20,
      IconSearchLoupeRegular16,
      IconWarningTriangleSolid20,
      IconWeatherMoonRegular16,
      IconWeatherSunRegular16,
      Button,
      Checkbox,
      DropdownMenu,
      Gapped,
      Hint,
      Input,
      Link,
      MenuHeader,
      MenuItem,
      Radio,
      RadioGroup,
      Select,
      Tabs,
      Toggle,
      Tooltip,
      ThemeContext,
      DARK_THEME,
      LIGHT_THEME,
    },
  },
} as unknown as LiveConfig);

const preview: Preview = {
  parameters: {
    theme: storybookTheme,
    docs: {
      theme: storybookTheme,
    },
  },
};

// oxlint-disable-next-line import/no-default-export
export default preview;
