import React from 'react';
import { MaskedPatternOptions } from 'imask';

import { getMasked, getMaskedShadows } from '../MaskedInput.helpers';
import { IMaskRefType } from '../index';

describe('MaskedInputElement.helpers', () => {
  const getFakeMaskedPattern = (options: Partial<MaskedPatternOptions>, value: string) => {
    const mockMaskRef = {
      current: {
        element: { value },
      },
    } as any as React.RefObject<IMaskRefType>;

    return getMasked(mockMaskRef, options);
  };

  describe('getMaskedShadows', () => {
    it.each([
      ['+7 (999) 999-99-99', '+7 (1', '+7 (1', '__) ___-__-__'],
      ['+7 (999) 999-99-99', '+7 (123) 4', '+7 (123) 4', '__-__-__'],
      ['99:99', '1', '1', '_:__'],
      ['99:99', '12:3', '12:3', '_'],
    ])('mask "%s" and masked value "%s"', (mask, value, expectedFilledValue, expectedRestPlaceholder) => {
      const [filledValue, restPlaceholder] = getMaskedShadows(getFakeMaskedPattern({ mask }, value));

      expect(filledValue).toBe(expectedFilledValue);
      expect(restPlaceholder).toBe(expectedRestPlaceholder);
    });

    it.each([
      ['+7 (999) 999-99-99', '1', '+7 (1', '__) ___-__-__'],
      ['+7 (999) 999-99-99', '1234', '+7 (123) 4', '__-__-__'],
      ['99:99', '1', '1', '_:__'],
      ['99:99', '123', '12:3', '_'],
    ])('mask "%s" and unmasked value "%s"', (mask, value, expectedFilledValue, expectedRestPlaceholder) => {
      const [filledValue, restPlaceholder] = getMaskedShadows(getFakeMaskedPattern({ mask }, value));

      expect(filledValue).toBe(expectedFilledValue);
      expect(restPlaceholder).toBe(expectedRestPlaceholder);
    });
  });
});
