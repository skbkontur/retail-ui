import React from 'react';
import MagicWand from '@skbkontur/react-icons/MagicWand';

import { CalendarDateShape } from '../CalendarDateShape';
import { Calendar } from '../Calendar';
import { Story } from '../../../typings/stories';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default { title: 'Calendar' };

export const CalendarWithBottomSeparator: Story = () => {
  const [date, setDate] = React.useState('12.05.2022');

  return <Calendar value={date} onValueChange={setDate} />;
};
CalendarWithBottomSeparator.storyName = 'Calendar with bottom separator';
CalendarWithBottomSeparator.parameters = {
  creevey: {
    skip: {
      reason: "8px and 2022 themes don't affect the bottom separator",
      in: /^(?!\b(chrome|chromeDark|firefox|firefoxDark)\b)/,
    },
  },
};

const CustomDayItem: React.FC<{ date: CalendarDateShape }> = ({ date }) => {
  const isEven = (num: number): boolean => num % 2 === 0;

  return <div>{isEven(date.date) ? <MagicWand /> : date.date}</div>;
};

export const CalendarWithCustomDates: Story = () => {
  return <Calendar value={'12.05.2022'} renderDay={(date) => <CustomDayItem date={date} />} />;
};

CalendarWithCustomDates.parameters = {
  creevey: {
    skip: { in: /^(?!\b(chrome|firefox)\b)/ },
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

CalendarWithCustomDates.parameters = {
  creevey: {
    skip: { in: /^(?!\b(chrome|firefox)\b)/ },
  },
};
