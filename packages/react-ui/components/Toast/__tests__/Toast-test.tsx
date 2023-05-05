import React from 'react';
import { render, screen } from '@testing-library/react';

import { Toast, ToastDataTids } from '../Toast';

jest.useFakeTimers();

describe('Toast', () => {
  it('renders', () => {
    expect(() => render(<Toast />)).not.toThrow();
  });

  it("doesn't throw on push", () => {
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);

    expect(() => toastRef.current?.push('message')).not.toThrow();
  });

  it('sets message to state', () => {
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);
    toastRef.current?.push('message');

    expect(toastRef.current?.state.notification).toBe('message');
  });

  it('shows right message', () => {
    const message = 'message';
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);
    toastRef.current?.push(message);

    expect(toastRef.current?._toast).toBeTruthy();
    expect(screen.getByTestId(ToastDataTids.toastView)).toHaveTextContent(message);
  });

  it('hides message after interval', () => {
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);
    toastRef.current?.push('message');

    jest.runAllTimers();
    const toast = toastRef.current?._toast;
    expect(toast).toBeFalsy();
  });

  it('calls onPush at push', () => {
    const toastRef = React.createRef<Toast>();
    const onPush = jest.fn();
    render(<Toast onPush={onPush} ref={toastRef} />);
    toastRef.current?.push('somemessage');

    jest.runAllTimers();

    expect(onPush.mock.calls[0][0]).toBe('somemessage');
    expect(onPush.mock.calls).toHaveLength(1);
  });

  it('calls onClose after close', () => {
    const toastRef = React.createRef<Toast>();
    const onClose = jest.fn();
    render(<Toast onClose={onClose} ref={toastRef} />);
    toastRef.current?.push('message');
    jest.runAllTimers();

    expect(onClose.mock.calls[0][0]).toBe('message');
    expect(onClose.mock.calls).toHaveLength(1);
  });

  it('support actions in tosts', () => {
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);
    toastRef.current?.push('message', {
      label: 'action',
      handler: () => undefined,
    });

    expect(screen.getByTestId(ToastDataTids.toastView)).toHaveTextContent('messageaction');
  });

  it('passes right actions in tosts', () => {
    const toastRef = React.createRef<Toast>();
    const handler = jest.fn();

    render(<Toast ref={toastRef} />);
    toastRef.current?.push('message', {
      label: 'action',
      handler,
    });

    const toast = toastRef.current?._toast;

    expect(toast?.props.action).toEqual({ label: 'action', handler });
  });
});
