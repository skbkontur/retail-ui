import type { PopupMenuCaptionProps } from '@skbkontur/react-ui';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';

import { MenuDataTids } from '../../../internal/Menu/index.js';
import { MenuItem, MenuItemDataTids } from '../../MenuItem/index.js';
import { TooltipMenuDataTids } from '../index.js';
import { TooltipMenu } from '../TooltipMenu.js';

describe('<TooltipMenu />', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    window.scrollTo = vi.fn();
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  test('Render without crashes', () => {
    render(<TooltipMenu caption={<span />} />);

    expect(screen.getByTestId(TooltipMenuDataTids.root)).toBeInTheDocument();
  });

  test('should log a warning if caption is not passed', () => {
    // @ts-expect-error: `caption` prop is purposefully not provided.
    render(<TooltipMenu />);

    expect(consoleSpy).toHaveBeenCalledWith('Warning: Prop "caption" is required!!!');
  });

  test('Contains <Menu /> after clicking on caption', async () => {
    render(
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>First MenuItem</MenuItem>
      </TooltipMenu>,
    );

    expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
  });

  test("Contains <MenuItem />'s after clicking on caption", async () => {
    render(
      <TooltipMenu caption={<button id="captionForTest">Test</button>}>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </TooltipMenu>,
    );

    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryAllByTestId(MenuItemDataTids.root)).toHaveLength(3);
  });

  test('Render without crashes if passed expected positions', () => {
    render(<TooltipMenu caption={<span />} positions={['top left', 'top right']} />);

    expect(screen.getByTestId(TooltipMenuDataTids.root)).toBeInTheDocument();
  });

  test('Click handler on menu item should be called before closing', async () => {
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
    await userEvent.click(screen.getByRole('button'));

    const menuItem = screen.getByTestId(MenuItemDataTids.root);
    expect(menuItem).toBeInTheDocument();

    await userEvent.click(menuItem);
    expect(testText).toBe('Bar foo');
  });

  it('accepts function as caption', async () => {
    const captionFunc = ({ toggleMenu }: PopupMenuCaptionProps) => {
      return (
        <button data-tid="caption-func" onClick={toggleMenu}>
          Caption
        </button>
      );
    };
    render(
      <TooltipMenu caption={captionFunc}>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </TooltipMenu>,
    );
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('caption-func'));

    expect(screen.getAllByTestId(MenuItemDataTids.root)).toHaveLength(3);
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<TooltipMenu aria-label={ariaLabel} caption={<button>test</button>} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
