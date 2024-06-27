import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FxInput, FxInputDataTids } from '../FxInput';

describe('FxInput', () => {
  it('render without crash', () => {
    const onValueChange = jest.fn();
    render(<FxInput onValueChange={onValueChange} />);
    expect(screen.getByTestId(FxInputDataTids.root)).toBeInTheDocument();
  });

  it('programmatically set focus and blur', () => {
    const onValueChange = jest.fn();
    const refFxInput = React.createRef<FxInput>();
    render(<FxInput onValueChange={onValueChange} ref={refFxInput} />);
    const input = screen.getByRole('textbox');

    refFxInput.current?.focus();
    expect(input).toHaveFocus();

    refFxInput.current?.blur();
    expect(input).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });

  it.each(['', undefined])('should clear the value when %s passed', async (testValue) => {
    const Comp = () => {
      const [value, setValue] = useState<string | undefined>('12345');

      return (
        <>
          <FxInput value={value} onValueChange={setValue} />
          <button onClick={() => setValue(testValue)}>Clear</button>
        </>
      );
    };

    render(<Comp />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12345');

    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(input).toHaveValue('');

    await userEvent.type(input, '123');
    expect(input).toHaveValue('123');
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute (input)', () => {
      const ariaLabel = 'aria-label';
      render(<FxInput onValueChange={jest.fn()} aria-label={ariaLabel} />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('sets value for aria-label attribute (button)', () => {
      const ariaLabel = 'aria-label';
      render(<FxInput onValueChange={jest.fn()} buttonAriaLabel={ariaLabel} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
