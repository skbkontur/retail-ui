import React, { useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { DateRangePicker } from '@skbkontur/react-ui/components/DateRangePicker';

import { ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';

export default {
  title: 'DateRangePicker',
} as Meta;

export const Example1 = () => {
  const refContainer = useRef<ValidationContainer>(null);
  const [valueStart, setValueStart] = useState('');
  const [valueEnd, setValueEnd] = useState('');
  const minDate = '11.01.2025';
  const maxDate = '23.01.2025';

  const validate = () => {
    const message = (
      <>
        Укажите даты в промежутке
        <br />
        {minDate}—{maxDate}
        <br />в формате ДД.ММ.ГГГГ
      </>
    );
    const validationInfoSubmit: ValidationInfo = { message, type: 'submit' };
    const validationInfoFocus: ValidationInfo = { message, type: 'lostfocus' };

    if ((valueStart && !valueEnd) || (!valueStart && valueEnd)) {
      return {
        start: validationInfoSubmit,
        end: validationInfoSubmit,
      };
    }

    const [isStartValid, isEndValid] = DateRangePicker.validate(valueStart, valueEnd, { minDate, maxDate });
    return {
      start: !isStartValid ? validationInfoFocus : null,
      end: !isEndValid ? validationInfoFocus : null,
    };
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 20,
        padding: '20px 200px 440px 20px',
      }}
    >
      <ValidationContainer ref={refContainer}>
        <DateRangePicker>
          <ValidationWrapper validationInfo={validate().start}>
            <DateRangePicker.Start
              value={valueStart}
              minDate="01.01.2025"
              maxDate="31.01.2025"
              onValueChange={setValueStart}
            />
          </ValidationWrapper>
          <DateRangePicker.Separator />
          <ValidationWrapper validationInfo={validate().end}>
            <DateRangePicker.End
              value={valueEnd}
              minDate="01.01.2025"
              maxDate="31.01.2025"
              onValueChange={setValueEnd}
            />
          </ValidationWrapper>
        </DateRangePicker>
      </ValidationContainer>

      <Button data-tid="submit-button" onClick={() => refContainer.current?.validate()}>
        Submit
      </Button>
    </div>
  );
};
