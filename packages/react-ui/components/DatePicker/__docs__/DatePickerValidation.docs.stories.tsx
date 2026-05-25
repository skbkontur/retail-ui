import { DatePicker, Gapped, Tooltip } from '@skbkontur/react-ui';
import { ViewDateInputValidateChecks } from '@skbkontur/react-ui/components/DateInput/ViewDateInputValidateChecks';
import React from 'react';

import type { Meta, Story } from '../../../typings/stories.js';

const meta: Meta = {
  title: 'Date Components/DatePicker',
  component: DatePicker,
  parameters: { creevey: { skip: true } },
};

export default meta;

export const ExampleValidation: Story = () => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [tooltip, setTooltip] = React.useState(false);

  const minDate = '22.12.2012';
  const maxDate = '02.05.2018';

  const unvalidate = () => {
    setError(false);
    setTooltip(false);
  };

  const validate = () => {
    const errorNew = !!value && !DatePicker.validate(value, { minDate, maxDate });
    setError(errorNew);
    setTooltip(errorNew);
  };

  const removeTooltip = () => setTooltip(false);

  return (
    <Gapped gap={10} vertical>
      <ViewDateInputValidateChecks value={value} minDate={minDate} maxDate={maxDate} />
      <pre>
        minDate = {minDate}
        <br />
        maxDate = {maxDate}
      </pre>

      <Tooltip trigger={tooltip ? 'opened' : 'closed'} render={() => 'Невалидная дата'} onCloseClick={removeTooltip}>
        <DatePicker
          error={error}
          value={value}
          onValueChange={setValue}
          onFocus={unvalidate}
          onBlur={validate}
          minDate={minDate}
          maxDate={maxDate}
          enableTodayLink
        />
      </Tooltip>
    </Gapped>
  );
};
