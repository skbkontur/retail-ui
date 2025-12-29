import React from 'react';
import { render, screen } from '@testing-library/react';

import { RenderInnerContainer } from '../RenderInnerContainer';

describe('<RenderInnerContainer />', () => {
  const rootId = 'test-root-id';

  it('should render anchor content', () => {
    const anchor = <div data-tid="anchor">Anchor Content</div>;
    render(
      <RenderInnerContainer anchor={anchor} domContainer={null} rootId={rootId}>
        {null}
      </RenderInnerContainer>,
    );

    expect(screen.getByTestId('anchor')).toBeInTheDocument();
  });

  it('should render children inside a portal', () => {
    const domContainer = document.createElement('div');
    document.body.appendChild(domContainer);

    render(
      <RenderInnerContainer anchor={<div>Anchor</div>} domContainer={domContainer} rootId={rootId}>
        <div data-tid="portal-content">Portal Content</div>
      </RenderInnerContainer>,
    );

    const portalContent = screen.getByTestId('portal-content');
    expect(domContainer).toContainElement(portalContent);

    document.body.removeChild(domContainer);
  });

  it('should apply brand, accent and theme KonturColor attributes to domContainer', () => {
    const domContainer = document.createElement('div');
    const brand = 'blue';
    const accent = 'brand';
    const theme = 'dark';

    render(
      <div data-k-brand={brand} data-k-accent={accent} data-k-theme={theme}>
        <RenderInnerContainer anchor={<div>Anchor</div>} domContainer={domContainer} rootId={rootId}>
          <div>Child</div>
        </RenderInnerContainer>
      </div>,
    );

    expect(domContainer).toHaveAttribute('data-k-brand', brand);
    expect(domContainer).toHaveAttribute('data-k-accent', accent);
    expect(domContainer).toHaveAttribute('data-k-theme', theme);
  });

  it('should update attributes on domContainer when they change', () => {
    const domContainer = document.createElement('div');
    const { rerender } = render(
      <div data-k-brand="blue" data-k-accent="brand" data-k-theme="dark">
        <RenderInnerContainer anchor={<div>Anchor</div>} domContainer={domContainer} rootId={rootId}>
          <div>Child</div>
        </RenderInnerContainer>
      </div>,
    );

    expect(domContainer).toHaveAttribute('data-k-brand', 'blue');
    expect(domContainer).toHaveAttribute('data-k-accent', 'brand');
    expect(domContainer).toHaveAttribute('data-k-theme', 'dark');

    rerender(
      <div data-k-brand="red" data-k-theme="dark">
        <RenderInnerContainer anchor={<div>Anchor</div>} domContainer={domContainer} rootId={rootId}>
          <div>Child</div>
        </RenderInnerContainer>
      </div>,
    );

    expect(domContainer).toHaveAttribute('data-k-brand', 'red');
    expect(domContainer).toHaveAttribute('data-k-accent', 'brand');
    expect(domContainer).toHaveAttribute('data-k-theme', 'dark');
  });

  it('should render SSRPlaceholder when domContainer is null', () => {
    const { container } = render(
      <RenderInnerContainer anchor={<div>Anchor</div>} domContainer={null} rootId={rootId}>
        <div data-tid="child">Child</div>
      </RenderInnerContainer>,
    );

    expect(container.querySelector('script[data-id="ssr-placeholder"]')).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });
});
