// @flow
/* global Lookup */
import {mount} from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';

import Notifier from '../Notifier';

jest.useFakeTimers();

describe('Notifier', () => {
  it('renders', () => {
    mount(<Notifier />);
  });

  it('doesn\'t throw on push', () => {
    const wrapper = mount(<Notifier />);
    wrapper.instance().push('message');
  });

  it('sets message to state', () => {
    const wrapper = mount(<Notifier />);
    wrapper.instance().push('message');
    expect(wrapper.state().notification).toBe('message');
  });

  it('shows right message', () => {
    const wrapper = mount(<Notifier />);
    wrapper.instance().push('message');

    const toast = wrapper.instance()._toast;
    expect(toast).toBeTruthy();
    expect(ReactDOM.findDOMNode(toast).innerHTML).toContain('message');
  });

  it('hides message after interval', () => {
    const wrapper = mount(<Notifier />);
    wrapper.instance().push('message');
    jest.runAllTimers();
    const toast = wrapper.instance()._toast;
    expect(toast).toBeFalsy();
  });

  it('calls onPush at push', () => {
    const onPush = jest.fn();
    const wrapper = mount(<Notifier onPush={onPush} />);
    wrapper.instance().push('somemessage');
    jest.runAllTimers();

    expect(onPush.mock.calls[0][0]).toBe('somemessage');
    expect(onPush.mock.calls.length).toBe(1);
  });

  it('calls onClose after close', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Notifier onClose={onClose} />);
    wrapper.instance().push('message');
    jest.runAllTimers();

    expect(onClose.mock.calls[0][0]).toBe('message');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('support actions in tosts', () => {
    const wrapper = mount(<Notifier />);
    wrapper.instance().push('message', {label: 'action'});

    const toast = wrapper.instance()._toast;
    const link = ReactDOM.
      findDOMNode(toast).
      querySelector('[data-action]');
    expect(link).toBeTruthy();
  });

  it('passes right actions in tosts', () => {
    const wrapper = mount(<Notifier />);
    const handler = jest.fn();
    wrapper.instance().push('message', {label: 'action', handler});

    const toast = wrapper.instance()._toast;

    expect(toast.props.action).toEqual({label: 'action', handler});
  });
});
