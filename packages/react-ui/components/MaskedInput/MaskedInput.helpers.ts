import React from 'react';
import IMask, {
  FactoryArg,
  MaskedPatternOptions,
  MaskedRegExp,
  Masked,
  FactoryOpts,
  Definitions,
  FactoryConstructorOpts,
} from 'imask';
import { IMaskInput, IMaskInputProps } from 'react-imask';

import { isNonNullable } from '../../lib/utils';
import { MaskedShadows } from '../../internal/MaskedInputElement/MaskedInputElement';

import { IMaskRefType, MaskedInputProps } from './index';

export type AnyIMaskType = ReturnType<typeof IMask.createMask>;

export const DEFAULT_MASK_CHAR = '_';
export const DEFINITIONS = Object.freeze({ '9': /[0-9]/, a: /[A-Za-z]/, '*': /[A-Za-z0-9]/ });

export function getDefinitions(formatChars: Record<string, string> | undefined): Definitions {
  if (isNonNullable(formatChars)) {
    const chars: Record<string, RegExp> = {};

    for (const key in formatChars) {
      chars[key] = new RegExp(formatChars[key]);
    }

    return chars;
  }

  return DEFINITIONS;
}

export function getMaskChar(maskChar: string | null | undefined): string {
  if (maskChar === null) {
    return '';
  }

  return maskChar === undefined ? DEFAULT_MASK_CHAR : maskChar;
}
