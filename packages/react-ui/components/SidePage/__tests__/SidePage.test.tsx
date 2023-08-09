import React from 'react';
import { render, screen } from '@testing-library/react';

import { SidePage, SidePageDataTids } from '../SidePage';
import { SidePageBodyDataTids } from '../SidePageBody';
import { SidePageHeaderDataTids } from '../SidePageHeader';
import { SidePageFooterDataTids } from '../SidePageFooter';
import { SidePageContainerDataTids } from '../SidePageContainer';

function renderSidePage() {
  return (
    <SidePage onClose={close} blockBackground>
      <SidePage.Header>Title</SidePage.Header>
      <SidePage.Body>
        <div
          style={{
            background: `repeating-linear-gradient(
                                60deg,
                                #808080,
                                #808080 20px,
                                #d3d3d3 20px,
                                #d3d3d3 40px
                              )`,
            height: 600,
            padding: '20px 0',
          }}
        >
          <SidePage.Container>
            <p>Use rxjs operators with react hooks</p>
          </SidePage.Container>
        </div>
      </SidePage.Body>
      <SidePage.Footer panel>Footer</SidePage.Footer>
    </SidePage>
  );
}
describe('SidePage', () => {
  it('should have `aria-modal` attribute set to `true`', () => {
    render(renderSidePage());

    expect(screen.getByTestId(SidePageDataTids.root)).toHaveAttribute('aria-modal', 'true');
  });

  it('should change role to `alertdialog`', () => {
    render(<SidePage role="alertdialog" />);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  it('passes correct value to `aria-label` attribute', () => {
    const label = 'label';
    render(<SidePage aria-label={label} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('should render sidePageHeader', () => {
    render(renderSidePage());
    expect(screen.getByTestId(SidePageHeaderDataTids.root)).toBeInTheDocument();
  });

  it('should render sidePageBody', () => {
    render(renderSidePage());
    expect(screen.getByTestId(SidePageBodyDataTids.root)).toBeInTheDocument();
  });

  it('should render sidePageFooter', () => {
    render(renderSidePage());
    expect(screen.getByTestId(SidePageFooterDataTids.root)).toBeInTheDocument();
  });
  it('should render sidePageContainter', () => {
    render(renderSidePage());
    expect(screen.getByTestId(SidePageContainerDataTids.root)).toBeInTheDocument();
  });
});
