import React from 'react';
import { render, screen } from '@testing-library/react';

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
});
