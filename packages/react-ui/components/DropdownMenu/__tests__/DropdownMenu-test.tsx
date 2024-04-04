import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PopupDataTids } from '../../../internal/Popup';
import { DropdownMenu } from '../DropdownMenu';
import { MenuItem, MenuItemDataTids } from '../../MenuItem';
import { MenuDataTids } from '../../../internal/Menu';
import { ReactUIFeatureFlagsContext } from '../../../lib/featureFlagsContext';
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

  it('Throw, if caption is not passed', () => {
    const renderNoCaption = () => render(<DropdownMenu caption={undefined} />);
    expect(renderNoCaption).toThrow();
  });

  it('Contains <Menu /> after clicking on caption', () => {
    render(
      <DropdownMenu caption={caption}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    expect(screen.queryByTestId(MenuDataTids.root)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
  });

  it("Contains <MenuItem />'s after clicking on caption", () => {
    render(
      <DropdownMenu caption={caption}>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getAllByTestId(MenuItemDataTids.root)).toHaveLength(3);
  });

  it('Click handler on menu item should be called before closing', () => {
    const onClick = jest.fn();

    render(
      <DropdownMenu caption={caption}>
        <MenuItem onClick={onClick}>Test</MenuItem>
      </DropdownMenu>,
    );
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(MenuItemDataTids.root));
    expect(onClick).toHaveBeenCalled();
  });

  it('Fire onOpen and onClose when open and close dropdown', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    render(
      <DropdownMenu caption={caption} onOpen={onOpen} onClose={onClose}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    // open
    userEvent.click(screen.getByTestId(captionDatatid));
    expect(onOpen.mock.calls).toHaveLength(1);

    // close
    userEvent.click(screen.getByTestId(MenuItemDataTids.root));
    expect(onClose.mock.calls).toHaveLength(1);
  });

  it('Renders header', () => {
    const testHeader = 'testHeader';
    render(
      <DropdownMenu caption={caption} header={<div data-tid={testHeader}>Test header</div>}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    userEvent.click(screen.getByTestId(captionDatatid));
    expect(screen.getByTestId(testHeader)).toBeInTheDocument();
  });

  it('Renders footer', () => {
    const testFooter = 'testFooter';
    render(
      <DropdownMenu caption={caption} footer={<div data-tid={testFooter}>Test header</div>}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    userEvent.click(screen.getByTestId(captionDatatid));

    expect(screen.getByTestId(testFooter)).toBeInTheDocument();
  });

  it('Public method open() works', () => {
    const dropdownMenuRef = React.createRef<DropdownMenu>();

    render(
      <DropdownMenu caption={caption} ref={dropdownMenuRef}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );

    dropdownMenuRef.current?.open();
    expect(screen.getByTestId(MenuItemDataTids.root)).toBeInTheDocument();
  });

  it('Public method close() works', () => {
    const dropdownMenuRef = React.createRef<DropdownMenu>();

    render(
      <DropdownMenu caption={caption} ref={dropdownMenuRef}>
        <MenuItem>Test</MenuItem>
      </DropdownMenu>,
    );
    userEvent.click(screen.getByTestId(captionDatatid));

    dropdownMenuRef.current?.close();
    expect(screen.queryByTestId(MenuItemDataTids.root)).not.toBeInTheDocument();
  });

  it('prop `popupMenuId` sets an `id` for root of the popup', () => {
    const menuId = 'menu';
    render(
      <DropdownMenu caption={<button>test</button>} popupMenuId={menuId}>
        <p>test</p>
      </DropdownMenu>,
    );
    userEvent.click(screen.getByRole('button'));

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
    const featureFlagValues = [true, false];
    describe.each(featureFlagValues)('%s', (flagValue) => {
      beforeEach(() =>
        render(
          <ReactUIFeatureFlagsContext.Provider value={{ menuItemsAtAnyLevel: flagValue }}>
            <DropdownMenu caption={caption}>
              <MenuItem>one</MenuItem>
              <MenuItem data-tid={'menuItem2'} isNotSelectable>
                two
              </MenuItem>
              <MenuItem data-tid={'menuItem3'}>three</MenuItem>
            </DropdownMenu>
          </ReactUIFeatureFlagsContext.Provider>,
        ),
      );
      it("doesn't highlight a not selectable MenuItem", async () => {
        userEvent.click(screen.getByTestId(captionDatatid));
        userEvent.keyboard('{arrowdown}');
        userEvent.keyboard('{arrowdown}');
        await delay(0);
        expect(screen.getByTestId('menuItem2')).not.toHaveAttribute('data-visual-state-hover', 'true');
        expect(screen.getByTestId('menuItem3')).toHaveAttribute('data-visual-state-hover', 'true');
      });

      it("doesn't click on a not selectable MenuItem", async () => {
        userEvent.click(screen.getByTestId(captionDatatid));
        userEvent.click(screen.getByTestId('menuItem2'));
        await delay(0);
        expect(screen.getByTestId(MenuDataTids.root)).toBeInTheDocument();
      });
    });
  });
});
