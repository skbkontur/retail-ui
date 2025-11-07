import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';

import { PopupDataTids } from '..';
import { MobilePopupDataTids } from '../../MobilePopup';
import type { InstanceWithRootNode } from '../../../lib/rootNode';
import type { PopupProps } from '../Popup';
import { Popup } from '../Popup';
import { delay } from '../../../lib/utils';
import { LIGHT_THEME } from '../../../lib/theming/themes/LightTheme';

describe('Popup', () => {
  vi.setConfig({ testTimeout: 10000 });

  it('по дефолту открывается в первой переданной позиции', async () => {
    const anchor = document.createElement('button');

    const { rerender } = render(
      <Popup positions={['bottom right', 'top left', 'top right', 'bottom left']} opened={false} anchorElement={anchor}>
        Test content
      </Popup>,
    );

    act(() => {
      rerender(
        <Popup positions={['bottom right', 'top left', 'top right', 'bottom left']} opened anchorElement={anchor}>
          Test content
        </Popup>,
      );
    });
    await delay(100);
    expect(screen.getByTestId(PopupDataTids.root)).toHaveAttribute('data-visual-state-position-bottom-right');
  });

  it('одна и та же позиция при каждом открытии', async () => {
    const anchor = document.createElement('button');

    anchor.id = 'test-id';
    anchor.innerHTML = 'test';
    anchor.style.setProperty('margin', '0 0 100px 0');

    const { rerender } = render(
      <Popup
        positions={['top left', 'top right', 'bottom left', 'bottom right']}
        opened={false}
        anchorElement={anchor}
        popupOffset={20}
      >
        Test content
      </Popup>,
    );

    expect(screen.queryByTestId(PopupDataTids.root)).not.toBeInTheDocument();

    const check = async () => {
      act(() => {
        rerender(
          <Popup
            positions={['top left', 'top right', 'bottom left', 'bottom right']}
            opened
            anchorElement={anchor}
            popupOffset={20}
          >
            Test content
          </Popup>,
        );
      });
      await delay(100);
      expect(screen.getByTestId(PopupDataTids.root)).toHaveAttribute('data-visual-state-position-bottom-right');
      act(() => {
        rerender(
          <Popup
            positions={['top left', 'top right', 'bottom left', 'bottom right']}
            opened={false}
            anchorElement={anchor}
            popupOffset={20}
          >
            Test content
          </Popup>,
        );
      });
    };

    const checkLocation = async () => {
      for (let i = 0; i < 11; i++) {
        await check();
      }
    };

    await checkLocation();
  });
});

describe('rootNode', () => {
  const popupRef = React.createRef<Popup & InstanceWithRootNode>();

  const TestPopup = ({ opened }: Pick<PopupProps, 'opened'>) => {
    const anchor = <button />;

    return (
      <Popup
        positions={['bottom left', 'bottom right', 'top left', 'top right']}
        opened={opened}
        anchorElement={anchor}
        disableAnimations
        ref={popupRef}
      >
        Test content
      </Popup>
    );
  };

  const testRootNode = (
    Component: ({ opened }: Pick<PopupProps, 'opened'>) => JSX.Element,
    popupRef: React.RefObject<Popup & InstanceWithRootNode>,
    dataTid: string,
  ) => {
    it('is null by default when closed and getRootNode is defined', () => {
      render(<Component opened={false} />);

      expect(popupRef.current?.getRootNode).toBeDefined();

      const rootNode = popupRef.current?.getRootNode();
      expect(popupRef.current).not.toBeNull();
      expect(rootNode).toBeNull();
    });

    it('is content container when opened and is null when closed', async () => {
      const { rerender } = render(<Component opened />);

      const contentContainer = await screen.findByTestId(dataTid);
      let rootNode = popupRef.current?.getRootNode();

      expect(popupRef.current).not.toBeNull();
      expect(rootNode).toBeInstanceOf(HTMLElement);
      expect(rootNode).toBe(contentContainer);

      rerender(<Component opened={false} />);

      await waitFor(() => {
        rootNode = popupRef.current?.getRootNode();
        expect(popupRef.current).not.toBeNull();
        expect(rootNode).toBeNull();
      });
    });
  };

  describe('on desktop', () => {
    testRootNode(TestPopup, popupRef, PopupDataTids.root);
  });
  describe('on mobile', () => {
    const calcMatches = (query: string) => query === LIGHT_THEME.mobileMediaQuery;
    const oldMatchMedia = window.matchMedia;
    const matchMediaMock = vi.fn().mockImplementation((query) => {
      return {
        matches: calcMatches(query),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };
    });

    beforeEach(() => {
      window.matchMedia = matchMediaMock;
    });

    afterEach(() => {
      window.matchMedia = oldMatchMedia;
    });

    testRootNode(TestPopup, popupRef, MobilePopupDataTids.container);
  });

  describe('properly renders opened/closed states', () => {
    const popupText = 'Test content';
    const popupRef = React.createRef<Popup & InstanceWithRootNode>();
    const TestPopup = ({ opened }: Pick<PopupProps, 'opened'>) => {
      const anchor = <button />;
      return (
        <Popup opened={opened} anchorElement={anchor} disableAnimations ref={popupRef}>
          {popupText}
        </Popup>
      );
    };

    it('initially closed - then opened - closed again', async () => {
      const { rerender } = render(<TestPopup opened={false} />);
      expect(screen.queryByText(popupText)).not.toBeInTheDocument();
      rerender(<TestPopup opened />);
      expect(screen.queryByText(popupText)).toBeInTheDocument();
      rerender(<TestPopup opened={false} />);
      expect(screen.queryByText(popupText)).not.toBeInTheDocument();
    });
  });
});
