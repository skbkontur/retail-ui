import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { PasswordInput, PasswordInputDataTids } from '../PasswordInput';
import { componentsLocales as PasswordInputLocaleEn } from '../locale/locales/en';
import { componentsLocales as PasswordInputLocaleRu } from '../locale/locales/ru';

describe('PasswordInput', () => {
  it('should change icon after clicking on the toggle button', () => {
    render(<PasswordInput />);

    const toggleButton = screen.getByTestId(PasswordInputDataTids.eyeIcon);
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

    const toggleButton = screen.getByTestId(PasswordInputDataTids.eyeIcon);
    userEvent.click(toggleButton);

    // After clicking on the toggle button input should have type `text`
    expect(input).toHaveAttribute('type', 'text');
  });

  //update test after upgrading RTL version
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
    const toggleButton = screen.getByTestId(PasswordInputDataTids.eyeIcon);

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

  it('should focus on calling focus() method', () => {
    const inputValue = 'input';
    const passwordInputRef = React.createRef<PasswordInput>();

    render(<PasswordInput ref={passwordInputRef} value={inputValue} />);

    passwordInputRef.current?.focus();

    expect(screen.getByDisplayValue(inputValue)).toHaveFocus();
  });

  it('should blur on calling blur() method', () => {
    const inputValue = 'input';
    const passwordInputRef = React.createRef<PasswordInput>();

    render(<PasswordInput ref={passwordInputRef} value={inputValue} />);

    passwordInputRef.current?.focus();
    passwordInputRef.current?.blur();

    expect(screen.queryByDisplayValue(inputValue)).not.toHaveFocus();
  });

  it('handels onKeyPress event', () => {
    const onKeyPress = jest.fn();
    const inputValue = 'input';

    render(<PasswordInput onKeyPress={onKeyPress} value={inputValue} />);

    userEvent.type(screen.getByDisplayValue(inputValue), '{enter}');

    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyDown event', () => {
    const onKeyDown = jest.fn();
    const inputValue = 'input';

    render(<PasswordInput onKeyDown={onKeyDown} value={inputValue} />);

    userEvent.type(screen.getByDisplayValue(inputValue), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should not show eye button when input is disabled', () => {
    render(<PasswordInput disabled />);
    expect(screen.queryByTestId(PasswordInputDataTids.eyeIcon)).not.toBeInTheDocument();
  });

  it('should hide symbols on click outside', () => {
    const inputValue = 'input';
    render(<PasswordInput value={inputValue} />);

    userEvent.click(screen.getByTestId(PasswordInputDataTids.eyeIcon));
    expect(screen.getByDisplayValue(inputValue)).toHaveAttribute('type', 'text');

    userEvent.click(document.body);
    expect(screen.getByDisplayValue(inputValue)).toHaveAttribute('type', 'password');
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<PasswordInput aria-label={ariaLabel} />);

      // Clicking on the eye icon to turn input from password to text
      userEvent.click(screen.getByTestId(PasswordInputDataTids.eyeIcon));

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('eye icon has correct aria-label attribute (ru)', () => {
      render(<PasswordInput />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', PasswordInputLocaleRu.eyeOpenedAriaLabel);

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', PasswordInputLocaleRu.eyeClosedAriaLabel);
    });

    it('eye icon has correct aria-label attribute (en)', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <PasswordInput />
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', PasswordInputLocaleEn.eyeOpenedAriaLabel);

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', PasswordInputLocaleEn.eyeClosedAriaLabel);
    });

    it('sets custom value for `eyeOpenedAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { PasswordInput: { eyeOpenedAriaLabel: customAriaLabel } } }}>
          <PasswordInput />
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', customAriaLabel);
    });

    it('sets custom value for `eyeClosedAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { PasswordInput: { eyeClosedAriaLabel: customAriaLabel } } }}>
          <PasswordInput />
        </LocaleContext.Provider>,
      );

      userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', customAriaLabel);
    });
  });
});
