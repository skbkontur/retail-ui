import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('should have button', () => {
    render(<MenuItem>children</MenuItem>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should have disabled button', () => {
    render(<MenuItem disabled>children</MenuItem>);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have an interactive link', () => {
    render(<MenuItem href="#">children</MenuItem>);

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should have result of children function', () => {
    render(<MenuItem state={'hover'}>{(state) => state}</MenuItem>);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render passed component', () => {
    const Link = ({ to }: { to: string }) => <button aria-label={to}>{to}</button>;
    const Component = ({ href }: { href: string }) => <Link to={href} />;
    render(
      <MenuItem href="http:test.href" component={Component}>
        Testing component
      </MenuItem>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render comment', () => {
    const comment = 'comment';

    render(<MenuItem comment={comment}>children</MenuItem>);

    expect(screen.getByText(comment)).toBeInTheDocument();
  });
});
