import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Clickable, ClickableDataTids } from '../Clickable';

describe('Clickable', () => {
  it('should render <a> tag', () => {
    render(
      <Clickable href="/" as="a">
        link
      </Clickable>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should provide access to ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Clickable as="button" ref={ref}>
        button
      </Clickable>,
    );

    expect(ref.current).toBeDefined();
  });

  it('should have root data-tid', () => {
    render(<Clickable as="div">test</Clickable>);

    expect(screen.getByTestId(ClickableDataTids.root)).toBeInTheDocument();
  });

  it('should change default root data-tid', () => {
    const dataTid = 'test';
    render(
      <Clickable as="div" data-tid={dataTid}>
        test
      </Clickable>,
    );

    expect(screen.getByTestId(dataTid)).toBeInTheDocument();
  });

  it('should be able to click on button', () => {
    const onClick = jest.fn();
    render(
      <Clickable as="button" onClick={onClick}>
        test
      </Clickable>,
    );

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not be able to click on disabled button', () => {
    const onClick = jest.fn();
    render(
      <Clickable as="button" onClick={onClick} isDisabled>
        test
      </Clickable>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should be able to pass custom event', () => {
    const onMouseDown = jest.fn();
    render(
      <Clickable as="button" onMouseDown={onMouseDown}>
        test
      </Clickable>,
    );

    userEvent.click(screen.getByRole('button'));

    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });

  describe('a11y', () => {
    it('should be able to pass custom `role` attribute', () => {
      render(
        <Clickable as="div" role="link">
          test
        </Clickable>,
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should be able to pass custom `tabIndex` attribute', () => {
      render(
        <Clickable as="button" tabIndex={-1}>
          test
        </Clickable>,
      );

      userEvent.tab();

      expect(screen.getByRole('button')).not.toHaveFocus();
    });

    it('should be able to pass custom `aria-disabled` attribute', () => {
      render(
        <Clickable as="button" aria-disabled="true">
          test
        </Clickable>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('should add `aria-disabled` attribute when disabled is passed', () => {
      render(
        <Clickable as="button" isDisabled>
          test
        </Clickable>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
