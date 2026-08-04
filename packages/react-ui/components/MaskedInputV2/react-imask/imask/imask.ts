import type { InputMaskElement } from './controls/input.js';
import { InputMask } from './controls/input.js';
import type { FactoryArg, FactoryOpts } from './masked/factory.js';
export { InputMask };

// Factory function
export function IMask(el: InputMaskElement, opts: FactoryOpts): InputMask<FactoryArg> {
  return new InputMask(el, opts);
}
