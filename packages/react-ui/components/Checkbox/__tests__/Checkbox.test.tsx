import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('has label', () => {
    const { getByLabelText } = render(<Checkbox>label</Checkbox>);

    getByLabelText('label');
  });

  it('should check and uncheck', () => {
    const { getByLabelText } = render(<Checkbox>label</Checkbox>);

    const checkbox = getByLabelText('label');

    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('should not check if disabled', () => {
    const { getByLabelText } = render(<Checkbox disabled>label</Checkbox>);

    const checkbox = getByLabelText('label');

    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('should be in indeterminate state by default', () => {
    const { getByLabelText } = render(<Checkbox initialIndeterminate>label</Checkbox>);

    const checkbox = getByLabelText('label');

    expect(checkbox).toBePartiallyChecked();
  });

  it('should set and reset indeterminate state', () => {
    const Component = () => {
      const checkboxRef = useRef<Checkbox>(null);

      return (
        <>
          <Checkbox ref={checkboxRef}>label</Checkbox>
          <button
            onClick={() => {
              if (checkboxRef.current) {
                checkboxRef.current.setIndeterminate();
              }
            }}
          >
            set
          </button>
          <button
            onClick={() => {
              if (checkboxRef.current) {
                checkboxRef.current.resetIndeterminate();
              }
            }}
          >
            reset
          </button>
        </>
      );
    };
    const { getByLabelText, getByText } = render(<Component />);

    const checkbox = getByLabelText('label');
    const setButton = getByText('set');
    const resetButton = getByText('reset');

    expect(checkbox).not.toBePartiallyChecked();

    userEvent.click(setButton);

    expect(checkbox).toBePartiallyChecked();

    userEvent.click(resetButton);

    expect(checkbox).not.toBePartiallyChecked();
  });
});
