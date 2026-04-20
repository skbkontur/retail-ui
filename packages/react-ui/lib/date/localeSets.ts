import { LangCodes } from '../locale/index.js';
import { InternalDateDayWeek, InternalDateFirstDayWeek, InternalDateOrder, InternalDateSeparator } from './types.js';
import type { InternalDateLocaleSet } from './types.js';

const DateCustomSet_DMY_Dot_Monday_6_7: InternalDateLocaleSet = {
  order: InternalDateOrder.DMY,
  separator: InternalDateSeparator.Dot,
  firstDayWeek: InternalDateFirstDayWeek.Monday,
  notWorkingDays: [InternalDateDayWeek.Saturday, InternalDateDayWeek.Sunday],
};

const DateCustomSet_DMY_Slash_Sunday_6_7: InternalDateLocaleSet = {
  order: InternalDateOrder.DMY,
  separator: InternalDateSeparator.Slash,
  firstDayWeek: InternalDateFirstDayWeek.Sunday,
  notWorkingDays: [InternalDateDayWeek.Saturday, InternalDateDayWeek.Sunday],
};

export const internalDateLocale: {
  [key in LangCodes]: InternalDateLocaleSet;
} = {
  [LangCodes.ru_RU]: DateCustomSet_DMY_Dot_Monday_6_7,
  [LangCodes.en_GB]: DateCustomSet_DMY_Slash_Sunday_6_7,
};
