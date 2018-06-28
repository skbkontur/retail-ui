
import { mount } from 'enzyme';
import * as React from 'react';

import ToastView from '../ToastView';

describe('ToastView', () => {
  it('renders', () => {
    mount(<ToastView>Hello</ToastView>);
  });

  it('contains right text', () => {
    const wrapper = mount(<ToastView>Hello</ToastView>);
    expect(wrapper.text()).toBe('Hello');
  });

  it('shows close if action', () => {
    const wrapper = mount(
      <ToastView action={{ label: 'hello', handler: () => {} }}>
        Hello
      </ToastView>
    );
    expect(wrapper.find('.close')).toBeTruthy();
  });

  it('handles action', () => {
    const handler = jest.fn();
    const wrapper = mount(
      <ToastView action={{ label: 'hello', handler }}>Hello</ToastView>
    );
    wrapper.find('.link').simulate('click');
    expect(handler.mock.calls.length).toBe(1);
  });

  it('shows right action label', () => {
    const wrapper = mount(
      <ToastView action={{ label: 'hello', handler: () => {} }}>
        Hello
      </ToastView>
    );
    expect(wrapper.find('.link').text()).toBe('hello');
  });
});
