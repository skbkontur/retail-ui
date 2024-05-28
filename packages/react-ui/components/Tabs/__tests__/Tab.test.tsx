import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tab, TabDataTids } from '../Tab';
import { Tabs } from '../Tabs';

describe('Tab', () => {
  it('should pass generic type without type errors', () => {
    function TabGeneric<T extends string>() {
      return <Tab<T> />;
    }
    expect(() => render(<TabGeneric />)).not.toThrow();
  });

  it('should handle OnClick event', async () => {
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
    await userEvent.click(tabs[1]);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should handle onKeyDown event', async () => {
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
    await userEvent.type(screen.getAllByTestId(TabDataTids.root)[1], '{enter}');

    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it('should not call onKeyDown event on disabled tab', async () => {
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
    await userEvent.type(screen.getAllByTestId(TabDataTids.root)[1], '{enter}');

    expect(onKeyDown).not.toHaveBeenCalled();
  });

  it('should focus by tab', async () => {
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
      </Tabs>,
    );
    expect(screen.getByTestId(TabDataTids.root)).not.toHaveFocus();

    await userEvent.tab();
    expect(screen.getByTestId(TabDataTids.root)).toHaveFocus();
  });

  it('should pass focus by arrowright press', async () => {
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    const tabs = screen.getAllByTestId(TabDataTids.root);
    expect(tabs[0]).not.toHaveFocus();
    await userEvent.tab();
    expect(tabs[0]).toHaveFocus();

    await userEvent.type(tabs[0], '{arrowright}');
    expect(tabs[0]).not.toHaveFocus();
    expect(tabs[1]).toHaveFocus();
  });

  it('should focus by arrowleft', async () => {
    render(
      <Tabs value="fuji">
        <Tabs.Tab id="fuji">Fuji</Tabs.Tab>
        <Tabs.Tab id="alps">Alps</Tabs.Tab>
      </Tabs>,
    );
    const tabs = screen.getAllByTestId(TabDataTids.root);
    expect(tabs[0]).not.toHaveFocus();
    await userEvent.tab();
    expect(tabs[0]).toHaveFocus();

    await userEvent.type(tabs[0], '{arrowright}');
    expect(tabs[0]).not.toHaveFocus();

    await userEvent.type(tabs[0], '{arrowleft}');
    expect(tabs[0]).toHaveFocus();
  });

  it('should not focus on disabled tab by pressing tab', async () => {
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

    await userEvent.tab();
    expect(tabs[0]).toHaveFocus();

    await userEvent.tab();
    expect(tabs[0]).not.toHaveFocus();
    expect(tabs[1]).not.toHaveFocus();
    expect(tabs[2]).toHaveFocus();
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'test';
      render(
        <Tabs value="">
          <Tabs.Tab aria-label={ariaLabel} />
        </Tabs>,
      );

      expect(screen.getByTestId(TabDataTids.root)).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
