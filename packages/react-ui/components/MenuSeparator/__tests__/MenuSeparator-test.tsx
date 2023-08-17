import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownMenu } from '../../DropdownMenu';
import { MenuItem } from '../../MenuItem';
import { Kebab, KebabDataTids } from '../../Kebab';
import { TooltipMenu } from '../../TooltipMenu';
import { MenuSeparator, MenuSeparatorDataTids } from '../MenuSeparator';
import { Select } from '../../Select';
import { ButtonDataTids } from '../../Button';

describe('MenuHeader', () => {
  const captionDatatid = 'captionForTest';
  const caption = <button data-tid={captionDatatid}>Test</button>;

  it('should render in DropdownMenu', async () => {
    render(
      <DropdownMenu caption={caption}>
        <MenuItem>Между нами есть разделитель</MenuItem>
        <MenuSeparator />
        <MenuItem>Между нами есть разделитель</MenuItem>
      </DropdownMenu>);

    userEvent.click(screen.getByTestId(captionDatatid));
    expect(screen.getByTestId(MenuSeparatorDataTids.root)).toBeInTheDocument();
  });

  it('should render in Kebab', async () => {
    render(
      <Kebab>
        <MenuItem>Между нами есть разделитель</MenuItem>
        <MenuSeparator />
        <MenuItem>Между нами есть разделитель</MenuItem>
      </Kebab>,
    );
    userEvent.click(screen.getByTestId(KebabDataTids.caption));
    expect(screen.getByTestId(MenuSeparatorDataTids.root)).toBeInTheDocument();
  });

  it('should render in TooltipMenu', async () => {
    render(
      <TooltipMenu caption={caption}>
        <MenuItem>Между нами есть разделитель</MenuItem>
        <MenuSeparator />
        <MenuItem>Между нами есть разделитель</MenuItem>
      </TooltipMenu>,
    );
    userEvent.click(screen.getByTestId(captionDatatid));
    expect(screen.getByTestId(MenuSeparatorDataTids.root)).toBeInTheDocument();
  });

  it('should render in Select', async () => {
    const items = ['One', 'Two', 'Three', Select.SEP, 'Four'];
    render(<Select items={items} />);

    userEvent.click(screen.getByTestId(ButtonDataTids.root));
    expect(screen.getByTestId(MenuSeparatorDataTids.root)).toBeInTheDocument();
  });
});
