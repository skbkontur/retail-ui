import { mount } from 'enzyme';
import React from 'react';

import { Tabs } from '../Tabs';

describe('Tabs', () => {
  it('Should not throw error when previous active tab was unmounted', () => {
    const initialCount = 5;
    const TabsContainer = ({ count }: { count: number }) => (
      <Tabs value={(initialCount - 1).toString()}>
        {Array.from({ length: count }).map((_, i) => (
          <Tabs.Tab key={i} id={String(i)} />
        ))}
      </Tabs>
    );
    const wrapper = mount(<TabsContainer count={initialCount} />);

    wrapper.setProps({ count: 2 });
  });
});
