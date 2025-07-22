import React from 'react';
import { findDOMNode } from 'react-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../Button';
import type { TooltipProps } from '../Tooltip';
import { Tooltip, TooltipDataTids } from '../Tooltip';
import { delay, clickOutside } from '../../../lib/utils';

/** Wraps test and runs it twice with external and child anchor */
const withVariousAnchors = (testFn: (render: (props: Partial<TooltipProps>) => { anchor: HTMLElement }) => void) => {
  const childAnchorRef = React.createRef<HTMLButtonElement>();
  const externalAnchor = document.createElement('button');

  const getExternalAnchor = () => externalAnchor;
  const getChildAnchor = () => {
    const anchor = childAnchorRef.current;
    if (anchor === null) {
      // eliminate null from anchor type
      throw new Error('childAnchor is null');
    }
    return anchor;
  };

  describe.each([
    ['external anchor', getExternalAnchor, { anchorElement: externalAnchor }],
    ['child anchor', getChildAnchor, { children: <button ref={childAnchorRef} /> }],
  ])('%s', (_, getAnchor, tooltipProps) => {
    const renderTooltip = (props: Partial<TooltipProps>) => {
      render(<Tooltip render={() => <div />} {...tooltipProps} {...props} />);
      return { anchor: getAnchor() };
    };

    beforeEach(() => {
      document.body.appendChild(externalAnchor);
    });

    afterEach(() => {
      externalAnchor?.parentNode?.removeChild(externalAnchor);
    });

    testFn(renderTooltip);
  });
};

describe('Tooltip', () => {
  const renderTooltip = () => '';

  describe('triggers', () => {
    describe('click', () => {
      withVariousAnchors((renderTooltip) => {
        it('opens after click by anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          await userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('contains close button', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          await userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toContainHTML('<svg');
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after second click by anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          await userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          await userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click by content', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          await userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          await userEvent.click(content);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click outside', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          await userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(document.body);
          expect(content).not.toBeInTheDocument();
        });
      });
    });

    describe('focus', () => {
      withVariousAnchors((renderTooltip) => {
        it('opens by focus on anchor', () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });
          act(() => {
            anchor.focus();
          });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('does not contain close button', async () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });

          await userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).not.toContainHTML('viewBox="0 0 10 10"');
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click on anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });
          act(() => {
            anchor.focus();
          });
          const content = screen.getByTestId(TooltipDataTids.content);

          await userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click on content', async () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });
          act(() => {
            anchor.focus();
          });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(content);
          expect(content).not.toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click outside', async () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });
          act(() => {
            anchor.focus();
          });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(document.body);
          expect(content).not.toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after blur', () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });
          act(() => {
            anchor.focus();
          });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
          act(() => {
            anchor.blur();
          });
          expect(content).not.toBeInTheDocument();
        });
      });
    });

    describe('hover&focus', () => {
      withVariousAnchors((renderTooltip) => {
        it('opens by hover on anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          await userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('opens by focus on anchor', () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });
          act(() => {
            anchor.focus();
          });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('openes by hover and keeps open after click on anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          await userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('openes by hover and keeps open after click on content', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          await userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(content);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('openes by focus and keeps open after click on anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          anchor.focus();
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('openes by focus and keeps open after click on content', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          anchor.focus();
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(content);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click outside', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          await userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(document.body);
          expect(content).not.toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after blur', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });
          act(() => {
            anchor.focus();
          });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
          act(() => {
            anchor.blur();
          });
          expect(content).not.toBeInTheDocument();
        });
      });
    });

    describe('opened', () => {
      withVariousAnchors((renderTooltip) => {
        it('opened by default', async () => {
          renderTooltip({ trigger: 'opened' });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click on anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'opened' });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click on content', async () => {
          renderTooltip({ trigger: 'opened' });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(content);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click outside', async () => {
          renderTooltip({ trigger: 'opened' });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          await userEvent.click(document.body);
          expect(content).toBeInTheDocument();
        });
      });
    });
  });

  it('keeps child ref', () => {
    interface CompProps {
      refFn: (element: HTMLDivElement) => void;
    }
    const Comp = ({ refFn }: CompProps) => {
      return (
        <Tooltip render={renderTooltip}>
          <div ref={refFn} />
        </Tooltip>
      );
    };
    const refFn1 = jest.fn();
    const refFn2 = jest.fn();

    const { rerender } = render(<Comp refFn={refFn1} />);

    rerender(<Comp refFn={refFn2} />);

    expect(refFn1.mock.calls).toHaveLength(2);
    expect(refFn1.mock.calls[0][0]).toBeTruthy();
    expect(refFn1.mock.calls[1][0]).toBeNull();

    expect(refFn2.mock.calls).toHaveLength(1);
  });

  it('does not show tooltip in render func returned false', () => {
    render(
      <div id="bar">
        <Tooltip trigger="opened" render={() => null}>
          bar
        </Tooltip>
      </div>,
    );
    expect(screen.queryByTestId(TooltipDataTids.root)).not.toBeInTheDocument();
  });

  it('calls `onCloseClick` when click on the cross', async () => {
    const onClose = jest.fn();
    render(
      <Tooltip trigger="opened" render={renderTooltip} onCloseClick={onClose}>
        <div />
      </Tooltip>,
    );
    await userEvent.click(screen.getByTestId(TooltipDataTids.crossIcon));
    expect(onClose.mock.calls).toHaveLength(1);
  });

  describe('calls `onOpen`', () => {
    it('with "opened" trigger', () => {
      const onOpen = jest.fn();
      render(
        <Tooltip trigger="opened" render={renderTooltip} onOpen={onOpen}>
          <div />
        </Tooltip>,
      );
      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('with "focus" trigger', async () => {
      const onOpen = jest.fn();
      render(
        <Tooltip trigger="focus" render={renderTooltip} onOpen={onOpen}>
          <button />
        </Tooltip>,
      );

      expect(screen.queryByTestId(TooltipDataTids.content)).not.toBeInTheDocument();

      await userEvent.tab();
      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();

      await delay(100);
      expect(onOpen.mock.calls).toHaveLength(1);
    });
  });

  describe('calls `onClose`', () => {
    const onClose = jest.fn();

    beforeEach(() => {
      onClose.mockClear();
    });

    it('with "click" trigger', async () => {
      render(
        <Tooltip trigger="click" render={renderTooltip} onClose={onClose}>
          <button />
        </Tooltip>,
      );
      await userEvent.click(screen.getByRole('button'));
      act(() => {
        clickOutside();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('when trigger changes to "closed"', () => {
      const { rerender } = render(
        <Tooltip trigger="opened" onClose={onClose} render={renderTooltip}>
          <div />
        </Tooltip>,
      );

      rerender(
        <Tooltip trigger="closed" onClose={onClose} render={renderTooltip}>
          <div />
        </Tooltip>,
      );

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('calls `show/hide` functions', () => {
    const Content = () => <div />;

    it('when trigger is "manual"', () => {
      const tooltipRef = React.createRef<Tooltip>();

      render(
        <Tooltip trigger="manual" render={() => <Content />} ref={tooltipRef}>
          <div />
        </Tooltip>,
      );
      act(() => {
        tooltipRef.current?.show();
      });

      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
      act(() => {
        tooltipRef.current?.hide();
      });
      expect(screen.queryByTestId(TooltipDataTids.content)).not.toBeInTheDocument();
    });

    it('when trigger is "opened"', () => {
      const tooltipRef = React.createRef<Tooltip>();

      render(
        <Tooltip trigger="opened" render={() => <Content />} ref={tooltipRef}>
          <div />
        </Tooltip>,
      );

      tooltipRef.current?.hide();

      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    });

    it('when trigger is "closed"', () => {
      const tooltipRef = React.createRef<Tooltip>();

      render(
        <Tooltip trigger="closed" render={() => <Content />} ref={tooltipRef}>
          <div />
        </Tooltip>,
      );
      tooltipRef.current?.show();

      expect(screen.queryByTestId(TooltipDataTids.content)).not.toBeInTheDocument();
    });
  });

  it('renders stateless children component without errors', () => {
    function PureComponent() {
      return <div>i&apos;m pure component!</div>;
    }

    render(
      <Tooltip trigger="opened" render={renderTooltip}>
        <PureComponent />
      </Tooltip>,
    );
    expect(screen.getByText("i'm pure component!")).toBeInTheDocument();
  });

  it('renders stateful children component without errors', () => {
    class StatefulComponent extends React.Component {
      public render() {
        return <div>Stateful Component!</div>;
      }
    }

    render(
      <Tooltip trigger="opened" render={renderTooltip}>
        <StatefulComponent />
      </Tooltip>,
    );
    expect(screen.getByText('Stateful Component!')).toBeInTheDocument();
  });

  it('reset opened state by `tigger="closed"` prop', () => {
    const Content = () => <div />;

    const { rerender } = render(
      <Tooltip trigger="click" disableAnimations render={() => <Content />}>
        <Button>Click me</Button>
      </Tooltip>,
    );

    expect(screen.queryByTestId(TooltipDataTids.content)).not.toBeInTheDocument();
    act(() => {
      screen.getByRole('button').click();
    });

    expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();

    rerender(
      <Tooltip trigger="closed" disableAnimations render={() => <Content />}>
        <Button>Click me</Button>
      </Tooltip>,
    );

    expect(screen.queryByTestId(TooltipDataTids.content)).not.toBeInTheDocument();

    rerender(
      <Tooltip trigger="hover" disableAnimations render={() => <Content />}>
        <Button>Click me</Button>
      </Tooltip>,
    );

    expect(screen.queryByTestId(TooltipDataTids.content)).not.toBeInTheDocument();
  });

  describe('calls onCloseRequest on clickOutside when tooltip is opened', () => {
    const Content = () => <div />;
    const onCloseRequest = jest.fn();

    beforeEach(() => {
      onCloseRequest.mockClear();
    });

    it('with "click" trigger', async () => {
      render(
        <Tooltip trigger="click" disableAnimations render={() => <Content />} onCloseRequest={onCloseRequest}>
          <button>Anchor</button>
        </Tooltip>,
      );

      await userEvent.click(screen.getByRole('button'));

      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
      clickOutside();

      expect(onCloseRequest).toHaveBeenCalledTimes(1);
    });

    it('with "opened" trigger', () => {
      render(
        <Tooltip trigger="opened" disableAnimations render={() => <Content />} onCloseRequest={onCloseRequest}>
          <button>Anchor</button>
        </Tooltip>,
      );
      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();

      clickOutside();

      expect(onCloseRequest).toHaveBeenCalledTimes(1);
    });

    it('should be called with event', async () => {
      render(
        <Tooltip trigger="click" disableAnimations render={() => <Content />} onCloseRequest={onCloseRequest}>
          <button>Anchor</button>
        </Tooltip>,
      );
      await userEvent.click(screen.getByRole('button'));
      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();

      clickOutside();

      const event = document.createEvent('HTMLEvents');
      expect(onCloseRequest).toHaveBeenCalledWith(event);
    });
  });

  describe('with custom showDelay prop value', () => {
    const showDelay = 400;
    const renderContent = () => <div>Content</div>;

    const TooltipWithCustomDelay = () => (
      <Tooltip render={renderContent} delayBeforeShow={showDelay} pos="right top">
        <button>Show</button>
      </Tooltip>
    );

    it('renders correctly after delay', async () => {
      render(<TooltipWithCustomDelay />);

      await userEvent.hover(screen.getByRole('button', { name: 'Show' }));

      await delay(showDelay);

      expect(screen.getByTestId(TooltipDataTids.content)).toBeInTheDocument();
    });
    it(`doesn't render prematurely`, async () => {
      render(<TooltipWithCustomDelay />);

      await userEvent.hover(screen.getByRole('button', { name: 'Show' }));

      await delay(Tooltip.delay);

      expect(screen.queryByTestId(TooltipDataTids.content)).not.toBeInTheDocument();
    });
  });

  it('clears hoverTimeout timer after unmount', async () => {
    jest.spyOn(window, 'setTimeout');
    jest.spyOn(window, 'clearTimeout');

    const tooltipRef = React.createRef<Tooltip>();

    const { unmount } = render(
      <Tooltip disableAnimations render={() => <div />} ref={tooltipRef}>
        <Button>Anchor</Button>
      </Tooltip>,
    );

    // @ts-expect-error: Use of private property.
    expect(tooltipRef.current.hoverTimeout).toBeUndefined();

    await userEvent.hover(screen.getByRole('button'));

    // @ts-expect-error: Use of private property.
    const { hoverTimeout } = tooltipRef.current;

    expect(hoverTimeout).toBeDefined();

    unmount();

    expect(clearTimeout).toHaveBeenCalledWith(hoverTimeout);
  });

  describe('findDOMNode', () => {
    beforeEach(() => {
      (findDOMNode as jest.Mock).mockClear();
    });

    it('should not be called when opened', () => {
      render(
        <Tooltip trigger={'opened'} render={() => <div />}>
          <Button />
        </Tooltip>,
      );

      expect(findDOMNode).not.toHaveBeenCalled();
    });

    it('should not be called when closed', () => {
      render(
        <Tooltip trigger={'closed'} render={() => <div />}>
          <Button />
        </Tooltip>,
      );
      expect(findDOMNode).not.toHaveBeenCalled();
    });

    describe('should be called with not-refable children', () => {
      it('FC without forwardRef', () => {
        const FC = () => <div />;
        render(
          <Tooltip trigger={'opened'} render={() => <div />}>
            <FC />
          </Tooltip>,
        );

        expect(findDOMNode).toHaveBeenCalled();
      });

      it('class component without getRootNode', () => {
        class ClassComponent extends React.Component {
          render = () => <div />;
        }

        render(
          <Tooltip trigger={'opened'} render={() => <div />}>
            <ClassComponent />
          </Tooltip>,
        );

        expect(findDOMNode).toHaveBeenCalled();
      });
    });

    describe('Warnings', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      beforeEach(() => {
        consoleSpy.mockClear();
      });

      afterAll(() => {
        consoleSpy.mockRestore();
      });

      it('should throw error if neither children nor anchorElement prop is provided to Tooltip', () => {
        render(<Tooltip />);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy.mock.calls[0][0]).toContain(
          `[Tooltip]: you must provide either 'children' or 'anchorElement' prop for Tooltip to work properly`,
        );
      });
    });
  });
});
