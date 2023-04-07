import React from 'react';
import { render, screen } from '@testing-library/react';

import { Gapped, GappedDataTids } from '../';

describe('Gapped', () => {
  const defaultGap = 8;
  it("First child inside Gapped shouldn't contain margin-left", () => {
    render(
      <Gapped>
        {null}
        <div id="test-div-1" />
        <div id="test-div-2" />
      </Gapped>,
    );
    expect(document.getElementById('test-div-1')?.parentElement).not.toHaveStyle(`margin-left: ${defaultGap}px`);
    expect(document.getElementById('test-div-2')?.parentElement).toHaveStyle(`margin-left: ${defaultGap}px`);
  });

  it('Renders gapped with vertical prop', () => {
    render(
      <Gapped vertical>
        <div id="test-div-1" />
        <div id="test-div-2" />
      </Gapped>,
    );

    expect(screen.getByTestId(GappedDataTids.vertical)).toBeInTheDocument();
  });
  it('Renders gapped with horizontal layout by default', () => {
    render(
      <Gapped>
        <div id="test-div-1" />
        <div id="test-div-2" />
      </Gapped>,
    );

    expect(screen.getByTestId(GappedDataTids.horizontal)).toBeInTheDocument();
  });

  it('Renders horizontal orientated gap with given value', () => {
    const gap = 20;

    render(
      <Gapped gap={gap}>
        <div id="test-div-1" />
        <div id="test-div-2" />
      </Gapped>,
    );
    expect(document.getElementById('test-div-2')?.parentElement).toHaveStyle(`margin-left: ${gap}px`);
  });

  it('Renders vertical orientated gap with given value', () => {
    const gap = 20;

    render(
      <Gapped gap={gap} vertical>
        <div id="test-div-1" />
        <div id="test-div-2" />
      </Gapped>,
    );
    expect(document.getElementById('test-div-2')?.parentElement).toHaveStyle(`padding-top: ${gap}px`);
  });
});
