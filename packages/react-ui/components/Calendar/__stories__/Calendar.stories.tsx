import React, { useCallback, useContext, useState } from 'react';

import { Calendar, CalendarDay, CalendarDayProps } from '../';
import { Story } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';
import { isLessOrEqual, isGreaterOrEqual } from '../../../lib/date/comparison';
import { useMemoObject } from '../../../hooks/useMemoObject';

export default { title: 'Calendar' };

export const CalendarWithBottomSeparator: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');

  return <Calendar value={date} onValueChange={setDate} />;
};

CalendarWithBottomSeparator.storyName = 'Calendar with bottom separator';
CalendarWithBottomSeparator.parameters = {
  creevey: {
    skip: {
      "8px and 2022 themes don't affect the bottom separator": {
        in: /^(?!\b(chrome|chromeDark|firefox|firefoxDark)\b)/,
      },
    },
  },
};

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
      'no themes': { in: /^(?!\b(chrome|firefox)\b)/ },
    },
  },
};

export const CalendarWithCustomCellSize: Story = () => {
  return (
    <ThemeContext.Provider
      value={ThemeFactory.create({
        calendarCellSize: '50px',
      })}
    >
      <Calendar value={'12.05.2022'} />;
    </ThemeContext.Provider>
  );
};

CalendarWithCustomCellSize.parameters = {
  creevey: {
    skip: {
      'no themes': { in: /^(?!\b(chrome|firefox)\b)/ },
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

CalendarWithPeriod.parameters = {
  creevey: {
    skip: { 'no themes': { in: /^(?!\b(chrome)\b)/ } },
  },
};
