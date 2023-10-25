﻿import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toggle } from '../Toggle';

describe('Toggle', () => {
  it('focuses by autofocus', () => {
    render(<Toggle autoFocus>Toggle</Toggle>);

    const toggle = screen.getByRole('switch', { name: 'Toggle' });

    expect(toggle).toHaveFocus();
  });

  it('handels onValueChange event', () => {
    const onValueChange = jest.fn();

    render(<Toggle onValueChange={onValueChange}>Toggle</Toggle>);

    const toggle = screen.getByRole('switch', { name: 'Toggle' });
    userEvent.click(toggle);
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('handels onChange event', () => {
    const onChange = jest.fn();

    render(<Toggle onChange={onChange}>Toggle</Toggle>);

    const toggle = screen.getByRole('switch', { name: 'Toggle' });
    userEvent.click(toggle);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('handels onFocus event', () => {
    const onFocus = jest.fn();

    render(<Toggle onFocus={onFocus}>Toggle</Toggle>);

    const toggle = screen.getByRole('switch', { name: 'Toggle' });
    userEvent.click(toggle);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('handels onBlur event', () => {
    const onBlur = jest.fn();

    render(<Toggle onBlur={onBlur}>Toggle</Toggle>);

    const toggle = screen.getByRole('switch', { name: 'Toggle' });
    userEvent.click(toggle);

    expect(toggle).toHaveFocus();

    toggle.blur();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  describe('a11y', () => {
    it('should have correct role', () => {
      render(<Toggle>Toggle</Toggle>);

      const input = screen.getByRole('switch', { name: 'Toggle' });
      expect(input).toBeInTheDocument();
    });

    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Toggle aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-describedby', 'elementId');
      expect(toggle).toHaveAccessibleDescription('Description');
    });

    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<Toggle aria-label={ariaLabel} />);

      expect(screen.getByRole('switch')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
