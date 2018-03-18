import { mount } from 'enzyme';
import React from 'react';
import RenderContainer from '../../RenderContainer';
import TooltipOld from '../Tooltip.js';

jest.mock('../../RenderContainer/RenderContainer.js', () => {
  return function RenderContainerMock(props) {
    return <div>{props.children}</div>;
  };
});

describe('Tooltip', () => {
  const render = () => '';

  it('keeps child ref', () => {
    const Comp = ({ refFn }) => {
      return (
        <TooltipOld render={render}>
          <div ref={refFn} />
        </TooltipOld>
      );
    };
    const refFn1 = jest.fn();
    const refFn2 = jest.fn();

    const wrapper = mount(<Comp refFn={refFn1} />);
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

  it('calls onFocus/onBlur when trigger=focus', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const wrapper = mount(
      <TooltipOld trigger="focus" render={render}>
        <input onFocus={onFocus} onBlur={onBlur} />
      </TooltipOld>
    );
    const input = wrapper.find('input');

    input.simulate('focus');
    expect(wrapper.state('opened')).toBe(true);
    expect(onFocus.mock.calls.length).toBe(1);

    input.simulate('blur');
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('does not show tooltip in render func returned false', () => {
    const wrapper = mount(
      <div>
        <div id="foo">
          <TooltipOld trigger="opened" render={render}>
            foo
          </TooltipOld>
        </div>
        <div id="bar">
          <TooltipOld trigger="opened" render={() => null}>
            bar
          </TooltipOld>
        </div>
      </div>
    );

    expect(wrapper.find('#foo').find(RenderContainer).length).toBe(1);
    expect(wrapper.find('#bar').find(RenderContainer).length).toBe(0);
  });

  it('calls `onCloseClick` when click on the cross', () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <TooltipOld trigger="opened" render={render} onCloseClick={onClose}>
        <div />
      </TooltipOld>
    );
    wrapper.find('.cross').simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('renders stateless children component without errors', () => {
    function PureComponent() {
      return <div>i'm pure component!</div>;
    }

    const wrapper = mount(
      <TooltipOld trigger="opened" render={render}>
        <PureComponent />
      </TooltipOld>
    );

    expect(wrapper.find(PureComponent).length).toBe(1);
  });

  it('renders stateful children component without errors', () => {
    class StatefulComponent extends React.Component {
      render() {
        return <div>Stateful Component!</div>;
      }
    }

    const wrapper = mount(
      <TooltipOld trigger="opened" render={render}>
        <StatefulComponent />
      </TooltipOld>
    );

    expect(wrapper.find(StatefulComponent).length).toBe(1);
  });
});
