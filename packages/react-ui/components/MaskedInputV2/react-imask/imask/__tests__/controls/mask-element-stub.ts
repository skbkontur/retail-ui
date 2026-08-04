import { MaskElement } from '../../controls/mask-element.js';

export class MaskElementStub extends MaskElement {
  _unsafeSelectionStart!: number;
  _unsafeSelectionEnd!: number;
  value!: string;

  _unsafeSelect(): void {}
  bindEvents(): void {}
  unbindEvents(): void {}

  constructor() {
    super();
    this.value = '';
    this.select(0, 0);
  }

  get isActive(): boolean {
    return true;
  }

  override select(start: number, end: number): void {
    (this._unsafeSelectionStart as any) = start;
    (this._unsafeSelectionEnd as any) = end;
  }
}
