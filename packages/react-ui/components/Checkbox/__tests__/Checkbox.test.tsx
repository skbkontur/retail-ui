import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../Checkbox';

import { MultipleSelection } from './MultipleSelection';

describe('Checkbox', () => {
  it('should call onBlur after radio click', () => {
    const onBlur = jest.fn();

    render(<Checkbox onBlur={onBlur} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    checkbox.blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should check multiple items', () => {
    render(<MultipleSelection numberOfItems={5} />);

    const firstCheckbox = screen.getByRole('checkbox', { name: '1' });
    const secondCheckbox = screen.getByRole('checkbox', { name: '2' });
    const thirdCheckbox = screen.getByRole('checkbox', { name: '3' });
    const fourthCheckbox = screen.getByRole('checkbox', { name: '4' });
    const lastCheckbox = screen.getByRole('checkbox', { name: '5' });

    userEvent.keyboard('{Shift>}');
    // Select all checkboxes between first and last
    userEvent.click(firstCheckbox);
    userEvent.click(lastCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(secondCheckbox).toBeChecked();
    expect(thirdCheckbox).toBeChecked();
    expect(fourthCheckbox).toBeChecked();
    expect(lastCheckbox).toBeChecked();
  });
});
