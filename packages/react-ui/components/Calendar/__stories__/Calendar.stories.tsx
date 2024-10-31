import React, { useCallback, useContext, useState } from 'react';
import { action } from '@storybook/addon-actions';

import { Calendar, CalendarDay, CalendarDayProps } from '../';
import { Story } from '../../../typings/stories';
import { Gapped } from '../../Gapped';
import { LocaleContext } from '../../../lib/locale';
import { InternalDateOrder, InternalDateSeparator } from '../../../lib/date/types';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { isLessOrEqual, isGreaterOrEqual } from '../../../lib/date/comparison';
import { useMemoObject } from '../../../hooks/useMemoObject';

export default {
  title: 'Calendar',
  component: Calendar,
};

export const CalendarWithBottomSeparator: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');

  return <Calendar value={date} onValueChange={setDate} />;
};

CalendarWithBottomSeparator.storyName = 'Calendar with bottom separator';

export const CalendarWithMinMaxDate: Story = () => {
  const [min, setMin] = React.useState('02.07.2017');
  const [max, setMax] = React.useState('30.01.2020');

  return (
    <Gapped vertical gap={10}>
      <label>
        Начало периода: <input type="text" value={min} placeholder="min" onChange={(e) => setMin(e.target.value)} />
      </label>
      <label>
        Окончание периода: <input type="text" value={max} placeholder="max" onChange={(e) => setMax(e.target.value)} />
      </label>
      <LocaleContext.Provider
        value={{
          locale: { DatePicker: { order: InternalDateOrder.DMY, separator: InternalDateSeparator.Dot } },
        }}
      >
        <Calendar value="02.07.2017" minDate={min} maxDate={max} onValueChange={action('pick')} />
      </LocaleContext.Provider>
    </Gapped>
  );
};
CalendarWithMinMaxDate.storyName = 'Calendar with min max date';

export const ScrollsCalendarOnDateChange: Story = () => {
  const [date, setDate] = useState('01.01.2001');

  return (
    <>
      <button data-tid="change-date-button" onClick={() => setDate('12.12.2012')}>
        set new date
      </button>
      <Calendar value={date} onValueChange={setDate} />
    </>
  );
};
ScrollsCalendarOnDateChange.storyName = 'Scrolls Calendar on date change';

const CustomDay: React.FC<CalendarDayProps> = (props) => {
  const isEven = (num: number): boolean => num % 2 === 0;
  const day = Number(props.date.split('.')[0]);

  return <CalendarDay {...props}>{isEven(day) ? '#' : day}</CalendarDay>;
};

export const CalendarWithCustomDates: Story = () => {
  return <Calendar value={'12.05.2022'} renderDay={(props) => <CustomDay {...props} />} />;
};

CalendarWithCustomDates.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ },
    },
  },
};

export const CalendarWithCustomCellSize: Story = () => {
  return (
    <ThemeContext.Provider
      value={ThemeFactory.create({
        calendarCellHeight: '50px',
        calendarCellWidth: '50px',
      })}
    >
      <Calendar value={'12.05.2022'} />;
    </ThemeContext.Provider>
  );
};

CalendarWithCustomCellSize.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome2022|firefox2022)\b)/ },
    },
  },
};

const CalendarPeriodDay = (props: CalendarDayProps) => {
  const { date } = props;
  const { periodStart, periodEnd, hoveredDate, setPeriodStart, setPeriodEnd, setHoveredDate } =
    useContext(CalendarPeriodContext);

  const isDayInPeriod = ({
    date,
    periodStart,
    periodEnd,
    hoveredDate,
  }: {
    date: string | null;
    periodStart: string | null;
    periodEnd: string | null;
    hoveredDate: string | null;
  }): boolean => {
    return Boolean(
      date &&
        periodStart &&
        isGreaterOrEqual(date, periodStart) &&
        (periodEnd ? isLessOrEqual(date, periodEnd) : hoveredDate && isLessOrEqual(date, hoveredDate)),
    );
  };

  const handleClick = useCallback(() => {
    if (!periodStart) {
      setPeriodStart?.(date);
    } else if (!periodEnd) {
      setPeriodEnd?.(date);
    } else {
      setPeriodStart?.(date);
      setPeriodEnd?.(null);
    }
  }, [setPeriodStart, setPeriodEnd, periodStart, periodEnd, date]);

  const handleMouseEnter = useCallback(() => setHoveredDate?.(date), [setHoveredDate, date]);
  const handleMouseLeave = useCallback(() => setHoveredDate?.(null), [setHoveredDate]);

  const dayInPeriodStyles = useMemoObject({
    background: 'green',
    color: 'white',
  });

  const dayStyles = isDayInPeriod({ date, periodStart, periodEnd, hoveredDate }) ? dayInPeriodStyles : undefined;

  return (
    <CalendarDay
      {...props}
      style={dayStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  );
};

interface CalendarPeriodContext {
  periodStart: string | null;
  periodEnd: string | null;
  hoveredDate: string | null;
  setPeriodStart?: (date: string | null) => void;
  setPeriodEnd?: (date: string | null) => void;
  setHoveredDate?: (date: string | null) => void;
}

const CalendarPeriodContext = React.createContext<CalendarPeriodContext>({
  periodStart: null,
  periodEnd: null,
  hoveredDate: null,
});

export const CalendarWithPeriod = () => {
  const [periodStart, setPeriodStart] = useState<string | null>('10.08.2022');
  const [periodEnd, setPeriodEnd] = useState<string | null>('20.08.2022');
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [value, setValue] = useState('25.08.2022');

  const renderDay = useCallback((props: CalendarDayProps) => <CalendarPeriodDay {...props} />, []);

  return (
    <CalendarPeriodContext.Provider
      value={{ periodStart, periodEnd, hoveredDate, setPeriodStart, setPeriodEnd, setHoveredDate }}
    >
      <Calendar value={value} onValueChange={setValue} renderDay={renderDay} />
    </CalendarPeriodContext.Provider>
  );
};

CalendarWithPeriod.displayName = 'Calendar with period';

CalendarWithPeriod.parameters = {
  creevey: {
    skip: { 'no themes': { in: /^(?!\b(chrome2022)\b)/ } },
  },
};
