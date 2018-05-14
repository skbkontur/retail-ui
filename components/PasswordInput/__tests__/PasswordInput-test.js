import { mount } from 'enzyme';
import React from 'react';

import PasswordInput from '../PasswordInput';
import Input from '../../Input';
import Icon from '../../Icon';

import styles from '../PasswordInput.less';

const setup = props => {
  return mount(<PasswordInput value="" {...props} />);
};

describe('PasswordInput', () => {
  it('renders', () => {
    setup();
  });

  it('should render 1 Icon', () => {
    const component = setup();
    expect(component.find(Icon)).toHaveLength(1);
  });

  it('has Icon with 14px size', () => {
    const component = setup();
    expect(component.find(Icon).props().size).toEqual(14);
  });

  it('should render eye-slash Icon', () => {
    const component = setup();
    expect(component.find(Icon).props().name).toBe('EyeClosed');
  });

  it('should render password Input', () => {
    const component = setup();
    expect(component.find(Input).props().type).toBe('password');
  });

  it('should render eye Icon after click on eye-slash Icon', () => {
    const component = setup();
    component.find(Icon).simulate('click');
    expect(component.find(Icon).props().name).toBe('EyeOpened');
  });

  it('should render text Input after click on eye-slash Icon', () => {
    const component = setup();
    component.find(Icon).simulate('click');
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

    component.find('input').simulate('keyPress', { keyCode: 65 }); // a
    component.find('input').simulate('keyPress', { keyCode: 20 }); // CapsLock
    expect(component.find(`.${styles.capsLockDetector}`)).toHaveLength(1);

    component.find('input').simulate('keydown', { keyCode: 20 }); // CapsLock

    expect(component.find(`.${styles.capsLockDetector}`)).toHaveLength(0);
  });

  it('should set capsLockEnabled className for root component', () => {
    const component = setup({ detectCapsLock: true });
    component.setState({ capsLockEnabled: true });

    expect(component.find(`.${styles.capsLockEnabled}`)).toHaveLength(1);
  });
});
