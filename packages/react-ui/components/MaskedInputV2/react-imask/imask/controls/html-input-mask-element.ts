/* eslint-disable eqeqeq */
import { HTMLMaskElement } from './html-mask-element.js';

export type InputElement = HTMLTextAreaElement | HTMLInputElement;

/** Bridge between InputElement and {@link Masked} */
export class HTMLInputMaskElement extends HTMLMaskElement {
  /** InputElement to use mask on */
  input!: InputElement;

  constructor(input: InputElement) {
    super(input);
    this.input = input;
  }

  /** Returns InputElement selection start */
  override get _unsafeSelectionStart(): number | null {
    return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
  }

  /** Returns InputElement selection end */
  override get _unsafeSelectionEnd(): number | null {
    return this.input.selectionEnd;
  }

  /** Sets InputElement selection */
  _unsafeSelect(start: number, end: number): void {
    this.input.setSelectionRange(start, end);
  }

  override get value(): string {
    return this.input.value;
  }
  override set value(value: string) {
    this.input.value = value;
  }
}
