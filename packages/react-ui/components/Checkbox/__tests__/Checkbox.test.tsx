import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('should call onBlur after radio click', () => {
    const onBlur = jest.fn();

    render(<Checkbox onBlur={onBlur} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    checkbox.blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('focus method works', () => {
    const checkboxRef = React.createRef<Checkbox>();

    render(<Checkbox ref={checkboxRef} />);
    const checkbox = screen.getByRole('checkbox');

    checkbox.focus();
    expect(checkbox).toHaveFocus();
  });

  it('blur method works', () => {
    const checkboxRef = React.createRef<Checkbox>();

    render(<Checkbox ref={checkboxRef} />);
    const checkbox = screen.getByRole('checkbox');

    checkbox.focus();
    expect(checkbox).toHaveFocus();
    checkboxRef.current?.blur();
    expect(checkbox).not.toHaveFocus();
  });
});
