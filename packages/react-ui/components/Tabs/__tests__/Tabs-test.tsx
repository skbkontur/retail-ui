import { mount } from 'enzyme';
import React from 'react';

import { Tabs } from '../Tabs';
import { Indicator } from '../Indicator';

describe('Tabs', () => {
  describe('Indicator', () => {
    describe('should get correct styles from', () => {
      it('default tab component', () => {
        const wrapper = mount(
          <Tabs value="0">
            <Tabs.Tab id="0" />
          </Tabs>,
        );
        const { top, left } = wrapper.find<Indicator>(Indicator).instance().state.styles;

        expect(top).toBeDefined();
        expect(left).toBeDefined();
      });

      it('custom functional tab component with forwardRef', () => {
        const wrapper = mount(
          <Tabs value="0">
            <Tabs.Tab
              id="0"
              component={React.forwardRef<HTMLDivElement>(function CustomTab(_, ref) {
                return <div ref={ref} />;
              })}
            />
          </Tabs>,
        );
        const { top, left } = wrapper.find<Indicator>(Indicator).instance().state.styles;

        expect(top).toBeDefined();
        expect(left).toBeDefined();
      });

      it('custom functional tab component without forwardRef', () => {
        const wrapper = mount(
          <Tabs value="0">
            <Tabs.Tab id="0" component={() => <div />} />
          </Tabs>,
        );
        const { top, left } = wrapper.find<Indicator>(Indicator).instance().state.styles;

        expect(top).toBeDefined();
        expect(left).toBeDefined();
      });
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
