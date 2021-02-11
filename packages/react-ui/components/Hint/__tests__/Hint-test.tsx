import { mount } from 'enzyme';
import React from 'react';

import { Hint } from '../Hint';

describe('Hint', () => {
  it('render without crash', () => {
    const wrapper = mount<Hint>(<Hint text="world">Hello</Hint>);

    expect(wrapper).toHaveLength(1);
  });

  it('controlled opening only if manual prop passed', () => {
    const wrapper = mount<Hint>(
      <Hint opened text="world">
        Hello
      </Hint>,
    );

    expect(wrapper.state('opened')).toBe(false);
  });

  it('manual opening', () => {
    const wrapper = mount<Hint>(
      <Hint manual text="world">
        Hello
      </Hint>,
    );

    expect(wrapper.state('opened')).toBe(false);

    wrapper.setProps({ opened: true });

    expect(wrapper.state('opened')).toBe(true);
  });
});
