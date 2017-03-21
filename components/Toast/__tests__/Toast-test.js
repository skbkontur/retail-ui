// @flow
/* global Lookup */
import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Toast from '../Toast';

jest.useFakeTimers();

describe('Toast', () => {
  it('renders', () => {
    mount(<Toast />);
  });

  it('doesn\'t throw on push', () => {
    const wrapper = mount(<Toast />);
    wrapper.instance().push('message');
  });

  it('sets message to state', () => {
    const wrapper = mount(<Toast />);
    wrapper.instance().push('message');
    expect(wrapper.state().notification).toBe('message');
  });

  it('shows right message', () => {
    const wrapper = mount(<Toast />);
    wrapper.instance().push('message');

    const toast = wrapper.instance()._toast;
    expect(toast).toBeTruthy();
    expect((ReactDOM.findDOMNode(toast): any).innerHTML).toContain('message');
  });

  it('hides message after interval', () => {
    const wrapper = mount(<Toast />);
    wrapper.instance().push('message');
    jest.runAllTimers();
    const toast = wrapper.instance()._toast;
    expect(toast).toBeFalsy();
  });

  it('calls onPush at push', () => {
    const onPush = jest.fn();
    const wrapper = mount(<Toast onPush={onPush} />);
    wrapper.instance().push('somemessage');
    jest.runAllTimers();

    expect(onPush.mock.calls[0][0]).toBe('somemessage');
    expect(onPush.mock.calls.length).toBe(1);
  });

  it('calls onClose after close', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Toast onClose={onClose} />);
    wrapper.instance().push('message');
    jest.runAllTimers();

    expect(onClose.mock.calls[0][0]).toBe('message');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('support actions in tosts', () => {
    const wrapper = mount(<Toast />);
    wrapper.instance().push('message', { label: 'action', handler: () => {} });

    const toast = wrapper.instance()._toast;
    const link = (ReactDOM
      .findDOMNode(toast): any)
      .querySelector('.link');
    expect(link).toBeTruthy();
  });

  it('passes right actions in tosts', () => {
    const wrapper = mount(<Toast />);
    const handler = jest.fn();
    wrapper.instance().push('message', { label: 'action', handler });

    const toast = wrapper.instance()._toast;

    expect(toast.props.action).toEqual({ label: 'action', handler });
  });
});
