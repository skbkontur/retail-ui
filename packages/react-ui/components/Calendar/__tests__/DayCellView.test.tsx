import React from 'react';
import { render, screen } from '@testing-library/react';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { Calendar, CalendarDataTids } from '../Calendar';
import { componentsLocales as DayCellViewLocalesRu } from '../locale/locales/ru';
import { componentsLocales as DayCellViewLocalesEn } from '../locale/locales/en';

describe('DayCellView', () => {
  describe('a11y', () => {
    it('has correct aria-label (ru)', () => {
      const date = '1.2.2021';
      render(<Calendar value={date} onValueChange={jest.fn()} />);

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute(
        'aria-label',
        `${DayCellViewLocalesRu.dayCellChooseDateAriaLabel} ${date}`,
      );
    });

    it('has correct aria-label (en)', () => {
      const date = '1.2.2021';
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Calendar value={date} onValueChange={jest.fn()} />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute(
        'aria-label',
        `${DayCellViewLocalesEn.dayCellChooseDateAriaLabel} ${date}`,
      );
    });

    it('sets custom value for `dayCellChooseDateAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      const date = '1.2.2021';
      render(
        <LocaleContext.Provider value={{ locale: { Calendar: { dayCellChooseDateAriaLabel: customAriaLabel } } }}>
          <Calendar value={date} />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(CalendarDataTids.dayCell)[0]).toHaveAttribute(
        'aria-label',
        `${customAriaLabel} ${date}`,
      );
    });
  });
});
