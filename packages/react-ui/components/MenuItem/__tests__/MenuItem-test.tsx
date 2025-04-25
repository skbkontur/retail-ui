import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { Menu } from '../../../internal/Menu';
import type { MenuItemState } from '../MenuItem';
import { MenuItem, MenuItemDataTids } from '../MenuItem';

describe('MenuItem', () => {
  it('renders multiple children', () => {
    render(
      <MenuItem state="hover">
        a<i>b</i>
      </MenuItem>,
    );
    expect(screen.getByTestId(MenuItemDataTids.root)).toHaveTextContent('ab');
  });

  it('has id attribute', () => {
    const menuItemId = 'menuItemId';
    const result = render(<MenuItem id={menuItemId} />);
    expect(result.container.querySelector(`#${menuItemId}`)).not.toBeNull();
  });

  it('without href does not has a rel attribute', () => {
    render(<MenuItem rel={'noopener'}>Test</MenuItem>);
    expect(screen.queryByRole('button')).not.toHaveAttribute('rel');
  });

  it('with href has a rel attribute', () => {
    render(
      <MenuItem href={'#'} rel={'noopener'}>
        Test
      </MenuItem>,
    );
    expect(screen.queryByRole('link')).toHaveAttribute('rel');
  });

  it('with external link has rel attribute', () => {
    render(<MenuItem href={'https://www.google.com/'}>Test</MenuItem>);
    expect(screen.queryByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('with external link can rewrite default rel attribute', () => {
    render(
      <MenuItem href={'https://www.google.com/'} rel={'alternate'}>
        Test
      </MenuItem>,
    );
    expect(screen.queryByRole('link')).toHaveAttribute('rel', 'alternate');
  });

  it('calls children function', () => {
    render(<MenuItem state="hover">{(state) => state?.toString()}</MenuItem>);
    expect(screen.getByTestId(MenuItemDataTids.root)).toHaveTextContent('hover');
  });

  it('renders button tag', () => {
    render(<MenuItem>Test item</MenuItem>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('pass component', () => {
    const FakeRouterLink = ({ to }: { to: string }) => <span>{to}</span>;

    const Component = ({ href }: { href: string }) => <FakeRouterLink to={href} />;
    render(
      <MenuItem href="http:test.href" component={Component}>
        Testing component
      </MenuItem>,
    );
    expect(document.body).toContainHTML('<span>http:test.href</span>');
  });

  it('should render disabled <button/>', () => {
    render(<MenuItem disabled />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render disabled <button/> when `component` prop passed', () => {
    render(<MenuItem component={(props) => <button {...props} />} disabled />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has correct data-tid', () => {
    const customDataTid = 'custom-data-tid';
    render(<MenuItem data-tid={customDataTid} />);

    expect(screen.getByTestId(customDataTid)).toBeInTheDocument();
  });

  it('should pass state to functional children when highlighted by Menu', () => {
    const renderChild = jest.fn((state: MenuItemState) => <div>{`${state}`}</div>);
    render(
      <Menu initialSelectedItemIndex={0}>
        <MenuItem>{renderChild}</MenuItem>
      </Menu>,
    );

    expect(renderChild).toHaveBeenCalledWith('hover');
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <MenuItem aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const menuItem = screen.getByRole('button');
      expect(menuItem).toHaveAttribute('aria-describedby', 'elementId');
      expect(menuItem).toHaveAccessibleDescription('Description');
    });

    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<MenuItem aria-label={ariaLabel} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('onMouseEnter', () => {
    it('calls once', async () => {
      const onMouseEnter = jest.fn();
      render(
        <MenuItem onMouseEnter={onMouseEnter}>
          <span>MenuItem</span>
        </MenuItem>,
      );

      await userEvent.hover(screen.getByRole('button'));
      await userEvent.hover(screen.getByText('MenuItem'));
      await userEvent.hover(screen.getByRole('button'));

      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('calls again after onMouseLeave', async () => {
      const onMouseEnter = jest.fn();
      render(<MenuItem onMouseEnter={onMouseEnter}>MenuItem</MenuItem>);

      await userEvent.hover(screen.getByRole('button'));
      await userEvent.unhover(screen.getByRole('button'));
      await userEvent.hover(screen.getByRole('button'));

      expect(onMouseEnter.mock.calls).toHaveLength(2);
    });
  });
});
