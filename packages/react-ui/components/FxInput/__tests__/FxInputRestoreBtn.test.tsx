import { render, screen } from '@testing-library/react';
import React from 'react';

import { FxInputRestoreBtn } from '../FxInputRestoreBtn.js';

describe('FxInputRestoreBtn', () => {
  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<FxInputRestoreBtn aria-label={ariaLabel} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
