/* eslint-disable react/display-name */
import { mount } from 'enzyme';
import React from 'react';
import { render, screen } from '@testing-library/react';

import { Tabs } from '../Tabs';
import { Tab } from '../Tab';

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

    expect(() => mount(<TabsContainer count={initialCount} />).setProps({ count: 2 })).not.toThrow();
  });

  it('should pass generic type without type errors', () => {
    function TabsGeneric<T extends string>() {
      return <Tabs<T> value={'string' as T} />;
    }
    expect(() => render(<TabsGeneric />)).not.toThrow();
  });

  it('props aria-describedby applied correctly', () => {
    render(
      <div>
        <Tabs value="fuji">
          <Tabs.Tab id="fuji" aria-describedby="elementId">
            Fuji
          </Tabs.Tab>
        </Tabs>
        <p id="elementId">Description</p>
      </div>,
    );
    const tab = screen.getByRole('link');
    expect(tab).toHaveAttribute('aria-describedby', 'elementId');
    expect(tab).toHaveAccessibleDescription('Description');
  });
});

describe('Tab', () => {
  it('should pass generic type without type errors', () => {
    function TabGeneric<T extends string>() {
      return <Tab<T> />;
    }
    expect(() => render(<TabGeneric />)).not.toThrow();
  });
});
