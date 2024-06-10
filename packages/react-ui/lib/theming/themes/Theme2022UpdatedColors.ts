import { ThemeFactory } from '../ThemeFactory';

import { THEME_2022 } from './Theme2022';

export const THEME_2022_UPDATED_COLORS = ThemeFactory.create(
  {
    green: '#1C8A3F',
    greenXxLight: '#C7F9CC',
    greenDark: '#197F39',

    linkSuccessColor: '#1C8A3F',
    linkSuccessHoverColor: '#197F39',
    linkSuccessActiveColor: '#167333',

    btnSuccessBg: '#26AD50',
    btnSuccessBorderColor: '#26AD50',

    btnSuccessHoverBg: '#23A14A',
    btnSuccessHoverBorderColor: '#23A14A',

    btnSuccessActiveBg: '#209644',
    btnSuccessActiveBorderColor: '#209644',
  },
  THEME_2022,
);
