import { ComboBoxLocale } from '../../internal/CustomComboBox/locale';
import { DatePickerLocale } from '../../components/DatePicker/locale';
import { FiasLocale } from '../../components/Fias/locale';
import { LogotypeLocale } from '../../components/Logotype/locale';
import { PagingLocale } from '../../components/Paging/locale';
import { SelectLocale } from '../../components/Select/locale';
import { SpinnerLocale } from '../../components/Spinner/locale';
import { TokenInputLocale } from '../../components/TokenInput/locale';
import { TopBarLocale } from '../../components/TopBar/locale';

export interface LocaleControls {
  Spinner?: Partial<SpinnerLocale>;
  TokenInput?: Partial<TokenInputLocale>;
  ComboBox?: Partial<ComboBoxLocale>;
  TopBar?: Partial<TopBarLocale>;
  Select?: Partial<SelectLocale>;
  Paging?: Partial<PagingLocale>;
  Logotype?: Partial<LogotypeLocale>;
  DatePicker?: Partial<DatePickerLocale>;
  Fias?: Partial<FiasLocale>;
}

export enum LangCodes {
  ru_RU = 'ru_RU',
  en_GB = 'en_GB',
}
