import { screen } from '@testing-library/react';
import { expect } from 'vitest';

export function getMaskedInputParts() {
  const overlay = screen.queryByTestId('masked-input-overlay');

  return {
    overlay,
    typed: overlay && overlay.firstChild,
    mask: overlay && overlay.lastChild,
  };
}

export function expectMask(expectedValue: string | null) {
  const { overlay, mask } = getMaskedInputParts();

  if (expectedValue === null) {
    return expect(overlay).not.toBeInTheDocument();
  }

  expect(mask).toHaveTextContent(expectedValue);
}
