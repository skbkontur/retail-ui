// tslint:disable:jsx-no-lambda
import { mount } from 'enzyme';
import * as React from 'react';
import Button from '../../Button';
import Tooltip, { TooltipProps } from '../Tooltip';

describe('Tooltip', () => {
  const render = () => '';

  it('keeps child ref', () => {
    interface CompProps {
      refFn: (element: HTMLDivElement) => void;
    }
    const Comp = ({ refFn }: CompProps) => {
      return (
        <Tooltip render={render}>
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

    expect(refFn1.mock.calls.length).toBe(2);
    expect(refFn1.mock.calls[0][0]).toBeTruthy();
    expect(refFn1.mock.calls[1][0]).toBe(null);

    expect(refFn2.mock.calls.length).toBe(1);
    expect(refFn2.mock.calls[0][0]).toBe(wrapper.find('div').instance());
  });

  it('does not show tooltip in render func returned false', () => {
    const wrapper = mount(
      <div>
        <div id="foo">
          <Tooltip trigger="opened" render={render}>
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

    expect(wrapper.find('#foo').find('.cross').length).toBe(1);
    expect(wrapper.find('#bar').find('.cross').length).toBe(0);
  });

  it('calls `onCloseClick` when click on the cross', () => {
    const onClose = jest.fn();
    const wrapper = mount<TooltipProps>(
      <Tooltip trigger="opened" render={render} onCloseClick={onClose}>
        <div />
      </Tooltip>,
    );
    wrapper.find('.cross').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('renders stateless children component without errors', () => {
    function PureComponent() {
      return <div>i'm pure component!</div>;
    }

    const wrapper = mount<TooltipProps>(
      <Tooltip trigger="opened" render={render}>
        <PureComponent />
      </Tooltip>,
    );

    expect(wrapper.find(PureComponent).length).toBe(1);
  });

  it('renders stateful children component without errors', () => {
    class StatefulComponent extends React.Component {
      public render() {
        return <div>Stateful Component!</div>;
      }
    }

    const wrapper = mount<Tooltip>(
      <Tooltip trigger="opened" render={render}>
        <StatefulComponent />
      </Tooltip>,
    );

    expect(wrapper.find(StatefulComponent).length).toBe(1);
  });

  it('reset opened state by `tigger="closed"` prop', () => {
    const Content = () => <div />;

    const wrapper = mount<Tooltip>(
      <Tooltip trigger="click" disableAnimations={true} render={() => <Content />}>
        <Button>Click me</Button>
      </Tooltip>,
    );

    expect(wrapper.find(Content).length).toBe(0);

    wrapper.setState({ opened: true });
    wrapper.update();
    expect(wrapper.find(Content).length).toBe(1);

    wrapper.setProps({ trigger: 'closed' });
    wrapper.update();
    expect(wrapper.find(Content).length).toBe(0);

    wrapper.setProps({ trigger: 'hover' });
    expect(wrapper.find(Content).length).toBe(0);
  });
});
