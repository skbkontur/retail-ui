import React from 'react';
import { render, screen } from '@testing-library/react';

import { SidePage, SidePageDataTids } from '../SidePage';

describe('SidePage', () => {
  describe('a11y', () => {
    it('should have `aria-modal` attribute set to `true`', () => {
      render(<SidePage />);

      expect(screen.getByTestId(SidePageDataTids.root)).toHaveAttribute('aria-modal', 'true');
    });

    it('should change role to `alertdialog`', () => {
      render(<SidePage role="alertdialog" />);

      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('passes correct value to `aria-label` attribute', () => {
      const label = 'label';
      render(<SidePage aria-label={label} />);

      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });
});
