/* eslint-disable react/display-name */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsDataTids } from '../Tabs';
import { Tab, TabDataTids } from '../Tab';

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
    const tab = screen.getByRole('link');
    expect(tab).toHaveAttribute('aria-describedby', 'elementTabId');
    expect(tab).toHaveAccessibleDescription('Description Tab item');

    const tabs = screen.getByTestId(TabsDataTids.root);
    expect(tabs).toHaveAttribute('aria-describedby', 'elementTabsId');
    expect(tabs).toHaveAccessibleDescription('Description Tabs');
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

  it('should call onValueChange when switch tabs', () => {
    const onValueChange = jest.fn();
    render(
      <Tabs value="fuji" onValueChange={onValueChange}>
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat">Tahat</Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    const tabs = screen.getAllByTestId(TabDataTids.root);
    userEvent.click(tabs[1]);

    expect(onValueChange).toHaveBeenCalledTimes(1);
  });
});

describe('Tab', () => {
  it('should pass generic type without type errors', () => {
    function TabGeneric<T extends string>() {
      return <Tab<T> />;
    }
    expect(() => render(<TabGeneric />)).not.toThrow();
  });

  it('should handle OnClick event', () => {
    const onClick = jest.fn();
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat" onClick={onClick}>
          Tahat
        </Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );

    const tabs = screen.getAllByTestId(TabDataTids.root);
    userEvent.click(tabs[1]);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should handle onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat" onKeyDown={onKeyDown}>
          Tahat
        </Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    userEvent.type(screen.getAllByTestId(TabDataTids.root)[1], '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should not call onKeyDown event on disabled tab', () => {
    const onKeyDown = jest.fn();
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat" disabled onKeyDown={onKeyDown}>
          Tahat
        </Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    userEvent.type(screen.getAllByTestId(TabDataTids.root)[1], '{enter}');

    expect(onKeyDown).not.toHaveBeenCalled();
  });

  it('should focus by tab', () => {
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
      </Tabs>,
    );
    expect(screen.getByTestId(TabDataTids.root)).not.toHaveFocus();

    userEvent.tab();
    expect(screen.getByTestId(TabDataTids.root)).toHaveFocus();
  });

  it('should pass focus by arrowright press', () => {
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    const tabs = screen.getAllByTestId(TabDataTids.root);
    expect(tabs[0]).not.toHaveFocus();
    userEvent.tab();
    expect(tabs[0]).toHaveFocus();

    userEvent.type(tabs[0], '{arrowright}');
    expect(tabs[0]).not.toHaveFocus();
    expect(tabs[1]).toHaveFocus();
  });

  it('should focus by arrowleft', () => {
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    const tabs = screen.getAllByTestId(TabDataTids.root);
    expect(tabs[0]).not.toHaveFocus();
    userEvent.tab();
    expect(tabs[0]).toHaveFocus();

    userEvent.type(tabs[0], '{arrowright}');
    expect(tabs[0]).not.toHaveFocus();

    userEvent.type(tabs[0], '{arrowleft}');
    expect(tabs[0]).toHaveFocus();
  });

  it('should not focus on disabled tab by pressing tab', () => {
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="tahat" disabled>
          Tahat
        </Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );

    const tabs = screen.getAllByTestId(TabDataTids.root);

    userEvent.tab();
    expect(tabs[0]).toHaveFocus();

    userEvent.tab();
    expect(tabs[0]).not.toHaveFocus();
    expect(tabs[1]).not.toHaveFocus();
    expect(tabs[2]).toHaveFocus();
  });
});
