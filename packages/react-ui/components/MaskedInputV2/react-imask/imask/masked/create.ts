/**
 * Public entry for createMask / maskedClass.
 *
 * Local wrappers (not `export { … } from`) force bundlers with
 * `sideEffects: false` to evaluate this module — including the
 * MaskedPattern registration that factory.ts cannot import directly
 * without creating an import cycle.
 */
import type { Masked } from './base.js';
import {
  createMask as createMaskImpl,
  maskedClass as maskedClassImpl,
  normalizeOpts,
  registerMaskedPatternClass,
  type FactoryArg,
  type FactoryOpts,
  type FactoryReturnMasked,
} from './factory.js';
import { MaskedPattern } from './pattern.js';

registerMaskedPatternClass(MaskedPattern);

export function createMask<Opts extends FactoryArg>(opts: Opts): FactoryReturnMasked<Opts> {
  return createMaskImpl(opts);
}

export function maskedClass(mask: Masked | FactoryOpts['mask']): ReturnType<typeof maskedClassImpl> {
  return maskedClassImpl(mask);
}

export { normalizeOpts };

export type {
  AllFactoryStaticOpts,
  FactoryArg,
  FactoryConstructorOpts,
  FactoryConstructorReturnMasked,
  FactoryInstanceOpts,
  FactoryInstanceReturnMasked,
  FactoryOpts,
  FactoryReturnMasked,
  FactoryStaticOpts,
  FactoryStaticReturnMasked,
  NormalizedOpts,
  UpdateOpts,
} from './factory.js';
