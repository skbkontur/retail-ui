import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { PopupDataTids, PopupIds } from '../../../internal/Popup';
import { MenuItem } from '../../../components/MenuItem';
import { Kebab, KebabDataTids } from '../Kebab';

describe('Kebab', () => {
  it('prop `popupMenuId` sets an `id` for root of the popup', () => {
    const menuId = 'menu';
    render(
      <Kebab popupMenuId={menuId}>
        <p>test</p>
      </Kebab>,
    );
    userEvent.click(screen.getByTestId(KebabDataTids.caption));

    const menu = screen.getByTestId(PopupDataTids.root);
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

  describe('a11y', () => {
    it('passes value to aria-describedby prop', () => {
      const id = 'id';
      const description = 'description';
      render(
        <>
          <Kebab aria-describedby={id} />
          <p id={id}>description</p>
        </>,
      );

      const caption = screen.getByTestId(KebabDataTids.caption);
      expect(caption).toHaveAttribute('aria-describedby', id);
      expect(caption).toHaveAccessibleDescription(description);
    });

    it('should have an element with role="button"', () => {
      render(<Kebab />);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should connect dropdown with button through aria-controls', () => {
      render(
        <Kebab>
          <MenuItem>test</MenuItem>
        </Kebab>,
      );

      const button = screen.getByRole('button');
      userEvent.click(button);

      expect(button).toHaveAttribute('aria-controls', expect.stringContaining(PopupIds.root));
      expect(screen.getByTestId(PopupDataTids.root)).toHaveAttribute('id', expect.stringContaining(PopupIds.root));
    });

    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(
        <Kebab aria-label={ariaLabel}>
          <MenuItem>test</MenuItem>
        </Kebab>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-label');
    });
  });
});
