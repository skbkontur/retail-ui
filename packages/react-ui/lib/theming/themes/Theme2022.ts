import { ThemeFactory } from '../ThemeFactory';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { applyMarkers, markAsTheme2022 } from '../ThemeHelpers';

import { DEFAULT_THEME } from './DefaultTheme';

const testVars = {
  calendarCellHeight: '70px',
  tokenMarginYSmall: '5px',
  tokenMarginXSmall: '5px',
  tokenFontSizeSmall: '20px',
  tokenLineHeightSmall: '30px',
  tokenPaddingYSmall: '30px',
  tokenPaddingXSmall: '30px',
  tokenInputLineHeightSmall: '30px',
  tokenInputPaddingYSmall: '30px',
  btnIconGapSmallLeft: '30px',
  btnIconGapMediumLeft: '30px',
  btnIconGapLargeLeft: '30px',
  menuItemIconWidthSmall: '30px',
  menuItemPaddingForIconSmall: '30px',
  menuItemLineHeightSmall: '30px',
  menuItemFontSizeSmall: '30px',
  menuItemPaddingXSmall: '30px',
  menuMessageLineHeightSmall: '30px',
  menuMessageFontSizeSmall: '30px',
  menuHeaderLineHeightSmall: '30px',
  menuHeaderFontSizeSmall: '30px',
  menuHeaderPaddingXSmall: '30px',
  menuHeaderPaddingTopSmall: '30px',
  menuHeaderPaddingBottomSmall: '30px',
  toggleFontSizeSmall: '30px',
  toggleLineHeightSmall: '30px',
  toggleHandleBorderRadiusSmall: '30px',
  toggleHeightSmall: '30px',
  toggleWidthSmall: '30px',
  toggleBorderRadiusSmall: '30px',
  toggleHandleBg: 'red',
  toggleHandleSizeSmall: '30px',
  toggleContainerBgDisabled: 'blue',
  checkboxFontSizeSmall: '30px',
  checkboxLineHeightSmall: '30px',
  checkboxBoxSizeSmall: '30px',
  checkboxPaddingYSmall: '30px',
  textareaFontSizeSmall: '30px',
  textareaLineHeightSmall: '30px',
  textareaMinHeightSmall: '30px',
  textareaPaddingXSmall: '30px',
  textareaPaddingYSmall: '30px',
  radioSizeSmall: '30px',
  radioFontSizeSmall: '30px',
  radioLineHeightSmall: '30px',
  radioPaddingYSmall: '30px',
  radioBulletSizeSmall: '30px',
  tabFontSizeLarge: '30px',
  tabLineHeightLarge: '30px',
  tabPaddingXLarge: '30px',
  tabPaddingYLarge: '30px',
  menuItemSelectedBg: 'yellow',
  menuItemHoverBg: 'red',
};

const colorUpdateDark2024 = {
  green: '#1C8A3F',
  greenXxLight: '#C7F9CC',
  greenDark: '#197F39',

  red: '#DD3333',
  redXxLight: '#FFEBEB',
  redDark: '#CC2626',

  errorMain: '#FE4C4C',
  errorText: '#CC2626',

  linkSuccessColor: '#1C8A3F',
  linkSuccessHoverColor: '#197F39',
  linkSuccessActiveColor: '#167333',

  linkDangerColor: '#CC2626',
  linkDangerHoverColor: '#BB1919',
  linkDangerActiveColor: '#AB0D0D',

  btnSuccessBg: '#26AD50',
  btnSuccessBorderColor: '#26AD50',

  btnSuccessHoverBg: '#23A14A',
  btnSuccessHoverBorderColor: '#23A14A',

  btnSuccessActiveBg: '#209644',
  btnSuccessActiveBorderColor: '#209644',

  btnDangerBg: '#FE4C4C',
  btnDangerBorderColor: '#FE4C4C',

  btnDangerHoverBg: '#ED3F3F',
  btnDangerHoverBorderColor: '#ED3F3F',

  btnDangerActiveBg: '#DD3333',
  btnDangerActiveBorderColor: '#DD3333',

  calendarCellWeekendColor: '#CC2626',

  inputBorderColorError: '#DD3333',

  validationsTextColorError: '#CC2626',
  // error background for button use=link
  btnErrorSecondary: '#FFEBEB',

  // disabled colors
  btnDisabledTextColor: '#ADADAD',

  inputIconColorDisabled: '#ADADAD',
  inputTextColorDisabled: '#ADADAD',
  inputPlaceholderColorDisabled: '#ADADAD',

  textareaTextColorDisabled: '#ADADAD',
  textareaPlaceholderColorDisabled: '#ADADAD',

  tokenTextColorDisabled: '#ADADAD',

  selectPlaceholderColorDisabled: '#ADADAD',
  selectMenuArrowColorDisabled: '#ADADAD',

  menuItemDisabledColor: '#ADADAD',

  linkDisabledColor: '#ADADAD',

  fileUploaderDisabledTextColor: '#ADADAD',
  fileUploaderDisabledLinkColor: '#ADADAD',
  fileUploaderDisabledIconColor: '#ADADAD',
};

export const THEME_2022 = applyMarkers(
  ThemeFactory.create(
    testVars,
    ThemeFactory.create(colorUpdateDark2024, ThemeFactory.create(Theme2022Internal, DEFAULT_THEME)),
  ),
  [markAsTheme2022],
);
