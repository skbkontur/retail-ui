import React from 'react';
import { render, screen } from '@testing-library/react';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { Calendar, CalendarDataTids } from '../Calendar';
import { componentsLocales as DayCellViewLocalesRu } from '../locale/locales/ru';
import { componentsLocales as DayCellViewLocalesEn } from '../locale/locales/en';
import { InternalDate } from '../../../lib/date/InternalDate';

describe('DayCellView', () => {
  describe('a11y', () => {
    it('has correct aria-label (ru)', () => {
      const date = '1.2.2021';
      render(<Calendar value={date} onValueChange={jest.fn()} />);

      const ariaLabel = `${DayCellViewLocalesRu.dayCellChooseDateAriaLabel}: ${new InternalDate({
        value: date,
      }).toA11YFormat()}`;

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute('aria-label', ariaLabel);
    });

    it('has correct aria-label (en)', () => {
      const date = '1.2.2021';
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Calendar value={date} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      const ariaLabel = `${DayCellViewLocalesEn.dayCellChooseDateAriaLabel}: ${new InternalDate({
        langCode: LangCodes.en_GB,
        value: date,
      }).toA11YFormat()}`;

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute('aria-label', ariaLabel);
    });

    it('sets custom value for `dayCellChooseDateAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      const date = '1.2.2021';
      render(
        <LocaleContext.Provider value={{ locale: { Calendar: { dayCellChooseDateAriaLabel: customAriaLabel } } }}>
          <Calendar value={date} />
        </LocaleContext.Provider>,
      );
      const ariaLabel = `${customAriaLabel}: ${new InternalDate({
        value: date,
      }).toA11YFormat()}`;

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
