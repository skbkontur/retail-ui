// @flow

export class DayCellViewModel {
  static create(date: number, month: number, year: number, isWeekend: boolean) {
    return new DayCellViewModel(date, month, year, isWeekend);
  }

  date: number;

  month: number;

  year: number;

  isWeekend: boolean;

  constructor(date: number, month: number, year: number, isWeekend: boolean) {
    this.date = date;
    this.month = month;
    this.year = year;
    this.isWeekend = isWeekend;
  }
}
