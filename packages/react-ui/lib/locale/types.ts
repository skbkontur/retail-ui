import type { TokenLocale } from '../../components/Token/locale/index.js';
import type { SidePageLocale } from '../../components/SidePage/locale/index.js';
import type { PasswordInputLocale } from '../../components/PasswordInput/locale/index.js';
import type { ComboBoxLocale } from '../../internal/CustomComboBox/locale/index.js';
import type { DatePickerLocale } from '../../components/DatePicker/locale/index.js';
import type { PagingLocale } from '../../components/Paging/locale/index.js';
import type { SelectLocale } from '../../components/Select/locale/index.js';
import type { TokenInputLocale } from '../../components/TokenInput/locale/index.js';
import type { FileUploaderLocale } from '../../components/FileUploader/locale/index.js';
import type { CalendarLocale } from '../../components/Calendar/locale/types.js';

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
