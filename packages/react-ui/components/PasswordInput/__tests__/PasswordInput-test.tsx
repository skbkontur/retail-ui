import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';

import { PasswordInput } from '../PasswordInput';

describe('PasswordInput', () => {
  it('should change icon after clicking on the toggle button', () => {
    render(<PasswordInput />);

    const toggleButton = screen.getByTestId('PasswordInputEyeIcon');
    const toggleButtonInitialIcon = toggleButton.innerHTML;

    userEvent.click(toggleButton);

    const toggleButtonUpdatedIcon = toggleButton.innerHTML;

    expect(toggleButtonInitialIcon).not.toBe(toggleButtonUpdatedIcon);
  });

  it('should change input type after clicking on the toggle button', () => {
    const inputValue = 'input';

    render(<PasswordInput value={inputValue} />);

    const input = screen.getByDisplayValue(inputValue);

    // By default input should have type `password`
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByTestId('PasswordInputEyeIcon');
    userEvent.click(toggleButton);

    // After clicking on the toggle button input should have type `text`
    expect(input).toHaveAttribute('type', 'text');
  });

  it('should at first render CapsLock label then hide it', () => {
    const component = mount(<PasswordInput value="" detectCapsLock />);

    component.find('input').simulate('keypress', { key: 'a', getModifierState: () => false });
    component.find('input').simulate('keypress', { key: 'CapsLock', getModifierState: () => true });
    expect(component.find(`[data-tid~="PasswordInputCapsLockDetector"]`)).toHaveLength(1);

    component.find('input').simulate('keypress', { key: 'CapsLock', getModifierState: () => false });

    expect(component.find(`[data-tid~="PasswordInputCapsLockDetector"]`)).toHaveLength(0);
  });

  it('should focus on the input after clicking on the toggle button', () => {
    const inputValue = 'input';

    render(<PasswordInput value={inputValue} />);

    const input = screen.getByDisplayValue(inputValue);
    const toggleButton = screen.getByTestId('PasswordInputEyeIcon');

    // By default input should not have focus
    // Input should have type `password` at the moment
    expect(input).not.toHaveFocus();

    userEvent.click(toggleButton);
    // After clicking on the toggle button input should get focus
    // Input should have type `text` at the moment
    expect(input).toHaveFocus();

    userEvent.click(toggleButton);
    // After re-clicking on the toggle button input should get focus again
    // Input should have type `password` at the moment
    expect(input).toHaveFocus();
  });
});
