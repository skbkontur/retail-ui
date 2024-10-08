import { TokenLocale } from '../../../components/Token/locale';
import { SidePageLocale } from '../../../components/SidePage/locale';
import { PasswordInputLocale } from '../../../components/PasswordInput/locale';
import { ComboBoxLocale } from '../../../internal/CustomComboBox/locale';
import { DatePickerLocale } from '../../../components/DatePicker/locale';
import { PagingLocale } from '../../../components/Paging/locale';
import { SelectLocale } from '../../../components/Select/locale';
import { TokenInputLocale } from '../../../components/TokenInput/locale';
import { FileUploaderLocale } from '../../../components/FileUploader/locale';
import { CalendarLocale } from '../../../components/Calendar/locale/types';

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
