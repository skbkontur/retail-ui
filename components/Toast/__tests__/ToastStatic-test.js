import ToastStatic from '../ToastStatic';

describe('ToastStatic', () => {
  it("doesn't throw on push", () => {
    ToastStatic.push('hello');
  });

  it('shows toast', () => {
    ToastStatic.push('hello');
    expect(ToastStatic.instance._toast).toBeTruthy();
  });

  it('passes right props to toast', () => {
    const handler = () => {};
    ToastStatic.push('hello', { label: 'hello', handler });
    const toast = ToastStatic.instance._toast;
    expect(toast.props.children).toBe('hello');
    expect(toast.props.action).toEqual({ label: 'hello', handler });
  });
});
