//import { mount } from 'enzyme';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dropdown, DropdownDataTids } from '../Dropdown';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';
import { Select, SelectState } from '../../Select';

describe('Dropdown', () => {
  const caption = <span id="test-caption">Open</span>;
  const menuItem = <MenuItem>Menu item</MenuItem>;

  it('renders', () => {
    render(
      <Dropdown caption="button">
        <MenuItem>Menu item</MenuItem>
      </Dropdown>,
    );

    expect(screen.getByTestId(DropdownDataTids.root)).toBeInTheDocument();
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

  // it('Pass props to select', () => {
  //   const wrapper = mount(<Dropdown caption={caption}>{menuItem}</Dropdown>);

  //   const select = wrapper.find(Select);

  //   expect(select.prop('value')).toEqual(caption);
  //   expect(select.prop('items')).toHaveLength(1);

  //   expect(React.isValidElement(select.prop<React.ReactChild[]>('items')[0])).toBeTruthy();
  // });

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
