import { InternalDateLocaleSet } from '../../components/DatePicker/locale';
import { LangCodes } from '../../components/LocaleProvider';
import { InternalDateDayWeek, InternalDateFirstDayWeek, InternalDateOrder, InternalDateSeparator } from './types';

const DateCustomSet_DMY_Dot_Monday_6_7: InternalDateLocaleSet = {
  order: InternalDateOrder.DMY,
  separator: InternalDateSeparator.Dot,
  firstDayWeek: InternalDateFirstDayWeek.Monday,
  notWorkingDays: [InternalDateDayWeek.Saturday, InternalDateDayWeek.Sunday],
};

const DateCustomSet_MDY_Slash_Sunday_6_7: InternalDateLocaleSet = {
  order: InternalDateOrder.MDY,
  separator: InternalDateSeparator.Slash,
  firstDayWeek: InternalDateFirstDayWeek.Sunday,
  notWorkingDays: [InternalDateDayWeek.Saturday, InternalDateDayWeek.Sunday],
};

export const internalDateLocale: {
  [key in LangCodes]: InternalDateLocaleSet
} = {
  [LangCodes.ru_RU]: DateCustomSet_DMY_Dot_Monday_6_7,
  [LangCodes.en_EN]: DateCustomSet_MDY_Slash_Sunday_6_7,
};
