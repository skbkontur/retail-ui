import React, { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('should have label', () => {
    render(<Checkbox>label</Checkbox>);

    expect(screen.getByLabelText('label')).toBeInTheDocument();
  });

  it('should check and uncheck', () => {
    render(<Checkbox>label</Checkbox>);

    const checkbox = screen.getByLabelText('label');
    // Initially checkbox shouldn't be checked.
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    // After we click on it, it should become checked.
    expect(checkbox).toBeChecked();
  });

  it('should not check if disabled', () => {
    render(<Checkbox disabled>label</Checkbox>);

    const checkbox = screen.getByLabelText('label');
    // Initially disabled checkbox shouldn't be checked.
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);
    // After we click on it, it still should be unchecked.
    expect(checkbox).not.toBeChecked();
  });

  it('should be in indeterminate state by default', () => {
    render(<Checkbox initialIndeterminate>label</Checkbox>);

    const checkbox = screen.getByLabelText('label');

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
    render(<Component />);

    const checkbox = screen.getByLabelText('label');
    const setButton = screen.getByText('set');
    const resetButton = screen.getByText('reset');

    // Initially checkbox should be partially checked.
    expect(checkbox).not.toBePartiallyChecked();

    userEvent.click(setButton);
    // After we call `setIndeterminate` method it should be partially checked.
    expect(checkbox).toBePartiallyChecked();

    userEvent.click(resetButton);
    // After we call `resetIndeterminate` method it should return in intial state.
    expect(checkbox).not.toBePartiallyChecked();
  });
});
