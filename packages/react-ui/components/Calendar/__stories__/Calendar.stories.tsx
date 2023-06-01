import React from 'react';

import { Calendar } from '../Calendar';
import { Story } from '../../../typings/stories';

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
