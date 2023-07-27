import React from 'react';
import { render, screen } from '@testing-library/react';

import { Token, TokenDataTids } from '../Token';

describe('Token', () => {
  it('handles onRemove event', () => {
    const onRemove = jest.fn();

    render(
      <div>
        <Token onRemove={onRemove} />
      </div>,
    );
    const removeIcon = screen.getByTestId(TokenDataTids.removeIcon);
    removeIcon.click();
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('dont call onRemove event if token disabled', () => {
    const onRemove = jest.fn();

    render(
      <div>
        <Token onRemove={onRemove} disabled />
      </div>,
    );
    const removeIcon = screen.getByTestId(TokenDataTids.removeIcon);
    removeIcon.click();
    expect(onRemove).not.toHaveBeenCalled();
  });

  describe('a11y', () => {
    it('props aria-describedby applied correctly', () => {
      render(
        <div>
          <Token aria-describedby="elementId" />
          <p id="elementId">Description</p>
        </div>,
      );
      const token = screen.getByTestId(TokenDataTids.root);
      expect(token).toHaveAttribute('aria-describedby', 'elementId');
      expect(token).toHaveAccessibleDescription('Description');
    });

    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<Token aria-label={ariaLabel} />);

      expect(screen.getByRole('button')).toHaveAttribute('aria-label', ariaLabel);
    });
  });
});
