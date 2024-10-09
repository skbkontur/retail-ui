import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsDataTids } from '../Tabs';
import { TabDataTids } from '../Tab';

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

    const { rerender } = render(<TabsContainer count={initialCount} />);

    expect(() => rerender(<TabsContainer count={2} />)).not.toThrow();
  });

  it('should pass generic type without type errors', () => {
    function TabsGeneric<T extends string>() {
      return <Tabs<T> value={'string' as T} />;
    }
    expect(() => render(<TabsGeneric />)).not.toThrow();
  });

  it('should render vertical tabs', () => {
    render(
      <Tabs value="tahat" vertical>
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat">Tahat</Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    expect(screen.getByTestId(TabsDataTids.root)).toBeInTheDocument();
  });

  it('should call onValueChange when switch tabs', async () => {
    const onValueChange = jest.fn();
    render(
      <Tabs value="fuji" onValueChange={onValueChange}>
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat">Tahat</Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    const tabs = screen.getAllByTestId(TabDataTids.root);
    await userEvent.click(tabs[1]);

    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Tabs value="fuji" aria-describedby="elementTabsId">
            <Tabs.Tab id="fuji" aria-describedby="elementTabId">
              Fuji
            </Tabs.Tab>
          </Tabs>
          <p id="elementTabId">Description Tab item</p>
          <p id="elementTabsId">Description Tabs</p>
        </div>,
      );
      const tab = screen.getByTestId(TabDataTids.root);
      expect(tab).toHaveAttribute('aria-describedby', 'elementTabId');
      expect(tab).toHaveAccessibleDescription('Description Tab item');

      const tabs = screen.getByTestId(TabsDataTids.root);
      expect(tabs).toHaveAttribute('aria-describedby', 'elementTabsId');
      expect(tabs).toHaveAccessibleDescription('Description Tabs');
    });
  });
});
