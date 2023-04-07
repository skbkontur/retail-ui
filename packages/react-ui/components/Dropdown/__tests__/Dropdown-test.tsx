import React from 'react';
import { render, screen } from '@testing-library/react';
import { jsxText } from '@babel/types';

import { Dropdown, DropdownDataTids } from '../Dropdown';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';
import { Select, SelectState } from '../../Select';

describe('Dropdown', () => {
  const captionText = "Open";
  const caption = <span id="test-caption">{captionText}</span>;
  const menuItemText = "Menu item";
  const menuItem = <MenuItem>{menuItemText}</MenuItem>;

  it('renders Dropdown', () => {
    render(
      <Dropdown caption="button">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>,
    );
    expect(screen.getByTestId(DropdownDataTids.root)).toBeInTheDocument();
  });

  it('Renders caption', () => {
    render(<Dropdown caption={caption}>{menuItem}</Dropdown>);

    document.getElementById('test-caption')?.click();

    expect(document.getElementById('test-caption')).toBeInTheDocument();
    expect(document.getElementById('test-caption')).toHaveTextContent(captionText);
  });

  it('Renders items', () => {
    render(<Dropdown caption={caption}>{menuItem}</Dropdown>);

    document.getElementById('test-caption')?.click();

    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
    expect(screen.getByTestId(MenuItemDataTids.root)).toHaveTextContent(menuItemText);
  });

  it('opens and closes', () => {
    render(<Dropdown caption={caption}>{menuItem}</Dropdown>);
    //is menu open check
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    document.getElementById('test-caption')?.click();

    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();

    document.getElementById('test-caption')?.click();
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
  });

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

  it('method open works', () => {
    const dropdownRef = React.createRef<Dropdown>();

    render(<Dropdown caption={caption} ref={dropdownRef}>{menuItem}</Dropdown>);
    //is menu open check
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    dropdownRef.current?.open();
    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
  });

  it('method close works', () => {
    const dropdownRef = React.createRef<Dropdown>();

    render(<Dropdown caption={caption} ref={dropdownRef}>{menuItem}</Dropdown>);
    //is menu open check
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    dropdownRef.current?.open();
    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();

    dropdownRef.current?.close();
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
  });
});
