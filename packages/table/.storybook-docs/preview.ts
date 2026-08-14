import { css, injectGlobal } from '@emotion/css';
import { EmptyState } from '@skbkontur/empty-state';
import { IconArrowCRightRegular16 } from '@skbkontur/icons/IconArrowCRightRegular16';
import { IconBookmarkRegular16 } from '@skbkontur/icons/IconBookmarkRegular16';
import { IconBookmarkRegular20 } from '@skbkontur/icons/IconBookmarkRegular20';
import { IconBookmarkRegular24 } from '@skbkontur/icons/IconBookmarkRegular24';
import { IconCheckCircleSolid16 } from '@skbkontur/icons/IconCheckCircleSolid16';
import { IconCheckCircleSolid20 } from '@skbkontur/icons/IconCheckCircleSolid20';
import { IconCheckCircleSolid24 } from '@skbkontur/icons/IconCheckCircleSolid24';
import { IconDocsPlusRegular16 } from '@skbkontur/icons/IconDocsPlusRegular16';
import { IconMoneyTypeCoinsRegular16 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular16';
import { IconNetDownloadRegular16 } from '@skbkontur/icons/IconNetDownloadRegular16';
import { IconSendPaperplaneRegular16 } from '@skbkontur/icons/IconSendPaperplaneRegular16';
import { IconSendPaperplaneRegular20 } from '@skbkontur/icons/IconSendPaperplaneRegular20';
import { IconSendPaperplaneRegular24 } from '@skbkontur/icons/IconSendPaperplaneRegular24';
import { IconTechPrinterRegular16 } from '@skbkontur/icons/IconTechPrinterRegular16';
import { IconTechPrinterRegular20 } from '@skbkontur/icons/IconTechPrinterRegular20';
import { IconTechPrinterRegular24 } from '@skbkontur/icons/IconTechPrinterRegular24';
import { IconTrashCanRegular16 } from '@skbkontur/icons/IconTrashCanRegular16';
import { IconTrashCanRegular20 } from '@skbkontur/icons/IconTrashCanRegular20';
import { IconTrashCanRegular24 } from '@skbkontur/icons/IconTrashCanRegular24';
import { IconWarningTriangleSolid16 } from '@skbkontur/icons/IconWarningTriangleSolid16';
import { IconWarningTriangleSolid20 } from '@skbkontur/icons/IconWarningTriangleSolid20';
import { IconWarningTriangleSolid24 } from '@skbkontur/icons/IconWarningTriangleSolid24';
import { IconXCircleSolid16 } from '@skbkontur/icons/IconXCircleSolid16';
import { IconXCircleSolid20 } from '@skbkontur/icons/IconXCircleSolid20';
import { IconXCircleSolid24 } from '@skbkontur/icons/IconXCircleSolid24';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { Gapped } from '@skbkontur/react-ui/components/Gapped/Gapped';
import { Hint } from '@skbkontur/react-ui/components/Hint/Hint';
import { Input } from '@skbkontur/react-ui/components/Input/Input';
import { Link } from '@skbkontur/react-ui/components/Link/Link';
import { MenuHeader } from '@skbkontur/react-ui/components/MenuHeader/MenuHeader';
import { MenuItem } from '@skbkontur/react-ui/components/MenuItem/MenuItem';
import { MenuSeparator } from '@skbkontur/react-ui/components/MenuSeparator/MenuSeparator';
import { Paging } from '@skbkontur/react-ui/components/Paging/Paging';
import { Radio } from '@skbkontur/react-ui/components/Radio/Radio';
import { RadioGroup } from '@skbkontur/react-ui/components/RadioGroup/RadioGroup';
import { Select } from '@skbkontur/react-ui/components/Select/Select';
import { Switcher } from '@skbkontur/react-ui/components/Switcher/Switcher';
import { Toggle } from '@skbkontur/react-ui/components/Toggle/Toggle';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import { DARK_THEME } from '@skbkontur/react-ui/lib/theming/themes/DarkTheme';
import { LIGHT_THEME } from '@skbkontur/react-ui/lib/theming/themes/LightTheme';
import type { Config as LiveConfig } from '@skbkontur/storybook-addon-live-examples';
import { LIVE_EXAMPLES_ADDON_ID } from '@skbkontur/storybook-addon-live-examples';
import * as TableExports from '@skbkontur/table';
import { Text } from '@skbkontur/typography';
import { addons } from '@storybook/manager-api';
import type { Preview } from '@storybook/react';
import { useVirtualizer } from '@tanstack/react-virtual';

import { initialData } from '../__stories__/data.js';
import { storybookTheme } from './theme.js';

addons.setConfig({
  [LIVE_EXAMPLES_ADDON_ID]: {
    scope: {
      ...TableExports,
      Table: TableExports.Table,
      initialData,
      EmptyState,
      Text,
      css,
      injectGlobal,
      Button,
      Checkbox,
      Gapped,
      Hint,
      Input,
      Link,
      MenuHeader,
      MenuItem,
      MenuSeparator,
      Paging,
      Radio,
      RadioGroup,
      Select,
      Switcher,
      Toggle,
      ThemeContext,
      ThemeFactory,
      DARK_THEME,
      LIGHT_THEME,
      useVirtualizer,
      IconWarningTriangleSolid16,
      IconWarningTriangleSolid20,
      IconWarningTriangleSolid24,
      IconCheckCircleSolid16,
      IconCheckCircleSolid20,
      IconCheckCircleSolid24,
      IconBookmarkRegular16,
      IconBookmarkRegular20,
      IconBookmarkRegular24,
      IconXCircleSolid16,
      IconXCircleSolid20,
      IconXCircleSolid24,
      IconNetDownloadRegular16,
      IconTrashCanRegular16,
      IconMoneyTypeCoinsRegular16,
      IconSendPaperplaneRegular16,
      IconTechPrinterRegular16,
      IconArrowCRightRegular16,
      IconTechPrinterRegular20,
      IconTechPrinterRegular24,
      IconDocsPlusRegular16,
      IconTrashCanRegular20,
      IconTrashCanRegular24,
      IconSendPaperplaneRegular20,
      IconSendPaperplaneRegular24,
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

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'React UI Theme',
    defaultValue: 'LIGHT_THEME',
  },
};

// oxlint-disable-next-line import/no-default-export
export default preview;
