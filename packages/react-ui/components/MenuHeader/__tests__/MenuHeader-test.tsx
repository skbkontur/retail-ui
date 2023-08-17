import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuHeader, MenuHeaderDataTids } from '../MenuHeader';
import { DropdownMenu } from '../../DropdownMenu';
import { MenuItem } from '../../MenuItem';
import { Kebab, KebabDataTids } from '../../Kebab';
import { TooltipMenu } from '../../TooltipMenu';

describe('MenuHeader', () => {
  const captionDatatid = 'captionForTest';
  const caption = <button data-tid={captionDatatid}>Test</button>;

  it('should render in DropdownMenu', async () => {
    render(
      <DropdownMenu caption={caption}>
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    userEvent.click(screen.getByTestId(captionDatatid));
    expect(screen.getByTestId(MenuHeaderDataTids.root)).toBeInTheDocument();
  });

  it('should render in Kebab', async () => {
    render(
      <Kebab>
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuItem>Test</MenuItem>
      </Kebab>,
    );
    userEvent.click(screen.getByTestId(KebabDataTids.caption));
    expect(screen.getByTestId(MenuHeaderDataTids.root)).toBeInTheDocument();
  });

  it('should render in TooltipMenu', async () => {
    render(
      <TooltipMenu caption={caption}>
        <MenuHeader>Заголовок меню</MenuHeader>
        <MenuItem>Test</MenuItem>
      </TooltipMenu>,
    );
    userEvent.click(screen.getByTestId(captionDatatid));
    expect(screen.getByTestId(MenuHeaderDataTids.root)).toBeInTheDocument();
  });
});
