import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { expect, vi } from 'vitest';

import { globalClasses } from '../internal/MaskedInternal.styles.js';
import { MaskedInputV2 } from '../MaskedInputV2.js';

describe('MaskedInputV2 — overlay', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('horizontal scroll on arrow keys', () => {
    function getOverlayContainer() {
      return screen.getByTestId('masked-input-overlay').parentElement!;
    }

    it('scrolls left when caret moves left out of visible area', () => {
      render(<MaskedInputV2 mask="99999999999999999999" value="12345678901234567890" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      Object.defineProperty(input, 'scrollWidth', { value: 500, configurable: true });
      Object.defineProperty(input, 'clientWidth', { value: 100, configurable: true });

      input.focus();
      input.setSelectionRange(16, 16);
      (input as HTMLInputElement).scrollLeft = 400;

      fireEvent.keyDown(input, { key: 'ArrowLeft' });

      expect((input as HTMLInputElement).scrollLeft).toBe(300);
    });

    it('scrolls right when caret moves right out of visible area', () => {
      render(<MaskedInputV2 mask="99999999999999999999" value="12345678901234567890" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      Object.defineProperty(input, 'scrollWidth', { value: 500, configurable: true });
      Object.defineProperty(input, 'clientWidth', { value: 100, configurable: true });

      input.focus();
      input.setSelectionRange(4, 4);
      (input as HTMLInputElement).scrollLeft = 0;

      fireEvent.keyDown(input, { key: 'ArrowRight' });

      expect((input as HTMLInputElement).scrollLeft).toBe(100);
    });

    it('syncs overlay transform with input scrollLeft when value fits input width', () => {
      render(<MaskedInputV2 mask="99:99" value="12" alwaysShowMask />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      Object.defineProperty(input, 'scrollWidth', { value: 100, configurable: true });
      Object.defineProperty(input, 'clientWidth', { value: 100, configurable: true });

      input.focus();
      input.setSelectionRange(2, 2);
      (input as HTMLInputElement).scrollLeft = 40;

      fireEvent.keyDown(input, { key: 'ArrowRight' });

      expect(getOverlayContainer().style.transform).toBe(`translateX(-${input.scrollLeft}px)`);
    });

    it('shows native text at end of prefix field when value fits without overlay', () => {
      render(<MaskedInputV2 mask="+7 999 999-99-99" prefix="prefix:" value="+79876543210" />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      act(() => {
        fireEvent.focus(input);
        input.setSelectionRange(input.value.length, input.value.length);
        fireEvent.select(input);
      });

      expect(screen.queryByTestId('masked-input-overlay')).not.toBeInTheDocument();
      expect(input).not.toHaveClass(globalClasses.masked);
    });

    it('hides overlay and shows native text when value overflows input width', () => {
      const clientWidthSpy = vi.spyOn(HTMLInputElement.prototype, 'clientWidth', 'get').mockReturnValue(70);
      const rectSpy = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function (this: HTMLElement) {
          return {
            width: this.tagName === 'SPAN' ? 280 : 70,
            height: 16,
            top: 0,
            left: 0,
            right: this.tagName === 'SPAN' ? 280 : 70,
            bottom: 16,
            x: 0,
            y: 0,
            toJSON: () => ({}),
          } as DOMRect;
        });

      render(<MaskedInputV2 mask="+7 999 999-99-99" prefix="prefix:" value="+79876543210" width={120} />);
      const input = screen.getByRole<HTMLInputElement>('textbox');

      act(() => {
        fireEvent.focus(input);
      });

      expect(screen.queryByTestId('masked-input-overlay')).not.toBeInTheDocument();
      expect(input).not.toHaveClass(globalClasses.masked);

      clientWidthSpy.mockRestore();
      rectSpy.mockRestore();
    });
  });

  describe('center align caret', () => {
    function getOverlayTextStart(input: HTMLInputElement): number {
      const overlay = screen.getByTestId('masked-input-overlay');
      const range = document.createRange();
      range.selectNodeContents(overlay);
      return range.getBoundingClientRect().left - input.getBoundingClientRect().left;
    }

    it.each(['medium', 'large'] as const)('matches overlay text start for %s size on empty field focus', (size) => {
      const inputRectSpy = vi.spyOn(HTMLInputElement.prototype, 'getBoundingClientRect').mockReturnValue({
        left: 40,
        top: 0,
        width: 240,
        height: size === 'large' ? 40 : 34,
        right: 280,
        bottom: size === 'large' ? 40 : 34,
        x: 40,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect);
      const rangeSpy = vi.spyOn(document, 'createRange').mockReturnValue({
        selectNodeContents: vi.fn(),
        getBoundingClientRect: () =>
          ({
            left: size === 'large' ? 112 : 108,
            top: 0,
            width: 96,
            height: 20,
            right: size === 'large' ? 208 : 204,
            bottom: 20,
            x: size === 'large' ? 112 : 108,
            y: 0,
            toJSON: () => ({}),
          }) as DOMRect,
      } as unknown as Range);

      render(<MaskedInputV2 size={size} align="center" alwaysShowMask mask="999999" maskChar="_" width={240} />);

      const input = screen.getByRole<HTMLInputElement>('textbox');

      act(() => {
        fireEvent.focus(input);
      });

      const expectedOffset = size === 'large' ? 72 : 68;
      expect(parseFloat(input.style.paddingLeft)).toBe(expectedOffset);
      expect(screen.getByTestId('masked-input-overlay').style.paddingLeft).toBe('');
      expect(getOverlayTextStart(input)).toBe(expectedOffset);

      inputRectSpy.mockRestore();
      rangeSpy.mockRestore();
    });
  });
});
