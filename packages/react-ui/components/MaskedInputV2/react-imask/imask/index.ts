import { IMask } from './imask.js';
export { HTMLInputMaskElement, type InputElement } from './controls/html-input-mask-element.js';
export { HTMLMaskElement } from './controls/html-mask-element.js';
export { InputMask, type InputMaskElement } from './controls/input.js';
export { MaskElement } from './controls/mask-element.js';
export { ChangeDetails, type ChangeDetailsOptions } from './core/change-details.js';
export { type AppendTail, type TailDetails } from './core/tail-details.js';
export { DIRECTION, forceDirection, type Direction, type Selection } from './core/utils.js';
export { Masked, type AppendFlags, type ExtractFlags, type MaskedOptions, type MaskedState } from './masked/base.js';
export {
  createMask,
  normalizeOpts,
  type AllFactoryStaticOpts,
  type FactoryArg,
  type FactoryConstructorOpts,
  type FactoryConstructorReturnMasked,
  type FactoryInstanceOpts,
  type FactoryInstanceReturnMasked,
  type FactoryOpts,
  type FactoryReturnMasked,
  type FactoryStaticOpts,
  type FactoryStaticReturnMasked,
  type NormalizedOpts,
  type UpdateOpts,
} from './masked/create.js';
export {
  MaskedPattern,
  type BlockPosData,
  type Definitions,
  type MaskedPatternOptions,
  type MaskedPatternState,
} from './masked/pattern.js';
export type { PatternBlock } from './masked/patterns/block.js';
export { ChunksTailDetails, type ChunksTailState } from './masked/patterns/chunk-tail-details.js';
export { PatternFixedDefinition, type PatternFixedDefinitionOptions } from './masked/patterns/fixed-definition.js';
export {
  PatternInputDefinition,
  type PatternInputDefinitionOptions,
  type PatternInputDefinitionState,
} from './masked/patterns/input-definition.js';
export { MaskedRegExp, type MaskedRegExpOptions } from './masked/regexp.js';

export { IMask };
