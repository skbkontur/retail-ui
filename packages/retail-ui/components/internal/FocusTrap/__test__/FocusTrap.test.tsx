import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

import FocusTrap, { FocusTrapProps } from '../FocusTrap';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
}

describe('<FocusTrap>', () => {
  let onBlur: jest.Mock<Promise<string[]>>;
  let onButtonBlur: jest.Mock<Promise<string[]>>;
  let focusTrap: ReactWrapper<FocusTrapProps>;

  beforeEach(() => {
    onBlur = jest.fn();
    onButtonBlur = jest.fn();
    focusTrap = mount<FocusTrap>(
      <FocusTrap onBlur={onBlur}>
        <div>
          <button onBlur={onButtonBlur} />
          <button onBlur={onButtonBlur} />
        </div>
      </FocusTrap>,
    );
  });

  it.only('Blur not be called', () => {
    focusTrap
      .find('button')
      .at(0)
      .simulate('focus');
    focusTrap
      .find('button')
      .at(0)
      .simulate('blur');
    focusTrap
      .find('button')
      .at(1)
      .simulate('blur');

    expect(onButtonBlur).toHaveBeenCalledTimes(2);
    expect(onBlur).not.toHaveBeenCalled();
  });

  it.only('Blur called one time with clickOutside', () => {
    focusTrap
      .find('button')
      .at(0)
      .simulate('focus');
    focusTrap
      .find('button')
      .at(0)
      .simulate('blur');
    focusTrap
      .find('button')
      .at(1)
      .simulate('blur');

    clickOutside();

    expect(onButtonBlur).toHaveBeenCalledTimes(2);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
