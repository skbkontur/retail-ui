import { type InputMask } from '../../controls/input.js';
import { Masked } from '../../masked/base.js';
import { type MaskedPattern, type MaskedPatternOptions } from '../../masked/pattern.js';
import { type MaskedRegExp, type MaskedRegExpOptions } from '../../masked/regexp.js';
import { type Check, type Equal } from '../types.js';

class MyMasked extends Masked {
  autofix?: boolean | 'pad' | undefined;
  overwrite?: boolean | 'shift' | undefined;
  eager?: boolean | 'remove' | 'append' | undefined;
  skipInvalid?: boolean | undefined;
}

export type cases = [
  Check<Equal<Parameters<InputMask<{ mask: string }>['updateOptions']>, [Partial<MaskedPatternOptions>]>>,
  Check<Equal<Parameters<InputMask<{ mask: RegExp }>['updateOptions']>, [Partial<MaskedRegExpOptions>]>>,

  Check<Equal<Parameters<InputMask<{ mask: MaskedPattern }>['updateOptions']>, [Partial<MaskedPatternOptions>]>>,
  Check<Equal<Parameters<InputMask<{ mask: MaskedRegExp }>['updateOptions']>, [Partial<MaskedRegExpOptions>]>>,
  Check<Equal<Parameters<InputMask<{ mask: MyMasked }>['updateOptions']>, [Partial<Record<string, any>>]>>,

  Check<Equal<Parameters<InputMask<MaskedPattern>['updateOptions']>, [Partial<MaskedPatternOptions>]>>,
  Check<Equal<Parameters<InputMask<MaskedRegExp>['updateOptions']>, [Partial<MaskedRegExpOptions>]>>,
  Check<Equal<Parameters<InputMask<MyMasked>['updateOptions']>, [Partial<Record<string, any>>]>>,

  Check<Equal<Parameters<InputMask<{ mask: typeof MaskedPattern }>['updateOptions']>, [Partial<MaskedPatternOptions>]>>,
  Check<Equal<Parameters<InputMask<{ mask: typeof MaskedRegExp }>['updateOptions']>, [Partial<MaskedRegExpOptions>]>>,
  Check<Equal<Parameters<InputMask<{ mask: typeof MyMasked }>['updateOptions']>, [Partial<Record<string, any>>]>>,
];
