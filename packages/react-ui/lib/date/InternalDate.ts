import { defaultLangCode } from '../locale/constants';

import { defaultDateComponentsOrder, defaultDateComponentsSeparator, emptyDateComponents } from './constants';
import { InternalDateCalculator } from './InternalDateCalculator';
import { InternalDateGetter } from './InternalDateGetter';
import { InternalDateSetter } from './InternalDateSetter';
import { InternalDateTransformer } from './InternalDateTransformer';
import { InternalDateValidator } from './InternalDateValidator';
import { internalDateLocale } from './localeSets';
import {
  InternalDateChangeSettings,
  InternalDateComponentRaw,
  InternalDateComponentsNumber,
  InternalDateComponentsRaw,
  InternalDateComponentType,
  InternalDateConstructorProps,
  InternalDateFragment,
  InternalDateOrder,
  InternalDateSeparator,
  InternalDateToFragmentsSettings,
  InternalDateValidateCheck,
  isInternalDateValidateCheck,
} from './types';

export class InternalDate {
  private order: InternalDateOrder;
  private separator: InternalDateSeparator;
  private components: InternalDateComponentsRaw = { ...emptyDateComponents };

  private start: InternalDate | null = null;
  private end: InternalDate | null = null;

  public constructor({ order, separator, langCode = defaultLangCode, value }: InternalDateConstructorProps = {}) {
    this.order = order ?? internalDateLocale[langCode].order;
    this.separator = separator ?? internalDateLocale[langCode].separator;
    if (value !== undefined) {
      this.parseInternalValue(value);
    }
  }

  public getComponentsRaw(): InternalDateComponentsRaw {
    return { ...this.components };
  }

  public getComponentsLikeNumber(): InternalDateComponentsNumber {
    return InternalDateTransformer.dateComponentsStringToNumber(this.getComponentsRaw());
  }

  public getSeparator(): InternalDateSeparator {
    return this.separator;
  }

  public getOrder(): InternalDateOrder {
    return this.order;
  }

  public getYear(): InternalDateComponentRaw {
    return this.components.year;
  }

  public getMonth(): InternalDateComponentRaw {
    return this.components.month;
  }

  public getDate(): InternalDateComponentRaw {
    return this.components.date;
  }

  public getRangeStart(): InternalDate | null {
    return this.start;
  }

  public getRangeEnd(): InternalDate | null {
    return this.end;
  }

  public setOrder(order: InternalDateOrder = defaultDateComponentsOrder): InternalDate {
    this.order = order;
    return this;
  }

  public setSeparator(separator: InternalDateSeparator = defaultDateComponentsSeparator): InternalDate {
    this.separator = separator;
    return this;
  }

  public setComponents(components: InternalDateComponentsRaw | null, isNativeMonth = false): InternalDate {
    if (components && isNativeMonth) {
      const clone = this.clone().setComponents(components).shiftMonth(1);
      if (clone.validate({ checks: [InternalDateValidateCheck.Native] })) {
        this.components = { ...clone.getComponentsLikeNumber() };
      }
      return this;
    }
    this.components = components || { ...emptyDateComponents };
    return this;
  }

  public setYear(year: InternalDateComponentRaw): InternalDate {
    this.components.year = year;
    return this;
  }

  public setMonth(month: InternalDateComponentRaw): InternalDate {
    this.components.month = month;
    return this;
  }

  public setDate(date: InternalDateComponentRaw): InternalDate {
    this.components.date = date;
    return this;
  }

  public shiftYear(step: number, { isLoop, isRange, isCutFeb }: InternalDateChangeSettings = {}): InternalDate {
    const min = this.getMinValue(InternalDateComponentType.Year, isRange);
    const max = this.getMaxValue(InternalDateComponentType.Year, { isRange, isCutFeb });
    const { year } = this.getComponentsLikeNumber();
    this.components.year = InternalDateCalculator.calcShiftValueDateComponent(step, year, min, max, isLoop);
    return this;
  }

  public shiftMonth(step: number, { isLoop, isRange, isCutFeb }: InternalDateChangeSettings = {}): InternalDate {
    const min = this.getMinValue(InternalDateComponentType.Month, isRange);
    const max = this.getMaxValue(InternalDateComponentType.Month, { isRange, isCutFeb });
    const { month } = this.getComponentsLikeNumber();
    this.components.month = InternalDateCalculator.calcShiftValueDateComponent(step, month, min, max, isLoop);
    return this;
  }

  public shiftDate(step: number, { isLoop, isRange, isCutFeb }: InternalDateChangeSettings = {}): InternalDate {
    const min = this.getMinValue(InternalDateComponentType.Date, isRange);
    const max = this.getMaxValue(InternalDateComponentType.Date, { isRange, isCutFeb });
    const { date } = this.getComponentsLikeNumber();
    this.components.date = InternalDateCalculator.calcShiftValueDateComponent(step, date, min, max, isLoop);
    return this;
  }

  public setRangeStart(internalDate: InternalDate | null): InternalDate {
    this.start = internalDate;
    return this;
  }

  public setRangeEnd(internalDate: InternalDate | null): InternalDate {
    this.end = internalDate;
    return this;
  }

  public get(type: InternalDateComponentType | null): InternalDateComponentRaw {
    return type !== null ? InternalDateGetter.getValueDateComponent(type, this.getComponentsRaw()) : null;
  }

  public set(type: InternalDateComponentType | null, value: InternalDateComponentRaw): InternalDate {
    return type !== null ? InternalDateSetter.setValueDateComponent(this, type, value) : this;
  }

  public shift(
    type: InternalDateComponentType | null,
    step: number,
    settings?: InternalDateChangeSettings,
  ): InternalDate {
    return type !== null ? InternalDateSetter.shiftValueDateComponent(this, type, step, settings) : this;
  }

  public parseValue(value: string | null = ''): InternalDate {
    const components = InternalDateTransformer.parseValueToDate(value, this.order) || { ...emptyDateComponents };
    this.setComponents(components);
    return this;
  }

  public parseInternalValue(value: string | null = ''): InternalDate {
    const components = InternalDateTransformer.parseValueToDate(value, InternalDateOrder.DMY) || {
      ...emptyDateComponents,
    };
    this.setComponents(components);
    return this;
  }

  public validate({
    type,
    nextValue,
    checks = Object.values(InternalDateValidateCheck).filter<InternalDateValidateCheck>(isInternalDateValidateCheck),
  }: {
    type?: InternalDateComponentType;
    nextValue?: InternalDateComponentRaw;
    checks?: InternalDateValidateCheck[];
  } = {}): boolean {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let self: InternalDate = this;
    if (type !== undefined) {
      const clone = this.clone();
      if (nextValue !== undefined) {
        clone.set(type, nextValue);
      }
      self = clone;
    }
    if (
      checks.includes(InternalDateValidateCheck.NotNull) &&
      !InternalDateValidator.checkForNull(self.getComponentsRaw(), type)
    ) {
      return false;
    }
    if (
      checks.includes(InternalDateValidateCheck.Number) &&
      !Object.values(self.getComponentsRaw()).every(InternalDateValidator.testParseToNumber)
    ) {
      return false;
    }
    if (
      checks.includes(InternalDateValidateCheck.Limits) &&
      !InternalDateValidator.checkLimits(self.getComponentsLikeNumber(), type)
    ) {
      return false;
    }
    if (
      checks.includes(InternalDateValidateCheck.Native) &&
      !InternalDateValidator.compareWithNativeDate(self.getComponentsLikeNumber())
    ) {
      return false;
    }
    if (checks.includes(InternalDateValidateCheck.Range)) {
      return type !== undefined
        ? InternalDateValidator.checkRangePiecemeal(
            type,
            self.getComponentsLikeNumber(),
            self.start && self.start.getComponentsLikeNumber(),
            self.end && self.end.getComponentsLikeNumber(),
          )
        : InternalDateValidator.checkRangeFully(
            self.toNumber(),
            self.start && self.start.toNumber(),
            self.end && self.end.toNumber(),
          );
    }
    return true;
  }

  public toFragments(
    settings: InternalDateToFragmentsSettings = {},
    components: InternalDateComponentsRaw = this.getComponentsRaw(),
  ): InternalDateFragment[] {
    return InternalDateTransformer.dateToFragments(components, {
      order: this.order,
      separator: this.separator,
      ...settings,
    });
  }

  /**
   * Перевод даты в числовое представление (**НЕ** аналог `timestamp`)
   * Предназначено для быстрого сравнивания дат `<=>`
   */
  public toNumber(): number {
    return Number(
      this.toFragments({ order: InternalDateOrder.YMD, withPad: true })
        .map(({ valueWithPad }) => valueWithPad)
        .join(''),
    );
  }

  public toString(settings: InternalDateToFragmentsSettings = {}): string {
    return this.toFragments({ withPad: true, withSeparator: true, ...settings })
      .filter(({ value }) => value !== null)
      .map(({ type, valueWithPad, value }) =>
        settings.withPad && type !== InternalDateComponentType.Separator ? valueWithPad : value,
      )
      .join('');
  }

  public toInternalString(): string {
    return InternalDateTransformer.dateToInternalString(this.getComponentsRaw());
  }

  public toNativeFormat(): InternalDateComponentsNumber | null {
    const components = this.getComponentsLikeNumber();
    if (InternalDateValidator.compareWithNativeDate(components)) {
      return { ...components, month: components.month - 1 };
    }
    return null;
  }

  public clone(): InternalDate {
    return new InternalDate({ order: this.order, separator: this.separator })
      .setComponents({ ...this.components })
      .setRangeStart(this.start && this.start.clone())
      .setRangeEnd(this.end && this.end.clone());
  }

  public duplicateOf(pattern: InternalDate): InternalDate {
    return this.setComponents(pattern.getComponentsRaw());
  }

  public restore(type: InternalDateComponentType | null = null): InternalDate {
    const prev = this.getComponentsRaw();
    const today = InternalDateGetter.getTodayComponents();

    if (prev.year === null && prev.month === null && prev.date === null) {
      return this;
    }

    const restoreYear =
      prev.year !== null && InternalDateValidator.testParseToNumber(prev.year)
        ? prev.year > 50 && prev.year < 100
          ? Number(prev.year) + 1900
          : prev.year > 0 && prev.year < 51
          ? Number(prev.year) + 2000
          : prev.year
        : today.year;
    if (
      (type === null && restoreYear !== prev.year) ||
      type === InternalDateComponentType.Year ||
      type === InternalDateComponentType.All
    ) {
      this.setYear(restoreYear);
    }
    if (
      (type === null && prev.month === null) ||
      type === InternalDateComponentType.Month ||
      type === InternalDateComponentType.All
    ) {
      this.setMonth(today.month);
    }
    if (
      (type === null && prev.date === null) ||
      type === InternalDateComponentType.Date ||
      type === InternalDateComponentType.All
    ) {
      this.setDate(today.date);
    }
    return this;
  }

  public cutOffExcess(
    type: InternalDateComponentType | null = null,
    { isLoop = false, isRange, isCutFeb = false }: InternalDateChangeSettings = {},
  ): InternalDate {
    const { year, month, date } = this.components;
    if ((type === null || type === InternalDateComponentType.Year) && InternalDateValidator.testParseToNumber(year)) {
      this.shiftYear(0, { isLoop, isRange, isCutFeb });
    }
    if ((type === null || type === InternalDateComponentType.Month) && InternalDateValidator.testParseToNumber(month)) {
      this.shiftMonth(0, { isLoop, isRange, isCutFeb });
    }
    if ((type === null || type === InternalDateComponentType.Date) && InternalDateValidator.testParseToNumber(date)) {
      this.shiftDate(0, { isLoop, isRange, isCutFeb });
    }
    return this;
  }

  public isIncomplete(): boolean {
    return !this.isEmpty() && Object.values(this.components).some((component) => component === null);
  }

  public isEmpty(): boolean {
    return Object.values(this.components).every((component) => component === null);
  }

  public isEqualComponentDate(type: InternalDateComponentType | null, compared: InternalDate): boolean {
    return this.get(type) === compared.get(type);
  }

  public isEqual(compared: InternalDate): boolean {
    return (
      InternalDateValidator.isEqualDateValues(this, compared) &&
      InternalDateValidator.isEqualDateFormats(this, compared)
    );
  }

  private getMinValue(type: InternalDateComponentType, isRange?: boolean): number {
    if (isRange === true && this.start !== null) {
      return Number(
        InternalDateCalculator.calcRangeStartDateComponent(
          type,
          this.getComponentsLikeNumber(),
          this.start.getComponentsLikeNumber(),
        ),
      );
    }
    return InternalDateGetter.getDefaultMin(type);
  }

  private getMaxValue(
    type: InternalDateComponentType,
    { isRange, isCutFeb }: { isRange?: boolean; isCutFeb?: boolean } = {},
  ): number {
    if (isRange && this.end !== null) {
      return Number(
        InternalDateCalculator.calcRangeEndDateComponent(
          type,
          this.getComponentsLikeNumber(),
          this.end.getComponentsLikeNumber(),
        ),
      );
    }
    if (!isCutFeb) {
      return InternalDateGetter.getDefaultMax(type);
    }
    return InternalDateGetter.getDefaultMax(type, this.getComponentsLikeNumber());
  }
}
