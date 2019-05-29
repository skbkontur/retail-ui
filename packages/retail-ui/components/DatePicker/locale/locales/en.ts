import { internalDateLocale } from '../../../../lib/date/localeSets';
import { LangCodes } from '../../../LocaleProvider';
import { DatePickerLocale } from '../types';

const componentsLocales: DatePickerLocale = {
  today: 'Today',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  ...internalDateLocale[LangCodes.en_EN],
};

export default componentsLocales;
