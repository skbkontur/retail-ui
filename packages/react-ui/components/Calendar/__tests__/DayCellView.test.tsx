import React from 'react';
import { render, screen } from '@testing-library/react';
import { PointerEventsCheckLevel, userEvent } from '@testing-library/user-event';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { Calendar, CalendarProps, CalendarDataTids } from '../Calendar';
import { CalendarDay } from '../CalendarDay';
import { componentsLocales as DayCellViewLocalesRu } from '../locale/locales/ru';
import { componentsLocales as DayCellViewLocalesEn } from '../locale/locales/en';
import { InternalDate } from '../../../lib/date/InternalDate';
import { CalendarLocaleHelper } from '../locale';

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

  it('should not call onClick when disabled', async () => {
    const initialDate = '03.11.2021';
    const minDate = '02.11.2021';
    const maxDate = '05.11.2021';
    const expectedDate = '06.11.2021';
    const onValueChange = jest.fn();

    render(<Calendar value={initialDate} minDate={minDate} maxDate={maxDate} onValueChange={onValueChange} />);

    const outOfRangeDay = screen.getByRole('button', {
      name: `${CalendarLocaleHelper.get(LangCodes.ru_RU).dayCellChooseDateAriaLabel}: ${new InternalDate({
        langCode: LangCodes.ru_RU,
        value: expectedDate,
      }).toA11YFormat()}`,
    });

    await userEvent.click(outOfRangeDay, {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('should not loose users click handler', async () => {
    const initialDate = '03.11.2021';
    const expectedDate = '06.11.2021';
    const onValueChange = jest.fn();
    const customDayOnClick = jest.fn();
    const renderDay: CalendarProps['renderDay'] = (props) => <CalendarDay {...props} onClick={customDayOnClick} />;

    render(<Calendar value={initialDate} renderDay={renderDay} onValueChange={onValueChange} />);

    const dayToClickOn = screen.getByRole('button', {
      name: `${CalendarLocaleHelper.get(LangCodes.ru_RU).dayCellChooseDateAriaLabel}: ${new InternalDate({
        langCode: LangCodes.ru_RU,
        value: expectedDate,
      }).toA11YFormat()}`,
    });

    await userEvent.click(dayToClickOn, {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    expect(onValueChange).toHaveBeenCalled();
    expect(customDayOnClick).toHaveBeenCalled();
  });
});
