import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

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
    render(<MenuItem state="hover">{(state) => state}</MenuItem>);
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
    it('calls once', () => {
      const onMouseEnter = jest.fn();
      render(
        <MenuItem onMouseEnter={onMouseEnter}>
          <span>MenuItem</span>
        </MenuItem>,
      );

      userEvent.hover(screen.getByRole('button'));
      userEvent.hover(screen.getByText('MenuItem'));
      userEvent.hover(screen.getByRole('button'));

      expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('calls again after onMouseLeave', () => {
      const onMouseEnter = jest.fn();
      render(<MenuItem onMouseEnter={onMouseEnter}>MenuItem</MenuItem>);

      userEvent.hover(screen.getByRole('button'));
      userEvent.unhover(screen.getByRole('button'));
      userEvent.hover(screen.getByRole('button'));

      expect(onMouseEnter.mock.calls).toHaveLength(2);
    });
  });
});
