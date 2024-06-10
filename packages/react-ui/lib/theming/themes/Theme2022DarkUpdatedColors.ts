import { ThemeFactory } from '../ThemeFactory';

import { THEME_2022_DARK } from './Theme2022Dark';

export const THEME_2022_DARK_UPDATED_COLORS = ThemeFactory.create(
  {
    green: '23A14A',
    greenDark: '#1C8A3F',

    linkSuccessColor: '#46CD68',
    linkSuccessHoverColor: '#67D881',
    linkSuccessActiveColor: '#23A14A',

    btnSuccessBg: '#23A14A',
    btnSuccessBorderColor: '#23A14A',

    btnSuccessHoverBg: '#26AD50',
    btnSuccessHoverBorderColor: '#26AD50',

    btnSuccessActiveBg: '#1C8A3F',
    btnSuccessActiveBorderColor: '#1C8A3F',
  },
  THEME_2022_DARK,
);
