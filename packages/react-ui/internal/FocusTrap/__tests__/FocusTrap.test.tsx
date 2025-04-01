import type { ReactWrapper } from 'enzyme';
import { mount } from 'enzyme';
import React from 'react';

import { clickOutside } from '../../../lib/utils';
import type { FocusTrapProps } from '../FocusTrap';
import { FocusTrap } from '../FocusTrap';

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

  it('Blur not be called', () => {
    const firstButton = focusTrap.find('button').at(0);
    const secondButton = focusTrap.find('button').at(1);

    firstButton.simulate('focus');
    firstButton.simulate('blur');
    secondButton.simulate('blur');

    expect(onButtonBlur).toHaveBeenCalledTimes(2);
    expect(onBlur).not.toHaveBeenCalled();
  });

  it('Blur called one time with clickOutside', () => {
    const firstButton = focusTrap.find('button').at(0);
    const secondButton = focusTrap.find('button').at(1);

    firstButton.simulate('focus');
    firstButton.simulate('blur');
    secondButton.simulate('blur');

    clickOutside();

    expect(onButtonBlur).toHaveBeenCalledTimes(2);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });
});
