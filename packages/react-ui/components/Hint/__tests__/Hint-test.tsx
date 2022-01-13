import React from 'react';
import { mount } from 'enzyme';

import { Hint } from '../Hint';

describe('Hint', () => {
  it('render without crash', () => {
    const wrapper = mount<Hint>(
      <Hint pos="left" disableAnimations useWrapper={false} text="world">
        Hello
      </Hint>,
    );

    expect(wrapper).toHaveLength(1);
  });
});
