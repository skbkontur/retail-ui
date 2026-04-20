import { ComboBox } from '@skbkontur/react-ui/components/ComboBox/ComboBox';
import { DatePicker, DatePickerDataTids } from '@skbkontur/react-ui/components/DatePicker/DatePicker';
import { TooltipDataTids } from '@skbkontur/react-ui/components/Tooltip/Tooltip';
import { ComboBoxMenuDataTids } from '@skbkontur/react-ui/internal/CustomComboBox/index';
import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { ValidationContainer, ValidationWrapper } from '../index.js';
import type { ValidationInfo } from '../index.js';
import type { Nullable } from '../typings/Types.js';

const validate = (): Nullable<ValidationInfo> => {
  return { message: 'Всегда невалидно', type: 'immediate' };
};

const renderValidationContainer = (input: React.ReactElement): React.RefObject<ValidationContainer> => {
  const containerRef = React.createRef<ValidationContainer>();
  render(
    <ValidationContainer ref={containerRef}>
      <ValidationWrapper validationInfo={validate()}>{input}</ValidationWrapper>
    </ValidationContainer>,
  );
  return containerRef;
};

const combobox = <ComboBox getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])} key="ComboBox" />;
const datePicker = <DatePicker onValueChange={() => null} key="DatePicker" />;

describe('ComboboxDropdownBehaviorOnValidationSubmit', () => {
  it('should not open by default', async () => {
    const containerRef = renderValidationContainer(combobox);
    await act(() => containerRef.current?.submit());
    expect(screen.queryByTestId(ComboBoxMenuDataTids.items)).not.toBeInTheDocument();
    expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});

describe('DatePickerDropdownBehaviorOnValidationSubmit', () => {
  it('should not open by default', async () => {
    const containerRef = renderValidationContainer(datePicker);
    await act(() => containerRef.current?.submit());
    expect(screen.queryByTestId(DatePickerDataTids.root)).not.toBeInTheDocument();
    expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    expect(screen.getByTestId(DatePickerDataTids.input)).toHaveFocus();
  });
});
