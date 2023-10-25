import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TooltipMenu } from '../TooltipMenu';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';
import { MenuDataTids } from '../../../internal/Menu';
import { TooltipMenuDataTids } from '..';

describe('<TooltipMenu />', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('Render without crashes', () => {
    render(<TooltipMenu caption={<span />} />);

    expect(screen.getByTestId(TooltipMenuDataTids.root)).toBeInTheDocument();
  });

  test('Throw, if caption is not passed', () => {
    // @ts-expect-error: `caption` prop is purposefully not provided.
    const renderNoCaption = () => render(<TooltipMenu />);

    expect(renderNoCaption).toThrow('Prop "caption" is required!!!');
  });

  test('Contains <Menu /> after clicking on caption', () => {
    render(
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>First MenuItem</MenuItem>
      </TooltipMenu>,
    );

    expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
  });

  test("Contains <MenuItem />'s after clicking on caption", () => {
    render(
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </TooltipMenu>,
    );

    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));

    expect(screen.queryAllByTestId(MenuItemDataTids.root)).toHaveLength(3);
  });

  test('Render without crashes if passed expected positions', () => {
    render(<TooltipMenu caption={<span />} positions={['top left', 'top right']} />);

    expect(screen.getByTestId(TooltipMenuDataTids.root)).toBeInTheDocument();
  });

  test('Click handler on menu item should be called before closing', () => {
    let testText = 'Foo bar';
    render(
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem
          onClick={() => {
            testText = 'Bar foo';
          }}
        >
          Test
        </MenuItem>
      </TooltipMenu>,
    );

    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));

    const menuItem = screen.getByTestId(MenuItemDataTids.root);
    expect(menuItem).toBeInTheDocument();

    userEvent.click(menuItem);
    expect(testText).toBe('Bar foo');
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<TooltipMenu aria-label={ariaLabel} caption={<button>test</button>} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
