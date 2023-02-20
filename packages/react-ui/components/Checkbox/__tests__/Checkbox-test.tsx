import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('handels onFocus event', () => {
    const onFocus = jest.fn();
    render(<Checkbox onFocus={onFocus} />);

    userEvent.click(screen.getByRole('checkbox'));

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handels onBlur event', () => {
    const onBlur = jest.fn();
    render(<Checkbox onBlur={onBlur} />);

    userEvent.click(screen.getByRole('checkbox'));
    screen.getByRole('checkbox').blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseEnter event', () => {
    const onMouseEnter = jest.fn();
    render(<Checkbox onMouseEnter={onMouseEnter} />);
    fireEvent.mouseEnter(screen.getByRole('checkbox'));
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handels onMouseLeave event', () => {
    const onMouseLeave = jest.fn();
    render(<Checkbox onMouseLeave={onMouseLeave} />);
    fireEvent.mouseLeave(screen.getByRole('checkbox'));
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('handels onValueChange event', () => {
    const onValueChange = jest.fn();
    render(<Checkbox onChange={onValueChange} />);
    userEvent.click(screen.getByRole('checkbox'));
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('handels onClick event', () => {
    const onClick = jest.fn();
    render(<Checkbox onClick={onClick} />);
    userEvent.click(screen.getByRole('checkbox'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('click to checkbox children sets state to checkbox', () => {
    render(<Checkbox>Обычный чекбокс</Checkbox>);
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    userEvent.click(screen.getByText('Обычный чекбокс'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('focuses by tab', () => {
    render(<Checkbox />);
    userEvent.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
  });

  it('uncheck checked checkbox', () => {
    const checkboxRef = React.createRef<Checkbox>();

    render(<Checkbox ref={checkboxRef} />);
    const checkbox = screen.getByRole('checkbox');

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
