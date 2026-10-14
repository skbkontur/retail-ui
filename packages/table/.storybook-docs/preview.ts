import { css, injectGlobal } from '@emotion/css';
import { EmptyState } from '@skbkontur/empty-state';
import { IconArrowCDownRegular16 } from '@skbkontur/icons/IconArrowCDownRegular16';
import { IconArrowCRightRegular16 } from '@skbkontur/icons/IconArrowCRightRegular16';
import { IconBookmarkRegular16 } from '@skbkontur/icons/IconBookmarkRegular16';
import { IconBookmarkRegular20 } from '@skbkontur/icons/IconBookmarkRegular20';
import { IconBookmarkRegular24 } from '@skbkontur/icons/IconBookmarkRegular24';
import { IconCheckCircleSolid16 } from '@skbkontur/icons/IconCheckCircleSolid16';
import { IconCheckCircleSolid20 } from '@skbkontur/icons/IconCheckCircleSolid20';
import { IconCheckCircleSolid24 } from '@skbkontur/icons/IconCheckCircleSolid24';
import { IconDocsPlusRegular16 } from '@skbkontur/icons/IconDocsPlusRegular16';
import { IconDocsPlusRegular20 } from '@skbkontur/icons/IconDocsPlusRegular20';
import { IconDocsPlusRegular24 } from '@skbkontur/icons/IconDocsPlusRegular24';
import { IconMoneyTypeCoinsRegular16 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular16';
import { IconMoneyTypeCoinsRegular20 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular20';
import { IconMoneyTypeCoinsRegular24 } from '@skbkontur/icons/IconMoneyTypeCoinsRegular24';
import { IconNetDownloadRegular16 } from '@skbkontur/icons/IconNetDownloadRegular16';
import { IconNetDownloadRegular20 } from '@skbkontur/icons/IconNetDownloadRegular20';
import { IconNetDownloadRegular24 } from '@skbkontur/icons/IconNetDownloadRegular24';
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
import { IconXCircleSolid64 } from '@skbkontur/icons/IconXCircleSolid64';
import { Button } from '@skbkontur/react-ui/components/Button/Button';
import { Checkbox } from '@skbkontur/react-ui/components/Checkbox/Checkbox';
import { CurrencyInput } from '@skbkontur/react-ui/components/CurrencyInput/CurrencyInput';
import { CurrencyLabel } from '@skbkontur/react-ui/components/CurrencyLabel/CurrencyLabel';
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
      CurrencyInput,
      CurrencyLabel,
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
      IconXCircleSolid64,
      IconNetDownloadRegular16,
      IconNetDownloadRegular20,
      IconNetDownloadRegular24,
      IconTrashCanRegular16,
      IconMoneyTypeCoinsRegular16,
      IconMoneyTypeCoinsRegular20,
      IconMoneyTypeCoinsRegular24,
      IconSendPaperplaneRegular16,
      IconTechPrinterRegular16,
      IconArrowCDownRegular16,
      IconArrowCRightRegular16,
      IconTechPrinterRegular20,
      IconTechPrinterRegular24,
      IconDocsPlusRegular16,
      IconDocsPlusRegular20,
      IconDocsPlusRegular24,
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
