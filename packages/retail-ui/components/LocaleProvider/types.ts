import { ComboBoxLocale } from '../CustomComboBox/locale';
import { LogotypeLocale } from '../Logotype/locale';
import { PagingLocale } from '../Paging/locale';
import { SelectLocale } from '../Select/locale';
import { SpinnerLocale } from '../Spinner/locale';
import { TokenInputLocale } from '../TokenInput/locale';
import { TopBarLocale } from '../TopBar/locale';

export interface LocaleControls {
  Spinner?: SpinnerLocale;
  TokenInput?: TokenInputLocale;
  ComboBox?: ComboBoxLocale;
  TopBar?: TopBarLocale;
  Select?: SelectLocale;
  Paging?: PagingLocale;
  Logotype?: LogotypeLocale;
}

export enum LangCodes {
  ru_RU = 'ru_RU',
  en_EN = 'en_EN',
}
