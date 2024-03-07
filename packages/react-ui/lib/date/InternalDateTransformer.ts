import {
  CHAR_PAD,
  defaultDateComponentsOrder,
  defaultDateComponentsSeparator,
  emptyDateComponents,
  LENGTH_DATE,
  LENGTH_MONTH,
  LENGTH_SEPARATOR,
  LENGTH_YEAR,
  RE_ORDER_DMY,
  RE_ORDER_MDY,
  RE_ORDER_YMD,
} from './constants';
import { InternalDateValidator } from './InternalDateValidator';
import {
  InternalDateComponentRaw,
  InternalDateComponents,
  InternalDateComponentsNumber,
  InternalDateComponentsRaw,
  InternalDateComponentType,
  InternalDateFragment,
  InternalDateOrder,
  InternalDateSeparator,
  InternalDateToFragmentsSettings,
} from './types';

export class InternalDateTransformer {
  public static padStart = (value: InternalDateComponentRaw, length: number, pad: string = CHAR_PAD): string =>
    String(value || '').padStart(length, pad);

  public static padYear = (year: InternalDateComponentRaw, pad?: string): string =>
    InternalDateTransformer.padStart(year, LENGTH_YEAR, pad);
  public static padMonth = (month: InternalDateComponentRaw, pad?: string): string =>
    InternalDateTransformer.padStart(month, LENGTH_MONTH, pad);
  public static padDate = (date: InternalDateComponentRaw, pad?: string): string =>
    InternalDateTransformer.padStart(date, LENGTH_DATE, pad);

  public static padDateComponent = (
    type: InternalDateComponentType | null,
    value: InternalDateComponentRaw,
    pad?: string,
  ): string => {
    if (type === InternalDateComponentType.Year) {
      return InternalDateTransformer.padYear(value, pad);
    } else if (type === InternalDateComponentType.Month) {
      return InternalDateTransformer.padMonth(value, pad);
    } else if (type === InternalDateComponentType.Date) {
      return InternalDateTransformer.padDate(value, pad);
    }
    return '';
  };

  public static dateToFragments(
    components: InternalDateComponentsRaw,
    settings: InternalDateToFragmentsSettings = {},
  ): InternalDateFragment[] {
    const {
      order = defaultDateComponentsOrder,
      separator = defaultDateComponentsSeparator,
      withSeparator = false,
      withPad = false,
      pad,
    } = settings;
    const year: InternalDateFragment = {
      type: InternalDateComponentType.Year,
      value: components.year,
      length: LENGTH_YEAR,
    };
    const month: InternalDateFragment = {
      type: InternalDateComponentType.Month,
      value: components.month,
      length: LENGTH_MONTH,
    };
    const date: InternalDateFragment = {
      type: InternalDateComponentType.Date,
      value: components.date,
      length: LENGTH_DATE,
    };

    const fragments: InternalDateFragment[] = [];
    if (order === InternalDateOrder.YMD) {
      fragments.push(year, month, date);
    } else if (order === InternalDateOrder.MDY) {
      fragments.push(month, date, year);
    } else if (order === InternalDateOrder.DMY) {
      fragments.push(date, month, year);
    }

    if (withPad) {
      year.valueWithPad = InternalDateTransformer.padYear(year.value, pad);
      month.valueWithPad = InternalDateTransformer.padMonth(month.value, pad);
      date.valueWithPad = InternalDateTransformer.padDate(date.value, pad);
    }

    year.isValid = InternalDateValidator.testParseToNumber(year.value);
    month.isValid = InternalDateValidator.testParseToNumber(month.value);
    date.isValid = InternalDateValidator.testParseToNumber(date.value);

    if (withSeparator) {
      const separatorFragment: InternalDateFragment = {
        type: InternalDateComponentType.Separator,
        value: separator,
        length: LENGTH_SEPARATOR,
      };
      fragments.splice(1, 0, separatorFragment);
      fragments.splice(3, 0, separatorFragment);
    }

    return fragments;
  }

  public static parseValueToDate(
    value: string | null,
    order: InternalDateOrder = defaultDateComponentsOrder,
  ): InternalDateComponents | null {
    if (!value) {
      return null;
    }

    const getRe = () => {
      if (order === InternalDateOrder.MDY) {
        return RE_ORDER_MDY;
      } else if (order === InternalDateOrder.DMY) {
        return RE_ORDER_DMY;
      }

      return RE_ORDER_YMD;
    };

    const re = getRe();
    if (!re.test(value)) {
      return null;
    }
    const match = re.exec(value);
    const dateComponents: InternalDateComponents = { ...emptyDateComponents };

    if (match) {
      const matchFinished = match
        .slice(1)
        .map((item) => (InternalDateValidator.testParseToNumber(item) ? Number(item) : null));
      if (order === InternalDateOrder.YMD) {
        ({ 0: dateComponents.year, 1: dateComponents.month, 2: dateComponents.date } = matchFinished);
      } else if (order === InternalDateOrder.MDY) {
        ({ 2: dateComponents.year, 0: dateComponents.month, 1: dateComponents.date } = matchFinished);
      } else if (order === InternalDateOrder.DMY) {
        ({ 2: dateComponents.year, 1: dateComponents.month, 0: dateComponents.date } = matchFinished);
      }
    }
    return dateComponents;
  }

  public static dateComponentsStringToNumber(
    componentsRaw: InternalDateComponentsRaw | null,
  ): InternalDateComponentsNumber {
    if (componentsRaw === null) {
      return { year: 0, month: 0, date: 0 };
    }
    const { year, month, date } = componentsRaw;
    return { year: Number(year), month: Number(month), date: Number(date) };
  }

  public static dateToInternalString(components: InternalDateComponentsRaw): string {
    return InternalDateTransformer.dateToFragments(components, {
      withPad: true,
      withSeparator: false,
      order: InternalDateOrder.DMY,
    })
      .filter(({ value }) => value !== null)
      .map(({ valueWithPad }) => valueWithPad)
      .join(InternalDateSeparator.Dot);
  }
}
