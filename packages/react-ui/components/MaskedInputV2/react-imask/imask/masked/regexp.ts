import { Masked, type MaskedOptions } from './base.js';

export type MaskedRegExpOptions = MaskedOptions<MaskedRegExp>;

/** Masking by RegExp */
export class MaskedRegExp extends Masked<string> {
  /** */
  mask!: RegExp;
  /** Enable characters overwriting */
  overwrite?: boolean | 'shift' | undefined;
  /** */
  eager?: boolean | 'remove' | 'append' | undefined;
  /** */
  skipInvalid?: boolean | undefined;
  /** */
  autofix?: boolean | 'pad' | undefined;

  override updateOptions(opts: Partial<MaskedRegExpOptions>): void {
    super.updateOptions(opts);
  }

  override _update(opts: Partial<MaskedRegExpOptions>): void {
    const mask = opts.mask;
    if (mask) {
      opts.validate = (value) => value.search(mask) >= 0;
    }
    super._update(opts);
  }
}
