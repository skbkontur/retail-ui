import { ComboBoxLocale } from '../CustomComboBox/locale';
import { DatePickerLocale } from '../DatePicker/locale';
import { LogotypeLocale } from '../Logotype/locale';
import { PagingLocale } from '../Paging/locale';
import { SelectLocale } from '../Select/locale';
import { SpinnerLocale } from '../Spinner/locale';
import { TokenInputLocale } from '../TokenInput/locale';
import { TopBarLocale } from '../TopBar/locale';

export interface LocaleControls {
  Spinner?: Partial<SpinnerLocale>;
  TokenInput?: Partial<TokenInputLocale>;
  ComboBox?: Partial<ComboBoxLocale>;
  TopBar?: Partial<TopBarLocale>;
  Select?: Partial<SelectLocale>;
  Paging?: Partial<PagingLocale>;
  Logotype?: Partial<LogotypeLocale>;
  DatePicker?: Partial<DatePickerLocale>;
}

export enum LangCodes {
  ru_RU = 'ru_RU',
  en_EN = 'en_EN',
}
