import React from 'react';
import { mount } from 'enzyme';

import { PasswordInput, PasswordInputProps } from '../PasswordInput';
import { EyeClosedIcon, EyeOpenedIcon } from '../../../internal/icons/16px';
import { Input } from '../../Input';
import { jsStyles } from '../PasswordInput.styles';

const setup = (props?: PasswordInputProps) => {
  return mount<PasswordInput>(<PasswordInput value="" {...props} />);
};

describe('PasswordInput', () => {
  it('renders', () => {
    setup();
  });

  it('should render 1 Icon', () => {
    const component = setup();
    expect(component.find(`.${jsStyles.toggleVisibility()}`).children()).toHaveLength(1);
  });

  it('has Icon with 14px size', () => {
    const component = setup();
    expect(component.find(EyeOpenedIcon).props().size).toEqual(14);
  });

  it('should render eye Icon', () => {
    const component = setup();
    expect(component.find(EyeOpenedIcon)).toHaveLength(1);
  });

  it('should render password Input', () => {
    const component = setup();
    expect(component.find(Input).props().type).toBe('password');
  });

  it('should render eye-slash Icon after click on eye Icon', () => {
    const component = setup();
    component.find(EyeOpenedIcon).simulate('click');
    expect(component.find(EyeClosedIcon)).toHaveLength(1);
  });

  it('should render text Input after click on eye Icon', () => {
    const component = setup();
    component.find(EyeOpenedIcon).simulate('click');
    expect(component.find(Input).props().type).toBe('text');
  });

  it('has not capsLockEnabled property in state', () => {
    const component = setup();
    expect(component.state().capsLockEnabled).toBeFalsy();
  });

  it('has capsLockEnabled = null if passed detectCapsLock prop', () => {
    const component = setup({ detectCapsLock: true });
    expect(component.state().capsLockEnabled).toBe(null);
  });

  it('should at first render CapsLock label then hide it', () => {
    const component = setup({ detectCapsLock: true });

    component.find('input').simulate('keypress', { key: 'a', getModifierState: () => false });
    component.find('input').simulate('keypress', { key: 'CapsLock', getModifierState: () => true });
    expect(component.find(`.${jsStyles.capsLockDetector()}`)).toHaveLength(1);

    component.find('input').simulate('keypress', { key: 'CapsLock', getModifierState: () => false });

    expect(component.find(`.${jsStyles.capsLockDetector()}`)).toHaveLength(0);
  });
});
