import React from 'react';
import { render, screen } from '@testing-library/react';

import { CommonWrapper } from '../CommonWrapper';

describe('CommonWrapper', () => {
  it('common cases', () => {
    render(
      <CommonWrapper
        data-tid="CommonWrapper"
        data-selected
        disabled
        warning
        error
        hover={false}
        className="className"
        style={{ padding: 10 }}
      >
        <div>Children</div>
      </CommonWrapper>,
    );

    const element = screen.getByText('Children');
    expect(element).toHaveClass('className');
    expect(element).toHaveStyle('padding: 10px;');
    expect(element).toHaveAttribute('data-tid', 'CommonWrapper');
    expect(element).toHaveAttribute('data-selected', 'true');
    expect(element).toHaveAttribute('data-visual-state-error');
    expect(element).toHaveAttribute('data-visual-state-warning');
    expect(element).not.toHaveAttribute('data-visual-state-disabled');
    expect(element).not.toHaveAttribute('data-visual-state-hover');
  });
});
