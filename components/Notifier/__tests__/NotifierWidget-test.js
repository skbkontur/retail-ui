// @flow-weak
import NotifierWidget from '../NotifierWidget';

describe('NotifierWidget', () => {

  it('doesn\'t throw on push', () => {
    NotifierWidget.push('hello');
  });

  it('shows toast', () => {
    NotifierWidget.push('hello');
    expect(NotifierWidget.instance._toast).toBeTruthy();
  });

  it('passes right props to toast', () => {
    const handler = () => {};
    NotifierWidget.push('hello', {label: 'hello', handler});
    const toast = NotifierWidget.instance._toast;
    expect(toast.props.children).toBe('hello');
    expect(toast.props.action).toEqual({label: 'hello', handler});
  });

});
