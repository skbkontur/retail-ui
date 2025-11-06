import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('should call onBlur after radio click', () => {
    const onBlur = vi.fn();

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
    expect(checkbox).not.toHaveFocus();

    checkboxRef.current?.focus();
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

  it('setIndeterminate method works', () => {
    const checkboxRef = React.createRef<Checkbox>();

    render(<Checkbox ref={checkboxRef} />);
    const checkbox = screen.getByRole('checkbox');

    checkboxRef.current?.setIndeterminate();
    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('resetIndeterminate method works', () => {
    const checkboxRef = React.createRef<Checkbox>();

    render(<Checkbox ref={checkboxRef} />);
    const checkbox = screen.getByRole('checkbox');

    checkboxRef.current?.setIndeterminate();
    expect(checkbox).toHaveProperty('indeterminate', true);

    checkboxRef.current?.resetIndeterminate();
    expect(checkbox).toHaveProperty('indeterminate', false);
  });

  it('renders with giver caption', () => {
    render(<Checkbox>test</Checkbox>);

    expect(screen.getByTestId('Checkbox__root')).toHaveTextContent('test');
  });

  it('handels onFocus event', async () => {
    const onFocus = vi.fn();
    render(<Checkbox onFocus={onFocus} />);

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handels onBlur event', async () => {
    const onBlur = vi.fn();
    render(<Checkbox onBlur={onBlur} />);

    await userEvent.click(screen.getByRole('checkbox'));
    screen.getByRole('checkbox').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseEnter event', () => {
    const onMouseEnter = vi.fn();
    render(<Checkbox onMouseEnter={onMouseEnter} />);
    fireEvent.mouseEnter(screen.getByRole('checkbox'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseLeave event', () => {
    const onMouseLeave = vi.fn();
    render(<Checkbox onMouseLeave={onMouseLeave} />);
    fireEvent.mouseLeave(screen.getByRole('checkbox'));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('handels onValueChange event', async () => {
    const onValueChange = vi.fn();
    render(<Checkbox onChange={onValueChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('handels onClick event', async () => {
    const onClick = vi.fn();
    render(<Checkbox onClick={onClick} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('click to checkbox children sets state to checkbox', async () => {
    render(<Checkbox>Обычный чекбокс</Checkbox>);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    await userEvent.click(screen.getByText('Обычный чекбокс'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('focuses by tab', async () => {
    render(<Checkbox />);
    await userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
  });

  it('uncheck checked checkbox', async () => {
    const checkboxRef = React.createRef<Checkbox>();

    render(<Checkbox ref={checkboxRef} />);
    const checkbox = screen.getByRole('checkbox');

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Checkbox aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-describedby', 'elementId');
      expect(checkbox).toHaveAccessibleDescription('Description');
    });

    it('passes aria-label to input', () => {
      const ariaLabel = 'ariaLabel';
      render(<Checkbox aria-label={ariaLabel} />);

      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
