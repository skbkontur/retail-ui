import { DateRangePicker, Tooltip } from '@skbkontur/react-ui';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Date Components/DateRangePicker',
  component: DateRangePicker,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleValidations: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');
  const [errorStart, setErrorStart] = React.useState(false);
  const [errorEnd, setErrorEnd] = React.useState(false);

  const minDate = '10.10.2018';
  const maxDate = '13.11.2024';

  const validate = () => {
    if (!valueStart || !valueEnd) {
      return;
    }
    const [isStartValid, isEndValid] = DateRangePicker.validate(valueStart, valueEnd, { minDate, maxDate });
    setErrorStart(!isStartValid);
    setErrorEnd(!isEndValid);
  };

  const unvalidate = () => {
    setErrorStart(false);
    setErrorEnd(false);
  };

  const tooltipProps = {
    render: () => (
      <>
        Укажите даты в промежутке
        <br />
        {minDate}—{maxDate}
        <br />в формате ДД.ММ.ГГГГ
      </>
    ),
    pos: 'top left',
    closeButton: false,
  };

  return (
    <DateRangePicker>
      <Tooltip trigger={errorStart && !errorEnd ? 'opened' : 'closed'} {...tooltipProps}>
        <DateRangePicker.Start
          value={valueStart}
          minDate={minDate}
          error={errorStart}
          onValueChange={setValueStart}
          onFocus={unvalidate}
          onBlur={validate}
        />
      </Tooltip>
      <DateRangePicker.Separator />
      <Tooltip trigger={errorEnd ? 'opened' : 'closed'} {...tooltipProps}>
        <DateRangePicker.End
          value={valueEnd}
          maxDate={maxDate}
          error={errorEnd}
          onValueChange={setValueEnd}
          onFocus={unvalidate}
          onBlur={validate}
        />
      </Tooltip>
    </DateRangePicker>
  );
};
ExampleValidations.storyName = 'Валидации';
