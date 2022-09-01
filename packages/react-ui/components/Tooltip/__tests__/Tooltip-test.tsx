import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../Button';
import { Tooltip, TooltipProps, TooltipState, TooltipDataTids } from '../Tooltip';
import { Popup } from '../../../internal/Popup';
import { delay } from '../../../lib/utils';

function clickOutside() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('mousedown', true, true);

  document.body.dispatchEvent(event);
}

const selectorCross = 'svg[viewBox="0 0 10 10"]';

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

          userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after second click by anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click by content', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          userEvent.click(content);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click outside', async () => {
          const { anchor } = renderTooltip({ trigger: 'click' });

          userEvent.click(anchor);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(document.body);
          expect(content).not.toBeInTheDocument();
        });
      });
    });

    describe('focus', () => {
      withVariousAnchors((renderTooltip) => {
        it('opens by focus on anchor', () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });

          anchor.focus();
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click on anchor', () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });

          anchor.focus();
          const content = screen.getByTestId(TooltipDataTids.content);

          userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click on content', () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });

          anchor.focus();
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(content);
          expect(content).not.toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click outside', () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });

          anchor.focus();
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(document.body);
          expect(content).not.toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after blur', () => {
          const { anchor } = renderTooltip({ trigger: 'focus' });

          anchor.focus();
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          anchor.blur();
          expect(content).not.toBeInTheDocument();
        });
      });
    });

    describe('hover&focus', () => {
      withVariousAnchors((renderTooltip) => {
        it('opens by hover on anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('opens by focus on anchor', () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          anchor.focus();
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('openes by hover and keeps open after click on anchor', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('openes by hover and keeps open after click on content', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(content);
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

          userEvent.click(anchor);
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

          userEvent.click(content);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after click outside', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          userEvent.hover(anchor);
          await delay(Tooltip.delay);
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(document.body);
          expect(content).not.toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('closes after blur', async () => {
          const { anchor } = renderTooltip({ trigger: 'hover&focus' });

          anchor.focus();
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          anchor.blur();
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

          userEvent.click(anchor);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click on content', async () => {
          renderTooltip({ trigger: 'opened' });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(content);
          expect(content).toBeInTheDocument();
        });
      });

      withVariousAnchors((renderTooltip) => {
        it('keeps open after click outside', async () => {
          renderTooltip({ trigger: 'opened' });
          const content = screen.getByTestId(TooltipDataTids.content);

          expect(content).toBeInTheDocument();

          userEvent.click(document.body);
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

    const wrapper = mount<CompProps>(<Comp refFn={refFn1} />);
    // Force rerender to make sure no additional ref calls happens when ref
    // didn't change.
    wrapper.update();
    wrapper.setProps({ refFn: refFn2 });

    expect(refFn1.mock.calls).toHaveLength(2);
    expect(refFn1.mock.calls[0][0]).toBeTruthy();
    expect(refFn1.mock.calls[1][0]).toBeNull();

    expect(refFn2.mock.calls).toHaveLength(1);
    expect(refFn2.mock.calls[0][0]).toBe(wrapper.find('div').instance());
  });

  it('does not show tooltip in render func returned false', () => {
    const wrapper = mount(
      <div>
        <div id="foo">
          <Tooltip trigger="opened" render={renderTooltip}>
            foo
          </Tooltip>
        </div>
        <div id="bar">
          <Tooltip trigger="opened" render={() => null}>
            bar
          </Tooltip>
        </div>
      </div>,
    );

    expect(wrapper.find('#foo').find(selectorCross)).toHaveLength(1);
    expect(wrapper.find('#bar').find(selectorCross)).toHaveLength(0);
  });

  it('calls `onCloseClick` when click on the cross', () => {
    const onClose = jest.fn();
    const wrapper = mount<TooltipProps>(
      <Tooltip trigger="opened" render={renderTooltip} onCloseClick={onClose}>
        <div />
      </Tooltip>,
    );
    wrapper.find(selectorCross).simulate('click');
    expect(onClose.mock.calls).toHaveLength(1);
  });

  describe('calls `onOpen`', () => {
    it('with "opened" trigger', () => {
      const onOpen = jest.fn();
      mount<TooltipProps>(
        <Tooltip trigger="opened" render={renderTooltip} onOpen={onOpen}>
          <div />
        </Tooltip>,
      );
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('with "focus" trigger', () => {
      const onOpen = jest.fn();
      const wrapper = mount<TooltipProps>(
        <Tooltip trigger="focus" render={renderTooltip} onOpen={onOpen}>
          <div />
        </Tooltip>,
      );
      wrapper.find(Popup).invoke('onOpen')?.();
      expect(onOpen).toHaveBeenCalledTimes(1);
    });
  });

  describe('calls `onClose`', () => {
    const onClose = jest.fn();
    let wrapper: ReactWrapper<TooltipProps, TooltipState, Tooltip>;

    beforeEach(() => {
      onClose.mockClear();
    });

    it('with "click" trigger', () => {
      wrapper = mount<Tooltip, TooltipProps, TooltipState>(
        <Tooltip render={renderTooltip} onClose={onClose}>
          <div />
        </Tooltip>,
      );
      wrapper.setProps({ trigger: 'click' });
      wrapper.setState({ opened: true });
      wrapper.update();

      clickOutside();

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('when trigger changes to "closed"', () => {
      wrapper = mount<Tooltip, TooltipProps, TooltipState>(
        <Tooltip trigger="opened" onClose={onClose} render={renderTooltip}>
          <div />
        </Tooltip>,
      );

      wrapper.setProps({ trigger: 'closed' });
      wrapper.update();

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('calls `show/hide` functions', () => {
    const Content = () => <div />;
    let wrapper: ReactWrapper<TooltipProps, TooltipState, Tooltip>;
    let tooltip: Tooltip;

    beforeEach(() => {
      wrapper = mount<Tooltip, TooltipProps, TooltipState>(
        <Tooltip trigger="click" render={() => <Content />}>
          <div />
        </Tooltip>,
      );
      tooltip = wrapper.instance();
    });

    it('when trigger is "manual"', () => {
      wrapper.setProps({ trigger: 'manual' });
      wrapper.update();

      tooltip.show();
      wrapper.update();
      expect(wrapper.find(Content)).toHaveLength(1);

      tooltip.hide();
      wrapper.update();
      expect(wrapper.find(Content)).toHaveLength(0);
    });

    it('when trigger is "opened"', () => {
      wrapper.setProps({ trigger: 'opened' });
      wrapper.update();
      tooltip.hide();
      wrapper.update();
      expect(wrapper.find(Content)).toHaveLength(1);
    });

    it('when trigger is "closed"', () => {
      wrapper.setProps({ trigger: 'closed' });
      wrapper.update();
      tooltip.show();
      wrapper.update();
      expect(wrapper.find(Content)).toHaveLength(0);
    });
  });

  it('renders stateless children component without errors', () => {
    function PureComponent() {
      return <div>i&apos;m pure component!</div>;
    }

    const wrapper = mount<TooltipProps>(
      <Tooltip trigger="opened" render={renderTooltip}>
        <PureComponent />
      </Tooltip>,
    );

    expect(wrapper.find(PureComponent)).toHaveLength(1);
  });

  it('renders stateful children component without errors', () => {
    class StatefulComponent extends React.Component {
      public render() {
        return <div>Stateful Component!</div>;
      }
    }

    const wrapper = mount<Tooltip>(
      <Tooltip trigger="opened" render={renderTooltip}>
        <StatefulComponent />
      </Tooltip>,
    );

    expect(wrapper.find(StatefulComponent)).toHaveLength(1);
  });

  it('reset opened state by `tigger="closed"` prop', () => {
    const Content = () => <div />;

    const wrapper = mount<Tooltip>(
      <Tooltip trigger="click" disableAnimations render={() => <Content />}>
        <Button>Click me</Button>
      </Tooltip>,
    );

    expect(wrapper.find(Content)).toHaveLength(0);

    wrapper.setState({ opened: true });
    wrapper.update();
    expect(wrapper.find(Content)).toHaveLength(1);

    wrapper.setProps({ trigger: 'closed' });
    wrapper.update();
    expect(wrapper.find(Content)).toHaveLength(0);

    wrapper.setProps({ trigger: 'hover' });
    expect(wrapper.find(Content)).toHaveLength(0);
  });

  describe('calls onCloseRequest on clickOutside when tooltip is opened', () => {
    const Content = () => <div />;
    const onCloseRequest = jest.fn();
    let wrapper: ReactWrapper<TooltipProps, TooltipState, Tooltip>;

    beforeEach(() => {
      onCloseRequest.mockClear();
      wrapper = mount<Tooltip, TooltipProps, TooltipState>(
        <Tooltip disableAnimations render={() => <Content />} onCloseRequest={onCloseRequest}>
          <Button>Anchor</Button>
        </Tooltip>,
      );
    });

    it('with "click" trigger', () => {
      wrapper.setProps({ trigger: 'click' });
      wrapper.setState({ opened: true });
      wrapper.update();
      expect(wrapper.find(Content)).toHaveLength(1);

      clickOutside();

      expect(onCloseRequest).toHaveBeenCalledTimes(1);
    });

    it('with "opened" trigger', () => {
      wrapper.setProps({ trigger: 'opened' });
      wrapper.update();
      expect(wrapper.find(Content)).toHaveLength(1);

      clickOutside();

      expect(onCloseRequest).toHaveBeenCalledTimes(1);
    });

    it('should be called with event', () => {
      wrapper.setProps({ trigger: 'click' });
      wrapper.setState({ opened: true });
      wrapper.update();
      expect(wrapper.find(Content)).toHaveLength(1);

      clickOutside();

      const event = document.createEvent('HTMLEvents');
      expect(onCloseRequest).toHaveBeenCalledWith(event);
    });
  });

  it('clears hoverTimeout timer after unmount', () => {
    jest.useFakeTimers();
    jest.spyOn(window, 'setTimeout');
    jest.spyOn(window, 'clearTimeout');

    const wrapper = mount<Tooltip, TooltipProps, TooltipState>(
      <Tooltip disableAnimations render={() => <div />}>
        <Button>Anchor</Button>
      </Tooltip>,
    );
    const instance = wrapper.instance();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const timer = setTimeout(() => {});
    // @ts-expect-error: private property
    instance.hoverTimeout = timer;

    wrapper.unmount();

    expect(clearTimeout).toHaveBeenCalledWith(timer);
    // @ts-expect-error: Use of private property.
    expect(instance.hoverTimeout).toBeNull();
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
  });
});
