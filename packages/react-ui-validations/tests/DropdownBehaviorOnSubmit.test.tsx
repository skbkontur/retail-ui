import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboBox, DatePicker, DatePickerDataTids, TooltipDataTids } from '@skbkontur/react-ui';
import React from 'react';
import { MenuDataTids } from '@skbkontur/react-ui/internal/Menu';

import { Nullable } from '../typings/Types';
import { ValidationContainer, ValidationInfo, ValidationsFeatureFlagsContext, ValidationWrapper } from '../src';

const validate = (): Nullable<ValidationInfo> => {
  return { message: 'Всегда невалидно', type: 'immediate' };
};

const renderValidationContainer = (
  input: React.ReactElement,
  ignoreOpenDropdownFlag: boolean,
): React.RefObject<ValidationContainer> => {
  const containerRef = React.createRef<ValidationContainer>();
  render(
    <ValidationsFeatureFlagsContext.Provider value={{ ignoreOpenDropdownOnSubmitValidation: ignoreOpenDropdownFlag }}>
      <ValidationContainer ref={containerRef}>
        <ValidationWrapper validationInfo={validate()}>{input}</ValidationWrapper>
      </ValidationContainer>
    </ValidationsFeatureFlagsContext.Provider>,
  );
  return containerRef;
};

const combobox = <ComboBox getItems={() => Promise.resolve([{ value: 'one', label: 'one' }])} key="ComboBox" />;
const datePicker = <DatePicker onValueChange={() => null} key="DatePicker" />;

describe('ComboboxDropdownBehaviorOnValidationSubmit', () => {
  it('should open', async () => {
    const containerRef = renderValidationContainer(combobox, false);
    await act(() => containerRef.current?.submit());
    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
    expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('should not open with flag ignoreOpenDropdownOnSubmitValidation', async () => {
    const containerRef = renderValidationContainer(combobox, true);
    await act(() => containerRef.current?.submit());
    expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});

describe('DatePickerDropdownBehaviorOnValidationSubmit', () => {
  it('should open', async () => {
    const containerRef = renderValidationContainer(datePicker, false);
    await act(() => containerRef.current?.submit());
    expect(screen.getByTestId(DatePickerDataTids.root)).toBeInTheDocument();
    expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    expect(screen.getByTestId(DatePickerDataTids.input)).toHaveFocus();
  });

  it('should not open with flag ignoreOpenDropdownOnSubmitValidation', async () => {
    const containerRef = renderValidationContainer(datePicker, true);
    await act(() => containerRef.current?.submit());
    expect(screen.queryByTestId(DatePickerDataTids.root)).not.toBeInTheDocument();
    expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    expect(screen.getByTestId(DatePickerDataTids.input)).toHaveFocus();
  });
});
