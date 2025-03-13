import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { Menu } from '../Menu';
import { MenuItem } from '../../../components/MenuItem';

describe('Menu', () => {
  it('calls existing refs of children when highlighted', () => {
    const refItem = jest.fn();
    render(
      <Menu>
        <MenuItem ref={refItem} />
      </Menu>,
    );

    // Highlight first item.
    fireEvent.keyDown(document, { key: 'ArrowDown' });

    expect(refItem.mock.calls).toHaveLength(1);
    expect(refItem.mock.calls[0][0]).toBeTruthy();
  });

  it('calls onClick on manually passed MenuItem', () => {
    const onClick = jest.fn();
    render(
      <Menu>
        <MenuItem onClick={onClick}>
          <span data-tid={'data-click'} />
        </MenuItem>
      </Menu>,
    );

    fireEvent.click(screen.getByTestId('data-click'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick on disabled MenuItem', () => {
    const onClick = jest.fn();
    render(
      <Menu>
        <MenuItem onClick={onClick} disabled>
          <span data-tid={'data-click'} />
        </MenuItem>
      </Menu>,
    );

    fireEvent.click(screen.getByTestId('data-click'));

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should set correct data-tid', () => {
    const customDataTid = 'custom-data-tid';
    render(
      <Menu data-tid={customDataTid}>
        <MenuItem>MenuItem</MenuItem>
      </Menu>,
    );

    expect(screen.getByTestId(customDataTid)).toBeInTheDocument();
  });
});
