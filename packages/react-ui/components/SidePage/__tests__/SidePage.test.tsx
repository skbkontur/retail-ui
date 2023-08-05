import React from 'react';
import { render, screen } from '@testing-library/react';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SidePage, SidePageDataTids } from '../SidePage';
import { SidePageHeaderDataTids } from '../SidePageHeader';

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

    it('has correct value on close button aria-label attribute (ru)', () => {
      render(
        <SidePage>
          <SidePage.Header />
        </SidePage>,
      );

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute('aria-label', 'Закрыть модальное окно');
    });

    it('has correct value on close button aria-label attribute (en)', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <SidePage>
            <SidePage.Header />
          </SidePage>
        </LocaleContext.Provider>,
      );

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute('aria-label', 'Close modal window');
    });
  });
});
