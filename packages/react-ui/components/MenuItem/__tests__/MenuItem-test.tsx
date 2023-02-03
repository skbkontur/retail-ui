import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('renders multiple children', () => {
    const wrapper = mount(
      <MenuItem state="hover">
        a<i>b</i>
      </MenuItem>,
    );
    expect(wrapper.text()).toBe('ab');
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
    const wrapper = mount(<MenuItem state="hover">{(state) => state}</MenuItem>);
    expect(wrapper.text()).toBe('hover');
  });

  it('renders button tag', () => {
    const wrapper = mount(<MenuItem>Test item</MenuItem>);
    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('pass component', () => {
    const FakeRouterLink = ({ to }: { to: string }) => <span>{to}</span>;

    const Component = ({ href }: { href: string }) => <FakeRouterLink to={href} />;

    const wrapper = mount(
      <MenuItem href="http:test.href" component={Component}>
        Testing component
      </MenuItem>,
    );

    expect(wrapper.contains(<span>http:test.href</span>)).toBe(true);
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
      const wrapper = mount(<MenuItem onMouseEnter={onMouseEnter}>MenuItem</MenuItem>);

      wrapper.find('button').simulate('mouseover').simulate('mouseleave').simulate('mouseover');

      expect(onMouseEnter.mock.calls).toHaveLength(2);
    });
  });
});
