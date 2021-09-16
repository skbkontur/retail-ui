import { ComboBoxLocale } from '../../internal/CustomComboBox/locale';
import { DatePickerLocale } from '../../components/DatePicker/locale';
import { PagingLocale } from '../../components/Paging/locale';
import { SelectLocale } from '../../components/Select/locale';
import { SpinnerLocale } from '../../components/Spinner/locale';
import { TokenInputLocale } from '../../components/TokenInput/locale';
import { IUploadFileControlLocale } from '../../internal/UploadFileControl/locale';

export interface LocaleControls {
  [key: string]: any;
  Spinner?: Partial<SpinnerLocale>;
  TokenInput?: Partial<TokenInputLocale>;
  ComboBox?: Partial<ComboBoxLocale>;
  Select?: Partial<SelectLocale>;
  Paging?: Partial<PagingLocale>;
  DatePicker?: Partial<DatePickerLocale>;
  UploadFileControl?: Partial<IUploadFileControlLocale>;
}

export enum LangCodes {
  ru_RU = 'ru_RU',
  en_GB = 'en_GB',
}
