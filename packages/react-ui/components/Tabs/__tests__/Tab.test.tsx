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

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'test';
      render(
        <Tabs value="">
          <Tabs.Tab aria-label={ariaLabel} />
        </Tabs>,
      );

      expect(screen.getByRole('link')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
