import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { PopupDataTids, PopupIds } from '../../../internal/Popup/Popup';
import { PopupMenu, PopupMenuCaptionProps } from '../PopupMenu';
import { MenuItem } from '../../../components/MenuItem';

describe('PopupMenu', () => {
  it('should open menu on caption click', () => {
    const captionContent = 'caption content';
    const menuItemContent = 'menu item content';

    render(
      <PopupMenu
        caption={<button>{captionContent}</button>}
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
      >
        <MenuItem>{menuItemContent}</MenuItem>
      </PopupMenu>,
    );

    // When the menu is closed we should not see its contents
    const menuItem = screen.queryByText(menuItemContent);
    expect(menuItem).not.toBeInTheDocument();

    // The menu should open on caption click
    const button = screen.getByRole('button', { name: captionContent });
    userEvent.click(button);

    // Now the contents of the menu should be visible
    const visibleMenuItem = screen.queryByText(menuItemContent);
    expect(visibleMenuItem).toBeInTheDocument();
  });

  it('should accept function as the caption', () => {
    const captionContent = 'caption content';
    const menuItemContent = 'menu item content';

    const Caption = (captionProps: PopupMenuCaptionProps) => {
      return <button onClick={() => captionProps.openMenu(true)}>{captionContent}</button>;
    };

    render(
      <PopupMenu caption={Caption} positions={['bottom left', 'bottom right', 'top left', 'top right']}>
        <MenuItem>{menuItemContent}</MenuItem>
      </PopupMenu>,
    );

    // When the menu is closed we should not see its contents
    const menuItem = screen.queryByText(menuItemContent);
    expect(menuItem).not.toBeInTheDocument();

    // The menu should open on caption click
    const button = screen.getByRole('button', { name: captionContent });
    userEvent.click(button);

    // Now the contents of the menu should be visible
    const visibleMenuItem = screen.queryByText(menuItemContent);
    expect(visibleMenuItem).toBeInTheDocument();
  });

  it('should call `onOpen` callback after opening of the menu', () => {
    const onOpenCallback = jest.fn();
    const captionContent = 'caption content';
    const outsideButtonContent = 'outside button content';

    render(
      <>
        <PopupMenu caption={<button>{captionContent}</button>} onOpen={onOpenCallback} />
        <button>{outsideButtonContent}</button>
      </>,
    );

    // Before we open menu the `onOpenCallback` should not be called
    expect(onOpenCallback).toHaveBeenCalledTimes(0);

    const button = screen.getByRole('button', { name: captionContent });
    userEvent.click(button);
    // After we open menu the `onOpenCallback` should be called once
    expect(onOpenCallback).toHaveBeenCalledTimes(1);

    const outsideButton = screen.getByRole('button', { name: outsideButtonContent });
    userEvent.click(outsideButton);
    // After we close menu the `onOpenCallback` should still be called once
    expect(onOpenCallback).toHaveBeenCalledTimes(1);
  });

  it('should call `onClose` callback after closing of the menu', () => {
    const onCloseCallback = jest.fn();
    const captionContent = 'caption content';
    const outsideButtonContent = 'outside button content';

    render(
      <>
        <PopupMenu caption={<button>{captionContent}</button>} onClose={onCloseCallback} />
        <button>{outsideButtonContent}</button>
      </>,
    );

    // Before we open menu the `onCloseCallback` should not be called
    expect(onCloseCallback).toHaveBeenCalledTimes(0);

    const button = screen.getByRole('button', { name: captionContent });
    userEvent.click(button);
    // After we open menu the `onCloseCallback` should still not be called
    expect(onCloseCallback).toHaveBeenCalledTimes(0);

    const outsideButton = screen.getByRole('button', { name: outsideButtonContent });
    userEvent.click(outsideButton);
    // After we close menu the `onCloseCallback` should be called once
    expect(onCloseCallback).toHaveBeenCalledTimes(1);
  });

  it('prop `popupMenuId` sets an `id` for root of the popup', () => {
    const menuId = 'menu';
    render(
      <PopupMenu caption={<button>test</button>} popupMenuId={menuId}>
        <p>test</p>
      </PopupMenu>,
    );
    userEvent.click(screen.getByRole('button'));

    const menu = screen.getByTestId(PopupDataTids.root);
    expect(menu).toHaveAttribute('id', menuId);
  });

  it('should set default value for aria-controls attribute', () => {
    render(
      <PopupMenu caption={<button>test</button>}>
        <p>test</p>
      </PopupMenu>,
    );
    const button = screen.getByRole('button');
    userEvent.click(screen.getByRole('button'));

    expect(button).toHaveAttribute('aria-controls', expect.stringContaining(PopupIds.root));
  });

  it('should set value for aria-controls attribute', () => {
    const ariaControls = 'test';
    render(<PopupMenu popupMenuId={ariaControls} caption={<button>test</button>} />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-controls', ariaControls);
  });

  it('should change value of aria-expanded when opening and closing', () => {
    render(<PopupMenu caption={<button>test</button>} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
