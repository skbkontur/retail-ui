import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SidePage, SidePageDataTids } from '../SidePage';
import { SidePageHeaderDataTids } from '../SidePageHeader';
import { componentsLocales as SidePageLocalesEn } from '../locale/locales/en';
import { componentsLocales as SidePageLocalesRu } from '../locale/locales/ru';

describe('SidePage', () => {
  it('onClose event performs an action on click', async () => {
    const onClose = jest.fn();
    render(
      <SidePage onClose={onClose}>
        <SidePage.Header>Title</SidePage.Header>
      </SidePage>,
    );

    const closeButton = screen.getByTestId(SidePageHeaderDataTids.close);

    expect(onClose).not.toHaveBeenCalled();

    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

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

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute(
        'aria-label',
        SidePageLocalesRu.closeButtonAriaLabel,
      );
    });

    it('has correct value on close button aria-label attribute (en)', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <SidePage>
            <SidePage.Header />
          </SidePage>
        </LocaleContext.Provider>,
      );

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute(
        'aria-label',
        SidePageLocalesEn.closeButtonAriaLabel,
      );
    });

    it('sets custom value for `closeButtonAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { SidePage: { closeButtonAriaLabel: customAriaLabel } } }}>
          <SidePage>
            <SidePage.Header />
          </SidePage>
        </LocaleContext.Provider>,
      );

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute('aria-label', customAriaLabel);
    });
  });
});
