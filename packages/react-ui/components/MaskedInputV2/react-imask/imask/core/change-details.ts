export type ChangeDetailsOptions = Pick<ChangeDetails, 'inserted' | 'tailShift' | 'rawInserted' | 'skip'>;

/** Provides details of changing model value */
export class ChangeDetails {
  /** Inserted symbols */
  inserted!: string;
  /** Additional offset if any changes occurred before tail */
  tailShift!: number;
  /** Raw inserted is used by dynamic mask */
  rawInserted!: string;
  /** Can skip chars */
  skip!: boolean;

  static normalize(prep: string | [string, ChangeDetails]): [string, ChangeDetails] {
    return Array.isArray(prep) ? prep : [prep, new ChangeDetails()];
  }

  constructor(details?: Partial<ChangeDetailsOptions>) {
    Object.assign(
      this,
      {
        inserted: '',
        rawInserted: '',
        tailShift: 0,
        skip: false,
      },
      details,
    );
  }

  /** Aggregate changes */
  aggregate(details: ChangeDetails): this {
    this.inserted += details.inserted;
    this.rawInserted += details.rawInserted;
    this.tailShift += details.tailShift;
    this.skip = this.skip || details.skip;

    return this;
  }

  /** Total offset considering all changes */
  get offset(): number {
    return this.tailShift + this.inserted.length;
  }

  get consumed(): boolean {
    return Boolean(this.rawInserted) || this.skip;
  }

  equals(details: ChangeDetails): boolean {
    return (
      this.inserted === details.inserted &&
      this.tailShift === details.tailShift &&
      this.rawInserted === details.rawInserted &&
      this.skip === details.skip
    );
  }
}
