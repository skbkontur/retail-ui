import React from 'react';
import { render, screen } from '@testing-library/react';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { Token, TokenDataTids } from '../Token';
import { componentsLocales as TokenLocalesRu } from '../locale/locales/ru';
import { componentsLocales as TokenLocalesEn } from '../locale/locales/en';

describe('Token', () => {
  it('handles onRemove event', () => {
    const onRemove = jest.fn();

    render(
      <div>
        <Token onRemove={onRemove} />
      </div>,
    );
    const removeIcon = screen.getByTestId(TokenDataTids.removeIcon);
    removeIcon.click();
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('dont call onRemove event if token disabled', () => {
    const onRemove = jest.fn();

    render(
      <div>
        <Token onRemove={onRemove} disabled />
      </div>,
    );
    const removeIcon = screen.getByTestId(TokenDataTids.removeIcon);
    removeIcon.click();
    expect(onRemove).not.toHaveBeenCalled();
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Token aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const token = screen.getByTestId(TokenDataTids.view);
      expect(token).toHaveAttribute('aria-describedby', 'elementId');
      expect(token).toHaveAccessibleDescription('Description');
    });

    it('has correct value on close button aria-label attribute (ru)', () => {
      render(<Token />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', TokenLocalesRu.removeButtonAriaLabel);
    });

    it('has correct value on close button aria-label attribute (en)', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Token />
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', TokenLocalesEn.removeButtonAriaLabel);
    });

    it('sets custom value for `closeButtonAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { Token: { removeButtonAriaLabel: customAriaLabel } } }}>
          <Token />
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', customAriaLabel);
    });
  });
});
