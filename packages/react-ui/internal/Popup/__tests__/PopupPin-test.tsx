import { act, cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import * as ResponsiveLayoutHooks from '../../../components/ResponsiveLayout/useResponsiveLayout.js';
import * as LayoutEvents from '../../../lib/LayoutEvents.js';
import { PopupDataTids } from '../Popup.js';
import { PopupPin } from '../PopupPin.js';
import { createPopupElement } from './popupTestHelpers.js';

const defaultProps = {
  backgroundColor: '#fff',
  offset: 0,
  size: 8,
};

describe('PopupPin', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders pin for bottom center position', () => {
    const popupElement = createPopupElement(200, 100);

    render(<PopupPin {...defaultProps} popupElement={popupElement} popupPosition="bottom center" />);

    expect(screen.getByTestId(PopupDataTids.popupPin)).toBeInTheDocument();
  });

  it('renders pin when horizontal coordinate is 0', () => {
    const popupElement = createPopupElement(16, 100);

    render(<PopupPin {...defaultProps} popupElement={popupElement} popupPosition="top center" />);

    expect(screen.getByTestId(PopupDataTids.popupPin)).toBeInTheDocument();
  });

  it('keeps pin in DOM after position direction changes', () => {
    const popupElement = createPopupElement(200, 100);

    const { rerender } = render(<PopupPin {...defaultProps} popupElement={popupElement} popupPosition="top center" />);

    expect(screen.getByTestId(PopupDataTids.popupPin)).toBeInTheDocument();

    rerender(<PopupPin {...defaultProps} popupElement={popupElement} popupPosition="bottom center" />);

    expect(screen.getByTestId(PopupDataTids.popupPin)).toBeInTheDocument();
  });

  it('keeps pin inside popup for bottom left with viewport clamp offset', () => {
    const popupElement = createPopupElement(320, 396);

    render(<PopupPin {...defaultProps} offset={34} popupElement={popupElement} popupPosition="bottom left" />);

    const pin = screen.getByTestId(PopupDataTids.popupPin);
    expect(pin).toHaveStyle({ left: '33px' });
  });

  it.each([
    ['subpixel width', 43, 100, 45.5, 100, '13.75px'],
    ['narrow desktop popup', 50, 30, 52, 30, '17px'],
  ])(
    'center align uses getBoundingClientRect width for %s',
    (_label, width, height, rectWidth, rectHeight, expectedLeft) => {
      const popupElement = createPopupElement(width, height, rectWidth, rectHeight);

      render(<PopupPin {...defaultProps} popupElement={popupElement} popupPosition="bottom center" />);

      const pin = screen.getByTestId(PopupDataTids.popupPin);
      expect(pin).toHaveStyle({ left: expectedLeft });
    },
  );

  describe('mobile viewport side padding', () => {
    beforeEach(() => {
      vi.spyOn(ResponsiveLayoutHooks, 'useResponsiveLayout').mockReturnValue({ isMobile: true });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('clamps and hides pin at left edge when ideal position overflows', () => {
      const popupElement = createPopupElement(343, 300);

      render(<PopupPin {...defaultProps} offset={-200} popupElement={popupElement} popupPosition="bottom center" />);

      const pin = screen.getByTestId(PopupDataTids.popupPin);
      expect(pin).toHaveStyle({ left: '15px', opacity: '0', visibility: 'hidden' });
    });

    it('clamps and hides pin at right edge when ideal position overflows', () => {
      const popupElement = createPopupElement(200, 100);

      render(<PopupPin {...defaultProps} offset={200} popupElement={popupElement} popupPosition="bottom center" />);

      const pin = screen.getByTestId(PopupDataTids.popupPin);
      expect(pin).toHaveStyle({ left: '167px', opacity: '0', visibility: 'hidden' });
    });

    it('keeps pin visible for moderate offset within edge padding range', () => {
      const popupElement = createPopupElement(200, 100);

      render(<PopupPin {...defaultProps} offset={20} popupElement={popupElement} popupPosition="bottom center" />);

      const pin = screen.getByTestId(PopupDataTids.popupPin);
      expect(pin).toHaveStyle({ left: '111px', opacity: '1' });
    });

    it('keeps bottom left pin visible with positive viewport clamp offset', () => {
      const popupElement = createPopupElement(343, 300);

      render(
        <PopupPin {...defaultProps} offset={70} size={10} popupElement={popupElement} popupPosition="bottom left" />,
      );

      const pin = screen.getByTestId(PopupDataTids.popupPin);
      expect(pin).toHaveStyle({ left: '69px', opacity: '1' });
    });

    it('shows pin again when offset returns within edge padding range', () => {
      const popupElement = createPopupElement(343, 300);

      const { rerender } = render(
        <PopupPin {...defaultProps} offset={-200} popupElement={popupElement} popupPosition="bottom center" />,
      );

      const pin = screen.getByTestId(PopupDataTids.popupPin);
      expect(pin).toHaveStyle({ opacity: '0', visibility: 'hidden' });

      rerender(<PopupPin {...defaultProps} offset={0} popupElement={popupElement} popupPosition="bottom center" />);

      expect(pin).toHaveStyle({ opacity: '1' });
    });

    it('applies position transition on mobile', () => {
      const popupElement = createPopupElement(200, 100);

      render(<PopupPin {...defaultProps} popupElement={popupElement} popupPosition="bottom center" />);

      const pin = screen.getByTestId(PopupDataTids.popupPin);
      expect(window.getComputedStyle(pin).transition).toContain('left');
    });
  });

  it('remeasures pin on layout events', async () => {
    const popupElement = createPopupElement(200, 100);

    render(<PopupPin {...defaultProps} offset={0} popupElement={popupElement} popupPosition="bottom center" />);

    expect(screen.getByTestId(PopupDataTids.popupPin)).toHaveStyle({ left: '91px' });

    Object.defineProperty(popupElement, 'offsetWidth', { configurable: true, value: 100 });
    popupElement.getBoundingClientRect = () =>
      ({
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
      }) as DOMRect;

    await act(async () => {
      LayoutEvents.emit();
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      });
    });

    expect(screen.getByTestId(PopupDataTids.popupPin)).toHaveStyle({ left: '41px' });
  });
});
