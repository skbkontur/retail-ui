import type { TokenLocale } from '../../components/Token/locale';
import type { SidePageLocale } from '../../components/SidePage/locale';
import type { PasswordInputLocale } from '../../components/PasswordInput/locale';
import type { ComboBoxLocale } from '../../internal/CustomComboBox/locale';
import type { DatePickerLocale } from '../../components/DatePicker/locale';
import type { PagingLocale } from '../../components/Paging/locale';
import type { SelectLocale } from '../../components/Select/locale';
import type { TokenInputLocale } from '../../components/TokenInput/locale';
import type { FileUploaderLocale } from '../../components/FileUploader/locale';
import type { CalendarLocale } from '../../components/Calendar/locale/types';

export interface LocaleControls {
  [key: string]: any;
  TokenInput?: Partial<TokenInputLocale>;
  Token?: Partial<TokenLocale>;
  ComboBox?: Partial<ComboBoxLocale>;
  Select?: Partial<SelectLocale>;
  Paging?: Partial<PagingLocale>;
  DatePicker?: Partial<DatePickerLocale>;
  Calendar?: Partial<CalendarLocale>;
  FileUploader?: Partial<FileUploaderLocale>;
  PasswordInput?: Partial<PasswordInputLocale>;
  SidePage?: Partial<SidePageLocale>;
}

export enum LangCodes {
  ru_RU = 'ru_RU',
  en_GB = 'en_GB',
}
