import { render, screen } from '@testing-library/react';
import React from 'react';
import { expect } from 'vitest';

import { MaskOverlay } from '../MaskOverlay.js';

describe('MaskOverlay', () => {
  it('renders typed value when mask part is empty', () => {
    render(<MaskOverlay typedValue="12:34" displayValue="12:34" selectionStart={0} selectionEnd={0} />);

    expect(screen.getByTestId('masked-input-overlay')).toHaveTextContent('12:34');
  });

  it('highlights selected typed text', () => {
    render(<MaskOverlay typedValue="1234" displayValue="1234" selectionStart={1} selectionEnd={3} />);

    const overlay = screen.getByTestId('masked-input-overlay');
    expect(overlay).toHaveTextContent('1234');
    expect(overlay.childNodes).toHaveLength(3);
    expect(overlay.childNodes[1]).toHaveTextContent('23');
  });

  it('renders typed and mask parts when placeholders remain', () => {
    render(<MaskOverlay typedValue="12" displayValue="12:__" selectionStart={0} selectionEnd={0} />);

    const overlay = screen.getByTestId('masked-input-overlay');
    expect(overlay).toHaveTextContent('12:__');
    expect(overlay.firstChild).toHaveTextContent('12');
    expect(overlay.lastChild).toHaveTextContent(':__');
  });

  it('renders disabled and uncolored states', () => {
    render(
      <MaskOverlay typedValue="" displayValue="__:__" selectionStart={0} selectionEnd={0} disabled colored={false} />,
    );

    expect(screen.getByTestId('masked-input-overlay')).toBeInTheDocument();
  });
});
