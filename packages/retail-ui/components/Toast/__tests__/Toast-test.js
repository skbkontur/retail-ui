
/* eslint-disable flowtype/no-weak-types */
/* global Lookup */
import { mount } from 'enzyme';
import * as React from 'react';
import ReactDOM from 'react-dom';

import Toast from '../Toast';

jest.useFakeTimers();

jest.mock('../../RenderContainer', () => props => <div {...props} />);
jest.mock('react-addons-css-transition-group', () => ({ children }) => (
  <div>{children}</div>
));

describe('Toast', () => {
  it('renders', () => {
    mount(<Toast />);
  });

  it("doesn't throw on push", () => {
    const wrapper = mount(<Toast />);
    ((wrapper.instance(): any): Toast).push('message');
  });

  it('sets message to state', () => {
    const wrapper = mount(<Toast />);
    ((wrapper.instance(): any): Toast).push('message');
    expect(wrapper.state().notification).toBe('message');
  });

  it('shows right message', () => {
    const wrapper = mount(<Toast />);
    ((wrapper.instance(): any): Toast).push('message');

    const toast = ((wrapper.instance(): any): Toast)._toast;
    expect(toast).toBeTruthy();
    expect((ReactDOM.findDOMNode(toast): any).innerHTML).toContain('message');
  });

  it('hides message after interval', () => {
    const wrapper = mount(<Toast />);
    ((wrapper.instance(): any): Toast).push('message');
    jest.runAllTimers();
    const toast = ((wrapper.instance(): any): Toast)._toast;
    expect(toast).toBeFalsy();
  });

  it('calls onPush at push', () => {
    const onPush = jest.fn();
    const wrapper = mount(<Toast onPush={onPush} />);
    ((wrapper.instance(): any): Toast).push('somemessage');
    jest.runAllTimers();

    expect(onPush.mock.calls[0][0]).toBe('somemessage');
    expect(onPush.mock.calls.length).toBe(1);
  });

  it('calls onClose after close', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Toast onClose={onClose} />);
    ((wrapper.instance(): any): Toast).push('message');
    jest.runAllTimers();

    expect(onClose.mock.calls[0][0]).toBe('message');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('support actions in tosts', () => {
    const wrapper = mount(<Toast />);
    ((wrapper.instance(): any): Toast).push('message', {
      label: 'action',
      handler: () => {}
    });

    const toast = ((wrapper.instance(): any): Toast)._toast;
    const link = (ReactDOM.findDOMNode(toast): any).querySelector('.link');
    expect(link).toBeTruthy();
  });

  it('passes right actions in tosts', () => {
    const wrapper = mount(<Toast />);
    const handler = jest.fn();
    ((wrapper.instance(): any): Toast).push('message', {
      label: 'action',
      handler
    });

    const toast = ((wrapper.instance(): any): Toast)._toast;

    expect(toast.props.action).toEqual({ label: 'action', handler });
  });
});
