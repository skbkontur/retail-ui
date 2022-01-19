import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('has button', () => {
    const { getByRole } = render(<MenuItem>children</MenuItem>);

    getByRole('button', { name: 'children' });
  });

  it('has disabled button', () => {
    const { getByRole } = render(<MenuItem disabled>children</MenuItem>);

    const button = getByRole('button');
    expect(button).toBeDisabled();
  });

  it('has an interactive link', () => {
    const { getByRole } = render(<MenuItem href="#">children</MenuItem>);

    getByRole('link', { name: 'children' });
  });

  it('has result of children function', () => {
    const { getByRole } = render(<MenuItem state="hover">{(state) => state}</MenuItem>);

    getByRole('button', { name: 'hover' });
  });

  it('renders passed component', () => {
    const Link = ({ to }: { to: string }) => <button aria-label={to}>{to}</button>;
    const Component = ({ href }: { href: string }) => <Link to={href} />;

    const { getByRole } = render(
      <MenuItem href="http:test.href" component={Component}>
        Testing component
      </MenuItem>,
    );

    getByRole('button', { name: 'http:test.href' });
  });
});
