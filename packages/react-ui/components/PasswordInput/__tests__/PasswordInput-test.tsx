import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { InputDataTids } from '../../Input';
import { LangCodes, LocaleContext } from '../../../lib/locale';
import { PasswordInput, PasswordInputDataTids } from '../PasswordInput';
import { componentsLocales as PasswordInputLocaleEn } from '../locale/locales/en';
import { componentsLocales as PasswordInputLocaleRu } from '../locale/locales/ru';
import * as listenFocusOutside from '../../../lib/listenFocusOutside';

describe('PasswordInput', () => {
  it('should change icon after clicking on the toggle button', async () => {
    render(<PasswordInput />);

    const toggleButton = screen.getByTestId(PasswordInputDataTids.eyeIcon);
    const toggleButtonInitialIcon = toggleButton.innerHTML;

    await userEvent.click(toggleButton);

    const toggleButtonUpdatedIcon = toggleButton.innerHTML;

    expect(toggleButtonInitialIcon).not.toBe(toggleButtonUpdatedIcon);
  });

  it('should change input type after clicking on the toggle button', async () => {
    const inputValue = 'input';

    render(<PasswordInput value={inputValue} />);

    const input = screen.getByDisplayValue(inputValue);

    // By default input should have type `password`
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByTestId(PasswordInputDataTids.eyeIcon);
    await userEvent.click(toggleButton);

    // After clicking on the toggle button input should have type `text`
    expect(input).toHaveAttribute('type', 'text');
  });

  //update test after upgrading RTL version
  it.skip('should at first render CapsLock label then hide it', () => {
    // const component = mount(<PasswordInput value="" detectCapsLock />);
    //
    // component.find('input').simulate('keypress', { key: 'a', getModifierState: () => false });
    // component.find('input').simulate('keypress', { key: 'CapsLock', getModifierState: () => true });
    // expect(component.find(`[data-tid~="PasswordInputCapsLockDetector"]`)).toHaveLength(1);
    //
    // component.find('input').simulate('keypress', { key: 'CapsLock', getModifierState: () => false });
    //
    // expect(component.find(`[data-tid~="PasswordInputCapsLockDetector"]`)).toHaveLength(0);
  });

  it('should focus on the input after clicking on the toggle button', async () => {
    const inputValue = 'input';

    render(<PasswordInput value={inputValue} />);

    const input = screen.getByDisplayValue(inputValue);
    const toggleButton = screen.getByTestId(PasswordInputDataTids.eyeIcon);

    // By default input should not have focus
    // Input should have type `password` at the moment
    expect(input).not.toHaveFocus();

    await userEvent.click(toggleButton);
    // After clicking on the toggle button input should get focus
    // Input should have type `text` at the moment
    expect(input).toHaveFocus();

    await userEvent.click(toggleButton);
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

  it('handels onKeyPress event', async () => {
    const onKeyPress = jest.fn();
    const inputValue = 'input';

    render(<PasswordInput onKeyPress={onKeyPress} value={inputValue} />);

    await userEvent.type(screen.getByDisplayValue(inputValue), '{enter}');

    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  it('handels onKeyDown event', async () => {
    const onKeyDown = jest.fn();
    const inputValue = 'input';

    render(<PasswordInput onKeyDown={onKeyDown} value={inputValue} />);

    await userEvent.type(screen.getByDisplayValue(inputValue), '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should not show eye button when input is disabled', () => {
    render(<PasswordInput disabled />);
    expect(screen.queryByTestId(PasswordInputDataTids.eyeIcon)).not.toBeInTheDocument();
  });

  it('should hide symbols on click outside', async () => {
    const inputValue = 'input';
    render(<PasswordInput value={inputValue} />);

    await userEvent.click(screen.getByTestId(PasswordInputDataTids.eyeIcon));
    expect(screen.getByDisplayValue(inputValue)).toHaveAttribute('type', 'text');

    await userEvent.click(document.body);
    expect(screen.getByDisplayValue(inputValue)).toHaveAttribute('type', 'password');
  });

  it('button wrapping eye icon should have type="button"', () => {
    render(<PasswordInput value={'input'} />);

    expect(screen.getByTestId(PasswordInputDataTids.eyeIcon)).toHaveAttribute('type', 'button');
  });

  it('has correct data-tids', () => {
    const customDataTid = 'custom-data-tid';
    render(<PasswordInput data-tid={customDataTid} />);

    expect(screen.getByTestId(customDataTid)).toBeInTheDocument();
    expect(screen.getByTestId(InputDataTids.root)).toBeInTheDocument();
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', async () => {
      const ariaLabel = 'aria-label';
      render(<PasswordInput aria-label={ariaLabel} />);

      // Clicking on the eye icon to turn input from password to text
      await userEvent.click(screen.getByTestId(PasswordInputDataTids.eyeIcon));

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('eye icon has correct aria-label attribute (ru)', async () => {
      render(<PasswordInput />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', PasswordInputLocaleRu.eyeOpenedAriaLabel);

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', PasswordInputLocaleRu.eyeClosedAriaLabel);
    });

    it('eye icon has correct aria-label attribute (en)', async () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <PasswordInput />
        </LocaleContext.Provider>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', PasswordInputLocaleEn.eyeOpenedAriaLabel);

      await userEvent.click(screen.getByRole('button'));

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

    it('sets custom value for `eyeClosedAriaLabel` locale', async () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { PasswordInput: { eyeClosedAriaLabel: customAriaLabel } } }}>
          <PasswordInput />
        </LocaleContext.Provider>,
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', customAriaLabel);
    });
  });

  it('RenderLayer not listen blur in default view', async () => {
    const focusOutsideListener = jest.spyOn(listenFocusOutside, 'listen');

    render(<PasswordInput />);

    expect(focusOutsideListener).not.toHaveBeenCalled();
  });
});
