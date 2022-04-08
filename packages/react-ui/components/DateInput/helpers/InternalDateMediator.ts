import { InternalDate } from '../../../lib/date/InternalDate';
import { InternalDateGetter } from '../../../lib/date/InternalDateGetter';
import { InternalDateTransformer } from '../../../lib/date/InternalDateTransformer';
import { InternalDateComponentType, InternalDateTypesOrder, InternalDateValidateCheck } from '../../../lib/date/types';
import { DatePickerLocale } from '../../DatePicker/locale';
import { DateInputProps } from '../DateInput';

import { inputNumber } from './inputNumber';

export class InternalDateMediator {
  public iDate: InternalDate = new InternalDate();

  public update = (props: DateInputProps, locale: DatePickerLocale): InternalDateMediator => {
    const start = this.iDate.getRangeStart();
    const min = start && start.toInternalString();
    const end = this.iDate.getRangeEnd();
    const max = end && end.toInternalString();
    const { order, separator } = locale;
    this.iDate.setOrder(order).setSeparator(separator);
    if (props.minDate !== min) {
      this.iDate.setRangeStart(
        props.minDate
          ? new InternalDate({
              order,
              separator,
              value: props.minDate,
            })
          : null,
      );
    }
    if (props.maxDate !== max) {
      this.iDate.setRangeEnd(
        props.maxDate
          ? new InternalDate({
              order,
              separator,
              value: props.maxDate,
            })
          : null,
      );
    }
    if (!props.value || props.value !== this.iDate.toInternalString()) {
      this.iDate.parseInternalValue(props.value);
    }
    return this;
  };

  public inputKey(
    key: string,
    type: InternalDateComponentType | null,
    inputMode: boolean,
  ): { inputMode: boolean; changed: boolean } {
    const prevValue = this.iDate.get(type);
    if (type === null) {
      type = this.getLeftmostType();
      this.clear(type);
    }
    if (type !== InternalDateComponentType.Year) {
      this.iDate.cutOffExcess(type);
    } else {
      this.iDate.restore(type);
    }
    const maxValue = InternalDateGetter.getDefaultMax(type, this.iDate.getComponentsLikeNumber());
    const { nextValue, nextInputMode } = inputNumber(type, prevValue, key, inputMode, maxValue);
    this.iDate.set(type, nextValue);
    return { inputMode: nextInputMode, changed: nextValue !== prevValue };
  }

  public paste = (pasted: string): InternalDateMediator => {
    this.iDate.parseValue(pasted).restore().cutOffExcess();
    return this;
  };

  public restore = (): boolean => {
    if (this.iDate.isIncomplete()) {
      const restored = this.iDate.clone().restore();
      if (!this.iDate.isEqual(restored)) {
        this.iDate.duplicateOf(restored);
      }
      return true;
    }
    return false;
  };

  public shiftDateComponent(type: InternalDateComponentType | null, step: number): boolean {
    type = type === null ? this.getLeftmostType() : type;
    const iDate = this.iDate.clone();
    const isValidRange = iDate.validate({ checks: [InternalDateValidateCheck.Range] });
    const start = iDate.getRangeStart();
    const end = iDate.getRangeEnd();
    if (!isValidRange) {
      // Удерживаем дату в заданном диапазоне
      if (start && InternalDateGetter.max([iDate, start]) === start) {
        iDate.duplicateOf(start);
      } else if (end && InternalDateGetter.min([iDate, end]) === end) {
        iDate.duplicateOf(end);
      }
    } else {
      const clone = iDate.clone().shift(type, step, { isRange: false, isLoop: true, isCutFeb: true });
      if (clone.validate({ checks: [InternalDateValidateCheck.Range] })) {
        iDate.duplicateOf(clone);
      }
    }
    const changed = !this.iDate.isEqualComponentDate(type, iDate);
    this.iDate = iDate;
    return changed;
  }

  public getShiftedType(type: InternalDateComponentType | null, step: number): InternalDateComponentType | null {
    const typesOrder = this.getTypesOrder();
    const index = type === null ? 0 : typesOrder.indexOf(type);
    const nextIndex = index + step;

    // Если выделено всё поле, то в завимости от направления перемещения, выделям крайний компонент
    if (type === InternalDateComponentType.All) {
      return step < 0 ? typesOrder[0] : typesOrder[2];
    }

    // Если текущий компонент "год", и он не пуст, то при перемещении выделения "восстанавливаем" значение года
    if (type === InternalDateComponentType.Year && this.iDate.getYear() !== null) {
      this.iDate.restore(type);
    }

    const shiftedType = typesOrder[nextIndex];
    return typeof shiftedType === 'number' ? shiftedType : type;
  }

  public getFragments = () =>
    this.iDate.toFragments({
      withSeparator: true,
      withPad: true,
    });

  public deleteOneCharRight = (type: InternalDateComponentType, inputMode: boolean) => {
    let prev = this.iDate.get(type);
    prev = String(inputMode ? prev : InternalDateTransformer.padDateComponent(type, prev));
    const next = prev.replace(/.$/, '') || null;
    this.iDate.set(type, next);
  };

  public isChangedLocale = (locale: DatePickerLocale): boolean =>
    locale.order !== this.iDate.getOrder() || locale.separator !== this.iDate.getSeparator();

  public isNull = (type: InternalDateComponentType | null): boolean => this.iDate.get(type) === null;

  public isEmpty = (): boolean => this.iDate.isEmpty();

  public get = (type: InternalDateComponentType | null) => this.iDate.get(type);

  public clear = (type: InternalDateComponentType | null): InternalDate => this.iDate.set(type, null);

  public validateString = (value: string): boolean =>
    InternalDateTransformer.parseValueToDate(value, this.iDate.getOrder()) !== null;

  public getString = (): string => (this.iDate.isEmpty() ? '' : this.iDate.toString());

  public getInternalString = (): string => (this.iDate.isEmpty() ? '' : this.iDate.toInternalString());

  public getTypesOrder = () => this.iDate.toFragments().map(({ type }) => type) as InternalDateTypesOrder;

  public getLeftmostType = (): InternalDateComponentType => this.getTypesOrder()[0];

  public getRightmostType = (): InternalDateComponentType => this.getTypesOrder()[2];
}
