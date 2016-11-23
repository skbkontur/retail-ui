// @flow
import {mount} from 'enzyme';
import React from 'react';

import Toast from '../Toast';

describe('Toast', () => {

  it('renders', () => {
    mount(<Toast>Hello</Toast>);
  });

  it('contains right text', () => {
    const wrapper = mount(<Toast>Hello</Toast>);
    expect(wrapper.text()).toBe('Hello');
  });

  it('shows close if action', () => {
    const wrapper = mount(
      <Toast action={{label: 'hello', handler: () => {}}}>Hello</Toast>
    );
    expect(wrapper.find('.close')).toBeTruthy();
  });

  it('handles action', () => {
    const handler = jest.fn();
    const wrapper = mount(
      <Toast action={{label: 'hello', handler}}>Hello</Toast>
    );
    wrapper.find('.link').simulate('click');
    expect(handler.mock.calls.length).toBe(1);
  });

  it('shows right action label', () => {
    const wrapper = mount(
      <Toast action={{label: 'hello', handler: () => {}}}>Hello</Toast>
    );
    expect(wrapper.find('.link').text()).toBe('hello');
  });

});
