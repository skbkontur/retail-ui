import * as React from 'react';
import { mount } from 'enzyme';
import Modal from '../Modal';
import { isHeader } from '../ModalHeader';
import { isFooter } from '../ModalFooter';

function emulateRealClick(
  mouseDownTarget: Element | null,
  mouseUpTarget?: Element | null,
  clickTarget?: Element | null,
) {
  mouseUpTarget = mouseUpTarget || mouseDownTarget;
  clickTarget = clickTarget || mouseDownTarget;

  if (mouseDownTarget && mouseUpTarget && clickTarget) {
    const mouseDownEvent = document.createEvent('HTMLEvents');
    const mouseUpEvent = document.createEvent('HTMLEvents');
    const clickEvent = document.createEvent('HTMLEvents');

    mouseDownEvent.initEvent('mousedown', true, true);
    mouseUpEvent.initEvent('mouseup', true, true);
    clickEvent.initEvent('click', true, true);

    mouseDownTarget.dispatchEvent(mouseDownEvent);
    mouseUpTarget.dispatchEvent(mouseUpEvent);
    clickTarget.dispatchEvent(clickEvent);
  }
}

describe('Modal', () => {
  it('Simple render without crash', () => {
    const render = () =>
      mount(
        <Modal>
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>,
      );

    expect(render).not.toThrow();
  });

  it('Non-sticky header works', () => {
    const wrapper = mount(<Modal.Header>Header</Modal.Header>);

    expect(wrapper.find('Sticky')).toHaveLength(1);

    wrapper.setProps({ sticky: false });

    expect(wrapper.find('Sticky')).toHaveLength(0);
  });

  it('Non-sticky footer works', () => {
    const wrapper = mount(<Modal.Footer>Footer</Modal.Footer>);

    expect(wrapper.find('Sticky')).toHaveLength(1);

    wrapper.setProps({ sticky: false });

    expect(wrapper.find('Sticky')).toHaveLength(0);
  });

  it('onClose handler works', () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(<Modal onClose={onCloseHandler}>Modal content</Modal>);

    expect(onCloseHandler).not.toHaveBeenCalled();
    wrapper.find('button').simulate('click');
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });

  it('disableClose prop works', () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(
      <Modal onClose={onCloseHandler} disableClose>
        Modal content
      </Modal>,
    );

    expect(onCloseHandler).not.toHaveBeenCalled();
    wrapper.find('button').simulate('click');
    expect(onCloseHandler).not.toHaveBeenCalled();
  });

  it('Close button show without header', () => {
    const wrapper = mount(<Modal>Modal content</Modal>);

    expect(wrapper.find('Close')).toHaveLength(1);
  });

  it('noClose prop works', () => {
    const wrapper = mount(<Modal noClose>Modal content</Modal>);

    expect(wrapper.find('Close')).toHaveLength(0);
  });

  it('direct click on background calls onClose', () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(<Modal onClose={onCloseHandler}>Modal content</Modal>);

    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(wrapper.find('[data-tid="modal-container"]').getDOMNode());
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });

  it("click on background doesn't call onClose if started/ended on modal content", () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(
      <Modal onClose={onCloseHandler}>
        <div data-tid="modal-content" />
      </Modal>,
    );
    const containerNode = wrapper.find('[data-tid="modal-container"]').getDOMNode();
    const contentNode = wrapper.find('[data-tid="modal-content"]').getDOMNode();

    expect(onCloseHandler).toHaveBeenCalledTimes(0);

    emulateRealClick(contentNode, containerNode, containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);

    emulateRealClick(containerNode, contentNode, containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it("click on content doesn't call onClose", () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(
      <Modal onClose={onCloseHandler}>
        <div data-tid="modal-content" />
      </Modal>,
    );
    const contentNode = wrapper.find('[data-tid="modal-content"]').getDOMNode();

    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(contentNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it('click on background works if noClose is true', () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(
      <Modal noClose onClose={onCloseHandler}>
        Modal content
      </Modal>,
    );
    const containerNode = wrapper.find('[data-tid="modal-container"]').getDOMNode();

    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });

  it("click on background doesn't work if disableClose is true", () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(
      <Modal disableClose onClose={onCloseHandler}>
        Modal content
      </Modal>,
    );
    const containerNode = wrapper.find('[data-tid="modal-container"]').getDOMNode();

    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it('ignoreBackgroundClick prop works', () => {
    const onCloseHandler = jest.fn();
    const wrapper = mount(
      <Modal ignoreBackgroundClick onClose={onCloseHandler}>
        Modal content
      </Modal>,
    );
    const containerNode = wrapper.find('[data-tid="modal-container"]').getDOMNode();

    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it.each([
    [Modal, false],
    [Modal.Footer, false],
    [
      function renderDiv() {
        return <div />;
      },
      false,
    ],
    [Modal.Header, true],
  ])('isHeader(%p) => %s', (Component, expected) => {
    const wrapper = mount(
      <div>
        <Component />
      </div>,
    );
    const child = React.Children.only(wrapper.prop('children'));
    expect(isHeader(child)).toBe(expected);
  });

  it.each([
    [Modal, false],
    [Modal.Footer, true],
    [
      function renderDiv() {
        return <div />;
      },
      false,
    ],
    [Modal.Header, false],
  ])('isFooter(%p) => %s', (Component, expected) => {
    const wrapper = mount(
      <div>
        <Component />
      </div>,
    );
    const child = React.Children.only(wrapper.prop('children'));
    expect(isFooter(child)).toBe(expected);
  });

  it('correct position in stack', () => {
    const wrapper1 = mount(<Modal />);

    expect(wrapper1.state('stackPosition')).toBe(0);

    const wrapper2 = mount(<Modal />);

    expect(wrapper1.state('stackPosition')).toBe(1);

    wrapper2.unmount();

    expect(wrapper1.state('stackPosition')).toBe(0);
  });
});
