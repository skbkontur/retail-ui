import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PopupDataTids } from '../../../internal/Popup';
import { DropdownMenu } from '../DropdownMenu';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';
import { MenuDataTids } from '../../../internal/Menu';
import { delay } from '../../../lib/utils';

describe('<DropdownMenu />', () => {
  const captionDatatid = 'captionForTest';
  const caption = <button data-tid={captionDatatid}>Test</button>;

  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('Render without crashes', () => {
    const renderDropdownMenu = () => render(<DropdownMenu caption={caption} />);
    expect(renderDropdownMenu).not.toThrow();
  });

  it('has id attribute', () => {
    const dropdownMenuId = 'dropdownMenuId';
    const result = render(<DropdownMenu id={dropdownMenuId} caption={caption} />);
    expect(result.container.querySelector(`button#${dropdownMenuId}`)).not.toBeNull();
  });

  it('Throw, if caption is not passed', () => {
    const renderNoCaption = () => render(<DropdownMenu caption={undefined} />);
    expect(renderNoCaption).toThrow();
  });

  it('Contains <Menu /> after clicking on caption', async () => {
    render(
      <DropdownMenu caption={caption}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
  });

  it("Contains <MenuItem />'s after clicking on caption", async () => {
    render(
      <DropdownMenu caption={caption}>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getAllByTestId(MenuItemDataTids.root)).toHaveLength(3);
  });

  it('Click handler on menu item should be called before closing', async () => {
    const onClick = jest.fn();

    render(
      <DropdownMenu caption={caption}>
        <MenuItem onClick={onClick}>Test</MenuItem>
      </DropdownMenu>,
    );
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId(MenuItemDataTids.root));
    expect(onClick).toHaveBeenCalled();
  });

  it('Fire onOpen and onClose when open and close dropdown', async () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    render(
      <DropdownMenu caption={caption} onOpen={onOpen} onClose={onClose}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    // open
    await userEvent.click(screen.getByTestId(captionDatatid));
    expect(onOpen.mock.calls).toHaveLength(1);

    // close
    await userEvent.click(screen.getByTestId(MenuItemDataTids.root));
    expect(onClose.mock.calls).toHaveLength(1);
  });

  it('Renders header', async () => {
    const testHeader = 'testHeader';
    render(
      <DropdownMenu caption={caption} header={<div data-tid={testHeader}>Test header</div>}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByTestId(captionDatatid));
    expect(screen.getByTestId(testHeader)).toBeInTheDocument();
  });

  it('Renders footer', async () => {
    const testFooter = 'testFooter';
    render(
      <DropdownMenu caption={caption} footer={<div data-tid={testFooter}>Test header</div>}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    await userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByTestId(testFooter)).toBeInTheDocument();
  });

  it('Public method open() works', () => {
    const dropdownMenuRef = React.createRef<DropdownMenu>();

    render(
      <DropdownMenu caption={caption} ref={dropdownMenuRef}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    act(() => {
      dropdownMenuRef.current?.open();
    });
    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
  });

  it('Public method close() works', async () => {
    const dropdownMenuRef = React.createRef<DropdownMenu>();

    render(
      <DropdownMenu caption={caption} ref={dropdownMenuRef}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    await userEvent.click(screen.getByTestId(captionDatatid));

    act(() => {
      dropdownMenuRef.current?.close();
    });
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
  });

  it('prop `popupMenuId` sets an `id` for root of the popup', async () => {
    const menuId = 'menu';
    render(
      <DropdownMenu caption={<button>test</button>} popupMenuId={menuId}>
        <p>test</p>
      </DropdownMenu>,
    );
    await userEvent.click(screen.getByRole('button'));

    const menu = screen.getByTestId(PopupDataTids.root);
    expect(menu).toHaveAttribute('id', menuId);
  });

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<DropdownMenu aria-label={ariaLabel} caption={<button>test</button>} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('with not selectable menu item', () => {
    beforeEach(() =>
      render(
        <DropdownMenu caption={caption}>
          <MenuItem>one</MenuItem>
          <MenuItem data-tid={'menuItem2'} isNotSelectable>
            two
          </MenuItem>
          <MenuItem data-tid={'menuItem3'}>three</MenuItem>
        </DropdownMenu>,
      ),
    );
    it("doesn't highlight a not selectable MenuItem", async () => {
      await userEvent.click(screen.getByTestId(captionDatatid));
      await userEvent.keyboard('{arrowdown}');
      await userEvent.keyboard('{arrowdown}');
      await delay(0);
      expect(screen.getByTestId('menuItem2')).not.toHaveAttribute('data-visual-state-hover');
      expect(screen.getByTestId('menuItem3')).toHaveAttribute('data-visual-state-hover');
    });

    it("doesn't click on a not selectable MenuItem", async () => {
      await userEvent.click(screen.getByTestId(captionDatatid));
      await userEvent.click(screen.getByTestId('menuItem2'));
      await delay(0);
      expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
    });
  });
});
