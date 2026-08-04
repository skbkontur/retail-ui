// Re-export everything from submodules
// This is side-effect free

import { HTMLInputMaskElement as HTMLInputMaskElementImpl } from '../controls/html-input-mask-element.js';
import { HTMLMaskElement as HTMLMaskElementImpl } from '../controls/html-mask-element.js';
// Import all implementations
import { InputMask } from '../controls/input.js';
import type { InputMaskElement } from '../controls/input.js';
import { MaskElement as MaskElementImpl } from '../controls/mask-element.js';
import { Masked as MaskedBase } from '../masked/base.js';
import { createMask as createMaskFn } from '../masked/create.js';
import type { FactoryArg } from '../masked/factory.js';
import { MaskedPattern as MaskedPatternImpl } from '../masked/pattern.js';
import { MaskedRegExp as MaskedRegExpImpl } from '../masked/regexp.js';
import { ChangeDetails as ChangeDetailsImpl } from './change-details.js';

// Export types and implementations
export { InputMask } from '../controls/input.js';
export { Masked } from '../masked/base.js';
export { MaskedPattern } from '../masked/pattern.js';
export { MaskedRegExp } from '../masked/regexp.js';
export { ChangeDetails } from './change-details.js';
export { MaskElement } from '../controls/mask-element.js';
export { HTMLMaskElement } from '../controls/html-mask-element.js';
export { HTMLInputMaskElement } from '../controls/html-input-mask-element.js';
export { createMask } from '../masked/create.js';

interface IMaskFunction {
  <Opts extends FactoryArg>(el: InputMaskElement, opts: Opts): InputMask<Opts>;
  // Attach static properties
  InputMask: typeof InputMask;
  Masked: typeof MaskedBase;
  MaskedPattern: typeof MaskedPatternImpl;
  MaskedRegExp: typeof MaskedRegExpImpl;
  ChangeDetails: typeof ChangeDetailsImpl;
  MaskElement: typeof MaskElementImpl;
  HTMLMaskElement: typeof HTMLMaskElementImpl;
  HTMLInputMaskElement: typeof HTMLInputMaskElementImpl;
  createMask: typeof createMaskFn;
}

function IMaskFn<Opts extends FactoryArg>(el: InputMaskElement, opts: Opts): InputMask<Opts> {
  return new InputMask(el, opts);
}

// Attach all static properties
(IMaskFn as IMaskFunction).InputMask = InputMask;
(IMaskFn as IMaskFunction).Masked = MaskedBase;
(IMaskFn as IMaskFunction).MaskedPattern = MaskedPatternImpl;
(IMaskFn as IMaskFunction).MaskedRegExp = MaskedRegExpImpl;
(IMaskFn as IMaskFunction).ChangeDetails = ChangeDetailsImpl;
(IMaskFn as IMaskFunction).MaskElement = MaskElementImpl;
(IMaskFn as IMaskFunction).HTMLMaskElement = HTMLMaskElementImpl;
(IMaskFn as IMaskFunction).HTMLInputMaskElement = HTMLInputMaskElementImpl;
(IMaskFn as IMaskFunction).createMask = createMaskFn;

const IMask: IMaskFunction = IMaskFn as IMaskFunction;
export { IMask };
