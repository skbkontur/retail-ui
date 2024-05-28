import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { InternalMenu } from '../InternalMenu';
import { MenuItem, MenuItemDataTids } from '../../../components/MenuItem';

describe('Menu', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('calls existing refs of children when highlighted', () => {
    const refItem = jest.fn();
    render(
      <InternalMenu>
        <MenuItem ref={refItem} />
      </InternalMenu>,
    );

    // Highlight first item.
    fireEvent.keyDown(document, { key: 'ArrowDown' });

    expect(refItem.mock.calls).toHaveLength(1);
    expect(refItem.mock.calls[0][0]).toBeTruthy();
  });

  it('calls onClick on manually passed MenuItem', () => {
    const onClick = jest.fn();
    render(
      <InternalMenu>
        <MenuItem onClick={onClick}>
          <span data-click />
        </MenuItem>
      </InternalMenu>,
    );

    fireEvent.click(screen.getByTestId(MenuItemDataTids.root));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick on disabled MenuItem', () => {
    const onClick = jest.fn();
    render(
      <InternalMenu>
        <MenuItem onClick={onClick} disabled>
          <span data-click />
        </MenuItem>
      </InternalMenu>,
    );

    fireEvent.click(screen.getByTestId(MenuItemDataTids.root));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('calls onMouseEnter', () => {
    const onMouseEnter = jest.fn();
    render(
      <InternalMenu>
        <MenuItem onMouseEnter={onMouseEnter} />
      </InternalMenu>,
    );

    fireEvent.mouseEnter(screen.getByTestId(MenuItemDataTids.root));

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('calls onMouseLeave', () => {
    const onMouseLeave = jest.fn();
    render(
      <InternalMenu>
        <MenuItem onMouseLeave={onMouseLeave} />
      </InternalMenu>,
    );

    fireEvent.mouseLeave(screen.getByTestId(MenuItemDataTids.root));

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });
});
