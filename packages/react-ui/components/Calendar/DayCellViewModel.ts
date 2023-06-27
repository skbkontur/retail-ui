export class DayCellViewModel {
  public static create(date: number, month: number, year: number, isWeekend: boolean) {
    return new DayCellViewModel(date, month, year, isWeekend);
  }

  public date: number;

  public month: number;

  public year: number;

  public isWeekend: boolean;

  constructor(date: number, month: number, year: number, isWeekend: boolean) {
    this.date = date;
    this.month = month;
    this.year = year;
    this.isWeekend = isWeekend;
  }
}
