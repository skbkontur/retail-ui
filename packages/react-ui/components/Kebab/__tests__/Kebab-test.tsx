import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { PopupMenuDataTids } from '../../../internal/PopupMenu';
import { Kebab, KebabDataTids } from '../Kebab';

describe('Kebab', () => {
  it('prop `popupMenuId` sets an `id` for root of the popup', () => {
    const menuId = 'menu';
    render(<Kebab popupMenuId={menuId} />);
    userEvent.click(screen.getByTestId(KebabDataTids.caption));

    const menu = screen.getByTestId(PopupMenuDataTids.root);
    expect(menu).toHaveAttribute('id', menuId);
  });

  it('should focus by pressing tab', () => {
    render(<Kebab />);
    userEvent.tab();

    const kebab = screen.getByTestId(KebabDataTids.caption);
    expect(kebab).toHaveFocus();
  });

  it('should handle blur by pressing tab', () => {
    render(<Kebab />);
    userEvent.tab();

    const kebab = screen.getByTestId(KebabDataTids.caption);
    expect(kebab).toHaveFocus();

    userEvent.tab();
    expect(kebab).not.toHaveFocus();
  });
});
