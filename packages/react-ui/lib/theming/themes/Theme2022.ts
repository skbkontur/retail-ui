import { ThemeFactory } from '../ThemeFactory';
import { Theme2022Internal } from '../../../internal/themes/Theme2022';
import { BaseTheme } from '../../../internal/themes/BaseTheme';

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

export const THEME_2022 = ThemeFactory.create(colorUpdateDark2024, ThemeFactory.create(Theme2022Internal, BaseTheme));
