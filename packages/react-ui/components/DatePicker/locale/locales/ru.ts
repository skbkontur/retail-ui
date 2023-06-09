import { internalDateLocale } from '../../../../lib/date/localeSets';
import { LangCodes } from '../../../../lib/locale';
import { DatePickerLocale } from '../types';

export const componentsLocales: DatePickerLocale = {
  today: 'Сегодня',
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  ...internalDateLocale[LangCodes.ru_RU],
};
