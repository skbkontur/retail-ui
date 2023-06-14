import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

  it('shows right message', () => {
    const message = 'message';
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);
    toastRef.current?.push(message);

    expect(screen.getByTestId(ToastDataTids.toastView)).toHaveTextContent(message);
  });

  it('hides message after interval', () => {
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);
    toastRef.current?.push('message');

    jest.runAllTimers();
    expect(screen.queryByTestId(ToastDataTids.toastView)).not.toBeInTheDocument();
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
    const actionLabel = 'action';
    const toastRef = React.createRef<Toast>();
    render(<Toast ref={toastRef} />);
    toastRef.current?.push('message', {
      label: actionLabel,
      handler: () => undefined,
    });

    expect(screen.getByTestId(ToastDataTids.action)).toBeInTheDocument();
    expect(screen.getByTestId(ToastDataTids.action)).toHaveTextContent(actionLabel);
  });

  it('passes right actions in tosts', () => {
    const toastRef = React.createRef<Toast>();
    const handler = jest.fn();

    render(<Toast ref={toastRef} />);
    toastRef.current?.push('message', {
      label: 'action',
      handler,
    });

    userEvent.click(screen.getByTestId(ToastDataTids.action));
    expect(handler).toHaveBeenCalled();
  });
});
