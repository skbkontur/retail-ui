import React from 'react';
import type { Story } from '@storybook/react';

import type { Meta } from '../../../typings/stories';
import { DateRangePicker } from '../DateRangePicker';
import { Tooltip } from '../../Tooltip';
import { Gapped } from '../../Gapped';
import { Group } from '../../Group';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import type { ThemeIn } from '../../../lib/theming/Theme';
import { ThemeFactory } from '../../../lib/theming/ThemeFactory';

export default {
  title: 'DateRangePicker',
  decorators: [
    (Story, { parameters }) => {
      switch (parameters.customSpacing) {
        case 'top':
          return (
            <div style={{ paddingTop: 500 }}>
              <Story />
            </div>
          );

        case 'bottom':
          return (
            <div style={{ paddingBottom: 500 }}>
              <Story />
            </div>
          );

        case 'all':
          return (
            <div style={{ padding: 500 }}>
              <Story />
            </div>
          );
        default:
          return <Story />;
      }
    },
  ],
} as Meta;

export const Default = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
    </DateRangePicker>
  );
};
Default.parameters = { creevey: { skip: true }, customSpacing: 'bottom' };

export const MobilePicker: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} />
    </DateRangePicker>
  );
};
MobilePicker.parameters = { viewport: { defaultViewport: 'iphone' } };

export const Sizes: Story = () => {
  const [valueStartS, setValueStartS] = React.useState('');
  const [valueEndS, setValueEndS] = React.useState('');

  const [valueStartM, setValueStartM] = React.useState('');
  const [valueEndM, setValueEndM] = React.useState('');

  const [valueStartL, setValueStartL] = React.useState('');
  const [valueEndL, setValueEndL] = React.useState('');

  const theme = React.useContext(ThemeContext);
  const createTheme = (tokens: ThemeIn) => ThemeFactory.create(tokens, theme);

  return (
    <Gapped vertical gap={16}>
      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '44px', calendarCellHeight: '44px' })}>
        <DateRangePicker>
          <DateRangePicker.Start value={valueStartL} size="large" onValueChange={setValueStartL} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEndL} size="large" onValueChange={setValueEndL} />
        </DateRangePicker>
      </ThemeContext.Provider>

      <ThemeContext.Provider value={createTheme({ calendarCellWidth: '36px', calendarCellHeight: '36px' })}>
        <DateRangePicker>
          <DateRangePicker.Start value={valueStartM} size="medium" onValueChange={setValueStartM} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEndM} size="medium" onValueChange={setValueEndM} />
        </DateRangePicker>
      </ThemeContext.Provider>

      <DateRangePicker>
        <DateRangePicker.Start value={valueStartS} onValueChange={setValueStartS} size="small" />
        <DateRangePicker.Separator />
        <DateRangePicker.End value={valueEndS} onValueChange={setValueEndS} size="small" />
      </DateRangePicker>
    </Gapped>
  );
};
Sizes.parameters = {};

export const MinMax: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} />
    </DateRangePicker>
  );
};
MinMax.parameters = { customSpacing: 'bottom' };

export const Autofocus: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} autoFocus />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
    </DateRangePicker>
  );
};
Autofocus.parameters = { creevey: { skip: true } };

export const MenuPos: Story = () => {
  const [valueStartTop, setValueStartTop] = React.useState('');
  const [valueEndTop, setValueEndTop] = React.useState('');

  const [valueStartBottom, setValueStartBottom] = React.useState('');
  const [valueEndBottom, setValueEndBottom] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <Gapped vertical gap={16} style={{ margin: 120 }}>
      <div data-tid="position-top">
        <DateRangePicker menuPos="top">
          <DateRangePicker.Start value={valueStartTop} onValueChange={setValueStartTop} minDate={minDate} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEndTop} onValueChange={setValueEndTop} maxDate={maxDate} />
        </DateRangePicker>
      </div>

      <div data-tid="position-bottom">
        <DateRangePicker menuPos="bottom">
          <DateRangePicker.Start value={valueStartBottom} onValueChange={setValueStartBottom} minDate={minDate} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEndBottom} onValueChange={setValueEndBottom} maxDate={maxDate} />
        </DateRangePicker>
      </div>
    </Gapped>
  );
};
MenuPos.parameters = { customSpacing: 'all' };

export const DateRangePickerLocaleProvider = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <div style={{ paddingTop: 200 }}>
      <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
        <DateRangePicker>
          <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} />
          <DateRangePicker.Separator />
          <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} />
        </DateRangePicker>
      </LocaleContext.Provider>
    </div>
  );
};
DateRangePickerLocaleProvider.parameters = { creevey: { skip: true } };

export const Disabled: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} disabled />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} disabled />
    </DateRangePicker>
  );
};
Disabled.parameters = {};

export const TodayButton: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker enableTodayLink>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} />
    </DateRangePicker>
  );
};
TodayButton.parameters = { creevey: { skip: true }, customSpacing: 'bottom' };

export const OptionalRange: Story = () => {
  const [valueStartOptionalHalf, setValueStartOptionalHalf] = React.useState('');
  const [valueEndOptionalHalf, setValueEndOptionalHalf] = React.useState('');

  const [valueStartOptional, setValueStartOptional] = React.useState('');
  const [valueEndOptional, setValueEndOptional] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <Gapped vertical gap={16}>
      <DateRangePicker>
        <DateRangePicker.Start
          value={valueStartOptionalHalf}
          onValueChange={setValueStartOptionalHalf}
          minDate={minDate}
          optional
        />
        <DateRangePicker.Separator />
        <DateRangePicker.End
          value={valueEndOptionalHalf}
          onValueChange={setValueEndOptionalHalf}
          maxDate={maxDate}
          optional
        />
      </DateRangePicker>

      <DateRangePicker>
        <DateRangePicker.Start
          value={valueStartOptional}
          onValueChange={setValueStartOptional}
          minDate={minDate}
          optional
        />
        <DateRangePicker.Separator />
        <DateRangePicker.End value={valueEndOptional} onValueChange={setValueEndOptional} maxDate={maxDate} optional />
      </DateRangePicker>
    </Gapped>
  );
};
OptionalRange.parameters = { customSpacing: 'bottom' };

export const OptionalRangeWithTodayButton: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  const minDate = '08.07.2024';
  const maxDate = '18.08.2024';

  return (
    <DateRangePicker enableTodayLink>
      <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} minDate={minDate} optional />
      <DateRangePicker.Separator />
      <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} maxDate={maxDate} optional />
    </DateRangePicker>
  );
};
OptionalRangeWithTodayButton.parameters = { customSpacing: 'bottom' };

export const CustomChildrenWithoutDash: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <Group>
        <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
        <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
      </Group>
    </DateRangePicker>
  );
};
CustomChildrenWithoutDash.parameters = {};

export const CustomChildrenVertical: Story = () => {
  const [valueStart, setValueStart] = React.useState('');
  const [valueEnd, setValueEnd] = React.useState('');

  return (
    <DateRangePicker>
      <Gapped gap={4} vertical>
        <DateRangePicker.Start value={valueStart} onValueChange={setValueStart} />
        <DateRangePicker.End value={valueEnd} onValueChange={setValueEnd} />
      </Gapped>
    </DateRangePicker>
  );
};
CustomChildrenVertical.parameters = {};

export const Validations: Story = () => {
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
Validations.parameters = { creevey: { skip: true } };
