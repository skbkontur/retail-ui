import React, { useState } from 'react';
import { mount } from 'enzyme';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LangCodes, LocaleContext } from '../../../lib/locale';
import { StickyDataTids } from '../../../components/Sticky';
import { Modal, ModalDataTids } from '../Modal';
import { componentsLocales as ModalLocalesRu } from '../locale/locales/ru';
import { componentsLocales as ModalLocalesEn } from '../locale/locales/en';

function emulateRealClick(
  mouseDownTarget: Element | null,
  mouseUpTarget?: Element | null,
  clickTarget?: Element | null,
) {
  const mouseElementTarget = mouseUpTarget || mouseDownTarget;
  const clickElementTarget = clickTarget || mouseDownTarget;

  if (mouseDownTarget && mouseElementTarget && clickElementTarget) {
    const mouseDownEvent = document.createEvent('HTMLEvents');
    const mouseUpEvent = document.createEvent('HTMLEvents');
    const clickEvent = document.createEvent('HTMLEvents');

    mouseDownEvent.initEvent('mousedown', true, true);
    mouseUpEvent.initEvent('mouseup', true, true);
    clickEvent.initEvent('click', true, true);

    mouseDownTarget.dispatchEvent(mouseDownEvent);
    mouseElementTarget.dispatchEvent(mouseUpEvent);
    clickElementTarget.dispatchEvent(clickEvent);
  }
}

describe('Modal', () => {
  it('Simple render without crash', () => {
    expect(() =>
      render(
        <Modal>
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>,
      ),
    ).not.toThrow();
  });

  it('Non-sticky header works', async () => {
    const Component = () => {
      const [isSticky, setIsSticky] = useState(true);

      return (
        <>
          <button onClick={() => setIsSticky(false)}>disable sticky</button>
          <Modal.Header sticky={isSticky}>Footer</Modal.Header>
        </>
      );
    };

    render(<Component />);
    expect(screen.getByTestId(StickyDataTids.root)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByTestId(StickyDataTids.root)).not.toBeInTheDocument();
  });

  it('Non-sticky footer works', async () => {
    const Component = () => {
      const [isSticky, setIsSticky] = useState(true);

      return (
        <>
          <button onClick={() => setIsSticky(false)}>disable sticky</button>
          <Modal.Footer sticky={isSticky}>Footer</Modal.Footer>
        </>
      );
    };

    render(<Component />);
    expect(screen.getByTestId(StickyDataTids.root)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button'));
    expect(screen.queryByTestId(StickyDataTids.root)).not.toBeInTheDocument();
  });

  it('onClose handler works', async () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal onClose={onCloseHandler}>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );
    expect(onCloseHandler).not.toHaveBeenCalled();
    await userEvent.click(screen.getByTestId(ModalDataTids.close));
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });

  it('disableClose prop works', () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal onClose={onCloseHandler} disableClose>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );

    expect(onCloseHandler).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(ModalDataTids.close));
    expect(onCloseHandler).not.toHaveBeenCalled();
  });

  it('Close button show without header', () => {
    render(
      <Modal>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );

    expect(screen.getByTestId(ModalDataTids.close)).toBeInTheDocument();
  });

  it('noClose prop works', () => {
    render(
      <Modal noClose>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );

    expect(screen.queryByTestId(ModalDataTids.close)).not.toBeInTheDocument();
  });

  it('direct click on background calls onClose', () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal onClose={onCloseHandler}>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(screen.getByTestId(ModalDataTids.container));
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });

  it("click on background doesn't call onClose if started/ended on modal content", () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal onClose={onCloseHandler}>
        <Modal.Body>
          <div data-tid="modal-body-content" />
        </Modal.Body>
      </Modal>,
    );

    const containerNode = screen.getByTestId(ModalDataTids.container);
    const contentNode = screen.getByTestId('modal-body-content');

    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(contentNode, containerNode, containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(containerNode, contentNode, containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it("click on content doesn't call onClose", () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal onClose={onCloseHandler}>
        <Modal.Body>
          <div data-tid="modal-body-content" />
        </Modal.Body>
      </Modal>,
    );

    const contentNode = screen.getByTestId('modal-body-content');
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(contentNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it('click on background works if noClose is true', () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal noClose onClose={onCloseHandler}>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );

    const containerNode = screen.getByTestId(ModalDataTids.container);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(1);
  });

  it("click on background doesn't work if disableClose is true", () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal disableClose onClose={onCloseHandler}>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );

    const containerNode = screen.getByTestId(ModalDataTids.container);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it('ignoreBackgroundClick prop works', () => {
    const onCloseHandler = jest.fn();
    render(
      <Modal ignoreBackgroundClick onClose={onCloseHandler}>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );

    const containerNode = screen.getByTestId(ModalDataTids.container);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
    emulateRealClick(containerNode);
    expect(onCloseHandler).toHaveBeenCalledTimes(0);
  });

  it('correct position in stack', () => {
    const wrapper1 = mount(<Modal />);

    expect(wrapper1.state('stackPosition')).toBe(0);

    const wrapper2 = mount(<Modal />);

    expect(wrapper1.state('stackPosition')).toBe(1);

    wrapper2.unmount();

    expect(wrapper1.state('stackPosition')).toBe(0);
  });

  describe('a11y', () => {
    it('should have `aria-modal` attribute set to `true`', () => {
      render(<Modal>test</Modal>);
      expect(screen.getAllByTestId(ModalDataTids.content)[0]).toHaveAttribute('aria-modal', 'true');
    });

    it('should change role to `alertdialog`', () => {
      render(<Modal role="alertdialog" />);

      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('passes correct value to `aria-label` attribute', () => {
      const label = 'label';
      render(<Modal aria-label={label} />);

      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('passes correct value to `aria-labelledby` attribute', () => {
      const labelId = 'labelId';
      render(<Modal aria-labelledby={labelId} />);

      expect(screen.getAllByTestId(ModalDataTids.container)[1]).toHaveAttribute('aria-labelledby', labelId);
    });

    it('has correct value on close button aria-label attribute (ru)', () => {
      render(<Modal />);

      expect(screen.getAllByTestId(ModalDataTids.close)[0]).toHaveAttribute(
        'aria-label',
        ModalLocalesRu.closeButtonAriaLabel,
      );
    });

    it('has correct value on close button aria-label attribute (en)', () => {
      render(
        <LocaleContext.Provider value={{ langCode: LangCodes.en_GB }}>
          <Modal />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(ModalDataTids.close)[1]).toHaveAttribute(
        'aria-label',
        ModalLocalesEn.closeButtonAriaLabel,
      );
    });

    it('sets custom value for `closeButtonAriaLabel` locale', () => {
      const customAriaLabel = 'test';
      render(
        <LocaleContext.Provider value={{ locale: { Modal: { closeButtonAriaLabel: customAriaLabel } } }}>
          <Modal />
        </LocaleContext.Provider>,
      );

      expect(screen.getAllByTestId(ModalDataTids.close)[1]).toHaveAttribute('aria-label', customAriaLabel);
    });
  });
});
