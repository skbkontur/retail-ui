import React from 'react';
import { render, screen } from '@testing-library/react';

import { Clickable } from '../Clickable';

describe('Clickable', () => {
  it('should render <a> tag', () => {
    render(
      <Clickable
        render={(props) => (
          <a {...props} href="/">
            link
          </a>
        )}
      />,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should provide access to ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <Clickable
        render={(props) => (
          <button ref={ref} {...props}>
            button
          </button>
        )}
      />,
    );

    expect(ref.current).toBeDefined();
  });
});
