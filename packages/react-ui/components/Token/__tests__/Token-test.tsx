import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { THEME_2022 } from '../../../lib/theming/themes/Theme2022';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
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
      const token = screen.getByTestId(TokenDataTids.root);
      expect(token).toHaveAttribute('aria-describedby', 'elementId');
      expect(token).toHaveAccessibleDescription('Description');
    });

    it('has correct value on close button aria-label attribute (ru)', () => {
      const tokenName = 'name';
      render(<Token>{tokenName}</Token>);

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        TokenLocalesRu.removeButtonAriaLabel + ' ' + tokenName,
      );
    });

    it('has correct value on close button aria-label attribute (en)', () => {
      const tokenName = 'name';
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Token>{tokenName}</Token>
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        TokenLocalesEn.removeButtonAriaLabel + ' ' + tokenName,
      );
    });

    it('sets custom value for `closeButtonAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      const tokenName = 'name';
      render(
        <LocaleContext.Provider value={{ locale: { Token: { removeButtonAriaLabel: customAriaLabel } } }}>
          <Token>{tokenName}</Token>
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', customAriaLabel + ' ' + tokenName);
    });

    it('able to capture remove button in focus', () => {
      const tokenName = 'name';
      render(
        <ThemeContext.Provider value={THEME_2022}>
          <Token>{tokenName}</Token>
        </ThemeContext.Provider>,
      );

      userEvent.tab();
      expect(screen.getByRole('button')).toHaveFocus();
    });
  });
});
