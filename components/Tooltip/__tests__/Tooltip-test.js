import {mount} from 'enzyme';
import React from 'react';

import Tooltip from '../Tooltip.js';

describe('Tooltip', () => {
  it('keeps child ref', () => {
    const refFn = jest.fn();
    const wrapper = mount(
      <Tooltip>
        <div ref={refFn} />
      </Tooltip>
    );

    expect(refFn.mock.calls.length).toBe(1);
    expect(refFn.mock.calls[0][0]).toBe(wrapper.find('div').node);
  });
});
