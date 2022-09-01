import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

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
});
