import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { type JSX } from 'react';

import * as ResponsiveLayoutHooks from '../../../components/ResponsiveLayout/useResponsiveLayout.js';
import type { InstanceWithRootNode } from '../../../lib/rootNode/rootNodeDecorator.js';
import { delay } from '../../../lib/utils.js';
import { MobilePopupDataTids } from '../../MobilePopup/index.js';
import { PopupDataTids } from '../index.js';
import { Popup } from '../Popup.js';
import type { PopupProps } from '../Popup.js';
import { PopupHelper } from '../PopupHelper.js';

describe('Popup', () => {
  vi.setConfig({ testTimeout: 10000 });

  it('opens in the first passed position by default', async () => {
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

  it('uses the same position on every open', async () => {
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

describe('Popup fallback position logic', () => {
  const mountPopup = (props: Partial<PopupProps> = {}) => {
    const anchorElement = document.createElement('button');
    const popupRef = React.createRef<Popup>();

    render(
      <Popup anchorElement={anchorElement} opened={false} disableAnimations ref={popupRef} {...props}>
        Test content
      </Popup>,
    );

    if (!popupRef.current) {
      throw new Error('Popup ref is not set');
    }

    return { popup: popupRef.current, anchorElement };
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps current position when it can become fully visible after scroll', () => {
    const popupElement = document.createElement('div');
    const { popup, anchorElement } = mountPopup({
      positions: ['bottom left', 'top left'],
      tryPreserveFirstRenderedPosition: true,
    });

    vi.spyOn(PopupHelper, 'getElementAbsoluteRect').mockImplementation((element) =>
      element === anchorElement
        ? { top: 0, left: 0, width: 100, height: 20 }
        : { top: 0, left: 0, width: 120, height: 60 },
    );
    vi.spyOn(popup as any, 'getCoordinates').mockReturnValue({ top: -20, left: 10 });
    vi.spyOn(PopupHelper, 'isFullyVisible').mockReturnValue(false);
    vi.spyOn(PopupHelper, 'canBecomeFullyVisible').mockReturnValue(true);
    const pickFallbackPositionSpy = vi.spyOn(popup as any, 'pickBestFallbackPosition');

    const result = (popup as any).getLocation(popupElement, {
      position: 'top left',
      coordinates: { top: 0, left: 0 },
      isFullyVisible: false,
    });

    expect(result).toEqual({
      coordinates: { top: -20, left: 10 },
      position: 'top left',
      isFullyVisible: true,
    });
    expect(pickFallbackPositionSpy).not.toHaveBeenCalled();
  });

  it('picks first fully visible position before fallback heuristic', () => {
    const popupElement = document.createElement('div');
    const { popup, anchorElement } = mountPopup({
      positions: ['bottom left', 'top left', 'bottom right'],
    });

    vi.spyOn(PopupHelper, 'getElementAbsoluteRect').mockImplementation((element) =>
      element === anchorElement
        ? { top: 0, left: 0, width: 100, height: 20 }
        : { top: 0, left: 0, width: 120, height: 60 },
    );
    vi.spyOn(popup as any, 'getCoordinates').mockImplementation((_anchorRect, _popupRect, position) => {
      switch (position) {
        case 'bottom left':
          return { top: 10, left: 10 };
        case 'top left':
          return { top: 20, left: 20 };
        default:
          return { top: 30, left: 30 };
      }
    });
    vi.spyOn(PopupHelper, 'isFullyVisible').mockImplementation((coordinates) => coordinates.top === 20);
    const pickFallbackPositionSpy = vi.spyOn(popup as any, 'pickBestFallbackPosition');

    const result = (popup as any).getLocation(popupElement);

    expect(result).toEqual({
      coordinates: { top: 20, left: 20 },
      position: 'top left',
      isFullyVisible: true,
    });
    expect(pickFallbackPositionSpy).not.toHaveBeenCalled();
  });

  it.each(['left middle', 'right middle'] as const)(
    'should not call horizontal position helper for side position %s',
    (position) => {
      const { popup } = mountPopup();
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const getHorizontalPositionSpy = vi.spyOn(PopupHelper, 'getHorizontalPosition');
      const margin = parseInt(popup['theme'].popupMargin);

      const result = popup['getCoordinates'](
        { top: 10, left: 20, width: 30, height: 40 },
        { top: 0, left: 0, width: 50, height: 60 },
        position,
      );

      expect(getHorizontalPositionSpy).not.toHaveBeenCalled();
      expect(consoleSpy).not.toHaveBeenCalled();
      expect(result).toEqual(
        position === 'left middle' ? { top: 0, left: 20 - 50 - margin } : { top: 0, left: 20 + 30 + margin },
      );
    },
  );

  it('ignores partially visible left positions among area candidates', () => {
    const { popup } = mountPopup();
    const bestCandidate = (popup as any).pickBestAreaCandidate(
      [
        {
          position: 'left middle',
          coordinates: { top: 0, left: 0 },
          overflowCount: 1,
          visibleArea: 500,
          isFullyVisible: false,
          isAreaEligible: false,
        },
        {
          position: 'top left',
          coordinates: { top: 0, left: 0 },
          overflowCount: 2,
          visibleArea: 300,
          isFullyVisible: false,
          isAreaEligible: true,
        },
      ],
      new Set(['top left']),
    );

    expect(bestCandidate?.position).toBe('top left');
  });

  it('prefers position from original positions when visible area is equal', () => {
    const { popup } = mountPopup();
    const bestCandidate = (popup as any).pickBestAreaCandidate(
      [
        {
          position: 'bottom center',
          coordinates: { top: 0, left: 0 },
          overflowCount: 1,
          visibleArea: 300,
          isFullyVisible: false,
          isAreaEligible: true,
        },
        {
          position: 'top left',
          coordinates: { top: 0, left: 0 },
          overflowCount: 1,
          visibleArea: 300,
          isFullyVisible: false,
          isAreaEligible: true,
        },
      ],
      new Set(['top left']),
    );

    expect(bestCandidate?.position).toBe('top left');
  });

  it('picks area-based fallback when there is visible area', () => {
    const { popup } = mountPopup();
    const candidateByPosition = {
      'bottom center': {
        position: 'bottom center',
        coordinates: { top: 0, left: 0 },
        overflowCount: 3,
        visibleArea: 0,
        isFullyVisible: false,
        isAreaEligible: true,
      },
      'top left': {
        position: 'top left',
        coordinates: { top: 0, left: 0 },
        overflowCount: 2,
        visibleArea: 400,
        isFullyVisible: false,
        isAreaEligible: true,
      },
      'right middle': {
        position: 'right middle',
        coordinates: { top: 0, left: 0 },
        overflowCount: 1,
        visibleArea: 200,
        isFullyVisible: false,
        isAreaEligible: true,
      },
    };

    vi.spyOn(popup as any, 'getCoordinates').mockReturnValue({ top: 0, left: 0 });
    vi.spyOn(PopupHelper, 'getOverflowEdges').mockReturnValue({
      top: false,
      bottom: true,
      left: false,
      right: false,
    });
    vi.spyOn(PopupHelper, 'getPreferredDirection').mockReturnValue('top');
    vi.spyOn(PopupHelper, 'getOrderedFallbackCandidates').mockReturnValue([
      'bottom center',
      'top left',
      'right middle',
    ]);
    vi.spyOn(PopupHelper, 'getViewportAbsoluteRect').mockReturnValue({ top: 0, left: 0, width: 1000, height: 1000 });
    vi.spyOn(popup as any, 'evaluateFallbackCandidate').mockImplementation(
      (position) => candidateByPosition[position as keyof typeof candidateByPosition],
    );

    const bestPosition = (popup as any).pickBestFallbackPosition(
      ['top left', 'right middle'],
      { top: 0, left: 0, width: 10, height: 10 },
      { top: 0, left: 0, width: 20, height: 20 },
    );

    expect(bestPosition).toBe('top left');
  });

  it('falls back to minimum overflowCount when there is no visible area', () => {
    const { popup } = mountPopup();
    const candidateByPosition = {
      'bottom center': {
        position: 'bottom center',
        coordinates: { top: 0, left: 0 },
        overflowCount: 3,
        visibleArea: 0,
        isFullyVisible: false,
        isAreaEligible: true,
      },
      'top left': {
        position: 'top left',
        coordinates: { top: 0, left: 0 },
        overflowCount: 2,
        visibleArea: 0,
        isFullyVisible: false,
        isAreaEligible: true,
      },
      'right middle': {
        position: 'right middle',
        coordinates: { top: 0, left: 0 },
        overflowCount: 1,
        visibleArea: 0,
        isFullyVisible: false,
        isAreaEligible: true,
      },
    };

    vi.spyOn(popup as any, 'getCoordinates').mockReturnValue({ top: 0, left: 0 });
    vi.spyOn(PopupHelper, 'getOverflowEdges').mockReturnValue({
      top: true,
      bottom: true,
      left: false,
      right: false,
    });
    vi.spyOn(PopupHelper, 'getPreferredDirection').mockReturnValue('bottom');
    vi.spyOn(PopupHelper, 'getOrderedFallbackCandidates').mockReturnValue([
      'bottom center',
      'top left',
      'right middle',
    ]);
    vi.spyOn(PopupHelper, 'getViewportAbsoluteRect').mockReturnValue({ top: 0, left: 0, width: 1000, height: 1000 });
    vi.spyOn(popup as any, 'evaluateFallbackCandidate').mockImplementation(
      (position) => candidateByPosition[position as keyof typeof candidateByPosition],
    );

    const bestPosition = (popup as any).pickBestFallbackPosition(
      ['top left', 'right middle'],
      { top: 0, left: 0, width: 10, height: 10 },
      { top: 0, left: 0, width: 20, height: 20 },
    );

    expect(bestPosition).toBe('right middle');
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
    popupRef: React.RefObject<(Popup & InstanceWithRootNode) | null>,
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

      await waitFor(() => {
        const rootNode = popupRef.current?.getRootNode();

        expect(popupRef.current).not.toBeNull();
        expect(rootNode).toBeInstanceOf(HTMLElement);

        if (rootNode instanceof HTMLElement) {
          expect(rootNode.dataset.tid).toBe(dataTid);
        }
      });

      rerender(<Component opened={false} />);

      await waitFor(() => {
        const rootNode = popupRef.current?.getRootNode();
        expect(popupRef.current).not.toBeNull();
        expect(rootNode).toBeNull();
      });
    });
  };

  describe('on desktop', () => {
    testRootNode(TestPopup, popupRef, PopupDataTids.root);
  });
  describe('on mobile', () => {
    beforeEach(() => {
      vi.spyOn(ResponsiveLayoutHooks, 'useResponsiveLayout').mockReturnValue({ isMobile: true });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    testRootNode(TestPopup, popupRef, MobilePopupDataTids.container);

    it('closes on backdrop click', () => {
      const onCloseRequest = vi.fn();
      const anchor = document.createElement('button');

      render(
        <Popup opened anchorElement={anchor} disableAnimations mobileOnCloseRequest={onCloseRequest}>
          Test content
        </Popup>,
      );

      fireEvent.click(screen.getByTestId(MobilePopupDataTids.backdrop));

      expect(onCloseRequest).toHaveBeenCalledTimes(1);
    });

    it('calls onCloseRequest once for a single backdrop click sequence', () => {
      const onCloseRequest = vi.fn();
      const anchor = document.createElement('button');

      render(
        <Popup opened anchorElement={anchor} disableAnimations mobileOnCloseRequest={onCloseRequest}>
          Test content
        </Popup>,
      );

      const backdrop = screen.getByTestId(MobilePopupDataTids.backdrop);
      fireEvent.mouseDown(backdrop);
      fireEvent.click(backdrop);

      expect(onCloseRequest).toHaveBeenCalledTimes(1);
    });

    it('does not bubble backdrop click outside', () => {
      const onCloseRequest = vi.fn();
      const onOuterClick = vi.fn();
      const anchor = document.createElement('button');

      render(
        <div onClick={onOuterClick}>
          <Popup opened anchorElement={anchor} disableAnimations mobileOnCloseRequest={onCloseRequest}>
            Test content
          </Popup>
        </div>,
      );

      fireEvent.click(screen.getByTestId(MobilePopupDataTids.backdrop));

      expect(onCloseRequest).toHaveBeenCalledTimes(1);
      expect(onOuterClick).not.toHaveBeenCalled();
    });
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
