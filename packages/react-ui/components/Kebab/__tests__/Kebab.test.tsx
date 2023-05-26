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
});
