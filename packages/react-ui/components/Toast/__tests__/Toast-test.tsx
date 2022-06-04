import React from 'react';
import { mount } from 'enzyme';

import { Toast, ToastProps, ToastState } from '../Toast';
import { getRootNode } from '../../../lib/rootNode';

jest.useFakeTimers();

describe('Toast', () => {
  it('renders', () => {
    expect(() => mount<ToastProps>(<Toast />)).not.toThrow();
  });

  it("doesn't throw on push", () => {
    const wrapper = mount(<Toast />);

    expect(() => (wrapper.instance() as Toast).push('message')).not.toThrow();
  });

  it('sets message to state', () => {
    const wrapper = mount<ToastProps, ToastState>(<Toast />);
    (wrapper.instance() as Toast).push('message');
    expect(wrapper.state().notification).toBe('message');
  });

  it('shows right message', () => {
    const wrapper = mount<ToastProps, ToastState>(<Toast />);
    (wrapper.instance() as Toast).push('message');

    const toast = (wrapper.instance() as Toast)._toast;
    expect(toast).toBeTruthy();
    const domNode = getRootNode(wrapper.instance() as Toast);
    expect(domNode).toBeInstanceOf(HTMLElement);
    expect(domNode!).toHaveTextContent('message');
  });

  it('hides message after interval', () => {
    const wrapper = mount(<Toast />);
    (wrapper.instance() as Toast).push('message');
    jest.runAllTimers();
    const toast = (wrapper.instance() as Toast)._toast;
    expect(toast).toBeFalsy();
  });

  it('calls onPush at push', () => {
    const onPush = jest.fn();
    const wrapper = mount(<Toast onPush={onPush} />);
    (wrapper.instance() as Toast).push('somemessage');
    jest.runAllTimers();

    expect(onPush.mock.calls[0][0]).toBe('somemessage');
    expect(onPush.mock.calls).toHaveLength(1);
  });

  it('calls onClose after close', () => {
    const onClose = jest.fn();
    const wrapper = mount(<Toast onClose={onClose} />);
    (wrapper.instance() as Toast).push('message');
    jest.runAllTimers();

    expect(onClose.mock.calls[0][0]).toBe('message');
    expect(onClose.mock.calls).toHaveLength(1);
  });

  it('support actions in tosts', () => {
    const wrapper = mount(<Toast />);
    (wrapper.instance() as Toast).push('message', {
      label: 'action',
      handler: () => undefined,
    });

    const textContent = getRootNode(wrapper.instance() as Toast)?.textContent;
    expect(textContent).toBe('messageaction');
  });

  it('passes right actions in tosts', () => {
    const wrapper = mount(<Toast />);
    const handler = jest.fn();
    (wrapper.instance() as Toast).push('message', {
      label: 'action',
      handler,
    });

    const toast = (wrapper.instance() as Toast)._toast;

    expect(toast!.props.action).toEqual({ label: 'action', handler });
  });
});
