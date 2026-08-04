import { isString, pick, isObject } from '../core/utils.js';
import { Masked, type MaskedOptions } from './base.js';
import type { MaskedPattern, MaskedPatternOptions } from './pattern.js';
import { MaskedRegExp, type MaskedRegExpOptions } from './regexp.js';

type MaskedPatternConstructor = typeof MaskedPattern;

/** Set by pattern.ts to break the factory ↔ pattern import cycle. */
let MaskedPatternClass: MaskedPatternConstructor | undefined;

/** @internal */
export function registerMaskedPatternClass(Class: MaskedPatternConstructor): void {
  MaskedPatternClass = Class;
}

function getMaskedPatternClass(): MaskedPatternConstructor {
  if (!MaskedPatternClass) {
    throw new Error('MaskedPattern is not registered. Import pattern module before creating a pattern mask.');
  }
  return MaskedPatternClass;
}

export type FactoryStaticOpts = MaskedPatternOptions | MaskedRegExpOptions;

export type AllFactoryStaticOpts = MaskedPatternOptions & MaskedRegExpOptions;

export type FactoryStaticReturnMasked<Opts extends FactoryStaticOpts> = Opts extends MaskedPatternOptions
  ? MaskedPattern
  : Opts extends MaskedRegExpOptions
    ? MaskedRegExp
    : never;

export type FactoryStaticMaskReturnMasked<Mask extends FactoryStaticOpts['mask']> =
  Mask extends MaskedPatternOptions['mask']
    ? MaskedPattern
    : Mask extends MaskedRegExpOptions['mask']
      ? MaskedRegExp
      : never;

export type FactoryInstanceOpts =
  | ({ mask: MaskedRegExp } & Omit<MaskedRegExpOptions, 'mask'>)
  | ({ mask: MaskedPattern } & Omit<MaskedPatternOptions, 'mask'>)
  | ({ mask: Masked } & Omit<MaskedOptions, 'mask'>);

export type FactoryInstanceReturnMasked<Opts extends FactoryInstanceOpts> = Opts extends { mask: infer M } ? M : never;

export type FactoryConstructorOpts =
  | ({ mask: typeof MaskedRegExp } & Omit<MaskedRegExpOptions, 'mask'>)
  | ({ mask: typeof MaskedPattern } & Omit<MaskedPatternOptions, 'mask'>)
  | ({ mask: typeof Masked } & Omit<MaskedOptions, 'mask'>);

export type FactoryConstructorReturnMasked<Opts extends FactoryConstructorOpts> = Opts extends {
  mask: typeof MaskedRegExp;
}
  ? MaskedRegExp
  : Opts extends { mask: typeof MaskedPattern }
    ? MaskedPattern
    : Masked;

export type FactoryOpts = FactoryConstructorOpts | FactoryInstanceOpts | FactoryStaticOpts;

export type FactoryArg = Masked | FactoryOpts | FactoryStaticOpts['mask'];

export type ExtendFactoryArgOptions<Opts extends { [key: string]: any }> =
  | Masked
  | (FactoryOpts & Opts)
  | FactoryStaticOpts['mask'];

export type UpdateStaticOpts<Opts extends FactoryStaticOpts> = Opts extends MaskedPatternOptions
  ? MaskedPatternOptions
  : Opts extends MaskedRegExpOptions
    ? MaskedRegExpOptions
    : never;

type AnyOpts = Record<string, any>;

export type UpdateInstanceOpts<M extends Masked> = M extends MaskedRegExp
  ? MaskedRegExpOptions
  : M extends MaskedPattern
    ? MaskedPatternOptions
    : AnyOpts;

export type UpdateConstructorOpts<M extends FactoryConstructorOpts> = M extends { mask: typeof MaskedRegExp }
  ? MaskedRegExpOptions
  : M extends { mask: typeof MaskedPattern }
    ? MaskedPatternOptions
    : AnyOpts;

export type UpdateStaticMaskOpts<M extends FactoryStaticOpts['mask']> = M extends MaskedPatternOptions['mask']
  ? MaskedPatternOptions
  : M extends MaskedRegExpOptions['mask']
    ? MaskedRegExpOptions
    : never;

export type UpdateOpts<Opts extends FactoryArg> = Partial<
  Opts extends Masked
    ? UpdateInstanceOpts<Opts>
    : Opts extends FactoryStaticOpts['mask']
      ? UpdateStaticMaskOpts<Opts>
      : Opts extends FactoryStaticOpts
        ? UpdateStaticOpts<Opts>
        : Opts extends FactoryInstanceOpts
          ? UpdateInstanceOpts<Opts['mask']>
          : Opts extends FactoryConstructorOpts
            ? UpdateConstructorOpts<Opts>
            : AnyOpts
>;

export type FactoryReturnMasked<Opts extends FactoryArg> = Opts extends Masked
  ? Opts
  : Opts extends FactoryStaticOpts['mask']
    ? FactoryStaticMaskReturnMasked<Opts>
    : Opts extends FactoryConstructorOpts
      ? FactoryConstructorReturnMasked<Opts>
      : Opts extends FactoryInstanceOpts
        ? FactoryInstanceReturnMasked<Opts>
        : Opts extends FactoryStaticOpts
          ? FactoryStaticReturnMasked<Opts>
          : never;

/** Get Masked class by mask type */
export function maskedClass(
  mask: Masked | FactoryOpts['mask'],
): typeof MaskedPattern | typeof MaskedRegExp | typeof Masked {
  // eslint-disable-next-line eqeqeq
  if (mask == null) {
    throw new Error('mask property should be defined');
  }

  if (mask instanceof RegExp) {
    return MaskedRegExp;
  }
  if (isString(mask)) {
    return getMaskedPatternClass();
  }
  if ((mask as { prototype?: unknown }).prototype instanceof Masked) {
    return mask as typeof MaskedPattern | typeof MaskedRegExp | typeof Masked;
  }
  if (mask instanceof Masked) {
    return mask.constructor as typeof MaskedPattern | typeof MaskedRegExp | typeof Masked;
  }

  console.warn('Mask not found for mask', mask);
  return Masked;
}

type MaskedClassOf<M extends Masked> = M extends MaskedRegExp
  ? typeof MaskedRegExp
  : M extends MaskedPattern
    ? typeof MaskedPattern
    : any;

type NormalizedMaskedOpts<Opts extends Masked> = Omit<Opts, 'mask'> & {
  _mask: Opts;
  mask: MaskedClassOf<Opts>;
};

type NormalizedInstanceOpts<Opts extends FactoryInstanceOpts> = Omit<Opts['mask'], `_${string}` | 'mask'> &
  NormalizedMaskedOpts<Opts['mask']>;

export type NormalizedOpts<Opts extends FactoryArg> = Opts extends FactoryStaticOpts['mask']
  ? { mask: Opts }
  : Opts extends Masked
    ? NormalizedMaskedOpts<Opts>
    : Opts extends FactoryInstanceOpts
      ? NormalizedInstanceOpts<Opts>
      : Opts extends FactoryStaticOpts | FactoryConstructorOpts
        ? Opts
        : { mask: Opts };

export function normalizeOpts<Opts extends FactoryArg>(opts: Opts): NormalizedOpts<Opts> {
  if (!opts) {
    throw new Error('Options in not defined');
  }

  if (typeof opts === 'function' && (opts as { prototype?: unknown }).prototype instanceof Masked) {
    return { mask: opts } as unknown as NormalizedOpts<Opts>;
  }

  /*
    handle cases like:
    1) opts = Masked
    2) opts = { mask: Masked, ...instanceOpts }
  */
  const { mask = undefined, ...instanceOpts } =
    // eslint-disable-next-line no-nested-ternary
    opts instanceof Masked
      ? { mask: opts }
      : isObject(opts) && (opts as FactoryInstanceOpts).mask instanceof Masked
        ? (opts as FactoryInstanceOpts)
        : {};

  if (mask) {
    const _mask = (mask as Masked).mask;

    return {
      ...pick(mask, (_, k: string) => !k.startsWith('_')),
      mask: mask.constructor,
      _mask,
      ...instanceOpts,
    } as NormalizedOpts<Opts>;
  }

  if (!isObject(opts)) {
    return { mask: opts } as unknown as NormalizedOpts<Opts>;
  }

  return { ...opts } as unknown as NormalizedOpts<Opts>;
}

/** Creates new {@link Masked} depending on mask type */
export function createMask<Opts extends FactoryArg>(opts: Opts): FactoryReturnMasked<Opts> {
  if (opts instanceof Masked) {
    return opts as FactoryReturnMasked<Opts>;
  }
  const nOpts = normalizeOpts(opts);

  const MaskedClass = maskedClass(nOpts.mask);
  if (!MaskedClass) {
    throw new Error(
      `Masked class is not found for provided mask ${nOpts.mask}, appropriate module needs to be imported manually before creating mask.`,
    );
  }

  if (nOpts.mask === MaskedClass) {
    delete nOpts.mask;
  }
  const nOptsWithInternal = nOpts as NormalizedOpts<Opts> & { _mask?: unknown };
  if (nOptsWithInternal._mask !== undefined && nOptsWithInternal._mask !== null) {
    nOptsWithInternal.mask = nOptsWithInternal._mask as NormalizedOpts<Opts>['mask'];
    delete nOptsWithInternal._mask;
  }
  return new (MaskedClass as unknown as new (opts: unknown) => FactoryReturnMasked<Opts>)(nOpts);
}
