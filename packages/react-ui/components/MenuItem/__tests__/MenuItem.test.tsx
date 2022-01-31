import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('has button', () => {
    const children = 'children';

    const { getByRole } = render(<MenuItem>{children}</MenuItem>);

    getByRole('button', { name: children });
  });

  it('has disabled button', () => {
    const { getByRole } = render(<MenuItem disabled>children</MenuItem>);

    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('has an interactive link', () => {
    const children = 'children';

    const { getByRole } = render(<MenuItem href="#">{children}</MenuItem>);

    getByRole('link', { name: children });
  });

  it('should have result of children function', () => {
    const state = 'hover';

    const { getByRole } = render(<MenuItem state={state}>{(state) => state}</MenuItem>);

    getByRole('button', { name: state });
  });

  it('should render passed component', () => {
    const href = 'http:test.href';

    const Link = ({ to }: { to: string }) => <button aria-label={to}>{to}</button>;
    const Component = ({ href }: { href: string }) => <Link to={href} />;
    const { getByRole } = render(
      <MenuItem href={href} component={Component}>
        Testing component
      </MenuItem>,
    );

    getByRole('button', { name: href });
  });

  it('should render comment', () => {
    const comment = 'comment';

    const { getByText } = render(<MenuItem comment={comment}>children</MenuItem>);

    getByText(comment);
  });
});
