import * as React from 'react';
import { mount } from 'enzyme';
import FxInput, { FxInputProps } from '../FxInput';

const render = (props: FxInputProps = {}) =>
  mount<FxInput, FxInputProps>(<FxInput {...props} />);

describe('FxInput', () => {
  it('render without crash', () => {
    render();
  });

  it('programmatically set focus', () => {
    const wrapper = render();
    const input = wrapper.find('input');

    wrapper.instance().focus();

    // tslint:disable-next-line:no-console
    console.log(input.html());
    // tslint:disable-next-line:no-console
    console.log(document.activeElement.innerHTML);

    expect(input.html() === document.activeElement.innerHTML);
  });
});
