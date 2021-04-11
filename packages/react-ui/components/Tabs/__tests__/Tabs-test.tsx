import { mount } from 'enzyme';
import React from 'react';

import { Tabs } from '../Tabs';
import { Indicator } from '../Indicator';

describe('Tabs', () => {
  describe('Indicator', () => {
    const FunctionTabComponent = () => <div />;
    it('Should correct getStyles from FunctionComponent', () => {
      const wrapper = mount(
        <Tabs value="0">
          <Tabs.Tab id="0" component={FunctionTabComponent} />
        </Tabs>,
      );

      expect(wrapper.find(Indicator).instance().state).toMatchObject({ styles: { top: -2, left: 0 } });
    });
  });

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
