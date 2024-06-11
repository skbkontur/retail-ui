import { ThemeFactory } from '../ThemeFactory';

import { THEME_2022_DARK } from './Theme2022Dark';

export const THEME_2022_DARK_UPDATE_JUNE_2024 = ThemeFactory.create(
  {
    green: '23A14A',
    greenDark: '#1C8A3F',

    red: '#ED3F3F',
    redDark: '#DD3333',
    errorMain: '#ED3F3F',

    linkSuccessColor: '#46CD68',
    linkSuccessHoverColor: '#67D881',
    linkSuccessActiveColor: '#23A14A',

    linkDangerColor: '#FE6C6C',
    linkDangerHoverColor: '#FE8C8C',
    linkDangerActiveColor: '#ED3F3F',

    btnSuccessBg: '#23A14A',
    btnSuccessBorderColor: '#23A14A',

    btnSuccessHoverBg: '#26AD50',
    btnSuccessHoverBorderColor: '#26AD50',

    btnSuccessActiveBg: '#1C8A3F',
    btnSuccessActiveBorderColor: '#1C8A3F',

    btnDangerBg: '#ED3F3F',
    btnDangerBorderColor: '#ED3F3F',

    btnDangerHoverBg: '#FE4C4C',
    btnDangerHoverBorderColor: 'FE4C4C',

    btnDangerActiveBg: '#CC2626',
    btnDangerActiveBorderColor: 'CC2626',

    calendarCellWeekendColor: '#FE6C6C',

    fileUploaderBorderColorError: '#ED3F3F',

    inputBorderColorError: '#FE6C6C',

    validationsTextColorError: '#ED3F3F',
    // error background for button use=link
    btnErrorSecondary: '#AB0D0D',
  },
  THEME_2022_DARK,
);
