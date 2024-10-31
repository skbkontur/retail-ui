import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown, DropdownDataTids } from '../Dropdown';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';

describe('Dropdown', () => {
  const captionText = 'Open';
  const captionDatatid = 'test-caption';
  const caption = <span data-tid={captionDatatid}>{captionText}</span>;

  const menuItemText = 'Menu item';
  const menuItem = <MenuItem>{menuItemText}</MenuItem>;

  it('renders Dropdown', () => {
    render(
      <Dropdown caption="button">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>,
    );
    expect(screen.getByTestId(DropdownDataTids.root)).toBeInTheDocument();
  });

  it('has id attribute', () => {
    const dropdownId = 'dropdownId';
    const result = render(
      <Dropdown id={dropdownId} caption="button">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>,
    );
    expect(result.container.querySelector(`button#${dropdownId}`)).not.toBeNull();
  });

  it('Renders caption', () => {
    render(<Dropdown caption={caption}>{menuItem}</Dropdown>);

    expect(screen.getByTestId(DropdownDataTids.root)).toBeInTheDocument();
  });

  it('Renders items', async () => {
    render(<Dropdown caption={caption}>{menuItem}</Dropdown>);

    await userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByText(menuItemText)).toBeInTheDocument();
  });

  it('opens and closes', async () => {
    render(<Dropdown caption={caption}>{menuItem}</Dropdown>);
    //is menu open check
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId(captionDatatid));
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Dropdown caption="button" aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const dropdown = screen.getByRole('button');
      expect(dropdown).toHaveAttribute('aria-describedby', 'elementId');
      expect(dropdown).toHaveAccessibleDescription('Description');
    });

    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<Dropdown caption="button" aria-label={ariaLabel} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  it('method open works', () => {
    const dropdownRef = React.createRef<Dropdown>();

    render(
      <Dropdown caption={caption} ref={dropdownRef}>
        {menuItem}
      </Dropdown>,
    );
    //is menu open check
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    act(() => {
      dropdownRef.current?.open();
    });
    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
  });

  it('method close works', () => {
    const dropdownRef = React.createRef<Dropdown>();

    render(
      <Dropdown caption={caption} ref={dropdownRef}>
        {menuItem}
      </Dropdown>,
    );
    //is menu open check
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
    act(() => {
      dropdownRef.current?.open();
    });
    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
    act(() => {
      dropdownRef.current?.close();
    });
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
  });
});
