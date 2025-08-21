import React from 'react';
import { fireEvent, act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { SidePage, SidePageDataTids } from '../SidePage';
import { SidePageHeaderDataTids } from '../SidePageHeader';
import { componentsLocales as SidePageLocalesEn } from '../locale/locales/en';
import { componentsLocales as SidePageLocalesRu } from '../locale/locales/ru';

describe('SidePage', () => {
  it('onClose event performs an action on click', async () => {
    const onClose = jest.fn();
    render(
      <SidePage onClose={onClose}>
        <SidePage.Header>Title</SidePage.Header>
      </SidePage>,
    );

    const closeButton = screen.getByTestId(SidePageHeaderDataTids.close);

    expect(onClose).not.toHaveBeenCalled();

    await userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('two sticky headers and scroll do not crash the page', async () => {
    const TestComponent = () => {
      const [innerSidePage, setInnerSidePage] = React.useState(false);
      return (
        <SidePage>
          <SidePage.Header sticky>Outer SidePageHeader</SidePage.Header>
          <SidePage.Body>
            <div style={{ height: 4000 }}>
              <button onClick={() => setInnerSidePage(true)}>open inner SidePage</button>
              {innerSidePage && (
                <SidePage>
                  <SidePage.Header sticky>Inner SidePageHeader</SidePage.Header>
                  <SidePage.Body>
                    <div style={{ height: 4000 }} />
                  </SidePage.Body>
                </SidePage>
              )}
            </div>
          </SidePage.Body>
        </SidePage>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('Outer SidePageHeader')).toBeInTheDocument();

    const outerScrollContainer = screen.getAllByTestId('SidePage__container').at(0);

    if (outerScrollContainer) {
      outerScrollContainer.scrollTop = 30; // scroll the outer SidePage a little to make its header fixed
    }

    expect(screen.getByText('Outer SidePageHeader')).toBeInTheDocument();

    act(() => {
      screen.getByText('open inner SidePage').click();
    });

    expect(screen.getByText('Inner SidePageHeader')).toBeInTheDocument();

    expect(() => {
      screen.getAllByTestId('SidePage__container')[1].scrollTop = 30; // scroll the inner SidePage a little to make its header fixed
    }).not.toThrow(); // in case of a too many Sticky rerenders this may crash the whole page by the 'Maximum update depth exceeded' error. @see IF-2317

    expect(screen.getByText('Inner SidePageHeader')).toBeInTheDocument();
  });

  it('should remove sticky position only after scrolling down', () => {
    render(
      <SidePage>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div style={{ height: '2000px' }} />
        </SidePage.Body>
      </SidePage>,
    );

    const container = screen.getByTestId('SidePage__container');
    const headerRoot = screen.getByTestId(SidePageHeaderDataTids.root);

    expect(headerRoot).toHaveStyle({ position: 'sticky' });
    fireEvent.scroll(container, { target: { scrollTop: 200 } });
    expect(headerRoot).not.toHaveStyle({ position: 'sticky' });
  });

  it('should maintain sticky position when nested element scrolled', () => {
    render(
      <SidePage>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div data-tid="scrollableElement" style={{ height: '500px', overflow: 'scroll' }}>
            <div style={{ height: '1000px' }}></div>
          </div>
          <div style={{ height: '2000px' }}></div>
        </SidePage.Body>
      </SidePage>,
    );

    const scrollableElement = screen.getByTestId('scrollableElement');
    const headerRoot = screen.getByTestId(SidePageHeaderDataTids.root);

    expect(headerRoot).toHaveStyle({ position: 'sticky' });
    fireEvent.scroll(scrollableElement, { target: { scrollTop: 200 } });
    expect(headerRoot).toHaveStyle({ position: 'sticky' });
  });

  describe('a11y', () => {
    it('should have `aria-modal` attribute set to `true`', () => {
      render(<SidePage />);

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

    it('has correct value on close button aria-label attribute (ru)', () => {
      render(
        <SidePage>
          <SidePage.Header />
        </SidePage>,
      );

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute(
        'aria-label',
        SidePageLocalesRu.closeButtonAriaLabel,
      );
    });

    it('has correct value on close button aria-label attribute (en)', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <SidePage>
            <SidePage.Header />
          </SidePage>
        </LocaleContext.Provider>,
      );

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute(
        'aria-label',
        SidePageLocalesEn.closeButtonAriaLabel,
      );
    });

    it('sets custom value for `closeButtonAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { SidePage: { closeButtonAriaLabel: customAriaLabel } } }}>
          <SidePage>
            <SidePage.Header />
          </SidePage>
        </LocaleContext.Provider>,
      );

      expect(screen.getByTestId(SidePageHeaderDataTids.close)).toHaveAttribute('aria-label', customAriaLabel);
    });
  });
});
