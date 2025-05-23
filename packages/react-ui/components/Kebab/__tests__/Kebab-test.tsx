import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { PopupDataTids, PopupIds } from '../../../internal/Popup';
import { MenuItem } from '../../MenuItem';
import { Kebab, KebabDataTids } from '../Kebab';
import { delay } from '../../../lib/utils';

describe('Kebab', () => {
  it('prop `popupMenuId` sets an `id` for root of the popup', async () => {
    const menuId = 'menu';
    render(
      <Kebab popupMenuId={menuId}>
        <p>test</p>
      </Kebab>,
    );
    await userEvent.click(screen.getByTestId(KebabDataTids.caption));

    const menu = screen.getByTestId(PopupDataTids.root);
    expect(menu).toHaveAttribute('id', menuId);
  });

  it('has id attribute', () => {
    const kebabId = 'kebabId';
    const result = render(<Kebab id={kebabId} />);
    expect(result.container.querySelector(`#${kebabId}[role="button"]`)).not.toBeNull();
  });

  it('should focus by pressing tab', async () => {
    render(<Kebab />);
    await userEvent.tab();

    const kebab = screen.getByTestId(KebabDataTids.caption);
    expect(kebab).toHaveFocus();
  });

  it('should handle blur by pressing tab', async () => {
    render(<Kebab />);
    await userEvent.tab();

    const kebab = screen.getByTestId(KebabDataTids.caption);
    expect(kebab).toHaveFocus();

    await userEvent.tab();
    expect(kebab).not.toHaveFocus();
  });

  it('should close by pressing escape', async () => {
    const content = 'Kebab content';
    render(<Kebab>{content}</Kebab>);

    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByText(content)).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');

    const kebab = screen.getByTestId(KebabDataTids.caption);
    await delay(1000);
    expect(kebab).toHaveFocus();

    expect(screen.queryByText(content)).not.toBeInTheDocument();
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

    it('should connect dropdown with button through aria-controls', async () => {
      render(
        <Kebab>
          <MenuItem>test</MenuItem>
        </Kebab>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

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
