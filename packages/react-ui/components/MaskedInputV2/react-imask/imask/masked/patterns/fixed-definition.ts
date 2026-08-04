import { ChangeDetails } from '../../core/change-details.js';
import { ContinuousTailDetails } from '../../core/continuous-tail-details.js';
import { type TailDetails } from '../../core/tail-details.js';
import { DIRECTION, type Direction, isString } from '../../core/utils.js';
import { type ExtractFlags, type AppendFlags, type MaskedState } from '../base.js';
import type { PatternBlock } from './block.js';

export type PatternFixedDefinitionOptions = Pick<PatternFixedDefinition, 'char' | 'isUnmasking' | 'eager'>;

export class PatternFixedDefinition implements PatternBlock {
  /** */
  _value!: string;
  /** */
  char!: string;
  /** */
  isUnmasking?: boolean;
  /** */
  eager!: boolean | 'remove' | 'append' | undefined;
  /** */
  _isRawInput?: boolean;
  /** */
  isFixed!: boolean;

  constructor(opts: PatternFixedDefinitionOptions) {
    Object.assign(this, opts);
    this._value = '';
    this.isFixed = true;
  }

  get value(): string {
    return this._value;
  }

  get unmaskedValue(): string {
    return this.isUnmasking ? this.value : '';
  }

  get rawInputValue(): string {
    return this._isRawInput ? this.value : '';
  }

  get displayValue(): string {
    return this.value;
  }

  reset(): void {
    this._isRawInput = false;
    this._value = '';
  }

  remove(fromPos: number = 0, toPos: number = this._value.length): ChangeDetails {
    this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
    if (!this._value) {
      this._isRawInput = false;
    }

    return new ChangeDetails();
  }

  nearestInputPos(cursorPos: number, direction: Direction = DIRECTION.NONE): number {
    const minPos = 0;
    const maxPos = this._value.length;

    switch (direction) {
      case DIRECTION.LEFT:
      case DIRECTION.FORCE_LEFT:
        return minPos;
      case DIRECTION.NONE:
      case DIRECTION.RIGHT:
      case DIRECTION.FORCE_RIGHT:
      default:
        return maxPos;
    }
  }

  totalInputPositions(fromPos: number = 0, toPos: number = this._value.length): number {
    return this._isRawInput ? toPos - fromPos : 0;
  }

  extractInput(fromPos: number = 0, toPos: number = this._value.length, flags: ExtractFlags = {}): string {
    return (flags.raw && this._isRawInput && this._value.slice(fromPos, toPos)) || '';
  }

  get isComplete(): boolean {
    return true;
  }

  get isFilled(): boolean {
    return Boolean(this._value);
  }

  _appendChar(ch: string, flags: AppendFlags = {}): ChangeDetails {
    if (this.isFilled) {
      return new ChangeDetails();
    }
    const appendEager = this.eager === true || this.eager === 'append';

    const appended = this.char === ch;
    const isResolved =
      appended && (this.isUnmasking || flags.input || flags.raw) && (!flags.raw || !appendEager) && !flags.tail;
    const details = new ChangeDetails({
      inserted: this.char,
      rawInserted: isResolved ? this.char : '',
    });
    this._value = this.char;
    this._isRawInput = isResolved && flags.raw;

    return details;
  }

  _appendEager(): ChangeDetails {
    return this._appendChar(this.char, { tail: true });
  }

  _appendPlaceholder(): ChangeDetails {
    const details = new ChangeDetails();
    if (this.isFilled) {
      return details;
    }

    // eslint-disable-next-line no-multi-assign
    this._value = details.inserted = this.char;
    return details;
  }

  extractTail(): TailDetails {
    return new ContinuousTailDetails('');
  }

  appendTail(tail: string | TailDetails): ChangeDetails {
    if (isString(tail)) {
      // eslint-disable-next-line no-param-reassign
      tail = new ContinuousTailDetails(String(tail));
    }

    return (tail as TailDetails).appendTo(this);
  }

  append(str: string, flags?: AppendFlags, tail?: TailDetails): ChangeDetails {
    const details = this._appendChar(str[0], flags);

    // eslint-disable-next-line eqeqeq
    if (tail != null) {
      details.tailShift += this.appendTail(tail).tailShift;
    }

    return details;
  }

  doCommit(): void {}

  get state(): MaskedState {
    return {
      _value: this._value,
      _rawInputValue: this.rawInputValue,
    };
  }

  set state(state: MaskedState) {
    this._value = state._value;
    this._isRawInput = Boolean(state._rawInputValue);
  }

  pad(): ChangeDetails {
    return this._appendPlaceholder();
  }
}
