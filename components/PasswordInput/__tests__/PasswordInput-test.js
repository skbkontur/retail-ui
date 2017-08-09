import { mount } from 'enzyme';
import React from 'react';

import PasswordInput from '../PasswordInput';
import Input from '../../Input';
import Icon from '../../Icon';

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
    expect(component.find(Icon).props().name).toBe('eye-slash');
  });

  it('should render password Input', () => {
    const component = setup();
    expect(component.find(Input).props().type).toBe('password');
  });

  it('should render eye Icon after click on eye-slash Icon', () => {
    const component = setup();
    component.find(Icon).simulate('click');
    expect(component.find(Icon).props().name).toBe('eye');
  });

  it('should render text Input after click on eye-slash Icon', () => {
    const component = setup();
    component.find(Icon).simulate('click');
    expect(component.find(Input).props().type).toBe('text');
  });
});
